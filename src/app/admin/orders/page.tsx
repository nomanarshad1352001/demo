import { db } from "@/db";
import { orders } from "@/db/schema";
import { desc, sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  let orderList: {
    id: number; orderNumber: string; status: string; total: string;
    email: string; shipFirstName: string; shipLastName: string;
    paymentStatus: string | null; createdAt: Date;
  }[] = [];

  try {
    orderList = await db
      .select({
        id: orders.id,
        orderNumber: orders.orderNumber,
        status: orders.status,
        total: orders.total,
        email: orders.email,
        shipFirstName: orders.shipFirstName,
        shipLastName: orders.shipLastName,
        paymentStatus: orders.paymentStatus,
        createdAt: orders.createdAt,
      })
      .from(orders)
      .orderBy(desc(orders.createdAt))
      .limit(100);
  } catch { /* tables may not exist */ }

  const formatPrice = (n: string) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(parseFloat(n));

  const statusColor = (s: string) => {
    switch (s) {
      case "confirmed": return "bg-blue-100 text-blue-700";
      case "processing": return "bg-yellow-100 text-yellow-700";
      case "shipped": return "bg-purple-100 text-purple-700";
      case "delivered": return "bg-green-100 text-green-700";
      case "cancelled": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Orders ({orderList.length})</h1>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-semibold">Order</th>
              <th className="text-left px-4 py-3 font-semibold">Customer</th>
              <th className="text-left px-4 py-3 font-semibold">Status</th>
              <th className="text-left px-4 py-3 font-semibold">Payment</th>
              <th className="text-right px-4 py-3 font-semibold">Total</th>
              <th className="text-right px-4 py-3 font-semibold">Date</th>
            </tr>
          </thead>
          <tbody>
            {orderList.length === 0 ? (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-500">No orders yet</td></tr>
            ) : (
              orderList.map((o) => (
                <tr key={o.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono font-semibold">{o.orderNumber}</td>
                  <td className="px-4 py-3">
                    <p>{o.shipFirstName} {o.shipLastName}</p>
                    <p className="text-xs text-gray-500">{o.email}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded font-medium ${statusColor(o.status)}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                      o.paymentStatus === "paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {o.paymentStatus || "unpaid"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-medium">{formatPrice(o.total)}</td>
                  <td className="px-4 py-3 text-right text-gray-500">{new Date(o.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
