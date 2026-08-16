import { db } from "@/db";
import { suppliers } from "@/db/schema";
import { desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function AdminSuppliersPage() {
  let supplierList: {
    id: number; name: string; code: string; feedFormat: string | null;
    isActive: boolean; lastSyncAt: Date | null; createdAt: Date;
  }[] = [];

  try {
    supplierList = await db
      .select({
        id: suppliers.id,
        name: suppliers.name,
        code: suppliers.code,
        feedFormat: suppliers.feedFormat,
        isActive: suppliers.isActive,
        lastSyncAt: suppliers.lastSyncAt,
        createdAt: suppliers.createdAt,
      })
      .from(suppliers)
      .orderBy(desc(suppliers.createdAt));
  } catch { /* tables may not exist */ }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Suppliers</h1>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-semibold">Supplier</th>
              <th className="text-left px-4 py-3 font-semibold">Code</th>
              <th className="text-left px-4 py-3 font-semibold">Feed Format</th>
              <th className="text-center px-4 py-3 font-semibold">Status</th>
              <th className="text-right px-4 py-3 font-semibold">Last Sync</th>
            </tr>
          </thead>
          <tbody>
            {supplierList.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                No suppliers configured. Add suppliers to manage product feeds.
              </td></tr>
            ) : (
              supplierList.map((s) => (
                <tr key={s.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{s.name}</td>
                  <td className="px-4 py-3 font-mono text-xs">{s.code}</td>
                  <td className="px-4 py-3">{s.feedFormat || "—"}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                      s.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}>
                      {s.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-gray-500">
                    {s.lastSyncAt ? new Date(s.lastSyncAt).toLocaleString() : "Never"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h2 className="font-bold text-blue-800 mb-2">Supplier Integration</h2>
        <p className="text-sm text-blue-700">
          The system supports importing tire catalogs from official APIs, supplier feeds (CSV, XML, JSON),
          and compliant data sources. Configure API endpoints and feed URLs to enable automatic
          pricing and inventory updates.
        </p>
        <ul className="mt-3 text-sm text-blue-600 space-y-1">
          <li>✅ Import large tire catalogs</li>
          <li>✅ Normalize supplier product data</li>
          <li>✅ Match tires to vehicle fitment data</li>
          <li>✅ Scheduled product feed updates</li>
          <li>✅ Handle discontinued products</li>
          <li>✅ Prevent duplicate listings</li>
          <li>✅ Track synchronization errors</li>
          <li>✅ Support multiple suppliers per tire</li>
        </ul>
      </div>
    </div>
  );
}
