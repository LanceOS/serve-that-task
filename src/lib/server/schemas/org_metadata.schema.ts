import { uuid } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';

export const orgMetadata = pgTable('org_metadata', {
	id: uuid('id')
		.primaryKey()
		.defaultRandom()
});
