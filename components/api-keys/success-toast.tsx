import { CloseIcon, ToastCheckIcon } from "./icons";

export function SuccessToast({
  message,
  onDismiss,
}: {
  message: string;
  onDismiss: () => void;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed left-1/2 top-6 z-[60] flex w-[min(92vw,420px)] -translate-x-1/2 items-center gap-3 rounded-lg bg-[#1f7a4d] px-4 py-3 text-[#0f172a] shadow-[0_10px_30px_rgba(15,23,42,0.18)]"
    >
      <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0f172a] text-white">
        <ToastCheckIcon />
      </span>
      <p className="flex-1 text-sm font-semibold tracking-tight">{message}</p>
      <button
        type="button"
        aria-label="Dismiss"
        onClick={onDismiss}
        className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[#0f172a]/80 transition hover:bg-black/10 hover:text-[#0f172a]"
      >
        <CloseIcon />
      </button>
    </div>
  );
}
