import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"

// טבלת נכסים
export const properties = sqliteTable("properties", {
  id: text("id").primaryKey(),
  address: text("address").notNull(),
  type: text("type").notNull(),
  status: text("status").default("active"),
  price: real("price").notNull(),
  rooms: integer("rooms"),
  size: real("size"),
  floor: integer("floor"),
  totalFloors: integer("total_floors"),
  parking: integer("parking", { mode: "boolean" }),
  elevator: integer("elevator", { mode: "boolean" }),
  description: text("description"),
  features: text("features"), // JSON string
  images: text("images"), // JSON string
  userId: text("user_id"),
  metadata: text("metadata"), // JSON string
  published: integer("published", { mode: "boolean" }).default(true),
  featured: integer("featured", { mode: "boolean" }).default(false),
  bathrooms: integer("bathrooms"),
  location: text("location"), // JSON: {lat, lng}
  contact: text("contact"), // JSON: {name, phone, email}
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
})

// טבלת לידים
export const leads = sqliteTable("leads", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  source: text("source").notNull(),
  propertyId: text("property_id"),
  status: text("status").default("new"),
  notes: text("notes"),
  metadata: text("metadata"), // JSON string
  userId: text("user_id"),
  customerId: text("customer_id"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
})

// טבלת מפתחות אינטגרציה
export const integrationKeys = sqliteTable("integration_keys", {
  id: text("id").primaryKey(),
  key: text("key").notNull().unique(),
  name: text("name"),
  active: integer("active", { mode: "boolean" }).default(true),
  permissions: text("permissions"), // JSON string
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
})

// טיפוסים לשימוש באפליקציה
export type Property = typeof properties.$inferSelect
export type NewProperty = typeof properties.$inferInsert
export type Lead = typeof leads.$inferSelect
export type NewLead = typeof leads.$inferInsert
export type IntegrationKey = typeof integrationKeys.$inferSelect
export type NewIntegrationKey = typeof integrationKeys.$inferInsert
