"use client";

import { FormEvent } from "react";

type CreateKeyModalProps = {
  name: string;
  creating: boolean;
  onNameChange: (value: string) => void;
  onSubmit: (event: FormEvent) => void;
  onClose: () => void;
};

export function CreateKeyModal({
  name,
  creating,
  onNameChange,
  onSubmit,
  onClose,
}: CreateKeyModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/40 p-4 backdrop-blur-[2px]">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-key-title"
        className="w-full max-w-md rounded-2xl border border-border bg-white p-6 shadow-2xl"
      >
        <h3 id="create-key-title" className="text-lg font-bold">
          Create new API key
        </h3>
        <p className="mt-1 text-sm text-muted">
          Give your key a name so you can recognize it later.
        </p>
        <form onSubmit={onSubmit} className="mt-5 space-y-4">
          <label className="block text-sm">
            <span className="mb-1.5 block font-medium">Key name</span>
            <input
              autoFocus
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="e.g. default"
              className="h-11 w-full rounded-xl border border-border bg-white px-3 outline-none ring-accent placeholder:text-zinc-400 focus:ring-2"
              disabled={creating}
            />
          </label>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-muted hover:bg-zinc-100"
              disabled={creating}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={creating || !name.trim()}
              className="rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-600 disabled:opacity-50"
            >
              {creating ? "Creating…" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
