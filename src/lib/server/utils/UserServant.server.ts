import { eq } from 'drizzle-orm';
import { profile } from '../schemas/profile.schema';
import { userMetadata } from '../schemas/user_metadata.schema';
import { DrizzleDB } from '../../Drizzle';
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
			});
		} catch (error: unknown) {
			throw new Error(`${error}`);
		}
	},

	createUserMetadata: async (id: string) => {
		try {
			await DrizzleDB.insert(userMetadata).values({
				userId: id
			});
		} catch (error: unknown) {
			throw new Error(`${error}`);
		}
	},

	assignUserName: async (name: string, userId: string) => {
		try {
			await DrizzleDB.update(user)
				.set({
					name: name
				})
				.where(eq(user.id, userId));
		} catch (error: unknown) {
			throw new Error(`${error}`);
		}
	},
	
};
