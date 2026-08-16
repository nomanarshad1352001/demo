"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Brand {
  id: number;
  name: string;
}

export default function NewProductPage() {
  const router = useRouter();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    sku: "",
    brandId: "",
    description: "",
    width: "",
    aspectRatio: "",
    wheelDiameter: "",
    season: "all-season",
    performanceCategory: "",
    loadIndex: "",
    speedRating: "",
    treadwear: "",
    warrantyMiles: "",
    price: "",
    salePrice: "",
    stockQty: "0",
    weight: "",
    imageUrl: "",
  });

  useEffect(() => {
    fetch("/api/admin/brands")
      .then((res) => res.json())
      .then((data) => setBrands(data.brands || []))
      .catch(() => {});
  }, []);

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create product");
      router.push("/admin/products");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

      {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic info */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="font-bold mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input required placeholder="Product Name" value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              className="sm:col-span-2 border border-gray-300 rounded-lg px-4 py-3 text-sm" />
            <input required placeholder="SKU" value={form.sku}
              onChange={(e) => updateField("sku", e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3 text-sm" />
            <select required value={form.brandId}
              onChange={(e) => updateField("brandId", e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3 text-sm">
              <option value="">Select Brand</option>
              {brands.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
            <textarea placeholder="Description" value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              className="sm:col-span-2 border border-gray-300 rounded-lg px-4 py-3 text-sm" rows={3} />
            <input placeholder="Image URL" value={form.imageUrl}
              onChange={(e) => updateField("imageUrl", e.target.value)}
              className="sm:col-span-2 border border-gray-300 rounded-lg px-4 py-3 text-sm" />
          </div>
        </div>

        {/* Tire Specs */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="font-bold mb-4">Tire Specifications</h2>
          <div className="grid grid-cols-3 gap-4">
            <input required type="number" placeholder="Width (e.g. 225)" value={form.width}
              onChange={(e) => updateField("width", e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3 text-sm" />
            <input required type="number" placeholder="Aspect (e.g. 45)" value={form.aspectRatio}
              onChange={(e) => updateField("aspectRatio", e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3 text-sm" />
            <input required type="number" placeholder="Diameter (e.g. 17)" value={form.wheelDiameter}
              onChange={(e) => updateField("wheelDiameter", e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3 text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <select value={form.season}
              onChange={(e) => updateField("season", e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3 text-sm">
              <option value="all-season">All-Season</option>
              <option value="summer">Summer</option>
              <option value="winter">Winter</option>
              <option value="all-terrain">All-Terrain</option>
            </select>
            <input placeholder="Performance Category" value={form.performanceCategory}
              onChange={(e) => updateField("performanceCategory", e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3 text-sm" />
            <input type="number" placeholder="Load Index" value={form.loadIndex}
              onChange={(e) => updateField("loadIndex", e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3 text-sm" />
            <input placeholder="Speed Rating" value={form.speedRating}
              onChange={(e) => updateField("speedRating", e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3 text-sm" />
            <input type="number" placeholder="Treadwear" value={form.treadwear}
              onChange={(e) => updateField("treadwear", e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3 text-sm" />
            <input type="number" placeholder="Warranty Miles" value={form.warrantyMiles}
              onChange={(e) => updateField("warrantyMiles", e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3 text-sm" />
            <input placeholder="Weight (lbs)" value={form.weight}
              onChange={(e) => updateField("weight", e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3 text-sm" />
          </div>
        </div>

        {/* Pricing & Inventory */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="font-bold mb-4">Pricing & Inventory</h2>
          <div className="grid grid-cols-3 gap-4">
            <input required type="number" step="0.01" placeholder="Price" value={form.price}
              onChange={(e) => updateField("price", e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3 text-sm" />
            <input type="number" step="0.01" placeholder="Sale Price (optional)" value={form.salePrice}
              onChange={(e) => updateField("salePrice", e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3 text-sm" />
            <input required type="number" placeholder="Stock Qty" value={form.stockQty}
              onChange={(e) => updateField("stockQty", e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3 text-sm" />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            {loading ? "Creating..." : "Create Product"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="border border-gray-300 hover:bg-gray-50 font-semibold px-6 py-3 rounded-lg transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
