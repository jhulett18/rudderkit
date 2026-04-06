"use client";

import { use, useState, useEffect } from "react";
import { Vendor } from "@/lib/types";
import { Anchor, CheckCircle, Upload, Loader2 } from "lucide-react";
import FileUploadZone from "@/components/FileUploadZone";

export default function VendorUploadPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [businessName, setBusinessName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [files, setFiles] = useState<Record<string, File | null>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`/api/upload/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        setVendor(data.vendor);
        setBusinessName(data.businessName);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-full items-center justify-center bg-background p-4">
        <Loader2 className="h-8 w-8 animate-spin text-navy" />
      </div>
    );
  }

  if (error || !vendor) {
    return (
      <div className="flex min-h-full items-center justify-center bg-background p-4">
        <div className="text-center max-w-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-light mx-auto mb-4">
            <span className="text-2xl">!</span>
          </div>
          <h1 className="text-xl font-bold text-foreground mb-2">Invalid Upload Link</h1>
          <p className="text-sm text-muted">
            This upload link is not valid or has expired. Please contact the business that sent you this link.
          </p>
        </div>
      </div>
    );
  }

  const missingDocs = vendor.requiredDocs.filter((d) => !d.uploaded);
  const alreadyUploaded = vendor.requiredDocs.filter((d) => d.uploaded);

  function handleFileSelect(docType: string, file: File) {
    setFiles((prev) => ({ ...prev, [docType]: file }));
  }

  function handleFileRemove(docType: string) {
    setFiles((prev) => {
      const next = { ...prev };
      delete next[docType];
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const selectedFiles = Object.entries(files).filter(([, f]) => f != null);
    if (selectedFiles.length === 0) return;

    setSubmitting(true);
    try {
      const formData = new FormData();
      for (const [docType, file] of selectedFiles) {
        if (file) formData.append(docType, file);
      }
      const res = await fetch(`/api/upload/${slug}`, {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } catch (e) {
      console.error("Upload failed:", e);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex min-h-full flex-col bg-background">
        <header className="border-b border-border bg-white">
          <div className="mx-auto flex h-14 max-w-2xl items-center px-4 sm:px-6">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy text-white">
                <Anchor className="h-4 w-4" />
              </div>
              <span className="text-sm font-bold text-navy">RudderKit</span>
            </div>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-4">
          <div className="text-center max-w-md animate-fade-in-up" style={{ animationFillMode: "forwards" }}>
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-light mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-3">Documents Submitted</h1>
            <p className="text-base text-muted mb-2">
              Thank you! Your documents have been uploaded successfully.
            </p>
            <p className="text-sm text-muted">
              <span className="font-semibold text-foreground">{businessName}</span> will
              review them shortly. You can close this page.
            </p>
          </div>
        </main>
      </div>
    );
  }

  const selectedCount = Object.values(files).filter(Boolean).length;

  return (
    <div className="flex min-h-full flex-col bg-background">
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex h-14 max-w-2xl items-center px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy text-white">
              <Anchor className="h-4 w-4" />
            </div>
            <span className="text-sm font-bold text-navy">RudderKit</span>
          </div>
        </div>
      </header>

      <main className="flex-1 mx-auto w-full max-w-2xl px-4 sm:px-6 py-8 sm:py-12">
        <div className="mb-8">
          <p className="text-sm font-medium text-muted mb-1">Upload documents for</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{businessName}</h1>
          <p className="mt-2 text-sm text-muted">
            Please upload the requested documents below. Accepted formats: PDF, JPG, PNG (max 10MB each).
          </p>
        </div>

        {alreadyUploaded.length > 0 && (
          <div className="mb-8 rounded-xl border border-green/30 bg-green-light/30 p-4">
            <p className="text-sm font-semibold text-green-800 mb-2">Already received:</p>
            <ul className="space-y-1">
              {alreadyUploaded.map((doc) => (
                <li key={doc.type} className="flex items-center gap-2 text-sm text-green-800">
                  <CheckCircle className="h-3.5 w-3.5" />
                  {doc.label}
                </li>
              ))}
            </ul>
          </div>
        )}

        {missingDocs.length === 0 ? (
          <div className="rounded-2xl border border-green/30 bg-green-light/30 p-8 text-center">
            <CheckCircle className="h-12 w-12 text-green mx-auto mb-4" />
            <h2 className="text-lg font-bold text-foreground mb-2">All Documents Received</h2>
            <p className="text-sm text-muted">
              All required documents have been uploaded. Thank you!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="rounded-2xl border border-border bg-white p-6 space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <Upload className="h-5 w-5 text-navy" />
                <h2 className="text-lg font-bold text-foreground">
                  Documents Needed ({missingDocs.length})
                </h2>
              </div>

              {missingDocs.map((doc) => (
                <FileUploadZone
                  key={doc.type}
                  label={doc.label}
                  docType={doc.type}
                  selectedFile={files[doc.type] ?? null}
                  onFileSelect={(file) => handleFileSelect(doc.type, file)}
                  onRemove={() => handleFileRemove(doc.type)}
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={selectedCount === 0 || submitting}
              className="w-full rounded-xl bg-navy py-3.5 text-base font-semibold text-white shadow-lg shadow-navy/20 transition-all hover:bg-navy-light hover:shadow-xl disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none active:scale-[0.99]"
            >
              {submitting ? (
                <span className="inline-flex items-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Uploading...
                </span>
              ) : (
                `Submit ${selectedCount} Document${selectedCount !== 1 ? "s" : ""}`
              )}
            </button>
          </form>
        )}

        <div className="mt-12 pt-6 border-t border-border text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs text-muted">
            <Anchor className="h-3 w-3 text-navy" />
            <span>Powered by <span className="font-semibold text-navy">RudderKit</span></span>
          </div>
          <p className="mt-1 text-[11px] text-muted/60">
            Your documents are transmitted securely and only shared with {businessName}.
          </p>
        </div>
      </main>
    </div>
  );
}
