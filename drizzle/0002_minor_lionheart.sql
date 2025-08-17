ALTER TABLE "user_metadata" RENAME COLUMN "has_organization" TO "has_team";--> statement-breakpoint
ALTER TABLE "user_metadata" RENAME COLUMN "associated_org" TO "associated_team";--> statement-breakpoint
ALTER TABLE "user_metadata" DROP CONSTRAINT "user_metadata_associated_org_team_id_fk";
--> statement-breakpoint
ALTER TABLE "user_metadata" ADD CONSTRAINT "user_metadata_associated_team_team_id_fk" FOREIGN KEY ("associated_team") REFERENCES "public"."team"("id") ON DELETE no action ON UPDATE no action;