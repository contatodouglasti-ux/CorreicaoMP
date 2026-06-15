/**
 * db-admin.js
 * Funções de banco exclusivas do painel administrativo.
 *
 * Usa funções RPC (security definer) no Supabase para bypassar
 * a RLS de usuario_proprio e ver todos os registros.
 * A autorização é feita checando a tabela "admins" antes de qualquer query.
 *
 * Também gerencia a tabela "pendencias" para controle de quem pode preencher.
 *
 * Depende de: config.js, auth.js, supabase-js (CDN)
 */

const sbAdmin = supabase.createClient(
  CONFIG.supabase.url,
  CONFIG.supabase.anonKey
);

/* ─────────────────────────────────────────────────────────────
   Verificação de acesso admin
───────────────────────────────────────────────────────────── */

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

/* ─────────────────────────────────────────────────────────────
   Queries via RPC
───────────────────────────────────────────────────────────── */

async function buscarTodosRegistros(filtroNome = '') {
  console.log('[admin] buscando registros, filtro:', filtroNome);

  const { data, error } = await sbAdmin.rpc('buscar_todos_registros', {
    filtro_nome: filtroNome.trim(),
  });

  console.log('[admin] registros recebidos:', data?.length, error);

  if (error) throw error;
  return data || [];
}

async function carregarRegistroAdmin(id) {
  const { data, error } = await sbAdmin.rpc('buscar_registro_por_id', {
    registro_id: id,
  });

  if (error) throw error;
  if (!data || data.length === 0) throw new Error('Registro não encontrado');
  return data[0];
}

async function baixarPDFAdmin(id) {
  await baixarPDF({ id });
}

async function reabrirRegistroAdmin(id) {
  const { error } = await sbAdmin.rpc('reabrir_registro', {
    registro_id: id,
  });

  if (error) throw error;
}

/* ─────────────────────────────────────────────────────────────
   Pendências de usuários
   Campos esperados na tabela pendencias:
   - user_id
   - ativo
   - criado_em
   - atualizado_em
───────────────────────────────────────────────────────────── */

async function listarUsuariosPendentes() {
  const { data, error } = await sbAdmin
    .from('pendencias')
    .select('*')
    .eq('ativo', true)
    .order('atualizado_em', { ascending: false });

  if (error) throw error;
  return data || [];
}

async function verificarUsuarioPendente(identificador) {
  const id = String(identificador || '').trim();
  if (!id) return false;

  const { data, error } = await sbAdmin
    .from('pendencias')
    .select('*')
    .eq('user_id', id)
    .eq('ativo', true)
    .limit(1);

  if (error) throw error;
  if (!Array.isArray(data) || data.length === 0) return false;

  const p = data[0];

  // Se não há período definido, acesso é livre enquanto ativo
  if (!p.data_inicio && !p.data_fim) return true;

  // Verifica se a data atual está dentro do intervalo permitido
  const hoje = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const dentroDoInicio = !p.data_inicio || hoje >= p.data_inicio;
  const dentroDoFim    = !p.data_fim    || hoje <= p.data_fim;

  return dentroDoInicio && dentroDoFim;
}

async function marcarUsuarioComoPendente(identificador, dataInicio = null, dataFim = null) {
  const id = String(identificador || '').trim();
  if (!id) throw new Error('Identificador inválido');

  const agora = new Date().toISOString();

  const payload = {
    user_id:      id,
    ativo:        true,
    atualizado_em: agora,
    data_inicio:  dataInicio || null,   // YYYY-MM-DD ou null
    data_fim:     dataFim    || null,   // YYYY-MM-DD ou null
  };

  const { error } = await sbAdmin
    .from('pendencias')
    .upsert(payload, { onConflict: 'user_id' });

  if (error) throw error;
}

async function removerUsuarioPendente(identificador) {
  const id = String(identificador || '').trim();
  if (!id) throw new Error('Identificador inválido');

  const { error } = await sbAdmin
    .from('pendencias')
    .update({
      ativo: false,
      atualizado_em: new Date().toISOString(),
    })
    .eq('user_id', id);

  if (error) throw error;
}

async function buscarPendenciaPorIdentificador(identificador) {
  const id = String(identificador || '').trim();
  if (!id) return null;

  const { data, error } = await sbAdmin
    .from('pendencias')
    .select('*')
    .eq('user_id', id)
    .eq('ativo', true)
    .limit(1);

  if (error) throw error;
  return data && data.length ? data[0] : null;
}