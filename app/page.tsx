import {getAuthenticatedUser} from "@/app/_auth/actions";

export default async function Home() {
    const user = await getAuthenticatedUser()
    if (!user) {
        return <div>error</div>
    }

    return (
        <div>
            <h1>チャット画面</h1>
        </div>
    );
}
