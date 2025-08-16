import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from '../../[user]/$types';
import { UserServant } from '$lib/server/utils/UserServant.server';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const userId = params.user;
		const res = await UserServant.getUserProfile(userId)
		return {
			profile: res
		};
	} catch (error) {
		return fail(500, { error: 'Failed to get user data' });
	}
};
