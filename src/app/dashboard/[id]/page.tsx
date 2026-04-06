"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import StatusBadge, { getVendorStatus } from "@/components/StatusBadge";
import CopyButton from "@/components/CopyButton";
import { Vendor } from "@/lib/types";
import {
  ArrowLeft,
  Mail,
  Calendar,
  FileText,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";

export default function VendorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/api/vendors/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => setVendor(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-full bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-navy" />
        </main>
      </div>
    );
  }

  if (error || !vendor) {
    return (
      <div className="flex flex-col min-h-full bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">Vendor Not Found</h1>
            <p className="text-muted mb-6">The vendor you are looking for does not exist.</p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-lg bg-navy px-4 py-2.5 text-sm font-semibold text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const status = getVendorStatus(vendor.requiredDocs);
  const uploadedCount = vendor.requiredDocs.filter((d) => d.uploaded).length;
  const uploadUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/upload/${vendor.slug}`
      : `/upload/${vendor.slug}`;

  return (
    <div className="flex flex-col min-h-full bg-background">
      <Header />

      <main className="flex-1 mx-auto w-full max-w-4xl px-4 sm:px-6 py-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-navy transition-colors mb-6"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Dashboard
        </Link>

        <div className="rounded-2xl border border-border bg-white p-6 sm:p-8 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-foreground">{vendor.name}</h1>
                <StatusBadge status={status} />
              </div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="h-4 w-4" />
                  {vendor.email}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  Added {vendor.createdAt}
                </span>
              </div>
            </div>
            <CopyButton text={uploadUrl} label="Copy Upload Link" className="self-start" />
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-sm font-medium text-slate">Document Progress</span>
              <span className="text-sm font-bold text-foreground">
                {uploadedCount} of {vendor.requiredDocs.length} uploaded
              </span>
            </div>
            <div className="h-2.5 rounded-full bg-slate-200 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  status === "complete"
                    ? "bg-green"
                    : status === "partial"
                    ? "bg-amber"
                    : "bg-red/40"
                }`}
                style={{
                  width: `${(uploadedCount / vendor.requiredDocs.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white overflow-hidden">
          <div className="border-b border-border px-6 py-4">
            <h2 className="text-lg font-bold text-foreground">Required Documents</h2>
          </div>

          <div className="divide-y divide-border">
            {vendor.requiredDocs.map((doc) => (
              <div
                key={doc.type}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      doc.uploaded ? "bg-green-light" : "bg-red-light"
                    }`}
                  >
                    {doc.uploaded ? (
                      <CheckCircle className="h-5 w-5 text-green" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{doc.label}</p>
                    {doc.uploaded ? (
                      <p className="text-xs text-muted">
                        Uploaded {doc.uploadedAt}
                      </p>
                    ) : (
                      <p className="text-xs text-red">Not yet uploaded</p>
                    )}
                  </div>
                </div>

                {doc.uploaded && doc.fileName ? (
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted bg-slate-50 rounded-md px-2.5 py-1.5">
                      <FileText className="h-3 w-3" />
                      {doc.fileName}
                    </span>
                  </div>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-light px-3 py-1 text-xs font-medium text-amber-800">
                    Awaiting upload
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-dashed border-navy/20 bg-navy/[0.02] p-6 text-center">
          <p className="text-sm text-slate mb-3">
            Share this link with <span className="font-semibold">{vendor.name}</span> so they can upload their documents:
          </p>
          <div className="inline-flex items-center gap-2 rounded-lg bg-white border border-border px-4 py-2.5 text-sm font-mono text-navy">
            <span className="truncate max-w-xs sm:max-w-md">{uploadUrl}</span>
          </div>
          <div className="mt-3">
            <CopyButton text={uploadUrl} label="Copy Upload Link" />
          </div>
        </div>
      </main>
    </div>
  );
}
