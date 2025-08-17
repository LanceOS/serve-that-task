ALTER TABLE "org_metadata" RENAME TO "team_metadata";--> statement-breakpoint
ALTER TABLE "organization" RENAME TO "team";--> statement-breakpoint
ALTER TABLE "invoice" RENAME COLUMN "org_id" TO "team_id";--> statement-breakpoint
ALTER TABLE "project" RENAME COLUMN "parent_org_id" TO "parent_team_id";--> statement-breakpoint
ALTER TABLE "task_group" RENAME COLUMN "parent_org_id" TO "parent_team_id";--> statement-breakpoint
ALTER TABLE "invoice" DROP CONSTRAINT "invoice_org_id_organization_id_fk";
--> statement-breakpoint
ALTER TABLE "team" DROP CONSTRAINT "organization_owner_user_id_fk";
--> statement-breakpoint
ALTER TABLE "project" DROP CONSTRAINT "project_parent_org_id_organization_id_fk";
--> statement-breakpoint
ALTER TABLE "task_group" DROP CONSTRAINT "task_group_parent_org_id_organization_id_fk";
--> statement-breakpoint
ALTER TABLE "user_metadata" DROP CONSTRAINT "user_metadata_associated_org_organization_id_fk";
--> statement-breakpoint
ALTER TABLE "team" ALTER COLUMN "type" SET DEFAULT 'team';--> statement-breakpoint
ALTER TABLE "team" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_team_id_team_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."team"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "team" ADD CONSTRAINT "team_owner_user_id_fk" FOREIGN KEY ("owner") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project" ADD CONSTRAINT "project_parent_team_id_team_id_fk" FOREIGN KEY ("parent_team_id") REFERENCES "public"."team"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "task_group" ADD CONSTRAINT "task_group_parent_team_id_team_id_fk" FOREIGN KEY ("parent_team_id") REFERENCES "public"."team"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_metadata" ADD CONSTRAINT "user_metadata_associated_org_team_id_fk" FOREIGN KEY ("associated_org") REFERENCES "public"."team"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "team" DROP COLUMN "timezone";--> statement-breakpoint
ALTER TABLE "team" DROP COLUMN "country";--> statement-breakpoint
ALTER TABLE "team" DROP COLUMN "state";--> statement-breakpoint
ALTER TABLE "team" DROP COLUMN "city";--> statement-breakpoint
ALTER TABLE "team" DROP COLUMN "postal_code";--> statement-breakpoint
ALTER TABLE "team" DROP COLUMN "address";