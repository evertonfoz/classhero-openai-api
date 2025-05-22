import { createSupabaseClient } from '../config/supabase_client.js'; // ajuste conforme seu projeto

export async function supabaseSignUp(email) {
    const supabase = createSupabaseClient();

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: email,
    });

    if (error) {
      console.error('Erro ao criar usuário:', error.message);
      return false;
    }

    const { data: insertUserData, error: errorInsertData } = await supabase
      .from('users')
      .insert({ email });
    
    if (errorInsertData) {
      console.error('Erro ao inserir dados do usuário:', errorInsertData.message);
      return false
    }

    return data;
}
