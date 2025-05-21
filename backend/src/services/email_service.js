import fetch from 'node-fetch';
import { registryConfirmationEmail } from '../utils/templates.js';

export async function sendOtpEmail(templateParams) {
  try {
    await sendEmailByResend({
      to: templateParams.to_email,
      subject: 'CLASSHERO - Código de Acesso',
      html: registryConfirmationEmail(templateParams.token),
    });
  } catch (error) {
    throw new Error(`Failed to send OTP email: ${error}`);
  }
}

async function sendEmailByResend({ to, subject, html }) {
  const supabaseFunctionUrl =
    'https://bnzkmlbanebwrdwvtccj.supabase.co/functions/v1/send-email';

  const emailData = { to, subject, html };

  try {
    const response = await fetch(supabaseFunctionUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Status: ${response.status} - Response: ${errorBody}`);
    }

    return await response.text();
  } catch (e) {
    throw new Error(`Failed to send email. Error: ${e.message}`);
  }
}
