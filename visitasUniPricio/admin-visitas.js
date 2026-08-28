(() => {
  const WINE = '#7c1a1b';
  const TEAL = '#0f6078';
  const RIGHTS = [
    ['banho_sol', 'Banho de sol'], ['visita_familiar', 'Visitas familiares'],
    ['visita_intima', 'Visita íntima'], ['saude', 'Saúde'], ['religiosa', 'Assistência religiosa'],
    ['educacao', 'Educação'], ['trabalho', 'Trabalho'], ['remissao', 'Remição por leitura']
  ];
  let registros = [];
  const charts = {};

  const numero = valor => {
    const resultado = Number(String(valor ?? '').replace(',', '.'));
    return Number.isFinite(resultado) ? resultado : 0;
  };
  const resposta = valor => String(valor ?? '').trim().toLowerCase();
  const sim = valor => ['sim', 's', 'yes'].includes(resposta(valor));
  const nao = valor => ['não', 'nao', 'n'].includes(resposta(valor));
  const competencia = visita => String(visita.data_visita || visita.criado_em || '').slice(0, 7);
  const unidade = visita => visita.estabelecimento || visita.municipio || 'Unidade não informada';
  const formatarMes = chave => chave ? new Intl.DateTimeFormat('pt-BR', { month: 'short', year: '2-digit' }).format(new Date(`${chave}-02T12:00:00`)) : 'Sem data';
  const status = (texto, erro = false) => { const elemento = document.getElementById('dashboardStatus'); elemento.textContent = texto; elemento.classList.toggle('error', erro); };

  function filtrar() {
    const filtroUnidade = document.getElementById('unitFilter').value;
    const inicio = document.getElementById('startDate').value;
    const fim = document.getElementById('endDate').value;
    return registros.filter(visita => {
      const mes = competencia(visita);
      return (!filtroUnidade || unidade(visita) === filtroUnidade) && (!inicio || mes >= inicio) && (!fim || mes <= fim);
    });
  }

  function ultimasPorUnidade(visitas) {
    return Object.values(visitas.reduce((mapa, visita) => {
      const chave = unidade(visita);
      if (!mapa[chave] || String(visita.data_visita || visita.criado_em) > String(mapa[chave].data_visita || mapa[chave].criado_em)) mapa[chave] = visita;
      return mapa;
    }, {}));
  }

  function atualizarKpis(visitas) {
    const ultimas = ultimasPorUnidade(visitas);
    const total = ultimas.reduce((soma, visita) => soma + numero(visita.dados.total_presos), 0);
    const capacidade = ultimas.reduce((soma, visita) => soma + numero(visita.dados.capacidade), 0);
    const direitos = ultimas.flatMap(visita => RIGHTS.map(([chave]) => visita.dados[chave])).filter(valor => valor !== undefined && valor !== '');
    const avcbSim = ultimas.filter(visita => sim(visita.dados.avcb)).length;
    const formatador = new Intl.NumberFormat('pt-BR');
    document.getElementById('kpiCustodiados').textContent = formatador.format(total);
    document.getElementById('kpiCapacidade').textContent = formatador.format(capacidade);
    document.getElementById('kpiLotacao').textContent = capacidade ? `${Math.round((total / capacidade) * 100)}%` : '—';
    document.getElementById('kpiLotacaoNote').textContent = capacidade ? `${formatador.format(Math.max(total - capacidade, 0))} acima da capacidade` : 'capacidade não informada';
    document.getElementById('kpiDireitos').textContent = direitos.length ? `${Math.round((direitos.filter(sim).length / direitos.length) * 100)}%` : '—';
    document.getElementById('kpiAvcb').textContent = ultimas.length ? `${avcbSim} / ${ultimas.length}` : '—';
  }

  function porMes(visitas) {
    return visitas.reduce((mapa, visita) => {
      const mes = competencia(visita) || 'sem-data';
      (mapa[mes] ||= []).push(visita);
      return mapa;
    }, {});
  }

  function desenharGrafico(nome, canvas, configuracao) {
    charts[nome]?.destroy();
    charts[nome] = new Chart(canvas, configuracao);
  }

  function atualizarGraficos(visitas) {
    const meses = porMes(visitas);
    const chaves = Object.keys(meses).sort();
    const rotulos = chaves.map(formatarMes);
    const totais = chave => meses[chave].reduce((soma, visita) => soma + numero(visita.dados.total_presos), 0);
    const capacidades = chave => meses[chave].reduce((soma, visita) => soma + numero(visita.dados.capacidade), 0);

    desenharGrafico('occupancy', document.getElementById('occupancyChart'), {
      type: 'line', data: { labels: rotulos, datasets: [
        { label: 'Custodiados', data: chaves.map(totais), borderColor: WINE, backgroundColor: 'rgba(124,26,27,.14)', fill: true, tension: .3 },
        { label: 'Capacidade projetada', data: chaves.map(capacidades), borderColor: TEAL, backgroundColor: 'transparent', borderDash: [6, 5], tension: .3 }
      ]}, options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } }, plugins: { legend: { position: 'bottom' } } }
    });

    desenharGrafico('profile', document.getElementById('profileChart'), {
      type: 'bar', data: { labels: rotulos, datasets: [
        { label: 'Provisórios', data: chaves.map(chave => meses[chave].reduce((soma, visita) => soma + numero(visita.dados.provisorios), 0)), backgroundColor: TEAL },
        { label: 'Definitivos', data: chaves.map(chave => meses[chave].reduce((soma, visita) => soma + numero(visita.dados.definitivos), 0)), backgroundColor: WINE }
      ]}, options: { responsive: true, maintainAspectRatio: false, scales: { x: { stacked: true }, y: { stacked: true, beginAtZero: true } }, plugins: { legend: { position: 'bottom' } } }
    });

    const criticos = {
      'Superlotação': visitas.filter(visita => numero(visita.dados.total_presos) > numero(visita.dados.capacidade) && numero(visita.dados.capacidade) > 0).length,
      'Efetivo insuficiente': visitas.filter(visita => nao(visita.dados.quadro_suficiente)).length,
      'Sem AVCB': visitas.filter(visita => nao(visita.dados.avcb)).length,
      'Segurança': visitas.filter(visita => ['visitantes', 'revista', 'video'].some(chave => nao(visita.dados[chave]))).length,
      'Direitos não assegurados': visitas.filter(visita => RIGHTS.some(([chave]) => nao(visita.dados[chave]))).length
    };
    desenharGrafico('critical', document.getElementById('criticalChart'), {
      type: 'bar', data: { labels: Object.keys(criticos), datasets: [{ label: 'Visitas com ocorrência', data: Object.values(criticos), backgroundColor: [WINE, '#b65354', '#cf8181', '#9f3538', '#ddaaaa'], borderRadius: 5 }] },
      options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, scales: { x: { beginAtZero: true, ticks: { precision: 0 } } }, plugins: { legend: { display: false } } }
    });
    atualizarHeatmap(meses, chaves);
  }

  function atualizarHeatmap(meses, chaves) {
    const destino = document.getElementById('rightsHeatmap');
    destino.style.setProperty('--columns', Math.max(chaves.length, 1));
    if (!chaves.length) { destino.innerHTML = '<div class="empty">Não há visitas finalizadas para os filtros selecionados.</div>'; return; }
    const cabecalho = ['<div class="heat-head">Direito</div>', ...chaves.map(chave => `<div class="heat-head">${formatarMes(chave)}</div>`)].join('');
    const linhas = RIGHTS.map(([chave, titulo]) => {
      const celulas = chaves.map(mes => {
        const respostas = meses[mes].map(visita => visita.dados[chave]).filter(valor => valor !== undefined && valor !== '');
        const percentual = respostas.length ? Math.round((respostas.filter(sim).length / respostas.length) * 100) : null;
        const cor = percentual === null ? '#aebbc0' : percentual >= 75 ? '#27805e' : percentual >= 40 ? '#bf8428' : WINE;
        const texto = percentual === null ? '—' : `${percentual}%`;
        return `<div class="heat-cell" style="background:${cor}" title="${titulo}: ${texto} de respostas Sim">${texto}</div>`;
      }).join('');
      return `<div class="heat-label">${titulo}</div>${celulas}`;
    }).join('');
    destino.innerHTML = cabecalho + linhas;
  }

  function atualizarTudo() {
    const visitas = filtrar();
    atualizarKpis(visitas);
    atualizarGraficos(visitas);
    status(`${visitas.length} visita${visitas.length === 1 ? '' : 's'} finalizada${visitas.length === 1 ? '' : 's'} nos filtros atuais.`);
  }

  async function carregar() {
    status('Carregando dados…');
    document.getElementById('refreshButton').disabled = true;
    try {
      const cliente = supabase.createClient(CONFIG.supabase.url, CONFIG.supabase.anonKey, { global: { headers: { 'x-user-id': getEmailUsuario().toLowerCase() } } });
      const { data, error } = await cliente.rpc('buscar_visitas_unidades_painel');
      if (error) throw error;
      registros = (data || []).map(visita => ({ ...visita, dados: visita.dados || {} }));
      const select = document.getElementById('unitFilter');
      const valorAtual = select.value;
      const unidades = [...new Set(registros.map(unidade))].sort((a, b) => a.localeCompare(b, 'pt-BR'));
      select.innerHTML = '<option value="">Todas as unidades</option>' + unidades.map(nome => `<option value="${nome.replaceAll('&', '&amp;').replaceAll('"', '&quot;')}">${nome.replaceAll('&', '&amp;').replaceAll('<', '&lt;')}</option>`).join('');
      select.value = unidades.includes(valorAtual) ? valorAtual : '';
      atualizarTudo();
    } catch (erro) {
      status(`Não foi possível carregar o painel: ${erro.message}`, true);
    } finally { document.getElementById('refreshButton').disabled = false; }
  }

  document.getElementById('unitFilter').addEventListener('change', atualizarTudo);
  document.getElementById('startDate').addEventListener('change', atualizarTudo);
  document.getElementById('endDate').addEventListener('change', atualizarTudo);
  document.getElementById('clearFilters').addEventListener('click', () => { document.getElementById('unitFilter').value = ''; document.getElementById('startDate').value = ''; document.getElementById('endDate').value = ''; atualizarTudo(); });
  document.getElementById('refreshButton').addEventListener('click', carregar);

  (async () => {
    try { await verificarAdmin(); await exibirBadgeUsuario(); await carregar(); }
    catch (_) { /* verificarAdmin direciona o usuário sem permissão. */ }
  })();
})();
