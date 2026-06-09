# MPAM CGMP — Termo Eletrônico de Correição

Sistema web para preenchimento, salvamento e envio de termos de correição do Ministério Público do Amazonas.

## Estrutura do projeto

```
projeto-correcao/
│
├── index.html          # Página principal (formulário)
├── login.html          # Autenticação Microsoft (MSAL)
├── red_login.js        # Proteção secundária de rota
│
├── css/
│   └── style.css       # Estilos globais
│
├── js/
│   ├── config.js       # ⚙️  Lê variáveis de ambiente e exporta CONFIG
│   ├── auth.js         # 🔐 Helpers MSAL: getEmail, getNome, logout
│   ├── db.js           # 🗄️  Cliente Supabase + CRUD de correições
│   ├── ui.js           # 🎨 Menu, toast, loading, badges, bloqueio de seção
│   ├── form.js         # 📝 Renderização, validação e navegação do formulário
│   ├── historico.js    # 📋 Listagem, abertura e exclusão de registros
│   ├── pdf.js          # 📄 Geração de PDF com html2pdf
│   ├── Secoes.js       # 📦 Definição das seções e campos do formulário
│   └── app.js          # 🚀 Estado global + inicialização (ponto de entrada)
│
├── assets/
│   └── logo.png        # Logotipo MPAM
│
├── .env                # 🔒 Secrets (NÃO versionar)
├── .env.example        # Modelo de variáveis (versionável)
└── .gitignore
