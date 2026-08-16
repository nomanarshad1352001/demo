import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { products, brands, vehicleTireSizes } from "@/db/schema";
import { eq, and, gte, lte, ilike, inArray, sql, desc, asc } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const sp = request.nextUrl.searchParams;
    const page = parseInt(sp.get("page") || "1");
    const limit = Math.min(parseInt(sp.get("limit") || "24"), 100);
    const offset = (page - 1) * limit;

    const conditions = [eq(products.isActive, true)];

    // Filter by tire size
    const tireSize = sp.get("tireSize");
    if (tireSize) {
      conditions.push(eq(products.tireSize, tireSize));
    }

    // Filter by trim (vehicle fitment)
    const trimId = sp.get("trimId");
    if (trimId) {
      const tireSizes = await db
        .select({ tireSize: vehicleTireSizes.tireSize })
        .from(vehicleTireSizes)
        .where(eq(vehicleTireSizes.trimId, parseInt(trimId)));
      const sizes = tireSizes.map((t) => t.tireSize);
      if (sizes.length > 0) {
        conditions.push(inArray(products.tireSize, sizes));
      } else {
        return NextResponse.json({ products: [], total: 0, page, totalPages: 0 });
      }
    }

    // Filter by brand
    const brand = sp.get("brand");
    if (brand) {
      const [b] = await db
        .select({ id: brands.id })
        .from(brands)
        .where(eq(brands.slug, brand))
        .limit(1);
      if (b) conditions.push(eq(products.brandId, b.id));
    }

    // Filter by season
    const season = sp.get("season");
    if (season) conditions.push(eq(products.season, season));

    // Filter by width
    const width = sp.get("width");
    if (width) conditions.push(eq(products.width, parseInt(width)));

    // Filter by diameter
    const diameter = sp.get("diameter");
    if (diameter) conditions.push(eq(products.wheelDiameter, parseInt(diameter)));

    // Filter by price range
    const minPrice = sp.get("minPrice");
    const maxPrice = sp.get("maxPrice");
    if (minPrice) conditions.push(gte(products.price, minPrice));
    if (maxPrice) conditions.push(lte(products.price, maxPrice));

    // Search query
    const q = sp.get("q");
    if (q) conditions.push(ilike(products.name, `%${q}%`));

    // Sorting
    const sort = sp.get("sort") || "featured";
    let orderBy;
    switch (sort) {
      case "price-asc":
        orderBy = asc(products.price);
        break;
      case "price-desc":
        orderBy = desc(products.price);
        break;
      case "name":
        orderBy = asc(products.name);
        break;
      case "newest":
        orderBy = desc(products.createdAt);
        break;
      default:
        orderBy = desc(products.createdAt);
    }

    const whereClause = and(...conditions);

    const [countResult] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(products)
      .where(whereClause);

    const total = countResult?.count || 0;

    const results = await db
      .select({
        id: products.id,
        name: products.name,
        slug: products.slug,
        tireSize: products.tireSize,
        price: products.price,
        salePrice: products.salePrice,
        imageUrl: products.imageUrl,
        season: products.season,
        speedRating: products.speedRating,
        loadIndex: products.loadIndex,
        warrantyMiles: products.warrantyMiles,
        stockQty: products.stockQty,
        brandName: brands.name,
        brandSlug: brands.slug,
      })
      .from(products)
      .innerJoin(brands, eq(products.brandId, brands.id))
      .where(whereClause)
      .orderBy(orderBy)
      .limit(limit)
      .offset(offset);

    return NextResponse.json({
      products: results,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Products error:", error);
    return NextResponse.json({ products: [], total: 0, page: 1, totalPages: 0 });
  }
}
