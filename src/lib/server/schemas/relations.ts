import { relations } from 'drizzle-orm';
import { team } from './team.schema';
import { profile } from './profile.schema';
import { user } from './authentication.schema';

export const teamRealtions = relations(team, ({ one }) => ({
	user: one(user, {
		fields: [team.ownerId],
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