CREATE TYPE "public"."role" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TABLE "user_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"role" "role" DEFAULT 'user',
	CONSTRAINT "user_table_id_unique" UNIQUE("id"),
	CONSTRAINT "user_table_email_unique" UNIQUE("email")
);
