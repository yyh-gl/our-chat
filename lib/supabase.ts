// lib/supabase.ts
import {createClient} from "@supabase/supabase-js";

export const createSupabaseClient = async () => {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const data = {
        email: process.env.NEXT_PUBLIC_SUPABASE_USER_EMAIL!,
        password: process.env.NEXT_PUBLIC_SUPABASE_USER_PASSWORD!,
    }
    const {error} = await supabase.auth.signInWithPassword(data)
    if (error) {
        console.log('Failed to log in to Supabase: ' + error);
    }
    return supabase
}
