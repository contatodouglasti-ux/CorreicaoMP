/**
 * db-admin.js
 * Funções de banco exclusivas do painel administrativo.
 *
 * Usa funções RPC (security definer) no Supabase para bypassar
 * a RLS de usuario_proprio e ver todos os registros.
 * A autorização é feita checando a tabela "admins" antes de qualquer query.
 *
 * Depende de: config.js, auth.js, supabase-js (CDN)
 */

const sbAdmin = supabase.createClient(
  CONFIG.supabase.url,
  CONFIG.supabase.anonKey
);

/* ── Verificação de acesso ───────────────────────────────── */

async function verificarAdmin() {
  const email = getEmailUsuario();

  console.log('[admin] verificando acesso para:', email);

  const { data, error } = await sbAdmin
    .from('admins')
    .select('ativo')
    .eq('email', email)
    .single();

  console.log('[admin] resultado:', { data, error });

  if (error || !data || data.ativo === false) {
    alert('Acesso restrito. Você não tem permissão para acessar esta página.');
    window.location.replace('/index.html');
    throw new Error('Não autorizado');
  }
}

/* ── Queries via RPC (bypassa RLS) ──────────────────────── */

/**
 * Busca todos os registros com filtro opcional por nome.
 * Chama a função SQL "buscar_todos_registros" (security definer).
 */
async function buscarTodosRegistros(filtroNome = '') {
  console.log('[admin] buscando registros, filtro:', filtroNome);

  const { data, error } = await sbAdmin
    .rpc('buscar_todos_registros', { filtro_nome: filtroNome.trim() });

  console.log('[admin] registros recebidos:', data?.length, error);

  if (error) throw error;
  return data || [];
}

/**
 * Carrega um registro completo pelo ID.
 * Chama a função SQL "buscar_registro_por_id" (security definer).
 */
async function carregarRegistroAdmin(id) {
  const { data, error } = await sbAdmin
    .rpc('buscar_registro_por_id', { registro_id: id });

  if (error) throw error;
  if (!data || data.length === 0) throw new Error('Registro não encontrado');
  return data[0];
}

/**
 * Baixa o PDF de um registro (reutiliza a função do pdf.js).
 */
async function baixarPDFAdmin(id) {
  await baixarPDF({ id });
}
/**
 * Reabre um registro finalizado, voltando para em andamento.
 */
async function reabrirRegistroAdmin(id) {
  const { error } = await sbAdmin
    .rpc('reabrir_registro', { registro_id: id });

  if (error) throw error;
}