"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { getTireImage } from "@/lib/constants";

interface Product {
  id: number;
  name: string;
  slug: string;
  tireSize: string;
  price: string;
  salePrice: string | null;
  imageUrl: string | null;
  season: string;
  speedRating: string | null;
  loadIndex: number | null;
  warrantyMiles: number | null;
  stockQty: number;
  brandName: string;
  brandSlug: string;
}

const SEASONS = [
  { value: "all-season", label: "All-Season" },
  { value: "summer", label: "Summer" },
  { value: "winter", label: "Winter" },
  { value: "all-terrain", label: "All-Terrain" },
];

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Name A-Z" },
  { value: "newest", label: "Newest" },
];

function formatPrice(price: number | string): string {
  const num = typeof price === "string" ? parseFloat(price) : price;
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(num);
}

export default function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addItem } = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const page = parseInt(searchParams.get("page") || "1");
  const season = searchParams.get("season") || "";
  const brand = searchParams.get("brand") || "";
  const tireSize = searchParams.get("tireSize") || "";
  const trimId = searchParams.get("trimId") || "";
  const sort = searchParams.get("sort") || "featured";
  const q = searchParams.get("q") || "";

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    params.set("page", page.toString());
    if (season) params.set("season", season);
    if (brand) params.set("brand", brand);
    if (tireSize) params.set("tireSize", tireSize);
    if (trimId) params.set("trimId", trimId);
    if (sort) params.set("sort", sort);
    if (q) params.set("q", q);

    try {
      const res = await fetch(`/api/products?${params.toString()}`);
      const data = await res.json();
      setProducts(data.products || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 0);
    } catch {
      setProducts([]);
    }
    setLoading(false);
  }, [page, season, brand, tireSize, trimId, sort, q]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set("page", "1");
    router.push(`/shop?${params.toString()}`);
  };

  const handleAddToCart = (p: Product) => {
    addItem({
      productId: p.id,
      name: p.name,
      tireSize: p.tireSize,
      price: parseFloat(p.price),
      salePrice: p.salePrice ? parseFloat(p.salePrice) : undefined,
      imageUrl: getTireImage(p.id),
      slug: p.slug,
      brandName: p.brandName,
    }, 4);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">
            {tireSize ? `Tires: ${tireSize}` : season ? `${season.charAt(0).toUpperCase() + season.slice(1).replace('-', ' ')} Tires` : "Shop All Tires"}
          </h1>
          <p className="text-gray-500 mt-1">{total} tire{total !== 1 ? "s" : ""} available</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="sm:hidden flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
          </button>
          <select
            value={sort}
            onChange={(e) => updateParams("sort", e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-white"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar filters */}
        <aside className={`${showFilters ? "block" : "hidden"} sm:block w-full sm:w-64 shrink-0`}>
          <div className="bg-white rounded-xl shadow-md p-5 space-y-6 sticky top-28">
            {/* Search */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">Search</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search tires..."
                  defaultValue={q}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") updateParams("q", (e.target as HTMLInputElement).value);
                  }}
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Season */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase mb-3 block">Season</label>
              <div className="space-y-1">
                <button
                  onClick={() => updateParams("season", "")}
                  className={`flex items-center gap-3 w-full text-left text-sm px-3 py-2.5 rounded-lg transition ${!season ? "bg-red-50 text-red-600 font-medium" : "hover:bg-gray-50"}`}
                >
                  <span className={`w-2 h-2 rounded-full ${!season ? "bg-red-600" : "bg-gray-300"}`} />
                  All Seasons
                </button>
                {SEASONS.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => updateParams("season", s.value)}
                    className={`flex items-center gap-3 w-full text-left text-sm px-3 py-2.5 rounded-lg transition ${season === s.value ? "bg-red-50 text-red-600 font-medium" : "hover:bg-gray-50"}`}
                  >
                    <span className={`w-2 h-2 rounded-full ${season === s.value ? "bg-red-600" : "bg-gray-300"}`} />
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Active filters */}
            {(tireSize || brand || trimId) && (
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-3 block">Active Filters</label>
                <div className="space-y-2">
                  {tireSize && (
                    <div className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-lg text-sm">
                      <span>Size: {tireSize}</span>
                      <button onClick={() => updateParams("tireSize", "")} className="text-red-600 hover:text-red-700 font-bold">×</button>
                    </div>
                  )}
                  {brand && (
                    <div className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-lg text-sm">
                      <span>Brand: {brand}</span>
                      <button onClick={() => updateParams("brand", "")} className="text-red-600 hover:text-red-700 font-bold">×</button>
                    </div>
                  )}
                  {trimId && (
                    <div className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-lg text-sm">
                      <span>Vehicle Fit</span>
                      <button onClick={() => updateParams("trimId", "")} className="text-red-600 hover:text-red-700 font-bold">×</button>
                    </div>
                  )}
                </div>
              </div>
            )}

            <Link
              href="/shop"
              className="block text-center text-sm text-gray-500 hover:text-red-600 py-2"
            >
              Clear All Filters
            </Link>
          </div>
        </aside>

        {/* Product grid */}
        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow p-4 animate-pulse">
                  <div className="aspect-square bg-gray-200 rounded-lg mb-4" />
                  <div className="h-4 bg-gray-200 rounded mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-2/3 mb-3" />
                  <div className="h-6 bg-gray-200 rounded w-1/3" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl shadow">
              <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h2 className="text-xl font-semibold mb-2">No tires found</h2>
              <p className="text-gray-500 mb-6">Try adjusting your filters or search terms.</p>
              <Link href="/shop" className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2.5 rounded-lg transition">
                View All Tires
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((p) => (
                  <div key={p.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition group overflow-hidden">
                    <Link href={`/product/${p.slug}`}>
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={getTireImage(p.id)}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </Link>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold text-red-600 uppercase tracking-wide">{p.brandName}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                          p.season === "winter" ? "bg-blue-100 text-blue-700" :
                          p.season === "summer" ? "bg-orange-100 text-orange-700" :
                          p.season === "all-terrain" ? "bg-green-100 text-green-700" :
                          "bg-gray-100 text-gray-700"
                        }`}>{p.season}</span>
                      </div>
                      <Link href={`/product/${p.slug}`}>
                        <h3 className="font-semibold line-clamp-2 group-hover:text-red-600 transition mb-1">{p.name}</h3>
                      </Link>
                      <p className="text-sm text-gray-500 mb-3">
                        {p.tireSize}
                        {p.loadIndex ? ` | Load: ${p.loadIndex}` : ""}
                        {p.speedRating ? ` | Speed: ${p.speedRating}` : ""}
                      </p>
                      <div className="flex items-end justify-between">
                        <div>
                          {p.salePrice ? (
                            <div>
                              <span className="text-xl font-bold text-red-600">{formatPrice(p.salePrice)}</span>
                              <span className="text-sm text-gray-400 line-through ml-2">{formatPrice(p.price)}</span>
                            </div>
                          ) : (
                            <span className="text-xl font-bold">{formatPrice(p.price)}</span>
                          )}
                          <span className="text-xs text-gray-500 block">per tire</span>
                        </div>
                        <button
                          onClick={() => handleAddToCart(p)}
                          disabled={p.stockQty < 1}
                          className="bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition"
                        >
                          {p.stockQty < 1 ? "Out of Stock" : "Add to Cart"}
                        </button>
                      </div>
                      {p.stockQty > 0 && p.stockQty <= 8 && (
                        <p className="text-xs text-orange-600 mt-2 font-medium">Only {p.stockQty} left in stock</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-10">
                  {page > 1 && (
                    <button
                      onClick={() => updateParams("page", String(page - 1))}
                      className="flex items-center gap-1 px-4 py-2 bg-white border rounded-lg text-sm hover:bg-gray-50 transition"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Previous
                    </button>
                  )}
                  <span className="px-4 py-2 text-sm text-gray-600">
                    Page {page} of {totalPages}
                  </span>
                  {page < totalPages && (
                    <button
                      onClick={() => updateParams("page", String(page + 1))}
                      className="flex items-center gap-1 px-4 py-2 bg-white border rounded-lg text-sm hover:bg-gray-50 transition"
                    >
                      Next
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
