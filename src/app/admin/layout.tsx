import type { ReactNode } from "react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[80vh] flex">
      {/* Sidebar */}
      <aside className="w-56 bg-gray-900 text-white shrink-0 hidden md:block">
        <div className="p-4 border-b border-gray-700">
          <h2 className="font-bold text-sm uppercase text-gray-400">Admin Panel</h2>
        </div>
        <nav className="p-2 space-y-1">
          {[
            { href: "/admin", label: "📊 Dashboard", exact: true },
            { href: "/admin/products", label: "📦 Products" },
            { href: "/admin/orders", label: "🧾 Orders" },
            { href: "/admin/customers", label: "👥 Customers" },
            { href: "/admin/inventory", label: "📋 Inventory" },
            { href: "/admin/suppliers", label: "🏭 Suppliers" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-3 py-2 rounded-md text-sm hover:bg-gray-800 transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 bg-gray-50">
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
