"use client";

import Link from "next/link";
import { Anchor } from "lucide-react";

interface HeaderProps {
  showAddVendor?: boolean;
  onAddVendor?: () => void;
}

export default function Header({ showAddVendor, onAddVendor }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy text-white transition-transform group-hover:scale-105">
            <Anchor className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-navy">
            RudderKit
          </span>
        </Link>
        {showAddVendor && (
          <button
            onClick={onAddVendor}
            className="inline-flex items-center gap-2 rounded-lg bg-navy px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-navy-light hover:shadow-md active:scale-[0.98]"
          >
            + Add Vendor
          </button>
        )}
      </div>
    </header>
  );
}
