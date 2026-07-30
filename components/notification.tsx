"use client";

type NotificationVariant = "success" | "error";

export function Notification({
  message,
  variant = "success",
  onDismiss,
}: {
  message: string;
  variant?: NotificationVariant;
  onDismiss: () => void;
}) {
  const isSuccess = variant === "success";

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed left-1/2 top-6 z-[60] flex w-[min(92vw,420px)] -translate-x-1/2 items-center gap-3 rounded-lg px-4 py-3 shadow-[0_10px_30px_rgba(15,23,42,0.18)] ${
        isSuccess
          ? "bg-[#1f7a4d] text-[#0f172a]"
          : "bg-[#b91c1c] text-white"
      }`}
    >
      <span
        className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
          isSuccess ? "bg-[#0f172a] text-white" : "bg-white text-[#b91c1c]"
        }`}
      >
        {isSuccess ? <CheckIcon /> : <AlertIcon />}
      </span>
      <p className="flex-1 text-sm font-semibold tracking-tight">{message}</p>
      <button
        type="button"
        aria-label="Dismiss"
        onClick={onDismiss}
        className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition ${
          isSuccess
            ? "text-[#0f172a]/80 hover:bg-black/10 hover:text-[#0f172a]"
            : "text-white/80 hover:bg-white/10 hover:text-white"
        }`}
      >
        <CloseIcon />
      </button>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 8v5" />
      <path d="M12 16h.01" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
