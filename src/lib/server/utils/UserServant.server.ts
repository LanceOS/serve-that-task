import { DrizzleDB } from "$lib/Drizzle";
import { profile } from "../schemas/profile.schema";


export const UserServant = {
    createProfile: async (id: string) => {
        try {
            await DrizzleDB.insert(profile).values({
                userId: id
            })
        }
        catch(error: unknown) {
            throw new Error(`${error}`)
        }
    }
}