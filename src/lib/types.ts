export type DocType = "w9" | "coi" | "license" | "other";

export interface DocRequirement {
  type: DocType;
  label: string;
  uploaded: boolean;
  fileName?: string;
  uploadedAt?: string;
}

export interface Vendor {
  id: string;
  name: string;
  email: string;
  slug: string;
  requiredDocs: DocRequirement[];
  createdAt: string;
}

export const DOC_LABELS: Record<DocType, string> = {
  w9: "W-9",
  coi: "Certificate of Insurance",
  license: "Business License",
  other: "Other",
};
