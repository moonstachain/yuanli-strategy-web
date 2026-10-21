import { index, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const inquiries = sqliteTable("inquiries", {
  id: text("id").primaryKey(),
  requestKey: text("request_key").notNull(),
  payloadHash: text("payload_hash").notNull(),
  name: text("name").notNull(),
  business: text("business").notNull(),
  question: text("question").notNull(),
  contactType: text("contact_type").notNull(),
  contactValue: text("contact_value").notNull(),
  createdAt: text("created_at").notNull(),
  status: text("status").notNull().default("new"),
  submittedBy: text("submitted_by"),
  nextAction: text("next_action"),
  followUpAt: text("follow_up_at"),
  updatedAt: text("updated_at"),
}, (table) => [
  uniqueIndex("inquiries_request_key_unique").on(table.requestKey),
  index("inquiries_created_at_idx").on(table.createdAt),
  index("inquiries_contact_created_idx").on(table.contactValue, table.createdAt),
]);
