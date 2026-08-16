import Link from "next/link";
import { Suspense } from "react";
import OrderDetails from "./OrderDetails";

export const metadata = {
  title: "Order Confirmed — TireRack Pro",
};

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="max-w-2xl mx-auto px-4 py-16 text-center">Loading...</div>}>
      <OrderDetails />
    </Suspense>
  );
}
