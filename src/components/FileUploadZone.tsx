"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, FileText, X } from "lucide-react";

interface FileUploadZoneProps {
  label: string;
  docType: string;
  onFileSelect: (file: File) => void;
  selectedFile?: File | null;
  onRemove?: () => void;
}

export default function FileUploadZone({
  label,
  docType,
  onFileSelect,
  selectedFile,
  onRemove,
}: FileUploadZoneProps) {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) onFileSelect(file);
    },
    [onFileSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOver(false);
  }, []);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-foreground">
        {label}
      </label>
      {selectedFile ? (
        <div className="flex items-center justify-between rounded-xl border border-green bg-green-light/50 px-4 py-3">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-green" />
            <div>
              <p className="text-sm font-medium text-foreground">{selectedFile.name}</p>
              <p className="text-xs text-muted">
                {(selectedFile.size / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>
          {onRemove && (
            <button
              onClick={onRemove}
              className="flex h-7 w-7 items-center justify-center rounded-md text-muted hover:bg-red-light hover:text-red transition-colors"
              aria-label="Remove file"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      ) : (
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") inputRef.current?.click(); }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed px-4 py-8 text-center transition-all ${
            dragOver
              ? "border-navy bg-navy/5"
              : "border-border hover:border-navy/40 hover:bg-slate-50"
          }`}
        >
          <Upload className={`h-8 w-8 ${dragOver ? "text-navy" : "text-muted/50"}`} />
          <p className="text-sm text-muted">
            <span className="font-medium text-navy">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-muted/60">PDF, JPG, or PNG up to 10MB</p>
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            className="sr-only"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onFileSelect(file);
            }}
            aria-label={`Upload ${docType}`}
          />
        </div>
      )}
    </div>
  );
}
