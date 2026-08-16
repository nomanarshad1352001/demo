// All images from Unsplash CDN - allows hotlinking with access-control-allow-origin: *
// Every URL verified as 200 OK

export const IMAGES = {
  heroBg:     "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80",
  allSeason:  "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80",
  summer:     "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
  winter:     "https://images.unsplash.com/photo-1548438294-1ad5d5f4f063?w=800&q=80",
  allTerrain: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80",
};

export const TIRE_IMAGES = [
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600&q=80",
  "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80",
  "https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&q=80",
  "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=80",
  "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80",
  "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80",
  "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&q=80",
  "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=600&q=80",
  "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&q=80",
  "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80",
];

export const BRAND_IMAGES: Record<string, string> = {
  michelin:    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
  bridgestone: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&q=80",
  continental: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&q=80",
  goodyear:    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&q=80",
  pirelli:     "https://images.unsplash.com/photo-1542362567-b07e54358753?w=400&q=80",
  yokohama:    "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&q=80",
  cooper:      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400&q=80",
  hankook:     "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&q=80",
  bfgoodrich:  "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&q=80",
  falken:      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&q=80",
};

export function getTireImage(productId: number): string {
  return TIRE_IMAGES[productId % TIRE_IMAGES.length];
}

export function getBrandImage(brandSlug: string): string {
  return BRAND_IMAGES[brandSlug.toLowerCase()] || TIRE_IMAGES[0];
}
