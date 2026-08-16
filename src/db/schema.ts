import {
  pgTable,
  text,
  varchar,
  integer,
  decimal,
  boolean,
  timestamp,
  serial,
  jsonb,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";

// ─── Vehicles ───
export const vehicleMakes = pgTable("vehicle_makes", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
});

export const vehicleModels = pgTable("vehicle_models", {
  id: serial("id").primaryKey(),
  makeId: integer("make_id").notNull().references(() => vehicleMakes.id),
  name: varchar("name", { length: 100 }).notNull(),
});

export const vehicleTrims = pgTable("vehicle_trims", {
  id: serial("id").primaryKey(),
  modelId: integer("model_id").notNull().references(() => vehicleModels.id),
  year: integer("year").notNull(),
  name: varchar("name", { length: 100 }).notNull(),
});

export const vehicleTireSizes = pgTable("vehicle_tire_sizes", {
  id: serial("id").primaryKey(),
  trimId: integer("trim_id").notNull().references(() => vehicleTrims.id),
  tireSize: varchar("tire_size", { length: 20 }).notNull(), // e.g. "225/45R17"
  isOem: boolean("is_oem").default(true),
});

// ─── Brands ───
export const brands = pgTable("brands", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  logoUrl: text("logo_url"),
  description: text("description"),
});

// ─── Products (Tires) ───
export const products = pgTable(
  "products",
  {
    id: serial("id").primaryKey(),
    sku: varchar("sku", { length: 60 }).notNull().unique(),
    brandId: integer("brand_id").notNull().references(() => brands.id),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 280 }).notNull().unique(),
    description: text("description"),
    imageUrl: text("image_url"),
    images: jsonb("images").$type<string[]>().default([]),

    // Tire size specs
    width: integer("width").notNull(),         // e.g. 225
    aspectRatio: integer("aspect_ratio").notNull(), // e.g. 45
    wheelDiameter: integer("wheel_diameter").notNull(), // e.g. 17
    tireSize: varchar("tire_size", { length: 20 }).notNull(), // "225/45R17"

    // Performance
    season: varchar("season", { length: 30 }).notNull(), // all-season, summer, winter, all-terrain
    performanceCategory: varchar("performance_category", { length: 60 }),
    loadIndex: integer("load_index"),
    speedRating: varchar("speed_rating", { length: 5 }),
    loadRange: varchar("load_range", { length: 5 }),
    plyRating: varchar("ply_rating", { length: 10 }),

    // Ratings
    treadwear: integer("treadwear"),
    traction: varchar("traction", { length: 5 }),
    temperature: varchar("temperature", { length: 5 }),
    warrantyMiles: integer("warranty_miles"),

    // Pricing
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    salePrice: decimal("sale_price", { precision: 10, scale: 2 }),
    cost: decimal("cost", { precision: 10, scale: 2 }),

    // Inventory
    stockQty: integer("stock_qty").notNull().default(0),
    isActive: boolean("is_active").notNull().default(true),
    isDiscontinued: boolean("is_discontinued").notNull().default(false),

    // Supplier
    supplierId: integer("supplier_id").references(() => suppliers.id),
    supplierSku: varchar("supplier_sku", { length: 60 }),

    // Meta
    weight: decimal("weight", { precision: 6, scale: 2 }),
    metaTitle: varchar("meta_title", { length: 255 }),
    metaDescription: text("meta_description"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [
    index("idx_products_tire_size").on(t.tireSize),
    index("idx_products_brand").on(t.brandId),
    index("idx_products_season").on(t.season),
    index("idx_products_price").on(t.price),
  ]
);

// ─── Suppliers ───
export const suppliers = pgTable("suppliers", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 150 }).notNull(),
  code: varchar("code", { length: 30 }).notNull().unique(),
  apiEndpoint: text("api_endpoint"),
  apiKey: text("api_key"),
  feedUrl: text("feed_url"),
  feedFormat: varchar("feed_format", { length: 20 }), // csv, xml, json
  isActive: boolean("is_active").notNull().default(true),
  lastSyncAt: timestamp("last_sync_at"),
  syncErrors: jsonb("sync_errors").$type<string[]>().default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ─── Customers ───
