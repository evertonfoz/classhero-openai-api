import { renderRandomImage } from "../../shared/randomImage.js";

renderRandomImage({
  containerSelector: ".content",
  imageFolder: "images/logos",
  imagePrefix: "logo_",
  className: "logo-img",
  altText: "Logo Aleatória ClassHero"
});


document.getElementById("uploadForm").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const fileInput = document.getElementById("fileInput");
    const statusMessage = document.getElementById("statusMessage");
    const progressBar = document.getElementById("uploadProgress");
  
    if (!fileInput.files[0]) {
      statusMessage.textContent = "Por favor, selecione um arquivo.";
      statusMessage.className = "alert error";
      return;
    }
  
    const formData = new FormData();
    for (const file of fileInput.files) {
      formData.append("files[]", file);
    }
  
    statusMessage.textContent = "Enviando...";
    statusMessage.className = "";
    progressBar.style.display = "block";
    progressBar.value = 50;
  
    try {
      const response = await fetch("http://localhost:3000/api/upload", {
        method: "POST",
        body: formData,
      });
  
      const result = await response.json();
  
      if (response.ok) {
        statusMessage.textContent = `✅ Pergunta gerada: ${result.pergunta}`;
        statusMessage.className = "alert success";
      } else {
        statusMessage.textContent = `❌ Erro: ${result.error}`;
        statusMessage.className = "alert error";
      }
    } catch (error) {
      console.error(error);
      statusMessage.textContent = "❌ Erro ao enviar arquivo.";
      statusMessage.className = "alert error";
    } finally {
      progressBar.style.display = "none";
    }
  });
  
  const dropArea = document.getElementById("dropArea");
  const fileInput = document.getElementById("fileInput");
  
  dropArea.addEventListener("click", () => fileInput.click());
  dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.style.backgroundColor = "#e8f5e9";
  });
  dropArea.addEventListener("dragleave", () => {
    dropArea.style.backgroundColor = "#fdfdfd";
  });
  dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    fileInput.files = e.dataTransfer.files;
    dropArea.style.backgroundColor = "#fdfdfd";
  });
  
  // document.getElementById("menuToggle").addEventListener("click", () => {
  //   document.body.classList.toggle("menu-collapsed");
  // });
  
  const toggleTheme = document.getElementById("toggleTheme");
  
  toggleTheme.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    toggleTheme.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
    localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
  });
  
  window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark");
      toggleTheme.textContent = "☀️";
    }
  });

  document.getElementById("menuToggle").addEventListener("click", () => {
    document.body.classList.toggle("menu-collapsed");
  
    const menuIcon = document.getElementById("menuIcon");
    const isCollapsed = document.body.classList.contains("menu-collapsed");
  
    menuIcon.textContent = isCollapsed ? "📂" : "📁"; // 📂 aberta, 📁 fechada
  });
  

// === Alternar para tela de upload ao clicar no menu ===
const uploadMenu = document.getElementById("uploadMenu");
uploadMenu.addEventListener("click", () => {
  document.querySelector(".content").innerHTML = ""; // Limpa o conteúdo da logo
  document.querySelector(".content").appendChild(document.getElementById("uploadSection"));
  document.getElementById("uploadSection").style.display = "flex";
});
