ALTER TABLE "delivery_table" ALTER COLUMN "delivery_status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "delivery_table" ALTER COLUMN "delivery_status" SET DEFAULT 'PENDING'::text;--> statement-breakpoint
DROP TYPE "public"."DELIVERY_STATUS";--> statement-breakpoint
CREATE TYPE "public"."DELIVERY_STATUS" AS ENUM('PENDING', 'SENT', 'WAITING', 'FULFILLED', 'CANCELLED');--> statement-breakpoint
ALTER TABLE "delivery_table" ALTER COLUMN "delivery_status" SET DEFAULT 'PENDING'::"public"."DELIVERY_STATUS";--> statement-breakpoint
ALTER TABLE "delivery_table" ALTER COLUMN "delivery_status" SET DATA TYPE "public"."DELIVERY_STATUS" USING "delivery_status"::"public"."DELIVERY_STATUS";--> statement-breakpoint
ALTER TABLE "orders_table" ALTER COLUMN "order_status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "orders_table" ALTER COLUMN "order_status" SET DEFAULT 'CREATED'::text;--> statement-breakpoint
DROP TYPE "public"."ORDER_STATUS";--> statement-breakpoint
CREATE TYPE "public"."ORDER_STATUS" AS ENUM('CREATED', 'PROCESSING', 'FULFILLED', 'CANCELLED');--> statement-breakpoint
ALTER TABLE "orders_table" ALTER COLUMN "order_status" SET DEFAULT 'CREATED'::"public"."ORDER_STATUS";--> statement-breakpoint
ALTER TABLE "orders_table" ALTER COLUMN "order_status" SET DATA TYPE "public"."ORDER_STATUS" USING "order_status"::"public"."ORDER_STATUS";--> statement-breakpoint
ALTER TABLE "payment_table" ALTER COLUMN "payment_status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "payment_table" ALTER COLUMN "payment_status" SET DEFAULT 'PENDING'::text;--> statement-breakpoint
DROP TYPE "public"."PAYMENT_STATUS";--> statement-breakpoint
CREATE TYPE "public"."PAYMENT_STATUS" AS ENUM('PENDING', 'PAID', 'CANCELLED');--> statement-breakpoint
ALTER TABLE "payment_table" ALTER COLUMN "payment_status" SET DEFAULT 'PENDING'::"public"."PAYMENT_STATUS";--> statement-breakpoint
ALTER TABLE "payment_table" ALTER COLUMN "payment_status" SET DATA TYPE "public"."PAYMENT_STATUS" USING "payment_status"::"public"."PAYMENT_STATUS";