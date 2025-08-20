import { fetchImages } from "@/app/lib/data";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  try {
    const data = await fetchImages();
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Database select failed" },
      { status: 500 },
    );
  }
}
