'use server';

import {createSupabaseClient} from "@/lib/supabase";

export async function getChats(tenantId: string) {
    const supabase = await createSupabaseClient();
    // TODO: Apply RLS
    const {data: chats, error} = await supabase
        .from('chats')
        .select('*')
        .eq('tenant_id', tenantId)
    if (error) {
        console.log(error)
    }
    return chats
}
