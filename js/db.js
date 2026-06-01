/**
 * db.js
 * Cliente Supabase e operações CRUD de correições.
 * Depende de: config.js, auth.js, supabase-js (CDN)
 *
 * Estrutura da tabela "correicoes":
 *   id            uuid  PK  default gen_random_uuid()
 *   user_id       text  NOT NULL
 *   nome          text
 *   dados         jsonb default '{}'
 *   secoes_ok     jsonb default '{}'
 *   finalizado    boolean default false
 *   criado_em     timestamptz default now()
 *   atualizado_em timestamptz default now()
 *
 * SQL de criação (rode no Supabase SQL Editor):
 * ───────────────────────────────────────────────
 * create table correicoes (
 *   id            uuid primary key default gen_random_uuid(),
 *   user_id       text not null,
 *   nome          text,
 *   dados         jsonb default '{}'::jsonb,
 *   secoes_ok     jsonb default '{}'::jsonb,
 *   finalizado    boolean default false,
 *   criado_em     timestamptz default now(),
 *   atualizado_em timestamptz default now()
 * );
 * alter table correicoes enable row level security;
 * create policy "usuario_proprio" on correicoes
 *   using (user_id = current_setting('request.jwt.claims', true)::json->>'email');
 */

// Inicializa o cliente com o email do usuário no header customizado
const sb = supabase.createClient(
  CONFIG.supabase.url,
  CONFIG.supabase.anonKey,
  {
    global: {
      headers: {
        'x-user-id': getEmailUsuario(),
      },
    },
  }
);

/* ── CRUD ───────────────────────────────────────────────── */

/**
 * Garante que existe um registro em aberto para o usuário.
 * Retorna o registro (row).
 */
async function garantirRegistroAberto() {
  const userId = getEmailUsuario();

  const { data, error } = await sb
    .from('correicoes')
    .select('*')
    .eq('user_id', userId)
    .eq('finalizado', false)
    .order('criado_em', { ascending: false })
    .limit(1);

  if (error) throw error;

  if (data && data.length > 0) return data[0];

  // Nenhum aberto — cria novo
  const { data: novo, error: errNovo } = await sb
    .from('correicoes')
    .insert({
      user_id:   userId,
      nome:      getNomeUsuario(),
      dados:     {},
      secoes_ok: {},
      finalizado: false,
    })
    .select()
    .single();

  if (errNovo) throw errNovo;
  return novo;
}

/**
 * Persiste todos os dados do formulário no Supabase.
 * @param {string} id  - UUID do registro
 * @param {object} dados - campos coletados do formulário
 */
async function persistirDados(id, dados) {
  return sb.from('correicoes').update({
    dados,
    atualizado_em: new Date().toISOString(),
  }).eq('id', id);
}

/**
 * Salva uma seção marcando-a como concluída.
 */
async function salvarSecaoNoBanco(id, dadosMerged, secoesOk) {
  return sb.from('correicoes').update({
    dados:        dadosMerged,
    secoes_ok:    secoesOk,
    atualizado_em: new Date().toISOString(),
  }).eq('id', id);
}

/**
 * Finaliza o registro e persiste dados completos.
 */
async function finalizarRegistro(id, dados) {
  return sb.from('correicoes').update({
    dados,
    finalizado:    true,
    finalizado_em: new Date().toISOString(),
    atualizado_em: new Date().toISOString(),
  }).eq('id', id);
}

/**
 * Cria um novo registro em branco para o usuário.
 */
async function criarNovoRegistro() {
  const { data, error } = await sb
    .from('correicoes')
    .insert({
      user_id:   getEmailUsuario(),
      nome:      getNomeUsuario(),
      dados:     {},
      secoes_ok: {},
      finalizado: false,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

/**
 * Carrega um registro específico pelo ID.
 */
async function carregarRegistroPorId(id) {
  const { data, error } = await sb
    .from('correicoes')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

/**
 * Lista todos os registros do usuário (para o histórico).
 */
async function listarRegistrosDoUsuario() {
  const { data, error } = await sb
    .from('correicoes')
    .select('id, criado_em, atualizado_em, finalizado, secoes_ok')
    .eq('user_id', getEmailUsuario())
    .order('criado_em', { ascending: false });
  if (error) throw error;
  return data || [];
}

/**
 * Exclui um registro (apenas se não finalizado).
 */
async function excluirRegistro(id) {
  const { data: reg, error: erroBusca } = await sb
    .from('correicoes')
    .select('id, finalizado')
    .eq('id', id)
    .single();
  if (erroBusca) throw erroBusca;
  if (reg.finalizado) throw new Error('Registros finalizados não podem ser excluídos.');

  const { error } = await sb.from('correicoes').delete().eq('id', id);
  if (error) throw error;
}

/**
 * Busca a secoes_ok atual de um registro.
 */
async function buscarSecoesOk(id) {
  const { data } = await sb
    .from('correicoes')
    .select('secoes_ok')
    .eq('id', id)
    .single();
  return data ? (data.secoes_ok || {}) : {};
}
