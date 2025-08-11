import { relations } from 'drizzle-orm';
import { Org } from './organization.schema';
import { user } from './authentication.schema';

export const organizationRelation = relations(Org, ({ one }) => ({
	user: one(user, {
		fields: [Org.ownerId],
		references: [user.id]
	})
}));
