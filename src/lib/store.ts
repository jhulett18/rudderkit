import { Vendor, DocType, DOC_LABELS } from "./types";
import { mockVendors, BUSINESS_NAME } from "./mock-data";

// In-memory store (resets on cold start, but fine for MVP demo)
let vendors: Vendor[] = [...mockVendors];
const uploadedFiles: Map<string, Map<string, { fileName: string; data: Buffer }>> = new Map();

export function getVendors(): Vendor[] {
  return vendors;
}

export function getVendorById(id: string): Vendor | undefined {
  return vendors.find((v) => v.id === id);
}

export function getVendorBySlug(slug: string): Vendor | undefined {
  return vendors.find((v) => v.slug === slug);
}

export function createVendor(data: {
  name: string;
  email: string;
  requiredDocs: DocType[];
}): Vendor {
  const id = String(Date.now());
  const slug =
    data.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") +
    "-" +
    Math.random().toString(36).slice(2, 8);
  const vendor: Vendor = {
    id,
    name: data.name,
    email: data.email,
    slug,
    requiredDocs: data.requiredDocs.map((type) => ({
      type,
      label: DOC_LABELS[type],
      uploaded: false,
    })),
    createdAt: new Date().toISOString().slice(0, 10),
  };
  vendors = [vendor, ...vendors];
  return vendor;
}

export function uploadDocument(
  slug: string,
  docType: string,
  fileName: string,
  fileData: Buffer
): boolean {
  const vendor = getVendorBySlug(slug);
  if (!vendor) return false;

  const doc = vendor.requiredDocs.find((d) => d.type === docType);
  if (!doc) return false;

  doc.uploaded = true;
  doc.fileName = fileName;
  doc.uploadedAt = new Date().toISOString().slice(0, 10);

  // Store file data in memory
  if (!uploadedFiles.has(slug)) {
    uploadedFiles.set(slug, new Map());
  }
  uploadedFiles.get(slug)!.set(docType, { fileName, data: fileData });

  return true;
}

export function getFile(slug: string, docType: string): { fileName: string; data: Buffer } | null {
  return uploadedFiles.get(slug)?.get(docType) ?? null;
}

export { BUSINESS_NAME };
