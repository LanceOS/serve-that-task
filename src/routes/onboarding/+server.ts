import { auth } from '$lib/auth'
import { ResponseHelper } from '$lib/server/helpers/Response.helper.js';



export const POST = async ({ request }): Promise<Response> => {
    try {
        const body = await request.json()

        const session = await auth.api.getSession({
            headers: request.headers
        })
        const user = session?.user;

        if(!user) {
            return ResponseHelper.jsonResponse({ error: "User must be authenticated!" }, 401)
        }

        return ResponseHelper.jsonResponse()
    }
    catch(error) {
        return ResponseHelper.jsonResponse({ error: error }, 500)
    }
}