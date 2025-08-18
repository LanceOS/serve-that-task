ALTER TABLE "workspace_members" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "project_metadata" ADD COLUMN "num_of_members" integer DEFAULT 1;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "description" text NOT NULL;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "type" text DEFAULT 'project' NOT NULL;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "is_deleted" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;