CREATE TABLE "project" (
	"id" uuid NOT NULL,
	"user_id" text NOT NULL,
	"project_name" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "task_group" ADD COLUMN "order" integer DEFAULT 1;--> statement-breakpoint
ALTER TABLE "task_group" ADD COLUMN "parent_project_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "project" ADD CONSTRAINT "project_id_organization_id_fk" FOREIGN KEY ("id") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project" ADD CONSTRAINT "project_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "task_group" ADD CONSTRAINT "task_group_parent_project_id_project_id_fk" FOREIGN KEY ("parent_project_id") REFERENCES "public"."project"("id") ON DELETE no action ON UPDATE no action;