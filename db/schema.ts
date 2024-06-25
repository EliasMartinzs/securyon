import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const passwords = pgTable("passwords", {
  id: text("id").primaryKey(),
  accountEmail: text("account_email"),
  accountName: text("account_name").notNull(),
  accountPassword: text("account_passowrd").notNull(),
  companyName: text("company_name"),
  notes: text("notes"),
  siteUrl: text("site_url"),
  authorId: text("author_id").notNull(),
});

export const insertPasswordsSchema = createInsertSchema(passwords);

export const creditCard = pgTable("credit_card", {
  id: text("id").primaryKey(),
  authorId: text("user_id").notNull(),
  cardNumber: text("card_number").notNull(),
  cardHolderName: text("card_holder_name").notNull(),
  expirationDate: text("expiration_date").notNull(),
  cvv: text("cvv").notNull(),
  cardType: text("card_type").notNull(),
  cardColor: text("card_color"),
  notes: text("notes"),
  createdAt: timestamp("created_at", {
    mode: "string",
  }).defaultNow(),
});

export const insertCreditCards = createInsertSchema(creditCard);
