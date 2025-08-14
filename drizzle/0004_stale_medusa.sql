CREATE TABLE "messages" (

);
--> statement-breakpoint
CREATE TABLE "user_metadata" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"completed_onboarding" boolean DEFAULT false
);
--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "name" SET DEFAULT 'User';--> statement-breakpoint
ALTER TABLE "user_metadata" ADD CONSTRAINT "user_metadata_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;