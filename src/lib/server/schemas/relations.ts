import { relations } from 'drizzle-orm';
import { Org } from './organization.schema';
import { user } from './authentication.schema';
import { profile } from './profile.schema';

export const organizationRelation = relations(Org, ({ one }) => ({
	user: one(user, {
		fields: [Org.ownerId],
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