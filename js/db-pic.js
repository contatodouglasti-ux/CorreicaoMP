/**
 * db-pic.js
 * Camada de dados do Sistema de Controle de Procedimentos
 * Investigatórios Criminais (PIC) — Resolução CNMP nº 310/2025.
 *
 * Depende de: config.js, auth.js, supabase-js (CDN)
 */

const sbPic = supabase.createClient(
  CONFIG.supabase.url,
  CONFIG.supabase.anonKey
);
window.sbClient = sbPic;

/* ════════════════════════════════════
   Controle de acesso
════════════════════════════════════ */

async function verificarAcesso() {
  const email = getEmailUsuario();

  const { data, error } = await sbPic
    .from('admins')
    .select('ativo')
    .eq('email', email)
    .single();

  if (error || !data || data.ativo === false) {
    alert('Acesso restrito. Você não tem permissão para acessar este sistema.');
    window.location.replace('/login.html');
    throw new Error('Não autorizado');
  }
}

/* ════════════════════════════════════
   Histórico / Auditoria
════════════════════════════════════ */

async function registrarHistorico(procedimentoId, acao, detalhes = {}) {
  const { error } = await sbPic.from('historico').insert({
    procedimento_id: procedimentoId,
    usuario: getEmailUsuario(),
    acao,
    detalhes,
  });
  if (error) console.error('[historico] falha ao registrar:', error);
}

async function buscarHistorico(procedimentoId) {
  const { data, error } = await sbPic
    .from('historico')
    .select('*')
    .eq('procedimento_id', procedimentoId)
    .order('criado_em', { ascending: false });
  if (error) throw error;
  return data || [];
}

/* ════════════════════════════════════
   Procedimentos — CRUD
════════════════════════════════════ */

async function criarProcedimento(proc) {
  const payload = {
    numero:            String(proc.numero || '').trim(),
    comarca:           String(proc.comarca || '').trim(),
    data_instauracao:  proc.data_instauracao,          // YYYY-MM-DD
    situacao:          proc.situacao || 'em_andamento',
    capitulacao_legal: String(proc.capitulacao_legal || '').trim(),
    observacoes:       proc.observacoes || null,
    criado_por:        getEmailUsuario(),
  };

  if (!payload.numero || !payload.comarca || !payload.data_instauracao || !payload.capitulacao_legal) {
    throw new Error('Preencha todos os campos obrigatórios.');
  }

  const { data, error } = await sbPic
    .from('procedimentos')
    .insert(payload)
    .select()
    .single();
  if (error) throw error;

  await registrarHistorico(data.id, 'criacao', { numero: data.numero });
  return data;
}

async function atualizarProcedimento(id, campos) {
  campos.atualizado_em = new Date().toISOString();

  const { data, error } = await sbPic
    .from('procedimentos')
    .update(campos)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;

  await registrarHistorico(id, 'edicao', { campos_alterados: Object.keys(campos) });
  return data;
}

async function excluirProcedimento(id) {
  await registrarHistorico(id, 'exclusao', {});
  const { error } = await sbPic.from('procedimentos').delete().eq('id', id);
  if (error) throw error;
}

