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
 * Estrutura sugerida para permissões de preenchimento:
 *   tabela "pendencias"
 *     user_id      text primary key
 *     ativo        boolean default false
 *     unidade      text            ← unidade correicionada vinculada ao usuário
 *     criado_em    timestamptz default now()
 *     atualizado_em timestamptz default now()
 */


/* ── Permissões ──── */

// Verifica se o usuário está pendente E dentro do período de acesso permitido
let _pendenciaCache = null;
async function usuarioEstaPendente(userId = getEmailUsuario()) {
  if (_pendenciaCache !== null) return _pendenciaCache;

  const { data, error } = await sb
    .from('pendencias')
    .select('ativo, data_inicio, data_fim')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) throw error;
  if (!data || !data.ativo) {
    _pendenciaCache = false;
    return false;
  }

  // Sem período definido = acesso livre enquanto ativo
  if (!data.data_inicio && !data.data_fim) {
    _pendenciaCache = true;
    return true;
  }

  // Verifica se hoje está dentro do intervalo permitido
  const hoje = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const dentroDoInicio = !data.data_inicio || hoje >= data.data_inicio;
  const dentroDoFim    = !data.data_fim    || hoje <= data.data_fim;

  _pendenciaCache = dentroDoInicio && dentroDoFim;
  return _pendenciaCache;
}

async function exigirUsuarioPendente() {
  const permitido = await usuarioEstaPendente();
  if (!permitido) {
    throw new Error('Você só pode preencher respostas quando o administrador marcar você como pendente.');
  }
}

// Inicializa o cliente com o email do usuário no header customizado
window.sbClient = supabase.createClient(
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
const sb = window.sbClient;

/* ── Unidade do usuário ──── */

/**
 * Busca a unidade correicionada vinculada ao usuário logado.
 * Ajuste a tabela ('pendencias') e a coluna ('unidade') se necessário.
 */
async function buscarUnidadeDoUsuario() {
  const { data, error } = await sb
    .from('pendencias')
    .select('unidade_correicionada, unidades_correicionadas ( nome )')
    .eq('user_id', getEmailUsuario())
    .maybeSingle();

  if (error) {
    console.error('Erro ao buscar unidade do usuário:', error);
    return null;
  }
  return data?.unidades_correicionadas?.nome || null;
}

/* ── CRUD ──── */

/**
 * Garante que existe um registro em aberto para o usuário.
 * Retorna o registro (row).
 */
async function garantirRegistroAberto() {
  const userId = getEmailUsuario();
  const pendente = await usuarioEstaPendente(userId);

  if (!pendente) return null;

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
 */
async function persistirDados(id, dados) {
  await exigirUsuarioPendente();
  return sb.from('correicoes').update({
    dados,
    unidade_correicionada: dados['1.1'] || null,
    atualizado_em: new Date().toISOString(),
  }).eq('id', id);
}

async function salvarSecaoNoBanco(id, dadosMerged, secoesOk) {
  await exigirUsuarioPendente();
  return sb.from('correicoes').update({
    dados:        dadosMerged,
    secoes_ok:    secoesOk,
    unidade_correicionada: dadosMerged['1.1'] || null,
    atualizado_em: new Date().toISOString(),
  }).eq('id', id);
}

/**
 * Finaliza o registro e persiste dados completos.
 */
async function finalizarRegistro(id, dados) {
  return sb.from('correicoes').update({
    dados,
    unidade_correicionada: dados['1.1'] || null,
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

/**
 * Carrega os dados pessoais do membro logado.
 */
async function carregarDadosPessoaisUsuario() {
  const userId = getEmailUsuario();

  const { data, error } = await sb
    .from('dados_pessoais_membros')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) throw error;
  return data || null;
}

async function salvarDadosPessoaisUsuario({
  nome_completo,
  rua,
  numero,
  tipo_hospedagem,
  bairro,
  cidade_municipio,
  estado,
  cep,
}) {
  const payload = {
    user_id: getEmailUsuario(),
    nome_completo,
    rua,
    numero,
    tipo_hospedagem,
    bairro,
    cidade_municipio,
    estado,
    cep,
    atualizado_em: new Date().toISOString(),
  };

  const { data, error } = await sb
    .from('dados_pessoais_membros')
    .upsert(payload, { onConflict: 'user_id' })
    .select()
    .single();

  if (error) throw error;
  return data;
}