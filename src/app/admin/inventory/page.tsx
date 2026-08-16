import { db } from "@/db";
import { products, brands } from "@/db/schema";
import { eq, asc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function AdminInventoryPage() {
  let productList: {
    id: number; sku: string; name: string; tireSize: string;
    stockQty: number; isActive: boolean; isDiscontinued: boolean;
    brandName: string; price: string;
  }[] = [];

  try {
    productList = await db
      .select({
        id: products.id,
        sku: products.sku,
        name: products.name,
        tireSize: products.tireSize,
        stockQty: products.stockQty,
        isActive: products.isActive,
        isDiscontinued: products.isDiscontinued,
        brandName: brands.name,
        price: products.price,
      })
      .from(products)
      .innerJoin(brands, eq(products.brandId, brands.id))
      .orderBy(asc(products.stockQty))
      .limit(100);
  } catch { /* tables may not exist */ }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Inventory Management</h1>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <p className="text-2xl font-bold text-red-600">{productList.filter(p => p.stockQty === 0).length}</p>
          <p className="text-xs text-gray-500">Out of Stock</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <p className="text-2xl font-bold text-yellow-600">{productList.filter(p => p.stockQty > 0 && p.stockQty <= 8).length}</p>
          <p className="text-xs text-gray-500">Low Stock (≤8)</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{productList.filter(p => p.stockQty > 8).length}</p>
          <p className="text-xs text-gray-500">In Stock</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-semibold">SKU</th>
              <th className="text-left px-4 py-3 font-semibold">Product</th>
              <th className="text-left px-4 py-3 font-semibold">Size</th>
              <th className="text-right px-4 py-3 font-semibold">Stock</th>
              <th className="text-center px-4 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {productList.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500">No products to show</td></tr>
            ) : (
              productList.map((p) => (
                <tr key={p.id} className={`border-b hover:bg-gray-50 ${p.stockQty === 0 ? "bg-red-50" : ""}`}>
                  <td className="px-4 py-3 font-mono text-xs">{p.sku}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium">{p.name}</p>
                    <p className="text-xs text-gray-500">{p.brandName}</p>
                  </td>
                  <td className="px-4 py-3">{p.tireSize}</td>
                  <td className="px-4 py-3 text-right">
                    <span className={`font-bold ${
                      p.stockQty === 0 ? "text-red-600" : p.stockQty <= 8 ? "text-yellow-600" : "text-green-600"
                    }`}>{p.stockQty}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {p.isDiscontinued ? (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">Discontinued</span>
                    ) : p.isActive ? (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Active</span>
                    ) : (
                      <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">Inactive</span>
                    )}
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
