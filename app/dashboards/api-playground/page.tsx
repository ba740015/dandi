import type { Metadata } from "next";
import ApiPlaygroundForm from "@/components/api-playground-form";
import DashboardPageShell from "@/components/dashboard-page-shell";

export const metadata: Metadata = {
  title: "API Playground | Dandi",
};

export default function ApiPlaygroundPage() {
  return (
    <DashboardPageShell
      title="API Playground"
      description="Submit an API key to verify it against your stored keys, then use it for sample Research API requests."
    >
      <ApiPlaygroundForm />

      <div className="mt-8 rounded-xl border border-border bg-zinc-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
          Sample request
        </p>
        <pre className="mt-3 overflow-x-auto font-mono text-xs leading-6 text-foreground">
{`POST /v1/research
Authorization: Bearer dandi_••••••••
Content-Type: application/json

{
  "query": "Summarize recent advances in retrieval-augmented generation"
}`}
        </pre>
      </div>
    </DashboardPageShell>
  );
}
