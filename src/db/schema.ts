import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  companyName: varchar("company_name", { length: 255 }).notNull(),
  contactName: varchar("contact_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  country: varchar("country", { length: 100 }),
  inquiryType: varchar("inquiry_type", { length: 100 }).notNull(),
  productInterest: varchar("product_interest", { length: 255 }),
  estimatedQuantity: varchar("estimated_quantity", { length: 100 }),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
