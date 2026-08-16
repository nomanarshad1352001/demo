import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-white">TireRack Pro</span>
          </div>
          <p className="text-sm text-gray-400">
            Your trusted source for premium tires. Shop by vehicle or tire size with confidence.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-white mb-4">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/shop" className="hover:text-white transition">All Tires</Link></li>
            <li><Link href="/shop?season=all-season" className="hover:text-white transition">All-Season</Link></li>
            <li><Link href="/shop?season=summer" className="hover:text-white transition">Summer</Link></li>
            <li><Link href="/shop?season=winter" className="hover:text-white transition">Winter</Link></li>
            <li><Link href="/brands" className="hover:text-white transition">Brands</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-white mb-4">Customer Service</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/account" className="hover:text-white transition">My Account</Link></li>
            <li><Link href="/account/orders" className="hover:text-white transition">Order History</Link></li>
            <li><Link href="/cart" className="hover:text-white transition">Shopping Cart</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-white mb-4">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              1-800-TIRES-00
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              support@tirerakpro.com
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Mon-Fri 8am-8pm EST
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 px-4 py-6 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} TireRack Pro. All rights reserved.</p>
      </div>
    </footer>
  );
}
