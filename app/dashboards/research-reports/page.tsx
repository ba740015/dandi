import type { Metadata } from "next";
import DashboardPageShell from "@/components/dashboard-page-shell";

export const metadata: Metadata = {
  title: "Research Reports | Dandi",
};

export default function ResearchReportsPage() {
  return (
    <DashboardPageShell
      title="Research Reports"
      description="Browse saved research reports, summaries, and exports. Report history and sharing options will live here."
    />
  );
}
