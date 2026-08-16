"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { useRouter } from "next/navigation";

interface Props {
  product: {
    id: number;
    name: string;
    tireSize: string;
    price: number;
    salePrice?: number;
    imageUrl?: string;
    slug: string;
    brandName: string;
    stockQty: number;
  };
}

export default function ProductActions({ product }: Props) {
  const { addItem } = useCart();
  const router = useRouter();
  const [qty, setQty] = useState(4);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(
      {
        productId: product.id,
        name: product.name,
        tireSize: product.tireSize,
        price: product.price,
        salePrice: product.salePrice,
        imageUrl: product.imageUrl,
        slug: product.slug,
        brandName: product.brandName,
      },
      qty
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="mt-6 space-y-3">
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium text-gray-700">Qty:</label>
        <div className="flex items-center border rounded-lg">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="px-3 py-2 text-gray-600 hover:bg-gray-100"
          >
            −
          </button>
          <span className="px-4 py-2 font-semibold min-w-[3rem] text-center">{qty}</span>
          <button
            onClick={() => setQty(Math.min(product.stockQty, qty + 1))}
            className="px-3 py-2 text-gray-600 hover:bg-gray-100"
          >
            +
          </button>
        </div>
        <div className="flex gap-2">
          {[1, 2, 4].map((n) => (
            <button
              key={n}
              onClick={() => setQty(n)}
              className={`text-xs px-2 py-1 rounded border ${qty === n ? "bg-red-50 border-red-300 text-red-600" : "hover:bg-gray-50"}`}
            >
              {n === 1 ? "Single" : n === 2 ? "Pair" : "Set of 4"}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleAdd}
        disabled={product.stockQty < 1}
        className={`w-full font-semibold py-3 rounded-lg transition text-lg ${
          added
            ? "bg-green-600 text-white"
            : "bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white"
        }`}
      >
        {product.stockQty < 1
          ? "Out of Stock"
          : added
          ? "✓ Added to Cart!"
          : `Add to Cart — ${qty} tire${qty > 1 ? "s" : ""}`}
      </button>

      {added && (
        <button
          onClick={() => router.push("/cart")}
          className="w-full border-2 border-red-600 text-red-600 font-semibold py-2.5 rounded-lg hover:bg-red-50 transition"
        >
          View Cart →
        </button>
      )}
    </div>
  );
}
