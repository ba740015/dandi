import Link from "next/link";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-gradient-to-br from-[#eef2ff] via-white to-[#fff7ed] px-6 py-20 font-sans">
      <main className="w-full max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
          Dandi
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          Manage your research API keys
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-muted">
          Create, view, copy, and revoke keys from a clean overview dashboard.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {session?.user ? (
            <Link
              href="/dashboards"
              className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-600"
            >
              Open Dashboard
            </Link>
          ) : (
            <Link
              href="/login"
              className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-600"
            >
              Sign in with Google
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}
