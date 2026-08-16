import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { brands } from "@/db/schema";
import { slugify } from "@/lib/utils";

export async function GET() {
  try {
    const result = await db.select({ id: brands.id, name: brands.name, slug: brands.slug }).from(brands).orderBy(brands.name);
    return NextResponse.json({ brands: result });
  } catch {
    return NextResponse.json({ brands: [] });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json();
    if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });

    const [brand] = await db
      .insert(brands)
      .values({ name, slug: slugify(name) })
      .returning();

    return NextResponse.json({ brand });
  } catch (error) {
    console.error("Create brand error:", error);
    return NextResponse.json({ error: "Failed to create brand" }, { status: 500 });
  }
}
