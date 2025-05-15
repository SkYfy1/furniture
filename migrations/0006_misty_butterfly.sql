ALTER TABLE "delivery_table" RENAME COLUMN "full_name" TO "first_name";--> statement-breakpoint
ALTER TABLE "delivery_table" ADD COLUMN "last_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "delivery_table" ADD COLUMN "country" text NOT NULL;--> statement-breakpoint
ALTER TABLE "delivery_table" ADD COLUMN "city" text NOT NULL;--> statement-breakpoint
ALTER TABLE "delivery_table" ADD COLUMN "state" text NOT NULL;--> statement-breakpoint
ALTER TABLE "delivery_table" ADD COLUMN "zip_code" integer NOT NULL;