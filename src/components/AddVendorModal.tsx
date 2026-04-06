"use client";

import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { DocType, DOC_LABELS } from "@/lib/types";

interface AddVendorModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; email: string; requiredDocs: DocType[] }) => void;
}

const docOptions: { type: DocType; label: string }[] = [
  { type: "w9", label: DOC_LABELS.w9 },
  { type: "coi", label: DOC_LABELS.coi },
  { type: "license", label: DOC_LABELS.license },
  { type: "other", label: DOC_LABELS.other },
];

export default function AddVendorModal({ open, onClose, onSubmit }: AddVendorModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedDocs, setSelectedDocs] = useState<DocType[]>(["w9", "coi"]);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      nameRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  function toggleDoc(type: DocType) {
    setSelectedDocs((prev) =>
      prev.includes(type) ? prev.filter((d) => d !== type) : [...prev, type]
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || selectedDocs.length === 0) return;
    onSubmit({ name: name.trim(), email: email.trim(), requiredDocs: selectedDocs });
    setName("");
    setEmail("");
    setSelectedDocs(["w9", "coi"]);
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center animate-fade-in">
      <div className="absolute inset-0 bg-navy-dark/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg mx-4 rounded-2xl bg-white p-6 shadow-2xl animate-fade-in-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">Add New Vendor</h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-slate-100 hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="vendor-name" className="block text-sm font-medium text-slate mb-1.5">
              Vendor Name
            </label>
            <input
              ref={nameRef}
              id="vendor-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Apex Electrical Services"
              required
              className="w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted/60 outline-none ring-navy/20 transition-shadow focus:border-navy focus:ring-2"
            />
          </div>
          <div>
            <label htmlFor="vendor-email" className="block text-sm font-medium text-slate mb-1.5">
              Email Address
            </label>
            <input
              id="vendor-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="billing@vendor.com"
              required
              className="w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted/60 outline-none ring-navy/20 transition-shadow focus:border-navy focus:ring-2"
            />
          </div>
          <fieldset>
            <legend className="block text-sm font-medium text-slate mb-2">
              Required Documents
            </legend>
            <div className="grid grid-cols-2 gap-2.5">
              {docOptions.map((opt) => {
                const checked = selectedDocs.includes(opt.type);
                return (
                  <label
                    key={opt.type}
                    className={`flex cursor-pointer items-center gap-2.5 rounded-lg border px-3.5 py-2.5 text-sm transition-all ${
                      checked
                        ? "border-navy bg-navy/5 text-navy font-medium"
                        : "border-border text-slate hover:border-slate-light"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleDoc(opt.type)}
                      className="sr-only"
                    />
                    <span
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                        checked ? "border-navy bg-navy text-white" : "border-border"
                      }`}
                    >
                      {checked && (
                        <svg className="h-2.5 w-2.5" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </span>
                    {opt.label}
                  </label>
                );
              })}
            </div>
          </fieldset>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-slate transition-colors hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name.trim() || !email.trim() || selectedDocs.length === 0}
              className="flex-1 rounded-lg bg-navy px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-navy-light disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              Create Vendor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
