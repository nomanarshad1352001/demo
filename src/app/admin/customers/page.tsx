import { db } from "@/db";
import { customers } from "@/db/schema";
import { desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function AdminCustomersPage() {
  let customerList: {
    id: number; email: string; firstName: string; lastName: string;
    phone: string | null; isAdmin: boolean; createdAt: Date;
  }[] = [];

  try {
    customerList = await db
      .select({
        id: customers.id,
        email: customers.email,
        firstName: customers.firstName,
        lastName: customers.lastName,
        phone: customers.phone,
        isAdmin: customers.isAdmin,
        createdAt: customers.createdAt,
      })
      .from(customers)
      .orderBy(desc(customers.createdAt))
      .limit(100);
  } catch { /* tables may not exist */ }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Customers ({customerList.length})</h1>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-semibold">Name</th>
              <th className="text-left px-4 py-3 font-semibold">Email</th>
              <th className="text-left px-4 py-3 font-semibold">Phone</th>
              <th className="text-center px-4 py-3 font-semibold">Role</th>
              <th className="text-right px-4 py-3 font-semibold">Joined</th>
            </tr>
          </thead>
          <tbody>
            {customerList.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500">No customers yet</td></tr>
            ) : (
              customerList.map((c) => (
                <tr key={c.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{c.firstName} {c.lastName}</td>
                  <td className="px-4 py-3">{c.email}</td>
                  <td className="px-4 py-3 text-gray-500">{c.phone || "—"}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                      c.isAdmin ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"
                    }`}>
                      {c.isAdmin ? "Admin" : "Customer"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-gray-500">{new Date(c.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
