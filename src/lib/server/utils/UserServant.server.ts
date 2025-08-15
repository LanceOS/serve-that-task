import { DrizzleDB } from '$lib/Drizzle';
import { eq } from 'drizzle-orm';
import { profile } from '../schemas/profile.schema';

export const UserServant = {
	createProfile: async (id: string) => {
		try {
			await DrizzleDB.insert(profile).values({
				userId: id
			});
		} catch (error: unknown) {
			throw new Error(`${error}`);
		}
	},

	getUserProfile: async (id: string) => {
		try {
			return await DrizzleDB.query.profile.findFirst({
                where: eq(profile.userId, id),
                with: {
                    user: true
                }
            })
		} catch (error: unknown) {
			throw new Error(`${error}`);
		}
	}
};
