"use client";

import { useCart } from "@/lib/cart-context";
import Link from "next/link";
import { getTireImage } from "@/lib/constants";

function formatPrice(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

export default function CartPage() {
  const { items, updateQty, removeItem, subtotal, itemCount } = useCart();

  const shipping = subtotal >= 599 ? 0 : 49.99;
  const taxRate = 0.08;
  const tax = subtotal * taxRate;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-2">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-8">Add some tires to get started!</p>
        <Link href="/shop" className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition">
          Shop Tires
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const itemPrice = item.salePrice || item.price;
            const imageUrl = item.imageUrl || getTireImage(item.productId);
            return (
              <div key={item.productId} className="bg-white rounded-xl shadow-md p-5 flex gap-5">
                <Link href={`/product/${item.slug}`} className="shrink-0">
                  <div className="w-28 h-28 rounded-lg overflow-hidden">
                    <img src={imageUrl} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-red-600 uppercase font-semibold">{item.brandName}</div>
                  <Link href={`/product/${item.slug}`}>
                    <h3 className="font-semibold hover:text-red-600 transition">{item.name}</h3>
                  </Link>
                  <p className="text-sm text-gray-500">{item.tireSize}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center border rounded-lg">
                      <button
                        onClick={() => updateQty(item.productId, item.qty - 1)}
                        className="px-3 py-2 hover:bg-gray-100 transition"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="px-4 py-2 font-semibold min-w-[3rem] text-center">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.productId, item.qty + 1)}
                        className="px-3 py-2 hover:bg-gray-100 transition"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="text-sm text-red-600 hover:text-red-700 font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">{formatPrice(itemPrice * item.qty)}</div>
                  <div className="text-sm text-gray-500">{formatPrice(itemPrice)} each</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order summary */}
        <div className="bg-white rounded-xl shadow-md p-6 h-fit sticky top-28">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal ({itemCount} items)</span>
              <span className="font-medium">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Shipping</span>
              <span className={shipping === 0 ? "text-green-600 font-semibold" : "font-medium"}>
                {shipping === 0 ? "FREE" : formatPrice(shipping)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Estimated Tax</span>
              <span className="font-medium">{formatPrice(tax)}</span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between text-lg">
              <span className="font-bold">Total</span>
              <span className="font-bold">{formatPrice(total)}</span>
            </div>
          </div>

          {shipping > 0 && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-700">
              Add {formatPrice(599 - subtotal)} more for FREE shipping!
            </div>
          )}

          <Link
            href="/checkout"
            className="block mt-6 bg-red-600 hover:bg-red-700 text-white text-center font-semibold py-3.5 rounded-lg transition"
          >
            Proceed to Checkout
          </Link>
          <Link
            href="/shop"
            className="block mt-3 text-center text-sm text-gray-500 hover:text-red-600 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
