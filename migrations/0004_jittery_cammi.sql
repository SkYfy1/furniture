CREATE TYPE "public"."DELIVERY_STATUS" AS ENUM('PENDING', 'SENDED', 'WAITING', 'FULFILLED', 'REJECTED');--> statement-breakpoint
CREATE TYPE "public"."ORDER_STATUS" AS ENUM('CREATED', 'PROCESSING', 'FULLFILLED', 'REJECTED');--> statement-breakpoint
CREATE TYPE "public"."PAYMENT_STATUS" AS ENUM('PENDING', 'PAID', 'REJECTED');--> statement-breakpoint
CREATE TYPE "public"."PAYMENT_TYPE" AS ENUM('CARD', 'CASH', 'CRYPTO');--> statement-breakpoint
CREATE TYPE "public"."SHIPPING_SERVICE" AS ENUM('NOVAPOST', 'MEEST', 'UKRPOSTA');--> statement-breakpoint
CREATE TABLE "delivery_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"shipping_service" "SHIPPING_SERVICE" DEFAULT 'NOVAPOST' NOT NULL,
	"delivery_status" "DELIVERY_STATUS" DEFAULT 'PENDING',
	"send_date" timestamp with time zone,
	"arrival_date" timestamp with time zone,
	CONSTRAINT "delivery_table_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "order_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order_id" uuid NOT NULL,
	"product_id" uuid NOT NULL,
	"price_at_purchase" integer NOT NULL,
	"quantity" integer NOT NULL,
	"size" text,
	"color" text,
	CONSTRAINT "order_items_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "orders_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"client_id" uuid NOT NULL,
	"shipping_info" uuid NOT NULL,
	"payment_info" uuid NOT NULL,
	"order_date" timestamp with time zone DEFAULT now(),
	"summary_price" integer NOT NULL,
	"order_status" "ORDER_STATUS" DEFAULT 'CREATED',
	CONSTRAINT "orders_table_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "payment_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"payment_type" "PAYMENT_TYPE" DEFAULT 'CARD' NOT NULL,
	"payment_status" "PAYMENT_STATUS" DEFAULT 'PENDING',
	"payment_date" timestamp with time zone DEFAULT now(),
	CONSTRAINT "payment_table_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_orders_table_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders_table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_product_id_product_variants_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product_variants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders_table" ADD CONSTRAINT "orders_table_client_id_user_table_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."user_table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders_table" ADD CONSTRAINT "orders_table_shipping_info_delivery_table_id_fk" FOREIGN KEY ("shipping_info") REFERENCES "public"."delivery_table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders_table" ADD CONSTRAINT "orders_table_payment_info_payment_table_id_fk" FOREIGN KEY ("payment_info") REFERENCES "public"."payment_table"("id") ON DELETE no action ON UPDATE no action;