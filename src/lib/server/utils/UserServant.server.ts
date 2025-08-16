import { DrizzleDB } from '$lib/Drizzle';
import { eq } from 'drizzle-orm';
import { profile } from '../schemas/profile.schema';
import { user } from '../schemas/authentication.schema';

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
	},



	checkOnboarding: async (id: string) => {
		try {
			return await DrizzleDB.query.userMetadata.findFirst({
				where: eq(user.id, id)
			})
		}
		catch(error: unknown) {
			throw new Error(`${error}`);

		}
	}
};
