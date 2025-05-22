// src/config/supabaseClient.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

export function createSupabaseClient () {
    const supabase = createClient(
        'https://bnzkmlbanebwrdwvtccj.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJuemttbGJhbmVid3Jkd3Z0Y2NqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM1OTUwMTQsImV4cCI6MjAzOTE3MTAxNH0.zRRtOPjGRpQQvJ1lgD_9n94R7u-Zt1B-Y0ZzH8Sor8o',
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
