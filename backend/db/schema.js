import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"; // or pg-core/mysql-core depending on your DB type

export const favorites = sqliteTable("favorites", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  customerId: text("customer_id").notNull(),
  productId: text("product_id").notNull(),
  productTitle: text("product_title").notNull(),
  
  // ADD THESE 3 NEW TEXT FIELDS:
  productHandle: text("product_handle"),
  productImage: text("product_image"),
  productPrice: text("product_price"),
});