export const customers = pgTable("customers", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  phone: varchar("phone", { length: 30 }),
  isAdmin: boolean("is_admin").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const customerAddresses = pgTable("customer_addresses", {
  id: serial("id").primaryKey(),
  customerId: integer("customer_id").notNull().references(() => customers.id),
  label: varchar("label", { length: 50 }).default("Home"),
  street: varchar("street", { length: 255 }).notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  state: varchar("state", { length: 50 }).notNull(),
  zip: varchar("zip", { length: 20 }).notNull(),
  country: varchar("country", { length: 50 }).notNull().default("US"),
  isDefault: boolean("is_default").default(false),
});

export const customerVehicles = pgTable("customer_vehicles", {
  id: serial("id").primaryKey(),
  customerId: integer("customer_id").notNull().references(() => customers.id),
  year: integer("year").notNull(),
  make: varchar("make", { length: 100 }).notNull(),
  model: varchar("model", { length: 100 }).notNull(),
  trim: varchar("trim", { length: 100 }),
  tireSize: varchar("tire_size", { length: 20 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ─── Orders ───
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderNumber: varchar("order_number", { length: 30 }).notNull().unique(),
  customerId: integer("customer_id").references(() => customers.id),
  status: varchar("status", { length: 30 }).notNull().default("pending"),
  // pending, confirmed, processing, shipped, delivered, cancelled

  // Contact
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 30 }),

  // Shipping address
  shipFirstName: varchar("ship_first_name", { length: 100 }).notNull(),
  shipLastName: varchar("ship_last_name", { length: 100 }).notNull(),
  shipStreet: varchar("ship_street", { length: 255 }).notNull(),
  shipCity: varchar("ship_city", { length: 100 }).notNull(),
  shipState: varchar("ship_state", { length: 50 }).notNull(),
  shipZip: varchar("ship_zip", { length: 20 }).notNull(),
  shipCountry: varchar("ship_country", { length: 50 }).notNull().default("US"),

  // Totals
  subtotal: decimal("subtotal", { precision: 10, scale: 2 }).notNull(),
  shippingCost: decimal("shipping_cost", { precision: 10, scale: 2 }).notNull().default("0"),
  taxAmount: decimal("tax_amount", { precision: 10, scale: 2 }).notNull().default("0"),
  total: decimal("total", { precision: 10, scale: 2 }).notNull(),

  // Payment
  paymentMethod: varchar("payment_method", { length: 30 }),
  paymentStatus: varchar("payment_status", { length: 30 }).default("unpaid"),
  paymentIntentId: varchar("payment_intent_id", { length: 255 }),

  // Shipping
  shippingMethod: varchar("shipping_method", { length: 100 }),
  trackingNumber: varchar("tracking_number", { length: 100 }),

  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull().references(() => orders.id),
  productId: integer("product_id").references(() => products.id),
  sku: varchar("sku", { length: 60 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  tireSize: varchar("tire_size", { length: 20 }),
  qty: integer("qty").notNull(),
  unitPrice: decimal("unit_price", { precision: 10, scale: 2 }).notNull(),
  totalPrice: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
});

// ─── Cart (server-side for logged-in users) ───
export const carts = pgTable("carts", {
  id: serial("id").primaryKey(),
  sessionId: varchar("session_id", { length: 100 }).notNull().unique(),
  customerId: integer("customer_id").references(() => customers.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  cartId: integer("cart_id").notNull().references(() => carts.id),
  productId: integer("product_id").notNull().references(() => products.id),
  qty: integer("qty").notNull().default(1),
});

// ─── Reviews ───
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull().references(() => products.id),
  customerId: integer("customer_id").references(() => customers.id),
  rating: integer("rating").notNull(),
  title: varchar("title", { length: 200 }),
  body: text("body"),
  isVerified: boolean("is_verified").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ─── Promotions ───
export const promotions = pgTable("promotions", {
  id: serial("id").primaryKey(),
  code: varchar("code", { length: 50 }).notNull().unique(),
  description: text("description"),
  discountType: varchar("discount_type", { length: 20 }).notNull(), // percentage, fixed
  discountValue: decimal("discount_value", { precision: 10, scale: 2 }).notNull(),
  minOrderAmount: decimal("min_order_amount", { precision: 10, scale: 2 }),
  maxUses: integer("max_uses"),
  usedCount: integer("used_count").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  startsAt: timestamp("starts_at"),
  endsAt: timestamp("ends_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
