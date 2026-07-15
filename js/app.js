/**
 * app.js
 * Estado global e inicialização da aplicação.
 * Ponto de entrada — deve ser carregado por último no index.html.
 * Depende de: config.js, auth.js, db.js, ui.js, form.js, historico.js, pdf.js, Secoes.js
 */

/* ── Estado global ──── */

let atual      = 0;
let registroId = null;   // UUID do registro ativo no Supabase
let modoLeitura = false; // true = formulário bloqueado (já finalizado)
let usuarioPodePreencher = false;


async function atualizarPermissaoUsuario() {
  try {
    usuarioPodePreencher = await usuarioEstaPendente();
  } catch (err) {
    console.error('Erro ao verificar pendência do usuário:', err);
    usuarioPodePreencher = false;
  }
  return usuarioPodePreencher;
}

function aplicarModoSomenteLeituraForcado(mensagem = 'Você não tem permissão para preencher respostas. Aguarde o administrador marcá-lo como pendente.') {
  registroId = null;
  modoLeitura = true;
  window._dadosCarregados = {};

  const enviarWrap = document.getElementById('enviarTudoWrap');
  if (enviarWrap) enviarWrap.style.display = 'none';

  const aviso = document.querySelector('.modo-leitura-aviso');
  if (aviso) aviso.remove();

  document.querySelectorAll('#formContainer input, #formContainer textarea, #formContainer select, #formContainer button').forEach(el => {
    if (el.tagName === 'BUTTON') return;
    el.disabled = true;
  });

  const sidebarNova = document.querySelector('.sidebar-footer .sidebar-item[onclick*="novaCorreicao"]');
  if (sidebarNova) {
    sidebarNova.style.opacity = '0.5';
    sidebarNova.style.pointerEvents = 'none';
    sidebarNova.title = mensagem;
  }

  showToast(mensagem, 'erro');
}

/* ── Campos fixos (Unidade 1.1 e Membro 1.3) ──── */

async function preencherCamposFixos() {
  window._dadosCarregados = window._dadosCarregados || {};

  // Membro Correicionado = nome do login (sempre bloqueado)
  const inpMembro = document.getElementById('1.3');
  if (inpMembro) {
    inpMembro.value = getNomeUsuario();
    inpMembro.readOnly = true;
    inpMembro.tabIndex = -1;
    inpMembro.classList.add('campo-bloqueado');
    window._dadosCarregados['1.3'] = inpMembro.value;
  }

  // Unidade correicionada vinda da base (sempre bloqueada)
  const inpUnidade = document.getElementById('1.1');
  if (inpUnidade) {
    try {
      const unidade = await buscarUnidadeDoUsuario();
      if (unidade) {
        inpUnidade.value = unidade;
        window._dadosCarregados['1.1'] = unidade;
      }
    } catch (err) {
      console.error('Erro ao preencher unidade do usuário:', err);
    }
    inpUnidade.readOnly = true;
    inpUnidade.tabIndex = -1;
    inpUnidade.placeholder = '';
    inpUnidade.classList.add('campo-bloqueado');
    if (typeof esconderSugestoesUnidade === 'function') esconderSugestoesUnidade(inpUnidade);
  }
}

/* ── Auto-save (somente estado em memória) ──── */

let _autoSalvarTimer = null;

function autoSalvar() {
  clearTimeout(_autoSalvarTimer);
  _autoSalvarTimer = setTimeout(() => {
    if (registroId) {
      const dados = coletar();
      window._dadosCarregados = { ...window._dadosCarregados, ...dados };

      if (typeof atualizarCamposCalculados === 'function') atualizarCamposCalculados();
      if (typeof avaliarCondicionais === 'function') avaliarCondicionais();
      if (typeof atualizarEstadoSubtopicos === 'function') atualizarEstadoSubtopicos();
    }
  }, 1500);
}

/* ── Salvar seção ──── */

