import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'
import {getSaaSusUser} from "@/lib/saasus";

export async function middleware(request: NextRequest) {
    try {
        const user = getSaaSusUser(request)
        if (!user) {
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
