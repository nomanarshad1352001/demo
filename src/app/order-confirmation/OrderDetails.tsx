"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function OrderDetails() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order");

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="text-6xl mb-4">✅</div>
      <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
      {orderNumber && (
        <p className="text-lg text-gray-600 mb-2">
          Order Number: <span className="font-mono font-bold text-gray-900">{orderNumber}</span>
        </p>
      )}
      <p className="text-gray-500 mb-8">
        Thank you for your order! A confirmation email will be sent to your email address.
        Your tires will be shipped within 1-2 business days.
      </p>
      <div className="space-y-3">
        <Link
          href="/shop"
          className="block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition"
        >
          Continue Shopping
        </Link>
        <Link
          href="/account/orders"
          className="block border border-gray-300 hover:bg-gray-50 font-semibold py-3 rounded-lg transition"
        >
          View Order History
        </Link>
      </div>
    </div>
  );
}
