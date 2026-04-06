import { Vendor } from "./types";

export const BUSINESS_NAME = "Coastline Construction LLC";

export const mockVendors: Vendor[] = [
  {
    id: "1",
    name: "Apex Electrical Services",
    email: "billing@apexelectric.com",
    slug: "apex-electrical-abc123",
    requiredDocs: [
      { type: "w9", label: "W-9", uploaded: true, fileName: "apex_w9_2026.pdf", uploadedAt: "2026-03-28" },
      { type: "coi", label: "Certificate of Insurance", uploaded: true, fileName: "apex_coi.pdf", uploadedAt: "2026-03-28" },
      { type: "license", label: "Business License", uploaded: true, fileName: "apex_license.pdf", uploadedAt: "2026-03-29" },
    ],
    createdAt: "2026-03-25",
  },
  {
    id: "2",
    name: "Summit Plumbing Co.",
    email: "admin@summitplumbing.com",
    slug: "summit-plumbing-def456",
    requiredDocs: [
      { type: "w9", label: "W-9", uploaded: true, fileName: "summit_w9.pdf", uploadedAt: "2026-04-01" },
      { type: "coi", label: "Certificate of Insurance", uploaded: false },
      { type: "license", label: "Business License", uploaded: false },
    ],
    createdAt: "2026-03-30",
  },
  {
    id: "3",
    name: "TrueNorth HVAC",
    email: "docs@truenorthhvac.com",
    slug: "truenorth-hvac-ghi789",
    requiredDocs: [
      { type: "w9", label: "W-9", uploaded: false },
      { type: "coi", label: "Certificate of Insurance", uploaded: false },
    ],
    createdAt: "2026-04-02",
  },
  {
    id: "4",
    name: "Redline Concrete & Masonry",
    email: "office@redlineconcrete.com",
    slug: "redline-concrete-jkl012",
    requiredDocs: [
      { type: "w9", label: "W-9", uploaded: true, fileName: "redline_w9.pdf", uploadedAt: "2026-04-03" },
      { type: "coi", label: "Certificate of Insurance", uploaded: true, fileName: "redline_coi_2026.pdf", uploadedAt: "2026-04-04" },
      { type: "license", label: "Business License", uploaded: false },
      { type: "other", label: "Other", uploaded: false },
    ],
    createdAt: "2026-04-01",
  },
  {
    id: "5",
    name: "Ironclad Roofing",
    email: "invoices@ironcladroofing.net",
    slug: "ironclad-roofing-mno345",
    requiredDocs: [
      { type: "w9", label: "W-9", uploaded: true, fileName: "ironclad_w9_signed.pdf", uploadedAt: "2026-04-05" },
      { type: "coi", label: "Certificate of Insurance", uploaded: true, fileName: "ironclad_insurance_cert.pdf", uploadedAt: "2026-04-05" },
      { type: "license", label: "Business License", uploaded: true, fileName: "ironclad_state_license.pdf", uploadedAt: "2026-04-05" },
    ],
    createdAt: "2026-04-04",
  },
];
