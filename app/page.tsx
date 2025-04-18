import Link from "next/link";
import {getAuthenticatedUser} from "@/app/_auth/actions";
import {redirect} from "next/navigation";

// Chat room type definition
interface ChatRoom {
    id: string;
    name: string;
    lastMessage: string;
    lastMessageTime: string;
}

export default async function Home() {
    const user = await getAuthenticatedUser()
    if (!user) {
        redirect(process.env.SAASUS_LOGIN_URL || '')
    }

    // TODO: Fetch chat rooms from Supabase
    // Example implementation:
    // const { data: chatRooms, error } = await supabase
    //   .from('chat_rooms')
    //   .select('*')
    //   .order('last_message_time', { ascending: false });

    // Mock data for UI development
    const chatRooms: ChatRoom[] = [
        {
            id: '1',
            name: '一般',
            lastMessage: 'こんにちは！',
            lastMessageTime: '10:30'
        },
        {
            id: '2',
            name: '技術',
            lastMessage: 'Next.jsの新機能について話しましょう',
            lastMessageTime: '昨日'
        },
        {
            id: '3',
            name: 'マーケティング',
            lastMessage: '新しいキャンペーンのアイデアがあります',
            lastMessageTime: '2日前'
        },
        {
            id: '4',
            name: 'サポート',
            lastMessage: 'お客様からの問い合わせに対応しました',
            lastMessageTime: '3日前'
        },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">チャット部屋一覧</h1>

            <div className="space-y-4">
                {chatRooms.map((room) => (
                    <Link
                        href={`/chat/${room.id}`}
                        key={room.id}
                        className="block"
                    >
                        <div
                            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-semibold">{room.name}</h2>
                                <span
                                    className="text-sm text-gray-500">{room.lastMessageTime}</span>
                            </div>
                            <p className="text-gray-600 mt-1 truncate">{room.lastMessage}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
