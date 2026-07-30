import type { Metadata } from "next";
import DashboardPageShell from "@/components/dashboard-page-shell";

export const metadata: Metadata = {
  title: "Research Assistant | Dandi",
};

export default function ResearchAssistantPage() {
  return (
    <DashboardPageShell
      title="Research Assistant"
      description="Ask questions, explore sources, and draft research answers with the assistant. This page is a placeholder for future chat and workflow tools."
    />
  );
}
