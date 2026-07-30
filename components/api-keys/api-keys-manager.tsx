"use client";

import { ApiKeysTable } from "./api-keys-table";
import { CreateKeyModal } from "./create-key-modal";
import { PlusIcon } from "./icons";
import { SuccessToast } from "./success-toast";
import { useApiKeys } from "./use-api-keys";

export default function ApiKeysManager() {
  const {
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
    dismissToast,
    openCreateModal,
    closeCreateModal,
    startRename,
    cancelRename,
    createKey,
    renameKey,
    deleteKey,
    toggleViewKey,
    copyKey,
  } = useApiKeys();

  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
      {toastMessage && (
        <SuccessToast message={toastMessage} onDismiss={dismissToast} />
      )}

      <div className="mb-2 flex items-center gap-3">
        <h2 className="text-xl font-bold tracking-tight">API Keys</h2>
        <button
          type="button"
          onClick={openCreateModal}
          aria-label="Create API key"
          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-600"
        >
          <PlusIcon />
        </button>
      </div>

      <p className="mb-6 max-w-3xl text-sm text-muted">
        The key is used to authenticate your requests. To learn more, see the{" "}
        <a
          href="https://nextjs.org/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-accent hover:underline"
        >
          documentation
        </a>{" "}
        page.
      </p>

      {error && (
        <p className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <ApiKeysTable
        keys={keys}
        loading={loading}
        busyKeyId={busyKeyId}
        editingId={editingId}
        editName={editName}
        viewingId={viewingId}
        revealedKeys={revealedKeys}
        copiedId={copiedId}
        onEditNameChange={setEditName}
        onSaveRename={(id) => void renameKey(id)}
        onCancelRename={cancelRename}
        onStartRename={startRename}
        onToggleView={(id) => void toggleViewKey(id)}
        onCopy={(id) => void copyKey(id)}
        onDelete={(id, name) => void deleteKey(id, name)}
      />

      {showCreateModal && (
        <CreateKeyModal
          name={createName}
          creating={creating}
          onNameChange={setCreateName}
          onSubmit={(event) => void createKey(event)}
          onClose={closeCreateModal}
        />
      )}
    </section>
  );
}
