"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import StatusBadge, { getVendorStatus } from "@/components/StatusBadge";
import CopyButton from "@/components/CopyButton";
import AddVendorModal from "@/components/AddVendorModal";
import { Vendor, DocType } from "@/lib/types";
import { Search, Users, CheckCircle, AlertTriangle, Mail, Calendar, ChevronRight, Loader2 } from "lucide-react";

export default function DashboardPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "complete" | "partial" | "missing">("all");

  const fetchVendors = useCallback(async () => {
    try {
      const res = await fetch("/api/vendors");
      const data = await res.json();
      setVendors(data);
    } catch (e) {
      console.error("Failed to fetch vendors:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVendors();
  }, [fetchVendors]);

  const filtered = useMemo(() => {
    return vendors.filter((v) => {
      const status = getVendorStatus(v.requiredDocs);
      const matchesFilter = filterStatus === "all" || status === filterStatus;
      const matchesSearch =
        !search ||
        v.name.toLowerCase().includes(search.toLowerCase()) ||
        v.email.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [vendors, search, filterStatus]);

  const stats = useMemo(() => {
    const total = vendors.length;
    const complete = vendors.filter((v) => getVendorStatus(v.requiredDocs) === "complete").length;
    const incomplete = total - complete;
    return { total, complete, incomplete };
  }, [vendors]);

  async function handleAddVendor(data: { name: string; email: string; requiredDocs: DocType[] }) {
    try {
      const res = await fetch("/api/vendors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const newVendor = await res.json();
        setVendors((prev) => [newVendor, ...prev]);
      }
    } catch (e) {
      console.error("Failed to create vendor:", e);
    }
    setModalOpen(false);
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-full bg-background">
        <Header showAddVendor onAddVendor={() => setModalOpen(true)} />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-navy" />
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full bg-background">
      <Header showAddVendor onAddVendor={() => setModalOpen(true)} />

      <main className="flex-1 mx-auto w-full max-w-6xl px-4 sm:px-6 py-8">
        {/* Stats bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="flex items-center gap-4 rounded-xl border border-border bg-white p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-navy/5">
              <Users className="h-5 w-5 text-navy" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              <p className="text-xs text-muted font-medium">Total Vendors</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl border border-border bg-white p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-light">
              <CheckCircle className="h-5 w-5 text-green" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.complete}</p>
              <p className="text-xs text-muted font-medium">Fully Compliant</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl border border-border bg-white p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-amber-light">
              <AlertTriangle className="h-5 w-5 text-amber" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.incomplete}</p>
              <p className="text-xs text-muted font-medium">Need Attention</p>
            </div>
          </div>
        </div>

        {/* Search and filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search vendors..."
              className="w-full rounded-lg border border-border bg-white py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted/60 outline-none ring-navy/20 transition-shadow focus:border-navy focus:ring-2"
            />
          </div>
          <div className="flex gap-1.5 rounded-lg border border-border bg-white p-1">
            {(["all", "complete", "partial", "missing"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium capitalize transition-all ${
                  filterStatus === s
                    ? "bg-navy text-white shadow-sm"
                    : "text-muted hover:text-foreground hover:bg-slate-50"
                }`}
              >
                {s === "all" ? "All" : s === "partial" ? "Incomplete" : s === "missing" ? "Not Started" : "Complete"}
              </button>
            ))}
          </div>
        </div>

        {/* Vendor list */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-white py-16 text-center">
              <Users className="h-10 w-10 text-muted/30 mb-3" />
              <p className="text-sm font-medium text-muted">No vendors found</p>
              <p className="text-xs text-muted/60 mt-1">
                {search ? "Try a different search term" : "Add your first vendor to get started"}
              </p>
            </div>
          ) : (
            filtered.map((vendor) => {
              const status = getVendorStatus(vendor.requiredDocs);
              const uploadedCount = vendor.requiredDocs.filter((d) => d.uploaded).length;
              const totalDocs = vendor.requiredDocs.length;
              const uploadUrl =
                typeof window !== "undefined"
                  ? `${window.location.origin}/upload/${vendor.slug}`
                  : `/upload/${vendor.slug}`;

              return (
                <div
                  key={vendor.id}
                  className="group rounded-xl border border-border bg-white transition-all hover:border-navy/20 hover:shadow-md hover:shadow-navy/5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-5">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1.5">
                        <Link
                          href={`/dashboard/${vendor.id}`}
                          className="text-base font-bold text-foreground hover:text-navy transition-colors truncate"
                        >
                          {vendor.name}
                        </Link>
                        <StatusBadge status={status} />
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
                        <span className="inline-flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {vendor.email}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {vendor.createdAt}
                        </span>
                        <span>
                          {uploadedCount}/{totalDocs} docs uploaded
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <CopyButton text={uploadUrl} label="Copy Link" />
                      <Link
                        href={`/dashboard/${vendor.id}`}
                        className="inline-flex items-center gap-1 rounded-md bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate transition-all hover:bg-navy hover:text-white"
                      >
                        Details
                        <ChevronRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                  <div className="border-t border-border/60 px-5 py-2.5 bg-slate-50/50 rounded-b-xl">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            status === "complete"
                              ? "bg-green"
                              : status === "partial"
                              ? "bg-amber"
                              : "bg-red/40"
                          }`}
                          style={{ width: `${(uploadedCount / totalDocs) * 100}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-medium text-muted whitespace-nowrap">
                        {Math.round((uploadedCount / totalDocs) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>

      <AddVendorModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAddVendor}
      />
    </div>
  );
}
