import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { auth } from '$lib/auth';
import { WorkspaceManager } from '$lib/server/utils/WorkspaceManager.server';

export const load: PageServerLoad = async ({ request }) => {
	try {
		const session = await auth.api.getSession({
			headers: request.headers
		});

		const user = session?.user;

		if (!user) {
			throw redirect(302, '/login');
		}

		const response = await WorkspaceManager.getWorkspaces(user.id);

		return {
			workspaces: response
		};
	} catch (error: unknown) {
		return fail(500, { error: 'Failed to get workspace data' });
	}
};
