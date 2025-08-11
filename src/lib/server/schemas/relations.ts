import { relations } from "drizzle-orm";
import { Organization } from "./organization.schema";
import { user } from "./authentication.schema";


export const organizationRelation = relations(Organization, ({ one }) => ({
    user: one(user, {
        fields: [Organization.owner],
        references: [user.id]
    })
}))