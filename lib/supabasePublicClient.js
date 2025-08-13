import { createClient } from '@supabase/supabase-js';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error('[supabasePublic] Missing environment variables!');
}

const emptyStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
};

export const supabasePublic = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
        auth: {
            storage: emptyStorage,
            persistSession: false,
            autoRefreshToken: false,
            detectSessionInUrl: false,
        },
    }
);
