import Link from "next/link";
import {getOwnChats} from "@/app/_chats/actions";

// Chat room type definition
interface Chat {
    id: string;
    name: string;
}

export default async function Home() {
    const chats = await getOwnChats()

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">チャット部屋一覧</h1>

            <div className="space-y-4">
                {chats?.map((chat: Chat) => (
                    <Link
                        href={`/chat/${chat.id}`}
                        key={chat.id}
                        className="block"
                    >
                        <div
                            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-semibold">{chat.name}</h2>
                            </div>
                            {/*<p className="text-gray-600 mt-1 truncate">{room.lastMessage}</p>*/}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