async function salvarSecao(i) {
  if (!usuarioPodePreencher) {
    showToast('Você só pode preencher respostas quando estiver como pendente.', 'erro');
    return;
  }
  if (modoLeitura) {
    showToast('Este envio já foi finalizado e não pode ser alterado.', 'erro');
    return;
  }

  const section  = document.querySelectorAll('.section')[i];
  const invalidos = encontrarInvalidos(section);
  if (invalidos.length) {
    mostrar(i);
    focusFirstInvalid(invalidos);
    showToast('Preencha todos os campos obrigatórios antes de salvar a seção.', 'erro');
    return;
  }

  // Valida chip-bar de subtópicos: pelo menos um chip deve estar ativo
  const chipBar = section.querySelector('.chip-bar');
  if (chipBar) {
    const algumAtivo = chipBar.querySelector('.chip-ativo');
    if (!algumAtivo) {
      mostrar(i);
      chipBar.scrollIntoView({ behavior: 'smooth', block: 'center' });
      chipBar.style.outline = '2px solid #fc8181';
      chipBar.style.borderRadius = '6px';
      setTimeout(() => { chipBar.style.outline = ''; chipBar.style.borderRadius = ''; }, 3000);
      showToast('Selecione pelo menos um subtópico antes de salvar a seção.', 'erro');
      return;
    }
  }

  mostrarLoading('Salvando seção…');
  try {
    const dadosSecao  = coletar(i);
    const dadosAtuais = window._dadosCarregados || {};
    const dadosMerged = Object.assign({}, dadosAtuais, dadosSecao);

    const secoesOk = await buscarSecoesOk(registroId);
    const secoesParaSalvar = Object.assign({}, secoesOk, { [i]: 'true' });

    await salvarSecaoNoBanco(registroId, dadosMerged, secoesParaSalvar);

    const secoesConfirmadas = await buscarSecoesOk(registroId);
    if (!secoesConfirmadas || String(secoesConfirmadas[i]) !== 'true') {
      throw new Error('Falha ao confirmar o salvamento no banco');
    }

    window._dadosCarregados = dadosMerged;
    bloquearSecao(i);
    atualizarMenuBadge(i, true);
    showToast(`Seção "${form.secoes[i].nome}" salva ✅`, 'ok');
  } catch (err) {
    console.error(err);
    showToast('Erro ao salvar seção. Verifique sua conexão.', 'erro');
  } finally {
    esconderLoading();
  }
}

/* ── Enviar tudo ──── */

async function enviarTudo() {
  if (!usuarioPodePreencher) {
    showToast('Você só pode enviar respostas quando estiver como pendente.', 'erro');
    return;
  }
  if (modoLeitura) {
    showToast('Este envio já foi finalizado.', 'erro');
    return;
  }

  const container = document.getElementById('formContainer');
  const invalidos  = encontrarInvalidos(container);
  if (invalidos.length) {
    const firstSection = invalidos[0].closest('.section');
    if (firstSection) mostrar(Array.from(document.querySelectorAll('.section')).indexOf(firstSection));
    focusFirstInvalid(invalidos);
    showToast('Preencha todos os campos obrigatórios antes de enviar.', 'erro');
    return;
  }

  mostrarLoading('Enviando…');
  try {
    const dadosCampos = coletar();
    const email       = getEmailUsuario();
    const nome        = getNomeUsuario();
    const dataEnvio   = new Date().toISOString();

    // 1. Finaliza no Supabase
    await finalizarRegistro(registroId, dadosCampos);

    const regConfirmado = await carregarRegistroPorId(registroId);
    if (!regConfirmado || regConfirmado.finalizado !== true) {
      throw new Error('Falha ao confirmar a finalização no banco');
    }

    // 2. Envia payload reduzido ao Power Automate
    const payload = { registro_id: registroId, email, nome, data_envio: dataEnvio };

    console.log('%c[enviarTudo] Payload → Power Automate', 'color:#1C799B;font-weight:bold;');
    console.log(payload);

    const r = await fetch(CONFIG.powerAutomate.webhookUrl, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    });
    if (!r.ok) throw new Error('HTTP ' + r.status);

    // 3. Bloqueia tudo
    modoLeitura = true;
    form.secoes.forEach((_, i) => bloquearSecao(i));
    document.getElementById('enviarTudoWrap').style.display = 'none';
    mostrarAvisoLeitura();
    showToast('Dados enviados com sucesso ✅', 'ok');

  } catch (err) {
    console.error('Erro enviarTudo:', err);
    showToast('Erro ao enviar (' + (err.message || 'verifique o console') + '). Tente novamente.', 'erro');
  } finally {
    esconderLoading();
  }
}

