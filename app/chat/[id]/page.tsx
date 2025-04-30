import {getChatById, getChatMessagesById} from "@/app/chat/actions";
import Link from "next/link";
import ChatContainer from "./ChatContainer";

// Chat type definition
interface Chat {
    id: string;
    name: string;
}

// Message type definition
interface Message {
    id: string;
    chat_id: string;
    content: string;
    created_at: string;
    user_id?: string;
}

export default async function ChatPage({params}: { params: { id: string } }) {
    const chatId = params.id;
    const chat: Chat | null = await getChatById(chatId);
    const messages: Message[] = await getChatMessagesById(chatId) || [];

    if (!chat) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-6">チャットが見つかりません</h1>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center mb-6">
                <Link href="/" className="text-blue-500 hover:text-blue-700 mr-4">
                    ← 戻る
                </Link>
                <h1 className="text-2xl font-bold">{chat.name}</h1>
            </div>

            <div className="border rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">チャットID: {chat.id}</h2>
                </div>
            </div>

            <div className="border rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-4">メッセージ一覧</h2>
                {messages.length === 0 ? (
                    <p className="text-gray-500">メッセージはありません</p>
                ) : (
                    <div className="space-y-4">
                        {messages.map((message) => (
                            <div key={message.id} className="border-b pb-2">
                                <div className="flex justify-between">
                                    <p className="whitespace-pre-wrap">{message.content}</p>
                                    <span className="text-xs text-gray-500">
                                        {new Date(message.created_at).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Message input form */}
            <ChatContainer chatId={chat.id}/>
        </div>
    );
}
