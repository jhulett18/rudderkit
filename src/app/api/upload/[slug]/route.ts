import { NextResponse } from "next/server";
import { getVendorBySlug, uploadDocument, BUSINESS_NAME } from "@/lib/store";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const vendor = getVendorBySlug(slug);
  if (!vendor) {
    return NextResponse.json({ error: "Invalid upload link" }, { status: 404 });
  }
  return NextResponse.json({
    vendor,
    businessName: BUSINESS_NAME,
  });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const formData = await request.formData();

  const results: { docType: string; success: boolean }[] = [];

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

  for (const [key, value] of formData.entries()) {
    if (value instanceof File && value.size > 0) {
      if (value.size > MAX_FILE_SIZE) {
        results.push({ docType: key, success: false });
        continue;
      }
      const buffer = Buffer.from(await value.arrayBuffer());
      const success = uploadDocument(slug, key, value.name, buffer);
      results.push({ docType: key, success });
    }
  }

  if (results.length === 0) {
    return NextResponse.json(
      { error: "No files were uploaded" },
      { status: 400 }
    );
  }

  return NextResponse.json({ success: true, results });
}
