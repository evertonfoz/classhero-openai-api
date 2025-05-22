import { createSupabaseClient } from '../config/supabase_client.js'; // ajuste conforme seu projeto

// Função que valida um código OTP (One-Time Password) enviado por e-mail
// Em caso de sucesso, retorna o ID do usuário associado ao e-mail
// Caso contrário, retorna false

export async function validateOtp(email, code) {
    // Cria uma instância do Supabase client (deve estar configurada para carregar variáveis de ambiente)
    const supabase = createSupabaseClient();

    // Busca na tabela 'otps' o registro correspondente ao e-mail e código informado
    const { data, error } = await supabase
        .from('otps')
        .select('*')
        .eq('email', email)
        .eq('otp_code', code)
        .maybeSingle(); // espera no máximo um resultado

    // Se não encontrou o código ou houve erro, exibe mensagem e retorna false
    if (error || !data) {
        console.error('Erro ao verificar o código:', error?.message || 'Código não encontrado');
        return false;
    }

    // Após verificação bem-sucedida, remove o código da tabela para evitar reuso
    await supabase.from('otps').delete().eq('email', email);

    // Executa uma função RPC que busca o ID do usuário associado ao e-mail
    const { data: userId, error: userIdError } = await supabase.rpc('get_user_id_by_email', { email });

    // Se não encontrou o usuário ou houve erro, exibe mensagem e retorna false
    if (userIdError || !userId) {
        console.error('Erro ao obter ID do usuário:', userIdError);
        return false;
    }

    // Retorna o ID do usuário, indicando que a validação do código foi bem-sucedida
    return userId;
}
