CREATE TABLE IF NOT EXISTS "passwords" (
	"id" text PRIMARY KEY NOT NULL,
	"account_email" text,
	"account_name" text NOT NULL,
	"account_passowrd" text NOT NULL,
	"notes" text,
	"site_url" text,
	"author_id" text NOT NULL
);
