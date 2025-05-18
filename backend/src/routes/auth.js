const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const router = express.Router();
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

router.post('/send-code', async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await supabase.from('otps').delete().eq('email', email);
  
  const { error } = await supabase
    .from('otps')
    .insert({ email, code: otp, expires_at: new Date(Date.now() + 10 * 60000) });

  if (error) return res.status(500).json({ error: error.message });

  console.log(`Código gerado para ${email}: ${otp}`);
  res.json({ message: 'Código enviado!' });
});

router.post('/verify-code', async (req, res) => {
  const { email, code } = req.body;

  const { data, error } = await supabase
    .from('otps')
    .select('*')
    .eq('email', email)
    .eq('code', code)
    .gte('expires_at', new Date().toISOString())
    .maybeSingle();

  if (error || !data) return res.status(401).json({ error: 'Código inválido ou expirado.' });

  res.json({ message: 'Login bem-sucedido!' });
});

module.exports = router;
