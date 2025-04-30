'use client';

import { useRouter } from 'next/navigation';
import MessageForm from './MessageForm';

interface ChatContainerProps {
  chatId: string;
}

export default function ChatContainer({ chatId }: ChatContainerProps) {
  const router = useRouter();

  const handleMessageSent = () => {
    // Refresh the page to show the new message
    router.refresh();
  };

  return (
    <div>
      <MessageForm chatId={chatId} onMessageSent={handleMessageSent} />
    </div>
  );
}
