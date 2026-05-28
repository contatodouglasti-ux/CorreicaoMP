/**
 * config.js
 * Centraliza todas as configurações sensíveis do projeto.
 *
 * Em produção: substitua os valores diretamente aqui OU injete via
 * variáveis de ambiente no seu servidor/build (Vite, Netlify, etc.).
 *
 * Em desenvolvimento local: os valores são lidos de window.__ENV__,
 * que pode ser gerado por um servidor de desenvolvimento ou definido
 * manualmente abaixo para testes.
 */

const ENV = window.__ENV__ || {};

const CONFIG = {
  // ── Azure AD / MSAL ─────────────────────────────────────────
  msal: {
    clientId:    ENV.MSAL_CLIENT_ID    || 'db712dfb-57de-488e-af9f-12bee87fa61c',
    tenantId:    ENV.MSAL_TENANT_ID    || '84a9248e-396f-44df-84a9-4379e11007ab',
    redirectUri: ENV.MSAL_REDIRECT_URI || 'https://correicao-mp.vercel.app/login.html',
  },

  // ── Supabase ─────────────────────────────────────────────────
  supabase: {
    url:     ENV.SUPABASE_URL      || 'https://dcqxekzenkmietbhqwng.supabase.co',
    anonKey: ENV.SUPABASE_ANON_KEY || 'sb_publishable_6JnCXxZImhhc7ivUuJWkGg_u4mRF_A7',
  },

  // ── Power Automate ───────────────────────────────────────────
  powerAutomate: {
    webhookUrl: ENV.PA_WEBHOOK_URL || 'https://default84a9248e396f44df84a94379e11007.ab.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/679dbd3be9884fac8665fa7b7458c589/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=MyA3qI1BWcZTqtVbRNPmJx3vUVW0RKkXNFrOkd5vH6A',
  },
};

// Congela o objeto para evitar mutações acidentais
Object.freeze(CONFIG);
Object.freeze(CONFIG.msal);
Object.freeze(CONFIG.supabase);
Object.freeze(CONFIG.powerAutomate);
