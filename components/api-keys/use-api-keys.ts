"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import type { ApiKey } from "@/lib/api-keys";
import { fetchRawKey, readJson } from "./api-client";

export function useApiKeys() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [createName, setCreateName] = useState("");
  const [creating, setCreating] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [busyKeyId, setBusyKeyId] = useState<string | null>(null);
  const [revealedKeys, setRevealedKeys] = useState<Record<string, string>>({});
  const [viewingId, setViewingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    window.setTimeout(() => {
      setToastMessage((current) => (current === message ? null : current));
    }, 3000);
  }, []);

  const loadKeys = useCallback(async () => {
    setError(null);
    try {
      const res = await fetch("/api/keys");
      const data = await readJson(res);
      if (!res.ok) {
        throw new Error((data.error as string) ?? "Failed to load API keys");
      }
      setKeys((data.keys as ApiKey[]) ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadKeys();
  }, [loadKeys]);

  function openCreateModal() {
    setShowCreateModal(true);
    setError(null);
  }

  function closeCreateModal() {
    setShowCreateModal(false);
    setCreateName("");
  }

  function startRename(key: ApiKey) {
    setEditingId(key.id);
    setEditName(key.name);
  }

  function cancelRename() {
    setEditingId(null);
  }

  async function createKey(event: FormEvent) {
    event.preventDefault();
    if (!createName.trim()) return;

    setCreating(true);
    setError(null);

    try {
      const res = await fetch("/api/keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: createName.trim() }),
      });
      const data = await readJson(res);
      if (!res.ok) {
        throw new Error((data.error as string) ?? "Failed to create API key");
      }

      const rawKey = data.rawKey as string | undefined;
      const created = data.key as ApiKey | undefined;
      if (created?.id && rawKey) {
        setRevealedKeys((prev) => ({ ...prev, [created.id]: rawKey }));
        setViewingId(created.id);
      }

      setCreateName("");
      setShowCreateModal(false);
      showToast("API Key created successfully");
      await loadKeys();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setCreating(false);
    }
  }

  async function renameKey(id: string) {
    if (!editName.trim()) return;

    setBusyKeyId(id);
    setError(null);

    try {
      const res = await fetch(`/api/keys/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editName.trim() }),
      });
      const data = await readJson(res);
      if (!res.ok) {
        throw new Error((data.error as string) ?? "Failed to update API key");
      }
      setEditingId(null);
      await loadKeys();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusyKeyId(null);
    }
  }

  async function deleteKey(id: string, keyName: string) {
    if (!window.confirm(`Delete API key “${keyName}”? This cannot be undone.`)) {
      return;
    }

    setBusyKeyId(id);
    setError(null);

    try {
      const res = await fetch(`/api/keys/${id}`, { method: "DELETE" });
      const data = await readJson(res);
      if (!res.ok) {
        throw new Error((data.error as string) ?? "Failed to delete API key");
      }
      if (editingId === id) setEditingId(null);
      setRevealedKeys((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
      if (viewingId === id) setViewingId(null);
      showToast("API Key deleted successfully");
      await loadKeys();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusyKeyId(null);
    }
  }

  async function toggleViewKey(id: string) {
    if (viewingId === id) {
      setViewingId(null);
      return;
    }

    if (revealedKeys[id]) {
      setViewingId(id);
      return;
    }

    setBusyKeyId(id);
    setError(null);

    try {
      const rawKey = await fetchRawKey(id);
      setRevealedKeys((prev) => ({ ...prev, [id]: rawKey }));
      setViewingId(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusyKeyId(null);
    }
  }

  async function copyKey(id: string) {
    setBusyKeyId(id);
    setError(null);

    try {
      let value = revealedKeys[id];
      if (!value) {
        value = await fetchRawKey(id);
        setRevealedKeys((prev) => ({ ...prev, [id]: value }));
      }

      await navigator.clipboard.writeText(value);
      setCopiedId(id);
      showToast("Copied API Key to clipboard");
      window.setTimeout(() => setCopiedId(null), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusyKeyId(null);
    }
  }

  return {
    keys,
    loading,
    error,
    createName,
    setCreateName,
    creating,
    showCreateModal,
    editingId,
    editName,
    setEditName,
    busyKeyId,
    revealedKeys,
    viewingId,
    copiedId,
    toastMessage,
    dismissToast: () => setToastMessage(null),
    openCreateModal,
    closeCreateModal,
    startRename,
    cancelRename,
    createKey,
    renameKey,
    deleteKey,
    toggleViewKey,
    copyKey,
  };
}

export type UseApiKeysReturn = ReturnType<typeof useApiKeys>;
