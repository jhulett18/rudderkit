import { NextResponse } from "next/server";
import { getVendors, createVendor } from "@/lib/store";
import { DocType } from "@/lib/types";

export async function GET() {
  return NextResponse.json(getVendors());
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, requiredDocs } = body as {
    name: string;
    email: string;
    requiredDocs: DocType[];
  };

  if (!name || !email || !requiredDocs?.length) {
    return NextResponse.json(
      { error: "Name, email, and at least one document type are required" },
      { status: 400 }
    );
  }

  const vendor = createVendor({ name, email, requiredDocs });
  return NextResponse.json(vendor, { status: 201 });
}