/* ── Nova correição ──── */

async function novaCorreicao() {
  // Revalida permissão no momento do clique
  await atualizarPermissaoUsuario();

  if (!usuarioPodePreencher) {
    showToast('Você só pode iniciar uma nova correição quando o administrador marcar você como pendente.', 'erro');
    await abrirHistorico();
    return;
  }

  // Bloqueia se já existe correição finalizada — aguarda nova liberação do admin
  const registros = await listarRegistrosDoUsuario();
  const temFinalizada = registros.some(r => r.finalizado === true);
  if (temFinalizada) {
    showToast('Você já possui uma correição finalizada. Aguarde o administrador liberar um novo preenchimento.', 'erro');
    await abrirHistorico();
    return;
  }

  if (registroId && !modoLeitura) {
    const secoesOk  = await buscarSecoesOk(registroId);
    const pendentes = form.secoes.length - Object.keys(secoesOk).length;
    if (pendentes > 0) {
      if (!confirm(`Você tem ${pendentes} seção(ões) não salva(s).\n\nDeseja iniciar uma nova correição? O rascunho atual será mantido.`)) return;
    }
  }

  mostrarLoading('Criando nova correição…');
  try {
    const novo = await criarNovoRegistro();

    registroId  = novo.id;
    modoLeitura = false;
    window._dadosCarregados = {};

    document.querySelectorAll('#formContainer input, #formContainer textarea').forEach(el => {
      if (el.type === 'radio' || el.type === 'checkbox') el.checked = false;
      else el.value = '';
    });

    form.secoes.forEach((_, i) => { desbloquearSecao(i); atualizarMenuBadge(i, false); });
    document.getElementById('enviarTudoWrap').style.display = '';
    const aviso = document.querySelector('.modo-leitura-aviso');
    if (aviso) aviso.remove();

    await preencherCamposFixos();
    atualizarCamposCalculados();

    avaliarCondicionais();
    abrirFormulario();
    mostrar(0);
    showToast('Nova correição iniciada ✅', 'ok');
  } catch (err) {
    console.error(err);
    showToast('Erro ao criar nova correição.', 'erro');
  } finally {
    esconderLoading();
  }
}

/* ── Inicialização ──── */

async function init() {
  mostrarLoading('Carregando…');
  try {
    criarMenu();
    criarForm();

    // Carrega a permissão antes de qualquer decisão
    await atualizarPermissaoUsuario();

    if (!usuarioPodePreencher) {
      // Usuário não pendente: carrega só em modo leitura, sem criar registro
      aplicarModoSomenteLeituraForcado();
      await preencherCamposFixos();
      avaliarCondicionais();
      mostrar(0);
      return;
    }

    const reg = await garantirRegistroAberto();

    // garantirRegistroAberto pode retornar null se não for pendente
    if (!reg) {
      aplicarModoSomenteLeituraForcado();
      await preencherCamposFixos();
      avaliarCondicionais();
      mostrar(0);
      return;
    }

    registroId  = reg.id;
    modoLeitura = reg.finalizado;
    window._dadosCarregados = reg.dados || {};

    carregar();
    await preencherCamposFixos();

    const secoesOk = reg.secoes_ok || {};
    Object.keys(secoesOk).forEach(i => {
      bloquearSecao(Number(i));
      atualizarMenuBadge(Number(i), true);
    });

    if (modoLeitura) {
      form.secoes.forEach((_, i) => bloquearSecao(i));
      document.getElementById('enviarTudoWrap').style.display = 'none';
      mostrarAvisoLeitura();
    }

    avaliarCondicionais();
    mostrar(0);
  } catch (err) {
    console.error('Erro na inicialização:', err);
    showToast('Erro ao conectar ao banco de dados.', 'erro');
  } finally {
    esconderLoading();
  }
}

init();


