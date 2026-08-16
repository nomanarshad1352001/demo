import { db } from "@/db";
import { products, brands } from "@/db/schema";
import { eq, desc, sql } from "drizzle-orm";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  let productList: {
    id: number; sku: string; name: string; slug: string; tireSize: string;
    price: string; salePrice: string | null; stockQty: number; isActive: boolean;
    season: string; brandName: string;
  }[] = [];

  try {
    productList = await db
      .select({
        id: products.id,
        sku: products.sku,
        name: products.name,
        slug: products.slug,
        tireSize: products.tireSize,
        price: products.price,
        salePrice: products.salePrice,
        stockQty: products.stockQty,
        isActive: products.isActive,
        season: products.season,
        brandName: brands.name,
      })
      .from(products)
      .innerJoin(brands, eq(products.brandId, brands.id))
      .orderBy(desc(products.createdAt))
      .limit(100);
  } catch { /* tables may not exist */ }

  const formatPrice = (n: string) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(parseFloat(n));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Products ({productList.length})</h1>
        <Link
          href="/admin/products/new"
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg text-sm transition"
        >
          + Add Product
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-semibold">Product</th>
              <th className="text-left px-4 py-3 font-semibold">Size</th>
              <th className="text-left px-4 py-3 font-semibold">Season</th>
              <th className="text-right px-4 py-3 font-semibold">Price</th>
              <th className="text-right px-4 py-3 font-semibold">Stock</th>
              <th className="text-center px-4 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {productList.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  No products yet. Add your first product to get started.
                </td>
              </tr>
            ) : (
              productList.map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-semibold">{p.name}</p>
                      <p className="text-xs text-gray-500">{p.brandName} • SKU: {p.sku}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">{p.tireSize}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                      p.season === "winter" ? "bg-blue-100 text-blue-700" :
                      p.season === "summer" ? "bg-orange-100 text-orange-700" :
                      "bg-gray-100 text-gray-700"
                    }`}>{p.season}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {p.salePrice ? (
                      <div>
                        <span className="text-red-600 font-medium">{formatPrice(p.salePrice)}</span>
                        <span className="text-gray-400 line-through text-xs ml-1">{formatPrice(p.price)}</span>
                      </div>
                    ) : (
                      formatPrice(p.price)
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className={`font-medium ${p.stockQty === 0 ? "text-red-600" : p.stockQty <= 4 ? "text-yellow-600" : "text-green-600"}`}>
                      {p.stockQty}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-xs px-2 py-0.5 rounded font-medium ${p.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {p.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
