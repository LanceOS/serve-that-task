ALTER TABLE "project" DROP CONSTRAINT "project_id_organization_id_fk";
--> statement-breakpoint
ALTER TABLE "project" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "project" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "parent_org_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "project" ADD CONSTRAINT "project_parent_org_id_organization_id_fk" FOREIGN KEY ("parent_org_id") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;