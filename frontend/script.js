// Simulação temporária de verificação de login
function isUserAuthenticated() {
  // No futuro: verificar JWT ou sessão
  return localStorage.getItem("authToken") !== null;
}

window.onload = () => {
  if (isUserAuthenticated()) {
    // Quando implementar o dashboard
    // window.location.href = "./features/dashboard/dashboard.html";
  } else {
    window.location.href = "./features/login/login.html";
  }
};
