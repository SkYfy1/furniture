CREATE TYPE "public"."size" AS ENUM('small', 'medium', 'large');--> statement-breakpoint
CREATE TABLE "product_variants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_id" uuid NOT NULL,
	"sku" text NOT NULL,
	"size" "size",
	"color" text,
	"price" integer NOT NULL,
	"discount" integer,
	"discounted_price" integer NOT NULL,
	"imageUrl" text NOT NULL,
	"available_quantity" integer DEFAULT 10 NOT NULL,
	CONSTRAINT "product_variants_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_product_id_product_table_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product_table"("id") ON DELETE no action ON UPDATE no action;