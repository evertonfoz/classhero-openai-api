import express from 'express';
import { createSupabaseClient } from '../config/supabase_client.js';
import { validateOtp } from '../services/auth_validate_otp.js';
import { supabaseSignIn } from '../services/auth_sign_in.js';
import { supabaseSignUp } from '../services/auth_sign_up.js';
import { sendOtpEmail } from '../services/email_service.js';

const router = express.Router();

router.post('/send-code', async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    const supabase = createSupabaseClient();

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
  const userId = await validateOtp(email, code);
  if (userId) {
    const signInWasOk = await supabaseSignIn(email);
    if (!signInWasOk) {
      return res.status(401).json({ error: 'Erro ao fazer login.' });
    }
    return res.json({
      access_token: signInWasOk.session.access_token,
      refresh_token: signInWasOk.session.refresh_token
    });
  } else {
      const signUpWasOk = await supabaseSignUp(email);
      if (!signUpWasOk) {
        return res.status(401).json({ error: 'Erro ao registrar usuário.' });
      }
      return res.json({
        access_token: signUpWasOk.session.access_token,
        refresh_token: signUpWasOk.session.refresh_token
      });

  }
});

export default router;
