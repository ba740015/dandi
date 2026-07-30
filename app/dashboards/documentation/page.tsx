import type { Metadata } from "next";
import DashboardPageShell from "@/components/dashboard-page-shell";

export const metadata: Metadata = {
  title: "Documentation | Dandi",
};

const docs = [
  {
    title: "Authentication",
    body: "Pass your API key in the Authorization header as a Bearer token.",
  },
  {
    title: "Rate limits",
    body: "The Researcher plan includes 1,000 requests per month.",
  },
  {
    title: "Error codes",
    body: "Common responses include 401 for invalid keys and 429 for rate limits.",
  },
];

export default function DocumentationPage() {
  return (
    <DashboardPageShell
      title="Documentation"
      description="Quick-start notes for integrating with the Dandi Research API. Full docs will expand here."
    >
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {docs.map((doc) => (
          <article
            key={doc.title}
            className="rounded-xl border border-border bg-zinc-50 p-5"
          >
            <h2 className="font-semibold text-foreground">{doc.title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{doc.body}</p>
          </article>
        ))}
      </div>
    </DashboardPageShell>
  );
}