async function buscarProcedimentoPorId(id) {
  const { data, error } = await sbPic
    .from('procedimentos')
    .select(`
      *,
      vitimas (*),
      arquivamentos (*),
      denuncias (*),
      procedimento_agentes ( agente_id, agentes (*) )
    `)
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

/**
 * Consulta com filtros, paginação e ordenação.
 * filtros: { numero, comarca, situacao, capitulacao, agenteId, ano,
 *            dataInicio, dataFim }
 * opts:    { pagina = 1, porPagina = 20, ordenarPor = 'criado_em', asc = false }
 */
async function consultarProcedimentos(filtros = {}, opts = {}) {
  const {
    pagina = 1,
    porPagina = 20,
    ordenarPor = 'criado_em',
    asc = false,
  } = opts;

  let query = sbPic
    .from('procedimentos')
    .select('*, vitimas(id), procedimento_agentes(agente_id)', { count: 'exact' });

  if (filtros.numero)       query = query.ilike('numero', `%${filtros.numero.trim()}%`);
  if (filtros.comarca)      query = query.ilike('comarca', `%${filtros.comarca.trim()}%`);
  if (filtros.situacao)     query = query.eq('situacao', filtros.situacao);
  if (filtros.capitulacao)  query = query.ilike('capitulacao_legal', `%${filtros.capitulacao.trim()}%`);
  if (filtros.ano)          query = query.gte('data_instauracao', `${filtros.ano}-01-01`)
                                         .lte('data_instauracao', `${filtros.ano}-12-31`);
  if (filtros.dataInicio)   query = query.gte('data_instauracao', filtros.dataInicio);
  if (filtros.dataFim)      query = query.lte('data_instauracao', filtros.dataFim);

  const de  = (pagina - 1) * porPagina;
  const ate = de + porPagina - 1;

  query = query.order(ordenarPor, { ascending: asc }).range(de, ate);

  const { data, error, count } = await query;
  if (error) throw error;

  let registros = data || [];

  // Filtro por agente envolvido (pós-consulta, via tabela de vínculo)
  if (filtros.agenteId) {
    registros = registros.filter(p =>
      (p.procedimento_agentes || []).some(v => v.agente_id === filtros.agenteId)
    );
  }

  // Filtro por número de vítimas
  if (filtros.numVitimas !== undefined && filtros.numVitimas !== '') {
    registros = registros.filter(p => (p.vitimas || []).length === Number(filtros.numVitimas));
  }

  return { registros, total: count || 0, pagina, porPagina };
}

/* ════════════════════════════════════
   Vítimas
════════════════════════════════════ */

async function adicionarVitima(procedimentoId, vitima) {
  const { data, error } = await sbPic
    .from('vitimas')
    .insert({
      procedimento_id: procedimentoId,
      idade:    vitima.idade ?? null,
      genero:   vitima.genero || null,
      raca_cor: vitima.raca_cor || null,
    })
    .select()
    .single();
  if (error) throw error;

  await registrarHistorico(procedimentoId, 'vitima_adicionada', { vitima_id: data.id });
  return data;
}

async function editarVitima(vitimaId, procedimentoId, campos) {
  const { error } = await sbPic.from('vitimas').update(campos).eq('id', vitimaId);
  if (error) throw error;
  await registrarHistorico(procedimentoId, 'vitima_editada', { vitima_id: vitimaId });
}

async function removerVitima(vitimaId, procedimentoId) {
  const { error } = await sbPic.from('vitimas').delete().eq('id', vitimaId);
  if (error) throw error;
  await registrarHistorico(procedimentoId, 'vitima_removida', { vitima_id: vitimaId });
}

/* ════════════════════════════════════
   Agentes — cadastro único
════════════════════════════════════ */

async function criarAgente(agente) {
  const payload = {
    nome:        String(agente.nome || '').trim(),
    matricula:   agente.matricula ? String(agente.matricula).trim() : null,
    orgao:       agente.orgao || null,
    cargo:       agente.cargo || null,
    observacoes: agente.observacoes || null,
  };
  if (!payload.nome) throw new Error('Nome do agente é obrigatório.');

  const { data, error } = await sbPic.from('agentes').insert(payload).select().single();
  if (error) throw error;
  return data;
}

async function editarAgente(id, campos) {
  const { error } = await sbPic.from('agentes').update(campos).eq('id', id);
  if (error) throw error;
}

async function excluirAgente(id) {
  const { error } = await sbPic.from('agentes').delete().eq('id', id);
  if (error) throw error;
}

async function buscarAgentes(filtroNome = '') {
  let query = sbPic
    .from('agentes')
    .select('*, procedimento_agentes(procedimento_id)')
    .order('nome', { ascending: true });

  if (filtroNome.trim()) query = query.ilike('nome', `%${filtroNome.trim()}%`);

  const { data, error } = await query;
  if (error) throw error;

  return (data || []).map(a => ({
    ...a,
    qtd_procedimentos: (a.procedimento_agentes || []).length,
  }));
}

/** Histórico completo de um agente (para análise de recalcitrância) */
async function buscarProcedimentosDoAgente(agenteId) {
  const { data, error } = await sbPic
    .from('procedimento_agentes')
    .select('procedimentos (*)')
    .eq('agente_id', agenteId);
  if (error) throw error;
  return (data || []).map(v => v.procedimentos).filter(Boolean);
}

/* ════════════════════════════════════
   Vínculo Agente ↔ Procedimento
════════════════════════════════════ */

async function vincularAgente(procedimentoId, agenteId) {
  const { error } = await sbPic
    .from('procedimento_agentes')
    .upsert(
      { procedimento_id: procedimentoId, agente_id: agenteId },
      { onConflict: 'procedimento_id,agente_id' }
    );
  if (error) throw error;
  await registrarHistorico(procedimentoId, 'agente_vinculado', { agente_id: agenteId });
}

async function desvincularAgente(procedimentoId, agenteId) {
  const { error } = await sbPic
    .from('procedimento_agentes')
    .delete()
    .eq('procedimento_id', procedimentoId)
    .eq('agente_id', agenteId);
  if (error) throw error;
  await registrarHistorico(procedimentoId, 'agente_desvinculado', { agente_id: agenteId });
}

/* ════════════════════════════════════
   Arquivamento (somente situacao = 'arquivado')
════════════════════════════════════ */

async function salvarArquivamento(procedimentoId, dataArquivamento, motivo) {
  if (!dataArquivamento || !motivo?.trim()) {
    throw new Error('Data e motivo do arquivamento são obrigatórios.');
  }

  // Garante a situação antes (o trigger do banco também valida)
  await atualizarProcedimento(procedimentoId, { situacao: 'arquivado' });

  const { error } = await sbPic
    .from('arquivamentos')
    .upsert({
      procedimento_id:   procedimentoId,
      data_arquivamento: dataArquivamento,
      motivo:            motivo.trim(),
    });
  if (error) throw error;

  await registrarHistorico(procedimentoId, 'arquivamento', { motivo: motivo.trim() });
}

/* ════════════════════════════════════
   Denúncia (somente situacao = 'denunciado')
════════════════════════════════════ */

async function salvarDenuncia(procedimentoId, numeroDenuncia, dataDenuncia, crimesImputados) {
  if (!numeroDenuncia?.trim() || !dataDenuncia || !crimesImputados?.trim()) {
    throw new Error('Número, data e crimes imputados são obrigatórios.');
  }

  await atualizarProcedimento(procedimentoId, { situacao: 'denunciado' });

  const { error } = await sbPic
    .from('denuncias')
    .upsert({
      procedimento_id:  procedimentoId,
      numero_denuncia:  numeroDenuncia.trim(),
      data_denuncia:    dataDenuncia,
      crimes_imputados: crimesImputados.trim(),
    });
  if (error) throw error;

  await registrarHistorico(procedimentoId, 'denuncia', { numero: numeroDenuncia.trim() });
}

/* ════════════════════════════════════
   Dashboard — indicadores
════════════════════════════════════ */

async function carregarIndicadores() {
  const [procs, vitimas, agentes, denuncias] = await Promise.all([
    sbPic.from('procedimentos').select('id, situacao, comarca, numero, criado_em, data_instauracao'),
    sbPic.from('vitimas').select('id', { count: 'exact', head: true }),
    sbPic.from('agentes').select('id', { count: 'exact', head: true }),
    sbPic.from('denuncias').select('procedimento_id', { count: 'exact', head: true }),
  ]);

  if (procs.error) throw procs.error;
  const lista = procs.data || [];

  const porComarca = {};
  lista.forEach(p => { porComarca[p.comarca] = (porComarca[p.comarca] || 0) + 1; });

  return {
    total:         lista.length,
    emAndamento:   lista.filter(p => p.situacao === 'em_andamento').length,
    arquivados:    lista.filter(p => p.situacao === 'arquivado').length,
    denunciados:   lista.filter(p => p.situacao === 'denunciado').length,
    totalVitimas:  vitimas.count || 0,
    totalAgentes:  agentes.count || 0,
    totalDenuncias: denuncias.count || 0,
    porComarca,
    ultimos: [...lista]
      .sort((a, b) => new Date(b.criado_em) - new Date(a.criado_em))
      .slice(0, 10),
  };
}

/* ════════════════════════════════════
   Relatórios
════════════════════════════════════ */

async function gerarRelatorio(filtros = {}) {
  const { registros } = await consultarProcedimentos(filtros, { porPagina: 1000 });

  const idsProcs = registros.map(p => p.id);
  let vitimas = [];
  if (idsProcs.length) {
    const { data } = await sbPic.from('vitimas').select('*').in('procedimento_id', idsProcs);
    vitimas = data || [];
  }

  const agrupa = (arr, chave) => {
    const r = {};
    arr.forEach(item => {
      const k = item[chave] || 'Não informado';
      r[k] = (r[k] || 0) + 1;
    });
    return r;
  };

  const faixasIdade = { '0-17': 0, '18-29': 0, '30-44': 0, '45-59': 0, '60+': 0, 'Não informado': 0 };
  vitimas.forEach(v => {
    if (v.idade == null) faixasIdade['Não informado']++;
    else if (v.idade < 18) faixasIdade['0-17']++;
    else if (v.idade < 30) faixasIdade['18-29']++;
    else if (v.idade < 45) faixasIdade['30-44']++;
    else if (v.idade < 60) faixasIdade['45-59']++;
    else faixasIdade['60+']++;
  });

  return {
    totalProcedimentos: registros.length,
    porComarca:     agrupa(registros, 'comarca'),
    porSituacao:    agrupa(registros, 'situacao'),
    porCapitulacao: agrupa(registros, 'capitulacao_legal'),
    totalVitimas:   vitimas.length,
    porGenero:      agrupa(vitimas, 'genero'),
    porRacaCor:     agrupa(vitimas, 'raca_cor'),
    porFaixaIdade:  faixasIdade,
    registros,
  };
}

/** Exporta lista de procedimentos para CSV */
function exportarCSV(registros, nomeArquivo = 'relatorio_pic.csv') {
  if (!registros?.length) { alert('Nada para exportar.'); return; }

  const colunas = ['numero', 'comarca', 'data_instauracao', 'situacao', 'capitulacao_legal', 'observacoes'];
  const esc = v => `"${String(v ?? '').replace(/"/g, '""')}"`;

  const linhas = [
    colunas.join(';'),
    ...registros.map(r => colunas.map(c => esc(r[c])).join(';')),
  ];

  const blob = new Blob(['\uFEFF' + linhas.join('\n')], { type: 'text/csv;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = nomeArquivo;
  a.click();
  URL.revokeObjectURL(a.href);
}