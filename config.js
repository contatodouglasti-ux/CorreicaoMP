// ============================================================
//  config.js — Configurações centralizadas da aplicação
//  ⚠️  Em produção, use um build tool (Vite/Webpack) para
//      injetar variáveis de ambiente via .env
// ============================================================

const CONFIG = {
  // Supabase
  SUPABASE_URL:  'https://dcqxekzenkmietbhqwng.supabase.co',
  SUPABASE_ANON: 'sb_publishable_6JnCXxZImhhc7ivUuJWkGg_u4mRF_A7',

  // Power Automate
  PA_CRIAR: 'https://default84a9248e396f44df84a94379e11007.ab.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/679dbd3be9884fac8665fa7b7458c589/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=MyA3qI1BWcZTqtVbRNPmJx3vUVW0RKiXNFrOkd5vH6A',

  // Microsoft / MSAL
  MSAL_CLIENT_ID:    'db712dfb-57de-488e-af9f-12bee87fa61c',
  MSAL_TENANT:       '84a9248e-396f-44df-84a9-4379e11007ab',
  MSAL_REDIRECT_URI: 'https://correicao-mp.vercel.app/login.html',
};
