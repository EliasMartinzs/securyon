import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const passwords = pgTable("passwords", {
  id: text("id").primaryKey(),
  accountEmail: text("account_email"),
  accountName: text("account_name").notNull(),
  accountPassword: text("account_passowrd").notNull(),
  notes: text("notes"),
  siteUrl: text("site_url"),
  authorId: text("author_id").notNull(),
});

export const insertPasswordsSchema = createInsertSchema(passwords);
