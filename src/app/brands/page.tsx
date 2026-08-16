import { db } from "@/db";
import { brands, products } from "@/db/schema";
import { sql } from "drizzle-orm";
import Link from "next/link";
import { getBrandImage } from "@/lib/constants";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Tire Brands — TireRack Pro",
  description: "Shop tires from top brands including Michelin, Bridgestone, Continental, Goodyear, and more.",
};

export default async function BrandsPage() {
  let brandList: { id: number; name: string; slug: string; description: string | null; productCount: number }[] = [];

  try {
    brandList = await db
      .select({
        id: brands.id,
        name: brands.name,
        slug: brands.slug,
        description: brands.description,
        productCount: sql<number>`(SELECT count(*)::int FROM products WHERE brand_id = ${brands.id} AND is_active = true)`,
      })
      .from(brands)
      .orderBy(brands.name);
  } catch {
    // Tables may not exist yet
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3">Tire Brands</h1>
        <p className="text-gray-500 text-lg">Shop tires from the world&apos;s leading manufacturers</p>
      </div>

      {brandList.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl shadow">
          <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h2 className="text-xl font-semibold mb-2">No brands yet</h2>
          <p className="text-gray-500">Brands will appear once products are added.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {brandList.map((brand) => (
            <Link
              key={brand.id}
              href={`/shop?brand=${brand.slug}`}
              className="group relative h-56 rounded-xl overflow-hidden shadow-lg"
            >
              <img 
                src={getBrandImage(brand.slug)} 
                alt={brand.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-1">{brand.name}</h3>
                <p className="text-sm text-gray-300">{brand.productCount} tire{brand.productCount !== 1 ? "s" : ""} available</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
