import { DrizzleDB } from "$lib/Drizzle";
import { user } from "../schemas/authentication.schema";

export const UserSeed = async () => {
	const payload = [
		{
			id: 'test',
			name: 'TestUser',
			email: 'test@gmail.com',
			emailVerified: false,
			image: 'https://placehold.co/600x400?text=Deleted',
			role: 'user'
		}
	];

    let successfulSeed = true;
	for (const item of payload) {
        try {
            await DrizzleDB.insert(user).values(item)
            .onConflictDoNothing({ target: user.id })
            .execute()
        }
        catch(error) {
            console.error(`Error seeding user ${item.name}:`, error);
            successfulSeed = false;
        }
    };


    return successfulSeed;
};