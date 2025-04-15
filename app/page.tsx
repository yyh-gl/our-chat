import {cookies} from "next/headers";

export default async function Home() {
    const cookieStore = await cookies();

    const idToken = cookieStore.get("SaaSusIdToken")!.value
    const accessToken = cookieStore.get("SaaSusAccessToken")!.value
    const refreshToken = cookieStore.get("SaaSusRefreshToken")!.value

    return (
        <div>
            <h1>トークン情報</h1>
            <div>
                <h2>ID Token:</h2>
                <p style={{wordBreak: 'break-all'}}>{idToken || 'トークンがありません'}</p>
            </div>
            <div>
                <h2>Access Token:</h2>
                <p style={{wordBreak: 'break-all'}}>{accessToken || 'トークンがありません'}</p>
            </div>
            <div>
                <h2>Refres Token:</h2>
                <p style={{wordBreak: 'break-all'}}>{refreshToken || 'トークンがありません'}</p>
            </div>
        </div>
    );
}
