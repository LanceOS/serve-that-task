CREATE TABLE "workspace_members" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"workspace_id" uuid NOT NULL,
	"user_id" text
);
--> statement-breakpoint
ALTER TABLE "user_metadata" DROP CONSTRAINT "user_metadata_associated_workspace_workspace_id_fk";
--> statement-breakpoint
ALTER TABLE "user_metadata" ADD COLUMN "preferred_theme" text DEFAULT 'dim';--> statement-breakpoint
ALTER TABLE "user_metadata" ADD COLUMN "online" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "workspace_members" ADD CONSTRAINT "workspace_members_workspace_id_workspace_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspace"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workspace_members" ADD CONSTRAINT "workspace_members_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_metadata" DROP COLUMN "associated_workspace";