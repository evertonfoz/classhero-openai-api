# 📘 Gerador de Perguntas com IA

Este é um projeto web moderno e responsivo que permite o **upload de arquivos PDF** e gera automaticamente **perguntas com IA** com base no conteúdo enviado.

A aplicação é voltada para professores, pesquisadores e estudantes, com foco didático e arquitetura escalável.

---

## 🧩 Tecnologias Utilizadas

- **Frontend:** HTML, CSS, JavaScript puro
- **Persistência:** Supabase
- **Infraestrutura:** Docker
- **Integração com IA:** OpenAI API (Assistants + File Search)
- **Design Responsivo:** Flexbox + Media Queries
- **Acessibilidade:** Interface inclusiva com modo claro/escuro e ícones acessíveis

---

## 🎯 Funcionalidades

- Upload de múltiplos arquivos PDF
- Arraste e solte ou botão de seleção
- Geração de perguntas com base no conteúdo
- Feedback visual do status do envio
- Interface adaptada para desktop e mobile
- Menu lateral colapsável com ícones
- Modo escuro/claro com armazenamento da preferência
- Estrutura pronta para microserviços no backend

---

## 📸 Captura de Tela

> Exemplo com barra lateral colapsada, modo claro e área de upload ativa:

![Preview da Interface](./screenshot.png)

---

## 🚀 Como Executar Localmente

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/gerador-perguntas-ia.git
   cd gerador-perguntas-ia
````

2. **Abra o `index.html` diretamente no navegador** ou sirva com uma extensão como Live Server.

> O backend (em Node.js com Docker) será implementado em etapa posterior.

---

## 📁 Estrutura de Pastas

```
gerador-perguntas-ia/
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── assets/
│   └── logo.png
├── README.md
└── .gitignore
```

---

## 📌 Próximos Passos

* [ ] Implementar backend com Node.js
* [ ] Integração com Supabase para rastreamento de arquivos
* [ ] Geração real de perguntas com Assistants API
* [ ] Deploy via Docker Compose

---

## 👨‍🏫 Autor

Desenvolvido com fins educacionais por **\[Seu Nome]**, professor e pesquisador na área de desenvolvimento de sistemas com foco em IA aplicada à educação.

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

