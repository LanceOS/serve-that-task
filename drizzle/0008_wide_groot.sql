ALTER TABLE "project_metadata" ADD COLUMN "num_of_tasks" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "workspace_metadata" ADD COLUMN "num_of_projects" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "workspace_metadata" ADD COLUMN "num_of_members" integer DEFAULT 1;