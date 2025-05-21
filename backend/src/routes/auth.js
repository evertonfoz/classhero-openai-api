import express from 'express';
import { sendOtpEmail } from '../services/email_service.js';
import { supabase } from '../config/supabase.js'; // ajuste conforme sua estrutura

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

    console.log(`Código gerado para ${email}: ${otp}`);
    return res.json({ message: 'Código enviado por e-mail!' });

  } catch (err) {
    console.error('Erro ao enviar o e-mail:', err.message);
    return res.status(500).json({ error: 'Erro ao enviar o e-mail.' });
  }
});

export default router;
