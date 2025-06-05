CREATE TYPE "public"."DISCOUNT_TYPE_ENUM" AS ENUM('PERCENTAGE', 'FIXED');--> statement-breakpoint
CREATE TABLE "coupon_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"coupon_code" text NOT NULL,
	"discount_type" "DISCOUNT_TYPE_ENUM" DEFAULT 'PERCENTAGE',
	"discount_value" integer NOT NULL,
	"usage_limit" integer DEFAULT 5 NOT NULL,
	"times_used" integer DEFAULT 0,
	"min_order_amount" integer DEFAULT 1 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"expires_at" timestamp NOT NULL,
	CONSTRAINT "coupon_table_id_unique" UNIQUE("id"),
	CONSTRAINT "coupon_table_coupon_code_unique" UNIQUE("coupon_code")
);
