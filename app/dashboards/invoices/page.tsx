import type { Metadata } from "next";
import DashboardPageShell from "@/components/dashboard-page-shell";

export const metadata: Metadata = {
  title: "Invoices | Dandi",
};

const invoices = [
  { id: "INV-1003", date: "Jul 1, 2026", amount: "$49.00", status: "Paid" },
  { id: "INV-1002", date: "Jun 1, 2026", amount: "$49.00", status: "Paid" },
  { id: "INV-1001", date: "May 1, 2026", amount: "$49.00", status: "Paid" },
];

export default function InvoicesPage() {
  return (
    <DashboardPageShell
      title="Invoices"
      description="Review billing history for your Researcher plan. These are sample invoices for demonstration."
    >
      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
              <th className="pb-3 pr-4">Invoice</th>
              <th className="pb-3 pr-4">Date</th>
              <th className="pb-3 pr-4">Amount</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="border-b border-border/70 last:border-0">
                <td className="py-4 pr-4 font-medium">{invoice.id}</td>
                <td className="py-4 pr-4 text-muted">{invoice.date}</td>
                <td className="py-4 pr-4 text-muted">{invoice.amount}</td>
                <td className="py-4">
                  <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                    {invoice.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardPageShell>
  );
}
