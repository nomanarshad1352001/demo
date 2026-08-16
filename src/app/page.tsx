import Link from "next/link";
import TireFinder from "@/components/TireFinder";
import { db } from "@/db";
import { products, brands } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { formatPrice } from "@/lib/utils";
import { IMAGES, getTireImage, getBrandImage } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let featuredProducts: {
    id: number;
    name: string;
    slug: string;
    tireSize: string;
    price: string;
    salePrice: string | null;
    imageUrl: string | null;
    season: string;
    brandName: string;
  }[] = [];

  let topBrands: { id: number; name: string; slug: string; logoUrl: string | null }[] = [];

  try {
    featuredProducts = await db
      .select({
        id: products.id,
        name: products.name,
        slug: products.slug,
        tireSize: products.tireSize,
        price: products.price,
        salePrice: products.salePrice,
        imageUrl: products.imageUrl,
        season: products.season,
        brandName: brands.name,
      })
      .from(products)
      .innerJoin(brands, eq(products.brandId, brands.id))
      .where(eq(products.isActive, true))
      .orderBy(desc(products.createdAt))
      .limit(8);

    topBrands = await db
      .select({
        id: brands.id,
        name: brands.name,
        slug: brands.slug,
        logoUrl: brands.logoUrl,
      })
      .from(brands)
      .orderBy(brands.name)
      .limit(10);
  } catch {
    // tables may not exist yet
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[600px] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${IMAGES.heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24 w-full">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Premium Tires for<br />Every Journey
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Shop by your vehicle or tire size. Top brands, competitive prices, and free shipping on orders over $599.
            </p>
          </div>
          <TireFinder />
        </div>
      </section>

      {/* Features */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.965 18a9 9 0 0 1-.765-3.027A9 9 0 0 1 12 6a9 9 0 0 1 3.8.85m-.8 14.15a9 9 0 0 0 3.765-3.027m0 0a9 9 0 0 0 .435-8.973M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              ), title: "Free Shipping", desc: "On orders over $599" },
              { icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              ), title: "Road Hazard", desc: "Protection available" },
              { icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              ), title: "Price Match", desc: "Guaranteed lowest prices" },
              { icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
              ), title: "Expert Support", desc: "Call 1-800-TIRES-00" },
            ].map((f) => (
              <div key={f.title} className="flex items-center gap-4 p-4">
                <div className="text-red-600 shrink-0">{f.icon}</div>
                <div>
                  <h3 className="font-semibold text-sm">{f.title}</h3>
                  <p className="text-xs text-gray-500">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Season */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-2 text-center">Shop by Season</h2>
        <p className="text-gray-500 text-center mb-8">Find the right tires for your driving conditions</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { season: "all-season", label: "All-Season", desc: "Year-round performance", image: IMAGES.allSeason },
            { season: "summer", label: "Summer", desc: "Maximum dry & wet grip", image: IMAGES.summer },
            { season: "winter", label: "Winter", desc: "Snow & ice traction", image: IMAGES.winter },
            { season: "all-terrain", label: "All-Terrain", desc: "On & off-road capability", image: IMAGES.allTerrain },
          ].map((s) => (
            <Link
              key={s.season}
              href={`/shop?season=${s.season}`}
              className="group relative h-64 rounded-xl overflow-hidden shadow-lg"
            >
              <img 
                src={s.image} 
                alt={s.label} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-bold mb-1">{s.label}</h3>
                <p className="text-sm text-gray-200">{s.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="bg-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold">Featured Tires</h2>
                <p className="text-gray-500 mt-1">Top-rated tires for your vehicle</p>
              </div>
              <Link href="/shop" className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2.5 rounded-lg transition">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {featuredProducts.map((p) => (
                <Link
                  key={p.id}
                  href={`/product/${p.slug}`}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition group overflow-hidden"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={getTireImage(p.id)}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-xs text-red-600 uppercase font-semibold tracking-wide">{p.brandName}</div>
                    <h3 className="font-semibold text-sm mt-1 line-clamp-2 group-hover:text-red-600 transition">{p.name}</h3>
                    <div className="text-xs text-gray-500 mt-1">{p.tireSize}</div>
                    <div className="flex items-center justify-between mt-3">
                      <div>
                        {p.salePrice ? (
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-red-600">{formatPrice(p.salePrice)}</span>
                            <span className="text-gray-400 line-through text-xs">{formatPrice(p.price)}</span>
                          </div>
                        ) : (
                          <span className="text-lg font-bold">{formatPrice(p.price)}</span>
                        )}
                      </div>
                      <span className={`text-[10px] px-2 py-1 rounded font-medium ${
                        p.season === "winter" ? "bg-blue-100 text-blue-700" :
                        p.season === "summer" ? "bg-orange-100 text-orange-700" :
                        p.season === "all-terrain" ? "bg-green-100 text-green-700" :
                        "bg-gray-100 text-gray-700"
                      }`}>{p.season}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Top Brands */}
      {topBrands.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-2 text-center">Top Brands</h2>
          <p className="text-gray-500 text-center mb-8">Shop from the world&apos;s leading tire manufacturers</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {topBrands.map((b) => (
              <Link
                key={b.id}
                href={`/shop?brand=${b.slug}`}
                className="group relative h-40 rounded-xl overflow-hidden shadow-md"
              >
                <img 
                  src={getBrandImage(b.slug)} 
                  alt={b.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{b.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative py-20">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://images.pexels.com/photos/33268786/pexels-photo-33268786.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80)` }}
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Help Finding the Right Tires?</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Our tire experts are ready to assist you. Use our tire finder or give us a call.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition"
            >
              Browse All Tires
            </Link>
            <a
              href="tel:18008473700"
              className="border-2 border-white hover:bg-white hover:text-gray-900 text-white font-semibold py-3 px-8 rounded-lg transition"
            >
              Call 1-800-TIRES-00
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
