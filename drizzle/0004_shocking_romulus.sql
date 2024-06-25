CREATE TABLE IF NOT EXISTS "credit_card" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"card_number" text NOT NULL,
	"card_holder_name" text NOT NULL,
	"expiration_date" text NOT NULL,
	"cvv" text NOT NULL,
	"card_type" text NOT NULL,
	"card_color" text,
	"notes" text,
	"created_at" timestamp DEFAULT now()
);
