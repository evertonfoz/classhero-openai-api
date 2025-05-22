import { createSupabaseClient } from '../config/supabase_client.js'; // ajuste conforme seu projeto

export async function supabaseSignIn(email) {
    const supabase = createSupabaseClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: email,
    });

    if (error) {
      console.error('Erro ao fazer login:', error.message);
      return false;
    }

    return data;
}
