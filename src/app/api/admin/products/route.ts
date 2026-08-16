import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { slugify } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name, sku, brandId, description, width, aspectRatio, wheelDiameter,
      season, performanceCategory, loadIndex, speedRating, treadwear,
      warrantyMiles, price, salePrice, stockQty, weight, imageUrl,
    } = body;

    if (!name || !sku || !brandId || !width || !aspectRatio || !wheelDiameter || !price) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    }

    const w = parseInt(width);
    const ar = parseInt(aspectRatio);
    const wd = parseInt(wheelDiameter);
    const tireSize = `${w}/${ar}R${wd}`;
    const slug = slugify(`${name}-${tireSize}-${sku}`);

    const [product] = await db
      .insert(products)
      .values({
        name,
        sku,
        slug,
        brandId: parseInt(brandId),
        description: description || null,
        imageUrl: imageUrl || null,
        width: w,
        aspectRatio: ar,
        wheelDiameter: wd,
        tireSize,
        season,
        performanceCategory: performanceCategory || null,
        loadIndex: loadIndex ? parseInt(loadIndex) : null,
        speedRating: speedRating || null,
        treadwear: treadwear ? parseInt(treadwear) : null,
        warrantyMiles: warrantyMiles ? parseInt(warrantyMiles) : null,
        price,
        salePrice: salePrice || null,
        stockQty: parseInt(stockQty) || 0,
        weight: weight || null,
      })
      .returning();

    return NextResponse.json({ product });
  } catch (error) {
    console.error("Create product error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
