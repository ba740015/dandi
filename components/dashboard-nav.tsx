"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboards", label: "Overview", icon: "overview", exact: true },
  {
    href: "/dashboards/research-assistant",
    label: "Research Assistant",
    icon: "assistant",
  },
  {
    href: "/dashboards/research-reports",
    label: "Research Reports",
    icon: "reports",
  },
  {
    href: "/dashboards/api-playground",
    label: "API Playground",
    icon: "playground",
  },
  { href: "/dashboards/invoices", label: "Invoices", icon: "invoices" },
  {
    href: "/dashboards/documentation",
    label: "Documentation",
    icon: "docs",
  },
] as const;

function NavIcon({ name }: { name: string }) {
  const common = {
    className: "h-4 w-4",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    viewBox: "0 0 24 24",
    "aria-hidden": true,
  };

  switch (name) {
    case "overview":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
      );
    case "assistant":
      return (
        <svg {...common}>
          <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
          <path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14z" />
        </svg>
      );
    case "reports":
      return (
        <svg {...common}>
          <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
          <path d="M14 3v6h6" />
          <path d="M8 13h8M8 17h5" />
        </svg>
      );
    case "playground":
      return (
        <svg {...common}>
          <path d="M8 4l-4 8h6l-2 8 10-12h-6l2-4z" />
        </svg>
      );
    case "invoices":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 10h18" />
          <path d="M7 15h4" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M4 19.5V6.5A2.5 2.5 0 0 1 6.5 4H20v16H6.5A2.5 2.5 0 0 0 4 19.5z" />
          <path d="M8 8h8M8 12h6" />
        </svg>
      );
  }
}

export default function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-1 flex-col gap-1">
      {navItems.map((item) => {
        const active =
          "exact" in item && item.exact
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={[
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-accent-soft text-accent"
                : "text-muted hover:bg-zinc-50 hover:text-foreground",
            ].join(" ")}
          >
            <NavIcon name={item.icon} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
