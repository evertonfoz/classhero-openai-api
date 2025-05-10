import { renderRandomLogo } from "../../shared/random_logo.js";

renderRandomLogo({
});


const loginForm = document.getElementById("loginForm");
const verifyForm = document.getElementById("verifyForm");
const statusMessage = document.getElementById("statusMessage");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("emailInput").value;

  statusMessage.textContent = "Enviando código...";
  
  const response = await fetch("http://localhost:3000/api/auth/send-code", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const result = await response.json();

  if (response.ok) {
    statusMessage.textContent = "Código enviado! Verifique seu e-mail.";
    loginForm.style.display = "none";
    verifyForm.style.display = "block";
  } else {
    statusMessage.textContent = "Erro ao enviar código.";
  }
});

verifyForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("emailInput").value;
  const code = document.getElementById("codeInput").value;

  statusMessage.textContent = "Verificando...";

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
});
