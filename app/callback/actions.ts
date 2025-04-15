'use server';

import {AuthClient} from "saasus-sdk";
import {cookies} from "next/headers";

export async function getCredentialsAndSaveToCookie(code: string): Promise<{ success: boolean }> {
    const authClient = new AuthClient();
    const res = await authClient.credentialApi.getAuthCredentials(code, 'tempCodeAuth');
    const idToken = res.data.id_token
    const accessToken = res.data.access_token;
    const refreshToken = res.data.refresh_token;
    if (!idToken || !accessToken || !refreshToken) {
        return {success: false}
    }

    try {
        const cookieStore = await cookies();
        cookieStore.set('SaaSusIdToken', idToken, {
            // httpOnly: true,
            // sameSite: 'strict',
        });
        cookieStore.set('SaaSusAccessToken', accessToken, {
            // httpOnly: true,
            // sameSite: 'strict',
        });
        cookieStore.set('SaaSusRefreshToken', refreshToken!, {
            // httpOnly: true,
            // sameSite: 'strict',
        });
    } catch (e) {
        console.log(e)
        return {success: false};
    }

    return {success: true};
}
