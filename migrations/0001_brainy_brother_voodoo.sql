CREATE TABLE "product_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"category" text NOT NULL,
	"description" text NOT NULL,
	"price" integer NOT NULL,
	"imageUrl" text NOT NULL,
	"dimentions" jsonb NOT NULL,
	"discount" integer,
	"discounted_price" integer NOT NULL,
	"tags" text[],
	CONSTRAINT "product_table_id_unique" UNIQUE("id")
);
