'use client';

import {useState} from 'react';
import {sendMessage} from '@/app/chat/actions';

interface MessageFormProps {
    chatId: string;
    onMessageSent?: () => void;
}

export default function MessageForm({chatId, onMessageSent}: MessageFormProps) {
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!message.trim()) {
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            const result = await sendMessage(chatId, message.trim());

            if (result.success) {
                setMessage('');
                if (onMessageSent) {
                    onMessageSent();
                }
            } else {
                setError(result.error || 'メッセージの送信に失敗しました');
            }
        } catch (err) {
            setError('エラーが発生しました。もう一度お試しください。');
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mt-6">
            <form onSubmit={handleSubmit} className="flex flex-col">
                {error && (
                    <div
                        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}
                <div className="flex">
          <textarea
              className="flex-grow border rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="メッセージを入力..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isSubmitting}
              rows={2}
          />
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r-lg disabled:bg-blue-300"
                        disabled={isSubmitting || !message.trim()}
                    >
                        {isSubmitting ? '送信中...' : '送信'}
                    </button>
                </div>
            </form>
        </div>
    );
}
