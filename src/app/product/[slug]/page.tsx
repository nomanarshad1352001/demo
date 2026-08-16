import { db } from "@/db";
import { products, brands, reviews } from "@/db/schema";
import { eq, sql, and } from "drizzle-orm";
import { notFound } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import { getTireImage } from "@/lib/constants";
import ProductActions from "./ProductActions";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const [product] = await db
    .select({ name: products.name, metaTitle: products.metaTitle, metaDescription: products.metaDescription, tireSize: products.tireSize })
    .from(products)
    .where(eq(products.slug, slug))
    .limit(1);

  if (!product) return { title: "Tire Not Found" };
  return {
    title: product.metaTitle || `${product.name} - ${product.tireSize} | TireRack Pro`,
    description: product.metaDescription || `Buy ${product.name} ${product.tireSize} online at TireRack Pro.`,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;

  const [product] = await db
    .select({
      id: products.id,
      sku: products.sku,
      name: products.name,
      slug: products.slug,
      description: products.description,
      imageUrl: products.imageUrl,
      images: products.images,
      width: products.width,
      aspectRatio: products.aspectRatio,
      wheelDiameter: products.wheelDiameter,
      tireSize: products.tireSize,
      season: products.season,
      performanceCategory: products.performanceCategory,
      loadIndex: products.loadIndex,
      speedRating: products.speedRating,
      loadRange: products.loadRange,
      plyRating: products.plyRating,
      treadwear: products.treadwear,
      traction: products.traction,
      temperature: products.temperature,
      warrantyMiles: products.warrantyMiles,
      price: products.price,
      salePrice: products.salePrice,
      stockQty: products.stockQty,
      weight: products.weight,
      brandName: brands.name,
      brandSlug: brands.slug,
    })
    .from(products)
    .innerJoin(brands, eq(products.brandId, brands.id))
    .where(and(eq(products.slug, slug), eq(products.isActive, true)))
    .limit(1);

  if (!product) notFound();

  // Get review stats
  let reviewStats = { count: 0, avgRating: 0 };
  try {
    const [stats] = await db
      .select({
        count: sql<number>`count(*)::int`,
        avgRating: sql<number>`coalesce(avg(${reviews.rating}), 0)`,
      })
      .from(reviews)
      .where(eq(reviews.productId, product.id));
    reviewStats = { count: stats?.count || 0, avgRating: Number(stats?.avgRating) || 0 };
  } catch { /* table may not exist yet */ }

  const price = parseFloat(product.price);
  const salePrice = product.salePrice ? parseFloat(product.salePrice) : null;
  const effectivePrice = salePrice || price;
  const savings = salePrice ? price - salePrice : 0;
  const productImage = getTireImage(product.id);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-red-600 transition">Home</Link>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href="/shop" className="hover:text-red-600 transition">Shop</Link>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href={`/shop?brand=${product.brandSlug}`} className="hover:text-red-600 transition">{product.brandName}</Link>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-900 font-medium truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Image */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="aspect-square">
              <img 
                src={productImage} 
                alt={product.name} 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>

          {/* Details */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Link 
                href={`/shop?brand=${product.brandSlug}`}
                className="text-sm text-red-600 uppercase font-semibold tracking-wide hover:text-red-700 transition"
              >
                {product.brandName}
              </Link>
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                product.season === "winter" ? "bg-blue-100 text-blue-700" :
                product.season === "summer" ? "bg-orange-100 text-orange-700" :
                product.season === "all-terrain" ? "bg-green-100 text-green-700" :
                "bg-gray-100 text-gray-700"
              }`}>{product.season}</span>
            </div>
            
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-500 mb-4">Size: {product.tireSize} | SKU: {product.sku}</p>

            {/* Rating */}
            {reviewStats.count > 0 && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[1,2,3,4,5].map((s) => (
                    <svg 
                      key={s} 
                      className={`w-5 h-5 ${s <= Math.round(reviewStats.avgRating) ? "text-yellow-400" : "text-gray-300"}`}
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-500">({reviewStats.count} reviews)</span>
              </div>
            )}

            {/* Pricing Card */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex items-end gap-4 mb-2">
                {salePrice ? (
                  <>
                    <span className="text-4xl font-bold text-red-600">{formatPrice(salePrice)}</span>
                    <span className="text-xl text-gray-400 line-through">{formatPrice(price)}</span>
                    <span className="bg-red-100 text-red-700 text-sm px-3 py-1 rounded-full font-semibold">
                      Save {formatPrice(savings)}
                    </span>
                  </>
                ) : (
                  <span className="text-4xl font-bold">{formatPrice(price)}</span>
                )}
              </div>
              <p className="text-gray-500 mb-4">per tire</p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Set of 4 tires:</span>
                  <span className="text-2xl font-bold">{formatPrice(effectivePrice * 4)}</span>
                </div>
              </div>

              {/* Stock */}
              <div className="mb-4">
                {product.stockQty > 0 ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium">In Stock ({product.stockQty} available)</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-red-600">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="font-medium">Out of Stock</span>
                  </div>
                )}
              </div>

              {/* Add to cart */}
              <ProductActions
                product={{
                  id: product.id,
                  name: product.name,
                  tireSize: product.tireSize,
                  price,
                  salePrice: salePrice || undefined,
                  imageUrl: productImage,
                  slug: product.slug,
                  brandName: product.brandName,
                  stockQty: product.stockQty,
                }}
              />
            </div>

            {/* Free shipping */}
            {effectivePrice * 4 >= 599 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                <svg className="w-6 h-6 text-green-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <p className="font-semibold text-green-800">FREE SHIPPING</p>
                  <p className="text-sm text-green-600">This set of 4 qualifies for free shipping!</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Specs table */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Specifications
            </h2>
            <table className="w-full">
              <tbody>
                {[
                  ["Tire Size", product.tireSize],
                  ["Width", `${product.width}mm`],
                  ["Aspect Ratio", `${product.aspectRatio}`],
                  ["Wheel Diameter", `${product.wheelDiameter}"`],
                  ["Season", product.season],
                  ["Performance", product.performanceCategory],
                  ["Load Index", product.loadIndex?.toString()],
                  ["Speed Rating", product.speedRating],
                  ["Load Range", product.loadRange],
                  ["Weight", product.weight ? `${product.weight} lbs` : null],
                ]
                  .filter(([, v]) => v)
                  .map(([label, value]) => (
                    <tr key={label} className="border-b last:border-0">
                      <td className="py-3 text-gray-500">{label}</td>
                      <td className="py-3 font-medium text-right">{value}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Ratings & Warranty
            </h2>
            <table className="w-full">
              <tbody>
                {[
                  ["UTQG Treadwear", product.treadwear?.toString()],
                  ["Traction", product.traction],
                  ["Temperature", product.temperature],
                  ["Mileage Warranty", product.warrantyMiles ? `${product.warrantyMiles.toLocaleString()} miles` : null],
                ]
                  .filter(([, v]) => v)
                  .map(([label, value]) => (
                    <tr key={label} className="border-b last:border-0">
                      <td className="py-3 text-gray-500">{label}</td>
                      <td className="py-3 font-medium text-right">{value}</td>
                    </tr>
                  ))}
              </tbody>
            </table>

            {product.description && (
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-semibold mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
