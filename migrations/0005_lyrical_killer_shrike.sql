ALTER TABLE "delivery_table" ADD COLUMN "user_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "delivery_table" ADD COLUMN "address" text NOT NULL;--> statement-breakpoint
ALTER TABLE "delivery_table" ADD COLUMN "full_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "delivery_table" ADD CONSTRAINT "delivery_table_user_id_user_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user_table"("id") ON DELETE no action ON UPDATE no action;