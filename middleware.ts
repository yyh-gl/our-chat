import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'
import {AuthClient} from "saasus-sdk";

export async function middleware(request: NextRequest) {
    const cookieStore = request.cookies;
    const idToken = cookieStore.get('SaaSusIdToken')?.value
    if (!idToken) {
        return NextResponse.redirect(new URL(process.env.SAASUS_LOGIN_URL || ''))
    }

    try {
        const authClient = new AuthClient()
        const response = await authClient.userInfoApi.getUserInfo(idToken, {})
        const userInfo = response.data
        if (!userInfo) {
            return NextResponse.redirect(new URL(process.env.SAASUS_LOGIN_URL || ''))
        }
    } catch (e) {
        console.log(e)
        return NextResponse.redirect(new URL(process.env.SAASUS_LOGIN_URL || ''))
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/((?!api|_next/static|_next/image|favicon.ico|callback).*)',
}
