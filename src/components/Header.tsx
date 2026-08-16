"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { useState } from "react";

export default function Header() {
  const { itemCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-red-600 text-center text-sm py-2 px-4 font-medium">
        FREE SHIPPING on orders over $599 — Limited Time Offer
      </div>
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="hidden sm:block">
            <span className="text-xl font-bold">TireRack Pro</span>
            <span className="text-xs text-gray-400 block">Premium Tires Online</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/shop" className="hover:text-red-400 transition">Shop All Tires</Link>
          <Link href="/shop?season=winter" className="hover:text-red-400 transition">Winter Tires</Link>
          <Link href="/shop?season=all-season" className="hover:text-red-400 transition">All-Season</Link>
          <Link href="/brands" className="hover:text-red-400 transition">Brands</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link href="/account" className="hidden sm:flex items-center gap-2 text-sm hover:text-red-400 transition px-3 py-2 rounded-lg hover:bg-gray-800">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Account
          </Link>
          <Link href="/cart" className="relative flex items-center gap-2 text-sm hover:text-red-400 transition bg-gray-800 px-4 py-2 rounded-lg">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            Cart
            {itemCount > 0 && (
              <span className="bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {itemCount}
              </span>
            )}
          </Link>
          <button
            className="md:hidden p-2 hover:bg-gray-800 rounded-lg"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="md:hidden bg-gray-800 px-4 py-4 space-y-1 border-t border-gray-700">
          <Link href="/shop" className="block py-3 px-4 hover:bg-gray-700 rounded-lg transition" onClick={() => setMobileOpen(false)}>Shop All Tires</Link>
          <Link href="/shop?season=winter" className="block py-3 px-4 hover:bg-gray-700 rounded-lg transition" onClick={() => setMobileOpen(false)}>Winter Tires</Link>
          <Link href="/shop?season=all-season" className="block py-3 px-4 hover:bg-gray-700 rounded-lg transition" onClick={() => setMobileOpen(false)}>All-Season</Link>
          <Link href="/brands" className="block py-3 px-4 hover:bg-gray-700 rounded-lg transition" onClick={() => setMobileOpen(false)}>Brands</Link>
          <Link href="/account" className="block py-3 px-4 hover:bg-gray-700 rounded-lg transition" onClick={() => setMobileOpen(false)}>My Account</Link>
        </nav>
      )}
    </header>
  );
}
