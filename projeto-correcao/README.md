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
```

## Configuração

1. Copie `.env.example` para `.env` e preencha os valores:

```bash
cp .env.example .env
```

2. Edite `.env` com as credenciais reais:
   - **MSAL_CLIENT_ID** e **MSAL_TENANT_ID** — no portal Azure AD
   - **SUPABASE_URL** e **SUPABASE_ANON_KEY** — no painel do Supabase
   - **PA_WEBHOOK_URL** — URL do fluxo no Power Automate

3. Se usar um servidor de build (Vite, Netlify, etc.), injete as variáveis em `window.__ENV__` antes do carregamento de `js/config.js`. Caso contrário, os valores de fallback definidos em `config.js` serão usados.

## Banco de dados (Supabase)

Execute o SQL abaixo no Supabase SQL Editor:

```sql
create table correicoes (
  id            uuid primary key default gen_random_uuid(),
  user_id       text not null,
  nome          text,
  dados         jsonb default '{}'::jsonb,
  secoes_ok     jsonb default '{}'::jsonb,
  finalizado    boolean default false,
  criado_em     timestamptz default now(),
  atualizado_em timestamptz default now()
);

alter table correicoes enable row level security;

create policy "usuario_proprio" on correicoes
  using (user_id = current_setting('request.jwt.claims', true)::json->>'email');
```

## Ordem de carregamento dos scripts

O `index.html` carrega os scripts nesta ordem (cada um depende do anterior):

```
config.js → auth.js → db.js → ui.js → Secoes.js → form.js → pdf.js → historico.js → app.js
```

## Tecnologias

| Biblioteca | Versão | Uso |
|---|---|---|
| MSAL Browser | 2.37.0 | Autenticação Microsoft |
| Supabase JS | ^2 | Banco de dados |
| html2pdf.js | 0.10.1 | Geração de PDF |
