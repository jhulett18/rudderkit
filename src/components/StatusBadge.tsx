"use client";

import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

type Status = "complete" | "partial" | "missing";

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

const config: Record<Status, { label: string; bg: string; text: string; icon: typeof CheckCircle }> = {
  complete: {
    label: "Complete",
    bg: "bg-green-light",
    text: "text-green-800",
    icon: CheckCircle,
  },
  partial: {
    label: "Incomplete",
    bg: "bg-amber-light",
    text: "text-amber-800",
    icon: AlertTriangle,
  },
  missing: {
    label: "Not Started",
    bg: "bg-red-light",
    text: "text-red-800",
    icon: XCircle,
  },
};

export function getVendorStatus(docs: { uploaded: boolean }[]): Status {
  const uploaded = docs.filter((d) => d.uploaded).length;
  if (uploaded === docs.length) return "complete";
  if (uploaded > 0) return "partial";
  return "missing";
}

export default function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const c = config[status];
  const Icon = c.icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${c.bg} ${c.text} ${className}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {c.label}
    </span>
  );
}
