import { text, uuid } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';
import { defaults } from './structures/base.schema';
import { user } from './authentication.schema';
import type { InferSelectModel } from 'drizzle-orm';

export const team = pgTable('team', {
	id: uuid('id')
		.primaryKey()
		.defaultRandom(),
	name: text('name').notNull(),       
	description: text('description'),  
	ownerId: text('owner')
		.references(() => user.id)
		.notNull(),
	...defaults('team')
});

export type TeamSchema = InferSelectModel<typeof team>;
