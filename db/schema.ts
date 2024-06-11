import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const passwords = pgTable("passwords", {
  id: text("id").primaryKey(),
  accountEmail: text("account_email"),
  authorId: text("author_id").notNull(),
});

export const insertPasswordsSchema = createInsertSchema(passwords);
