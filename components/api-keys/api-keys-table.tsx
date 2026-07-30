"use client";

import type { ApiKey } from "@/lib/api-keys";
import { maskKey } from "./api-client";
import { IconButton } from "./icon-button";
import {
  CheckIcon,
  CopyIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
} from "./icons";

type ApiKeysTableProps = {
  keys: ApiKey[];
  loading: boolean;
  busyKeyId: string | null;
  editingId: string | null;
  editName: string;
  viewingId: string | null;
  revealedKeys: Record<string, string>;
  copiedId: string | null;
  onEditNameChange: (value: string) => void;
  onSaveRename: (id: string) => void;
  onCancelRename: () => void;
  onStartRename: (key: ApiKey) => void;
  onToggleView: (id: string) => void;
  onCopy: (id: string) => void;
  onDelete: (id: string, name: string) => void;
};

export function ApiKeysTable({
  keys,
  loading,
  busyKeyId,
  editingId,
  editName,
  viewingId,
  revealedKeys,
  copiedId,
  onEditNameChange,
  onSaveRename,
  onCancelRename,
  onStartRename,
  onToggleView,
  onCopy,
  onDelete,
}: ApiKeysTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
            <th className="pb-3 pr-4 font-semibold">Name</th>
            <th className="pb-3 pr-4 font-semibold">Usage</th>
            <th className="pb-3 pr-4 font-semibold">Key</th>
            <th className="pb-3 text-right font-semibold">Options</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={4} className="py-10 text-center text-muted">
                Loading API keys…
              </td>
            </tr>
          ) : keys.length === 0 ? (
            <tr>
              <td colSpan={4} className="py-10 text-center text-muted">
                No API keys yet. Click + to create one.
              </td>
            </tr>
          ) : (
            keys.map((key) => (
              <ApiKeyRow
                key={key.id}
                apiKey={key}
                isBusy={busyKeyId === key.id}
                isEditing={editingId === key.id}
                editName={editName}
                isRevealed={viewingId === key.id && !!revealedKeys[key.id]}
                displayedKey={
                  viewingId === key.id && revealedKeys[key.id]
                    ? revealedKeys[key.id]
                    : maskKey(key.prefix)
                }
                isCopied={copiedId === key.id}
                onEditNameChange={onEditNameChange}
                onSaveRename={() => onSaveRename(key.id)}
                onCancelRename={onCancelRename}
                onStartRename={() => onStartRename(key)}
                onToggleView={() => onToggleView(key.id)}
                onCopy={() => onCopy(key.id)}
                onDelete={() => onDelete(key.id, key.name)}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

function ApiKeyRow({
  apiKey,
  isBusy,
  isEditing,
  editName,
  isRevealed,
  displayedKey,
  isCopied,
  onEditNameChange,
  onSaveRename,
  onCancelRename,
  onStartRename,
  onToggleView,
  onCopy,
  onDelete,
}: {
  apiKey: ApiKey;
  isBusy: boolean;
  isEditing: boolean;
  editName: string;
  isRevealed: boolean;
  displayedKey: string;
  isCopied: boolean;
  onEditNameChange: (value: string) => void;
  onSaveRename: () => void;
  onCancelRename: () => void;
  onStartRename: () => void;
  onToggleView: () => void;
  onCopy: () => void;
  onDelete: () => void;
}) {
  return (
    <tr className="border-b border-border/70 last:border-0">
      <td className="py-4 pr-4 align-middle">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <input
              value={editName}
              onChange={(e) => onEditNameChange(e.target.value)}
              className="h-9 w-40 rounded-lg border border-border bg-white px-2 outline-none ring-accent focus:ring-2"
              disabled={isBusy}
            />
            <button
              type="button"
              onClick={onSaveRename}
              disabled={isBusy || !editName.trim()}
              className="rounded-lg bg-accent px-2.5 py-1.5 text-xs font-medium text-white disabled:opacity-50"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onCancelRename}
              className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-muted hover:bg-zinc-100"
            >
              Cancel
            </button>
          </div>
        ) : (
          <span className="font-medium text-foreground">{apiKey.name}</span>
        )}
      </td>
      <td className="py-4 pr-4 align-middle text-muted">0</td>
      <td className="py-4 pr-4 align-middle">
        <code className="inline-flex max-w-full break-all rounded-full bg-zinc-100 px-3 py-1.5 font-mono text-xs text-zinc-700">
          {displayedKey}
        </code>
      </td>
      <td className="py-4 align-middle">
        <div className="flex items-center justify-end gap-0.5">
          <IconButton
            label={isRevealed ? "Hide API key" : "View API key"}
            disabled={isBusy}
            onClick={onToggleView}
          >
            <EyeIcon open={isRevealed} />
          </IconButton>
          <IconButton
            label={isCopied ? "Copied" : "Copy API key"}
            disabled={isBusy}
            onClick={onCopy}
          >
            {isCopied ? <CheckIcon /> : <CopyIcon />}
          </IconButton>
          <IconButton
            label="Edit name"
            disabled={isBusy}
            onClick={onStartRename}
          >
            <PencilIcon />
          </IconButton>
          <IconButton
            label="Delete API key"
            danger
            disabled={isBusy}
            onClick={onDelete}
          >
            <TrashIcon />
          </IconButton>
        </div>
      </td>
    </tr>
  );
}
