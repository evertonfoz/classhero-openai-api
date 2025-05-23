async function fetchUsers() {
  const loading = document.getElementById("loading");
  const tbody = document.getElementById("usersTableBody");

  if (!tbody) return;

  loading.style.display = "block";
  tbody.innerHTML = "";

  try {
    const response = await fetch("http://localhost:3000/api/users/all");
    if (!response.ok) throw new Error("Erro ao buscar usuários");

    const users = await response.json();

    users.forEach(user => {
      const tr = document.createElement("tr");

      const emailCell = document.createElement("td");
      emailCell.textContent = user.email ?? "-";
      emailCell.className = "px-4 py-2 text-sm text-gray-800 dark:text-gray-200";

      const nameCell = document.createElement("td");
      nameCell.textContent = user.name ?? "(sem nome)";
      nameCell.className = "px-4 py-2 text-sm text-gray-800 dark:text-gray-200";

      // Função para criar checkbox readonly
      const createStatusIconCell = (value) => {
        const cell = document.createElement("td");
        cell.className = "px-4 py-2 text-center align-middle";

        const icon = document.createElement("span");
        icon.textContent = value ? "✅" : "❌";

        // Usa classes Tailwind para tamanho e alinhamento
        icon.className = `${value ? "text-green-600" : "text-red-600"} text-xs leading-none inline-block`;

        cell.appendChild(icon);
        return cell;
      };




      tr.appendChild(emailCell);
      tr.appendChild(nameCell);
      tr.appendChild(createStatusIconCell(user.is_validated));
      if (user.is_validated) {
        tr.appendChild(createStatusIconCell(user.is_a_admin));
        tr.appendChild(createStatusIconCell(user.is_a_teacher));
        tr.appendChild(createStatusIconCell(user.is_a_student));
      } else {
        for (let i = 0; i < 3; i++) {
          const emptyCell = document.createElement("td");
          emptyCell.className = "px-4 py-2 text-center text-gray-400 italic";
          emptyCell.textContent = "—";
          tr.appendChild(emptyCell);
        }
      }


      tbody.appendChild(tr);
    });


  } catch (error) {
    console.error("Erro ao carregar usuários:", error);
    tbody.innerHTML = `<tr><td colspan="2" class="text-red-500 px-4 py-2">Erro ao carregar usuários.</td></tr>`;
  } finally {
    loading.style.display = "none";
  }
}

fetchUsers();
