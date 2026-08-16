import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { vehicleTrims } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const modelId = request.nextUrl.searchParams.get("modelId");
    const year = request.nextUrl.searchParams.get("year");
    if (!modelId) return NextResponse.json({ trims: [] });

    const conditions = [eq(vehicleTrims.modelId, parseInt(modelId))];
    if (year) conditions.push(eq(vehicleTrims.year, parseInt(year)));

    const trims = await db
      .select({ id: vehicleTrims.id, year: vehicleTrims.year, name: vehicleTrims.name })
      .from(vehicleTrims)
      .where(and(...conditions))
      .orderBy(vehicleTrims.name);

    return NextResponse.json({ trims });
  } catch {
    return NextResponse.json({ trims: [] });
  }
}
