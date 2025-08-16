import { relations } from 'drizzle-orm';
import { org } from './organization.schema';
import { user } from './authentication.schema';
import { profile } from './profile.schema';

export const organizationRelation = relations(org, ({ one }) => ({
	user: one(user, {
		fields: [org.ownerId],
		references: [user.id]
	})
}));


export const profilesRelations = relations(profile, ({ one }) => ({
  // A profile belongs to one user
  user: one(user, {
    fields: [profile.userId],
    references: [user.id],
  }),
}));