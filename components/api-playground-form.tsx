"use client";

import { FormEvent, useCallback, useState } from "react";
import { Notification } from "@/components/notification";

type ToastState = {
  message: string;
  variant: "success" | "error";
} | null;

export default function ApiPlaygroundForm() {
  const [apiKey, setApiKey] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);

  const showToast = useCallback(
    (message: string, variant: "success" | "error") => {
      setToast({ message, variant });
      window.setTimeout(() => {
        setToast((current) =>
          current?.message === message ? null : current,
        );
      }, 3000);
    },
    [],
  );

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!apiKey.trim() || submitting) return;

    setSubmitting(true);

    try {
      const res = await fetch("/api/keys/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey: apiKey.trim() }),
      });

      const data = (await res.json()) as {
        valid?: boolean;
        error?: string;
      };

      if (res.ok && data.valid) {
        showToast("Valid API Key", "success");
      } else {
        showToast(data.error ?? "Invalid API Key", "error");
      }
    } catch {
      showToast("Invalid API Key", "error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {toast && (
        <Notification
          message={toast.message}
          variant={toast.variant}
          onDismiss={() => setToast(null)}
        />
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <h2 className="text-base font-semibold tracking-tight text-foreground">
            Validate API key
          </h2>
          <p className="mt-1 text-sm text-muted">
            Paste a key from Overview to confirm it authenticates correctly.
          </p>
        </div>

        <label className="block text-sm">
          <span className="mb-1.5 block font-medium">API key</span>
          <input
            type="password"
            autoComplete="off"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="dandi_…"
            className="h-11 w-full rounded-xl border border-border bg-white px-3 font-mono text-sm outline-none ring-accent placeholder:text-zinc-400 focus:ring-2"
            disabled={submitting}
          />
        </label>

        <button
          type="submit"
          disabled={submitting || !apiKey.trim()}
          className="rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-600 disabled:opacity-50"
        >
          {submitting ? "Validating…" : "Validate key"}
        </button>
      </form>
    </>
  );
}
