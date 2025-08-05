import { NextRequest, NextResponse } from "next/server";
import sql from "@/app/lib/data";

export async function POST(req: NextRequest) {
  const data = await req.json();

  const {
    title,
    publicID,
    capture_date,
    scope,
    camera,
    filters,
    stacking,
    type,
  } = data;

  try {
    await sql`
                        INSERT INTO pictures (title, "publicID", capture_date, scope, camera, filters, stacking, type)
                        VALUES (
                                ${title},
                                ${publicID},
                                ${capture_date},
                                ${scope},
                                ${camera},
                                ${filters ? sql.json(filters) : null},
                                ${stacking},
                                ${type}
                        )
                `;
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Database insert failed" },
      { status: 500 },
    );
  }
}
