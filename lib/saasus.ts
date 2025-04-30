import {type NextRequest, NextResponse} from "next/server";
import {AuthClient} from "saasus-sdk";
import {User} from "@/type/user.type";

export async function getSaaSusUser(request: NextRequest) {
    const cookieStore = request.cookies;
    const idToken = cookieStore.get('SaaSusIdToken')?.value
    if (!idToken) {
        return NextResponse.redirect(new URL(process.env.SAASUS_LOGIN_URL || ''))
    }

    const authClient = new AuthClient()
    const response = await authClient.userInfoApi.getUserInfo(idToken, {})
    const user: User = response.data
    if (!user) {
        return NextResponse.redirect(new URL(process.env.SAASUS_LOGIN_URL || ''))
    }
    return user
}
