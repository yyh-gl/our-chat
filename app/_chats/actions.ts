'use server';

import {createSupabaseClient} from "@/lib/supabase";

export async function getOwnChats() {
    const supabase = await createSupabaseClient();
    // TODO: Apply RLS
    const {data: chats, error} = await supabase
        .from('chats')
        .select('*')
    if (error) {
        console.log('Failed to fetch chats: ' + error);
    }
    return chats
}
