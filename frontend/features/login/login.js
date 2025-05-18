// login.js
import { renderRandomLogo } from "../../shared/js/random_logo.js";

renderRandomLogo();

const loginForm = document.getElementById("loginForm");
const verifyForm = document.getElementById("verifyForm");
const statusMessage = document.getElementById("statusMessage");
const emailInput = document.getElementById("emailInput");
const codeInput = document.getElementById("codeInput");
const loginButton = loginForm.querySelector("button[type='submit']");

// Desabilita botão por padrão
loginButton.disabled = true;

// Valida formato de e-mail
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Observa alterações no campo de e-mail
emailInput.addEventListener("input", () => {
  const isValid = isValidEmail(emailInput.value.trim());
  loginButton.disabled = !isValid;
});

// Envia código de verificação
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();
  statusMessage.textContent = "Enviando código...";

  try {
    const response = await fetch("http://localhost:3000/api/auth/send-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const result = await response.json();

    if (response.ok) {
      statusMessage.textContent = "Código enviado! Verifique seu e-mail.";
      loginForm.classList.add("hidden");
      verifyForm.classList.remove("hidden");
    } else {
      statusMessage.textContent = result?.error || "Erro ao enviar código.";
    }
  } catch (err) {
    statusMessage.textContent = "Erro de rede ao tentar enviar código.";
  }
});

// Verifica código informado
verifyForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();
  const code = codeInput.value.trim();
  statusMessage.textContent = "Verificando...";

  try {
    const response = await fetch("http://localhost:3000/api/auth/verify-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    });

    if (response.ok) {
      statusMessage.textContent = "Login bem-sucedido!";
      window.location.href = "/frontend/features/dashboard/dashboard.html";
    } else {
      statusMessage.textContent = "Código inválido ou expirado.";
    }
  } catch (err) {
    statusMessage.textContent = "Erro de rede ao verificar código.";
  }
});
