ALTER TABLE "team_metadata" RENAME TO "workspace_metadata";--> statement-breakpoint
ALTER TABLE "team" RENAME TO "workspace";--> statement-breakpoint
ALTER TABLE "invoice" RENAME COLUMN "team_id" TO "workspace_id";--> statement-breakpoint
ALTER TABLE "project" RENAME COLUMN "parent_team_id" TO "parent_workspace_id";--> statement-breakpoint
ALTER TABLE "task_group" RENAME COLUMN "parent_team_id" TO "parent_workspace_id";--> statement-breakpoint
ALTER TABLE "user_metadata" RENAME COLUMN "has_team" TO "has_workspace";--> statement-breakpoint
ALTER TABLE "user_metadata" RENAME COLUMN "associated_team" TO "associated_workspace";--> statement-breakpoint
ALTER TABLE "invoice" DROP CONSTRAINT "invoice_team_id_team_id_fk";
--> statement-breakpoint
ALTER TABLE "project" DROP CONSTRAINT "project_parent_team_id_team_id_fk";
--> statement-breakpoint
ALTER TABLE "task_group" DROP CONSTRAINT "task_group_parent_team_id_team_id_fk";
--> statement-breakpoint
ALTER TABLE "workspace" DROP CONSTRAINT "team_owner_user_id_fk";
--> statement-breakpoint
ALTER TABLE "user_metadata" DROP CONSTRAINT "user_metadata_associated_team_team_id_fk";
--> statement-breakpoint
ALTER TABLE "workspace" ALTER COLUMN "type" SET DEFAULT 'workspace';--> statement-breakpoint
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_workspace_id_workspace_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspace"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project" ADD CONSTRAINT "project_parent_workspace_id_workspace_id_fk" FOREIGN KEY ("parent_workspace_id") REFERENCES "public"."workspace"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "task_group" ADD CONSTRAINT "task_group_parent_workspace_id_workspace_id_fk" FOREIGN KEY ("parent_workspace_id") REFERENCES "public"."workspace"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workspace" ADD CONSTRAINT "workspace_owner_user_id_fk" FOREIGN KEY ("owner") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_metadata" ADD CONSTRAINT "user_metadata_associated_workspace_workspace_id_fk" FOREIGN KEY ("associated_workspace") REFERENCES "public"."workspace"("id") ON DELETE no action ON UPDATE no action;