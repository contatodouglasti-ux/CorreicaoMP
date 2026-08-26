/* Persistência do módulo de visitas. Requer config.js, auth.js e supabase-js. */
(function () {
  const emailUsuario = () => {
    const email = typeof getEmailUsuario === 'function' ? getEmailUsuario() : '';
    return email && email !== 'desconhecido' ? email.toLowerCase() : '';
  };

  if (!window.supabase || !window.CONFIG) {
    console.error('Supabase não foi carregado para o módulo de visitas.');
    return;
  }

  const sbVisitas = supabase.createClient(CONFIG.supabase.url, CONFIG.supabase.anonKey, {
    global: { headers: { 'x-user-id': emailUsuario() } }
  });

  const nomeSeguro = (nome) => String(nome || 'anexo')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9._-]+/g, '-').replace(/-+/g, '-');

  async function enviarAnexo(arquivo, email) {
    if (!arquivo) return null;
    const caminho = `${email || 'sem-usuario'}/${Date.now()}-${nomeSeguro(arquivo.name)}`;
    const { error } = await sbVisitas.storage
      .from('anexos_visitas_unidades')
      .upload(caminho, arquivo, { contentType: arquivo.type, upsert: false });
    if (error) throw error;
    return { bucket: 'anexos_visitas_unidades', caminho, nome: arquivo.name, tipo: arquivo.type, tamanho: arquivo.size };
  }

  window.salvarVisitaNoSupabase = async function salvarVisitaNoSupabase(dados, arquivo) {
    const email = emailUsuario() || String(dados.email || '').trim().toLowerCase();
    if (!email) throw new Error('Não foi possível identificar o usuário responsável pela visita.');

    const anexo = await enviarAnexo(arquivo, email);
    const payload = {
      criado_por: email,
      membro_responsavel: dados.membro_responsavel || null,
      email_contato: dados.email || email,
      municipio: dados.municipio || null,
      estabelecimento: dados.estabelecimento || null,
      data_visita: dados.data_visita || null,
      dados,
      anexo,
      status: 'finalizada'
    };

    const { data, error } = await sbVisitas
      .from('visitas_unidades_prisionais')
      .insert(payload)
      .select('id')
      .single();
    if (error) throw error;
    return data;
  };
})();
