import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { vehicleMakes, vehicleModels, vehicleTrims } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const year = request.nextUrl.searchParams.get("year");

    if (year) {
      const makes = await db
        .selectDistinct({ id: vehicleMakes.id, name: vehicleMakes.name })
        .from(vehicleMakes)
        .innerJoin(vehicleModels, eq(vehicleModels.makeId, vehicleMakes.id))
        .innerJoin(vehicleTrims, eq(vehicleTrims.modelId, vehicleModels.id))
        .where(eq(vehicleTrims.year, parseInt(year)))
        .orderBy(vehicleMakes.name);
      return NextResponse.json({ makes });
    }

    const makes = await db.select().from(vehicleMakes).orderBy(vehicleMakes.name);
    return NextResponse.json({ makes });
  } catch {
    return NextResponse.json({ makes: [] });
  }
}
