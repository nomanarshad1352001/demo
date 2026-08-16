export function formatPrice(price: number | string): string {
  const num = typeof price === "string" ? parseFloat(price) : price;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(num);
}

export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `TR-${timestamp}-${random}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function parseTireSize(size: string): { width: number; aspectRatio: number; wheelDiameter: number } | null {
  const match = size.match(/^(\d{3})\/(\d{2,3})R(\d{2})$/);
  if (!match) return null;
  return {
    width: parseInt(match[1]),
    aspectRatio: parseInt(match[2]),
    wheelDiameter: parseInt(match[3]),
  };
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
