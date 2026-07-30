export default function DashboardPageShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <>
      <header className="flex items-center justify-between border-b border-border bg-card px-6 py-4 md:px-8">
        <div>
          <p className="text-sm text-muted">
            Pages <span className="mx-1 text-zinc-300">/</span> {title}
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight">{title}</h1>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1.5 text-xs font-medium text-foreground shadow-sm">
          <span className="h-2 w-2 rounded-full bg-success" />
          Operational
        </span>
      </header>

      <main className="flex-1 px-6 py-8 md:px-8">
        <section className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
          <p className="max-w-2xl text-sm leading-6 text-muted">{description}</p>
          {children ?? (
            <div className="mt-8 rounded-xl border border-dashed border-border bg-zinc-50 px-6 py-16 text-center">
              <p className="text-sm font-medium text-foreground">
                Coming soon
              </p>
              <p className="mt-2 text-sm text-muted">
                This is a placeholder page for {title}.
              </p>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
