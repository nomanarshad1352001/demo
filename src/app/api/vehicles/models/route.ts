import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { vehicleModels, vehicleTrims } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const makeId = request.nextUrl.searchParams.get("makeId");
    const year = request.nextUrl.searchParams.get("year");
    if (!makeId) return NextResponse.json({ models: [] });

    const conditions = [eq(vehicleModels.makeId, parseInt(makeId))];

    let models;
    if (year) {
      models = await db
        .selectDistinct({ id: vehicleModels.id, name: vehicleModels.name })
        .from(vehicleModels)
        .innerJoin(vehicleTrims, eq(vehicleTrims.modelId, vehicleModels.id))
        .where(and(eq(vehicleModels.makeId, parseInt(makeId)), eq(vehicleTrims.year, parseInt(year))))
        .orderBy(vehicleModels.name);
    } else {
      models = await db
        .select({ id: vehicleModels.id, name: vehicleModels.name })
        .from(vehicleModels)
        .where(eq(vehicleModels.makeId, parseInt(makeId)))
        .orderBy(vehicleModels.name);
    }

    return NextResponse.json({ models });
  } catch {
    return NextResponse.json({ models: [] });
  }
}
