ALTER TABLE "invoice" RENAME COLUMN "purchaser" TO "stripe_customer_id";--> statement-breakpoint
ALTER TABLE "invoice" RENAME COLUMN "period_end" TO "current_period_end";--> statement-breakpoint
ALTER TABLE "invoice" DROP CONSTRAINT "invoice_purchaser_user_id_fk";
--> statement-breakpoint
ALTER TABLE "invoice" ADD COLUMN "stripe_subscription_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "invoice" DROP COLUMN "amount";--> statement-breakpoint
ALTER TABLE "invoice" DROP COLUMN "currency";--> statement-breakpoint
ALTER TABLE "invoice" DROP COLUMN "period_start";--> statement-breakpoint
ALTER TABLE "invoice" DROP COLUMN "paid_at";--> statement-breakpoint
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_stripe_customer_id_unique" UNIQUE("stripe_customer_id");--> statement-breakpoint
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_stripe_subscription_id_unique" UNIQUE("stripe_subscription_id");