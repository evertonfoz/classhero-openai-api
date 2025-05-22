// src/config/supabaseClient.js
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

export function createSupabaseClient () {
  dotenv.config(); // carrega variáveis de ambiente do .env

    const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_ANON_KEY,
        {
            auth: {
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: true,
            },
        }
    );

    return supabase;
}
