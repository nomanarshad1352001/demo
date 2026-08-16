import { db } from "@/db";
import { products, orders, customers, brands } from "@/db/schema";
import { sql, eq, desc } from "drizzle-orm";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  let stats = { products: 0, orders: 0, customers: 0, revenue: 0 };
  let recentOrders: { id: number; orderNumber: string; status: string; total: string; email: string; createdAt: Date }[] = [];
  let lowStock: { id: number; name: string; sku: string; stockQty: number; tireSize: string }[] = [];

  try {
    const [prodCount] = await db.select({ count: sql<number>`count(*)::int` }).from(products);
    const [orderCount] = await db.select({ count: sql<number>`count(*)::int` }).from(orders);
    const [custCount] = await db.select({ count: sql<number>`count(*)::int` }).from(customers);
    const [rev] = await db.select({ total: sql<number>`coalesce(sum(total::numeric), 0)` }).from(orders).where(eq(orders.paymentStatus, "paid"));

    stats = {
      products: prodCount?.count || 0,
      orders: orderCount?.count || 0,
      customers: custCount?.count || 0,
      revenue: Number(rev?.total) || 0,
    };

    recentOrders = await db
      .select({
        id: orders.id,
        orderNumber: orders.orderNumber,
        status: orders.status,
        total: orders.total,
        email: orders.email,
        createdAt: orders.createdAt,
      })
      .from(orders)
      .orderBy(desc(orders.createdAt))
      .limit(5);

    lowStock = await db
      .select({
        id: products.id,
        name: products.name,
        sku: products.sku,
        stockQty: products.stockQty,
        tireSize: products.tireSize,
      })
      .from(products)
      .where(eq(products.isActive, true))
      .orderBy(products.stockQty)
      .limit(5);
  } catch {
    // tables may not exist
  }

  const formatPrice = (n: number | string) => {
    const num = typeof n === "string" ? parseFloat(n) : n;
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(num);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Products", value: stats.products, icon: "📦", color: "blue" },
          { label: "Orders", value: stats.orders, icon: "🧾", color: "green" },
          { label: "Customers", value: stats.customers, icon: "👥", color: "purple" },
          { label: "Revenue", value: formatPrice(stats.revenue), icon: "💰", color: "orange" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl">{s.icon}</span>
              <span className="text-xs text-gray-500 uppercase">{s.label}</span>
            </div>
            <div className="text-2xl font-bold mt-2">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Recent Orders</h2>
            <Link href="/admin/orders" className="text-sm text-red-600 hover:text-red-700">View All →</Link>
          </div>
          {recentOrders.length === 0 ? (
            <p className="text-gray-500 text-sm">No orders yet</p>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((o) => (
                <div key={o.id} className="flex items-center justify-between text-sm border-b pb-2 last:border-0">
                  <div>
                    <p className="font-mono font-semibold">{o.orderNumber}</p>
                    <p className="text-xs text-gray-500">{o.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{formatPrice(o.total)}</p>
                    <span className={`text-xs px-1.5 py-0.5 rounded ${
                      o.status === "confirmed" ? "bg-blue-100 text-blue-700" :
                      o.status === "shipped" ? "bg-purple-100 text-purple-700" :
                      o.status === "delivered" ? "bg-green-100 text-green-700" :
                      "bg-gray-100 text-gray-700"
                    }`}>{o.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Low Stock */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Low Stock Items</h2>
            <Link href="/admin/inventory" className="text-sm text-red-600 hover:text-red-700">View All →</Link>
          </div>
          {lowStock.length === 0 ? (
            <p className="text-gray-500 text-sm">No products to show</p>
          ) : (
            <div className="space-y-3">
              {lowStock.map((p) => (
                <div key={p.id} className="flex items-center justify-between text-sm border-b pb-2 last:border-0">
                  <div>
                    <p className="font-semibold">{p.name}</p>
                    <p className="text-xs text-gray-500">{p.sku} • {p.tireSize}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded font-medium ${
                    p.stockQty === 0 ? "bg-red-100 text-red-700" :
                    p.stockQty <= 4 ? "bg-yellow-100 text-yellow-700" :
                    "bg-green-100 text-green-700"
                  }`}>
                    {p.stockQty} in stock
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
