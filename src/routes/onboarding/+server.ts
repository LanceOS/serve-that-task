import { auth } from '$lib/auth';
import { ResponseHelper } from '$lib/server/helpers/Response.helper.js';
import { OnboardingManager } from '$lib/server/utils/OnboardingManager.server.js';
import { UserServant } from '$lib/server/utils/UserServant.server.js';

export const POST = async ({ request }): Promise<Response> => {
	try {
		const body = await request.json();

		const session = await auth.api.getSession({
			headers: request.headers
		});
		const user = session?.user;

		if (!user) {
			return ResponseHelper.jsonResponse({ error: 'User must be authenticated!' }, 401);
		}

		if (!body.accountType) {
			return ResponseHelper.jsonResponse({ error: 'Missing account type!' }, 400);
		}

		if (!body.name) {
            return ResponseHelper.jsonResponse({ error: "Missing name!" }, 400)
		}

		switch (body.accountType) {
			case 'create_workspace':
				if (!body.workspaceName || !body.workspaceDescription) {
					return ResponseHelper.jsonResponse({ error: 'Missing fields!' }, 400);
				}
				await OnboardingManager.createUserWorkspace(user.id, {
					name: body.workspaceName,
					description: body.workspaceDescription
				});
				break;
			case 'join_workspace':
				if (!body.inviteCode) {
					return ResponseHelper.jsonResponse({ error: 'Invalid invite code!' }, 400);
				}
				await OnboardingManager.assignUserToWorkspace(user.id, body.inviteCode);
				break;
			default:
				return ResponseHelper.jsonResponse({ error: 'Invalid account type' }, 400);
		}
		await UserServant.assignUserName(body.name, user.id);

		return ResponseHelper.jsonResponse({ message: 'Successfully onboarded user! ' }, 200);
	} catch (error) {
		return ResponseHelper.jsonResponse({ error: error }, 500);
	}
};
