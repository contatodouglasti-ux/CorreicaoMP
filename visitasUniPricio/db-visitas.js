/* Persistência do módulo de visitas. Requer config.js, auth.js e supabase-js. */
(function () {
  const emailUsuario = () => {
    const email = typeof getEmailUsuario === 'function' ? getEmailUsuario() : '';
    return email && email !== 'desconhecido' ? email.toLowerCase() : '';
  };

  if (!window.supabase || typeof CONFIG === 'undefined') {
    console.error('Supabase não foi carregado para o módulo de visitas.');
    return;
  }

  const sbVisitas = supabase.createClient(CONFIG.supabase.url, CONFIG.supabase.anonKey, {
    global: { headers: { 'x-user-id': emailUsuario() } }
  });
  let visitaRascunhoId = null;
  let iniciarNovoRascunho = false;

  const nomeSeguro = (nome) => String(nome || 'anexo')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9._-]+/g, '-').replace(/-+/g, '-');

  window.enviarAnexosVisita = async function enviarAnexosVisita(visitaId, arquivos) {
    const email = emailUsuario();
    if (!email) throw new Error('Faça login para enviar fotografias.');
    const lista = Array.from(arquivos || []);
    if (!lista.length) return [];

    const anexos = [];
    for (const arquivo of lista) {
      const caminho = `${email}/${visitaId}/fotos/${Date.now()}-${nomeSeguro(arquivo.name)}`;
      const { error: erroUpload } = await sbVisitas.storage
        .from('anexos_visitas_unidades')
        .upload(caminho, arquivo, { contentType: arquivo.type, upsert: false });
      if (erroUpload) throw erroUpload;

      const anexo = { visita_id: visitaId, criado_por: email, bucket: 'anexos_visitas_unidades', caminho, nome_arquivo: arquivo.name, tipo_arquivo: arquivo.type, tamanho_bytes: arquivo.size };
      const { error: erroRegistro } = await sbVisitas.from('visitas_unidades_anexos').insert(anexo);
      if (erroRegistro) throw erroRegistro;
      anexos.push(anexo);
    }
    return anexos;
  };

  window.listarAnexosVisita = async function listarAnexosVisita(visitaId) {
    const { data, error } = await sbVisitas.from('visitas_unidades_anexos')
      .select('id, nome_arquivo, tipo_arquivo, tamanho_bytes, caminho, criado_em')
      .eq('visita_id', visitaId).order('criado_em');
    if (error) throw error;

    return Promise.all((data || []).map(async anexo => {
      const { data: link, error: erroLink } = await sbVisitas.storage
        .from('anexos_visitas_unidades').createSignedUrl(anexo.caminho, 3600);
      if (erroLink) throw erroLink;
      return { ...anexo, url: link.signedUrl };
    }));
  };

  async function buscarRascunho(email) {
    const { data, error } = await sbVisitas
      .from('visitas_unidades_prisionais')
      .select('id, dados')
      .eq('criado_por', email)
      .eq('status', 'rascunho')
      .order('atualizado_em', { ascending: false })
      .limit(1)
      .maybeSingle();
    if (error) throw error;
    return data;
  }

  window.listarVisitasDoUsuario = async function listarVisitasDoUsuario() {
    const email = emailUsuario();
    if (!email) throw new Error('Faça login para consultar o histórico.');
    const { data, error } = await sbVisitas.from('visitas_unidades_prisionais')
      .select('id, status, municipio, estabelecimento, data_visita, criado_em, atualizado_em')
      .eq('criado_por', email).order('atualizado_em', { ascending: false });
    if (error) throw error;
    return data || [];
  };

  window.carregarRascunhoVisita = async function carregarRascunhoVisita(id) {
    const { data, error } = await sbVisitas.from('visitas_unidades_prisionais')
      .select('id, dados').eq('id', id).eq('status', 'rascunho').single();
    if (error) throw error;
    visitaRascunhoId = data.id;
    iniciarNovoRascunho = false;
    return data;
  };

  window.iniciarNovoRascunhoVisita = async function iniciarNovoRascunhoVisita() {
    const visitas = await window.listarVisitasDoUsuario();
    if (visitas.filter(visita => visita.status === 'rascunho').length >= 2) {
      throw new Error('Você já possui o limite de dois rascunhos.');
    }
    visitaRascunhoId = null;
    iniciarNovoRascunho = true;
  };

  window.salvarRascunhoVisita = async function salvarRascunhoVisita(dadosDaSecao) {
    const email = emailUsuario() || String(dadosDaSecao.email || '').trim().toLowerCase();
    if (!email) throw new Error('Não foi possível identificar o usuário responsável pela visita.');

    let rascunho = visitaRascunhoId ? { id: visitaRascunhoId } : (iniciarNovoRascunho ? null : await buscarRascunho(email));
    if (rascunho?.id && !rascunho.dados) {
      const { data, error } = await sbVisitas.from('visitas_unidades_prisionais').select('dados').eq('id', rascunho.id).single();
      if (error) throw error;
      rascunho.dados = data.dados || {};
    }

    const dados = { ...(rascunho?.dados || {}), ...dadosDaSecao };
    const resumo = {
      membro_responsavel: dados.membro_responsavel || null,
      email_contato: dados.email || email,
      municipio: dados.municipio || null,
      estabelecimento: dados.estabelecimento || null,
      data_visita: dados.data_visita || null,
      dados,
      atualizado_em: new Date().toISOString()
    };

    if (rascunho?.id) {
      const { data, error } = await sbVisitas.from('visitas_unidades_prisionais').update(resumo).eq('id', rascunho.id).select('id').maybeSingle();
      if (error) throw error;
      if (!data) throw new Error('O Supabase bloqueou a atualização do rascunho. Execute a migration de permissão de atualização.');
      visitaRascunhoId = data.id;
      return data;
    }

    const { data, error } = await sbVisitas.from('visitas_unidades_prisionais')
      .insert({ ...resumo, criado_por: email, status: 'rascunho' }).select('id').single();
    if (error) throw error;
    visitaRascunhoId = data.id;
    iniciarNovoRascunho = false;
    return data;
  };

  window.salvarVisitaNoSupabase = async function salvarVisitaNoSupabase(dados) {
    const email = emailUsuario() || String(dados.email || '').trim().toLowerCase();
    if (!email) throw new Error('Não foi possível identificar o usuário responsável pela visita.');

    const payload = {
      criado_por: email,
      membro_responsavel: dados.membro_responsavel || null,
      email_contato: dados.email || email,
      municipio: dados.municipio || null,
      estabelecimento: dados.estabelecimento || null,
      data_visita: dados.data_visita || null,
      dados,
      status: 'finalizada'
    };

    const rascunho = visitaRascunhoId ? { id: visitaRascunhoId } : await buscarRascunho(email);
    const consulta = rascunho?.id
      ? sbVisitas.from('visitas_unidades_prisionais').update(payload).eq('id', rascunho.id)
      : sbVisitas.from('visitas_unidades_prisionais').insert(payload);
    const { data, error } = await consulta.select('id').single();
    if (error) throw error;
    visitaRascunhoId = null;
    return data;
  };
})();
