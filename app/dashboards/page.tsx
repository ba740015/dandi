import type { Metadata } from "next";
import ApiKeysManager from "@/components/api-keys-manager";

export const metadata: Metadata = {
  title: "Overview | Dandi",
  description: "Manage your Dandi plan and API keys.",
};

export default function DashboardsPage() {
  return (
    <>
      <header className="flex items-center justify-between border-b border-border bg-card px-6 py-4 md:px-8">
        <div>
          <p className="text-sm text-muted">
            Pages <span className="mx-1 text-zinc-300">/</span> Overview
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight">Overview</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1.5 text-xs font-medium text-foreground shadow-sm">
            <span className="h-2 w-2 rounded-full bg-success" />
            Operational
          </span>
          <div className="hidden items-center gap-1 sm:flex">
            <HeaderIcon label="GitHub">
              <path d="M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.3 6.9 9.6.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.4-3.4-1.4-.4-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.7-1.4-2.2-.3-4.6-1.2-4.6-5.1 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.3 9.3 0 0 1 5 0c2-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.3 4.8-4.6 5.1.4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5 4-1.3 6.9-5.1 6.9-9.6C22 6.6 17.5 2 12 2z" />
            </HeaderIcon>
            <HeaderIcon label="X">
              <path d="M4 4l6.5 8.2L4.3 20H6l5.2-6.2L16.5 20H20l-6.7-8.5L19.6 4H18l-4.9 5.8L7.5 4H4z" />
            </HeaderIcon>
            <HeaderIcon label="Email">
              <path d="M4 6h16v12H4z" />
              <path d="M4 7l8 6 8-6" fill="none" stroke="currentColor" strokeWidth="1.6" />
            </HeaderIcon>
          </div>
        </div>
      </header>

      <main className="flex-1 space-y-6 px-6 py-8 md:px-8">
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#4f46e5] via-[#a855f7] to-[#fb923c] p-6 text-white shadow-lg shadow-indigo-200/40 md:p-8">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute bottom-0 left-1/3 h-32 w-32 rounded-full bg-fuchsia-300/20 blur-2xl" />

          <div className="relative flex flex-col gap-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] backdrop-blur">
                  Current Plan
                </span>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                  Researcher
                </h2>
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur transition hover:bg-white/25"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <path d="M2 10h20" />
                </svg>
                Manage Plan
              </button>
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-white/90">
                API Limit
                <span
                  className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-white/40 text-[10px]"
                  title="Monthly request allowance"
                >
                  i
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-black/20">
                <div className="h-full w-[2.4%] rounded-full bg-zinc-900/80" />
              </div>
              <p className="mt-2 text-sm text-white/85">24 / 1,000 Requests</p>
            </div>
          </div>
        </section>

        <ApiKeysManager />
      </main>
    </>
  );
}

function HeaderIcon({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted transition hover:bg-zinc-100 hover:text-foreground"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
        {children}
      </svg>
    </button>
  );
}
