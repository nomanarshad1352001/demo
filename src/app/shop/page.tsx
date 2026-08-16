import { Suspense } from "react";
import ShopContent from "./ShopContent";

export const metadata = {
  title: "Shop Tires — TireRack Pro",
  description: "Browse our full selection of tires. Filter by size, brand, season, and price.",
};

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <div className="animate-pulse text-gray-400">Loading tires...</div>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
