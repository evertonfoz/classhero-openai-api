import express from 'express';
import { createClient } from '@supabase/supabase-js';
import { sendOtpEmail } from '../services/email_service.js';
import dotenv from 'dotenv';

dotenv.config(); // para carregar as variáveis de ambiente

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const router = express.Router();

router.post('/send-code', async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    await supabase.from('otps').delete().eq('email', email);

    const { error } = await supabase
      .from('otps')
      .insert({ email, otp_code: otp });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    await sendOtpEmail({ to_email: email, token: otp });

    console.log(`Código ENVIADO para ${email}: ${otp}`);
    return res.json({ message: 'Código enviado por e-mail!' });

  } catch (err) {
    console.error('Erro ao enviar o e-mail:', err.message);
    return res.status(500).json({ error: 'Erro ao enviar o e-mail.' });
  }
});

router.post('/verify-code', async (req, res) => {
  const { email, code } = req.body;

  try {
    const { data, error } = await supabase
      .from('otps')
      .select('*')
      .eq('email', email)
      .eq('otp_code', code)
      .maybeSingle();

    if (error || !data) {
      return res.status(401).json({ error: 'Código inválido ou expirado.' });
    }

    return res.json({ message: 'Login bem-sucedido!' });

  } catch (err) {
    console.error('Erro ao verificar código:', err.message);
    return res.status(500).json({ error: 'Erro interno ao verificar o código.' });
  }
});

export default router;
