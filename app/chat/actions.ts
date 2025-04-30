'use server';

import {createSupabaseClient} from "@/lib/supabase";

export async function getOwnChats() {
    const supabase = await createSupabaseClient();
    const {data: chats, error} = await supabase
        .from('chats')
        .select('*')
    if (error) {
        console.log('Failed to fetch chats: ' + error);
        return null
    }
    return chats
}

export async function getChatById(chatId: string) {
    const supabase = await createSupabaseClient();
    const {data: chat, error} = await supabase
        .from('chats')
        .select('*')
        .eq('id', chatId)
        .single()
    if (error) {
        console.log(`Failed to fetch chat with ID ${chatId}: ${error}`);
        return null
    }
    return chat
}

export async function getChatMessagesById(chatId: string) {
    const supabase = await createSupabaseClient();
    const {data: messages, error} = await supabase
        .from('chat_messages')
        .select('*')
        .eq('chat_id', chatId)
        .order('created_at', {ascending: true})
    if (error) {
        console.log(`Failed to fetch messages for chat ID ${chatId}: ${error}`);
        return null
    }
    return messages
}

async function getOwnUser() {
    const supabase = await createSupabaseClient();
    const {data: user, error} = await supabase
        .from('tenant_users')
        .select('*')
        .single()
    if (error) {
        console.log('Failed to fetch tenant ID: ' + error);
        return null
    }
    return user
}

export async function sendMessage(chatId: string, content: string) {
    const supabase = await createSupabaseClient();

    const user = await getOwnUser();
    if (!user) {
        return {success: false, error: 'hogehoge'};
    }

    const {data, error} = await supabase
        .from('chat_messages')
        .insert([
            {
                chat_id: chatId,
                tenant_id: user.tenant_id,
                content: content,
            }
        ])
        .select()

    if (error) {
        console.log(`Failed to send message to chat ID ${chatId}: ${error}`);
        return {success: false, error: error.message};
    }

    return {success: true, message: data?.[0]};
}
