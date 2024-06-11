CREATE TABLE IF NOT EXISTS "passwords" (
	"id" text PRIMARY KEY NOT NULL,
	"account_email" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"user_id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
