import { sql } from 'drizzle-orm';
import { uuid } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';

export const document = pgTable('document', {
	id: uuid('id')
		.primaryKey()
		.defaultRandom()
});
