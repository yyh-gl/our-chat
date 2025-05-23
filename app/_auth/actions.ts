'use server';

import {AuthClient} from "saasus-sdk";
import {cookies} from "next/headers";

const authClient = new AuthClient();

type AuthActionResult = {
    success: boolean
}

export async function authenticateByTmpCode(code: string): Promise<AuthActionResult> {
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
            httpOnly: true,
            sameSite: 'strict',
            path: '/',
        });
        cookieStore.set('SaaSusAccessToken', accessToken, {
            httpOnly: true,
            sameSite: 'strict',
            path: '/',
        });
        cookieStore.set('SaaSusRefreshToken', refreshToken!, {
            httpOnly: true,
            sameSite: 'strict',
            path: '/',
        });
    } catch (e) {
        console.log(e)
        return {success: false};
    }

    return {success: true};
}
