import Link from "next/link";
import DashboardNav from "@/components/dashboard-nav";
import AuthStatus from "@/components/auth-status";

export default function DashboardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full bg-background text-foreground">
      <aside className="hidden w-64 shrink-0 border-r border-border bg-sidebar px-4 py-6 md:flex md:flex-col">
        <Link href="/" className="mb-8 px-3 text-lg font-bold tracking-tight">
          Dandi
        </Link>
        <DashboardNav />
        <AuthStatus />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">{children}</div>
    </div>
  );
}
