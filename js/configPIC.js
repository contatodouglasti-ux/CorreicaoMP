const ENV = window.__ENV__ || {};

const CONFIG = {
  msal: {
    clientId:    ENV.MSAL_CLIENT_ID    || 'db712dfb-57de-488e-af9f-12bee87fa61c',
    tenantId:    ENV.MSAL_TENANT_ID    || '84a9248e-396f-44df-84a9-4379e11007ab',
    redirectUri: ENV.MSAL_REDIRECT_URI || 'https://pic-mp.vercel.app/login.html',
  },
  supabase: {
    url:     ENV.SUPABASE_URL      || 'https://vmngprajfskkguiaqllr.supabase.co',
    anonKey: ENV.SUPABASE_ANON_KEY || 'sb_publishable_DByhsI3ThpF7KWNBaL1NmQ_yoRkjWaX',
  },
};

Object.freeze(CONFIG);
Object.freeze(CONFIG.msal);
Object.freeze(CONFIG.supabase);