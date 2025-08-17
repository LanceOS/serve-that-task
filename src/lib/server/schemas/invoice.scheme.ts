import { timestamp, uuid } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';
import { team } from './team.schema';
import { text } from 'drizzle-orm/pg-core';

export const invoice = pgTable('invoice', {
	id: uuid('id')
		.primaryKey()
		.defaultRandom(),
	orgId: uuid('team_id')
		.references(() => team.id)
		.notNull(),
	stripeCustomerId: text('stripe_customer_id').unique().notNull(),
	stripeSubscriptionId: text('stripe_subscription_id').unique().notNull(),
	status: text('status').notNull(), 
	currentPeriodEnd: timestamp('current_period_end').notNull(),
	type: text('type').default('invoice').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at')
		.defaultNow()
		.$onUpdate(() => new Date())
});
