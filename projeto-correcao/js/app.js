/**
 * app.js
 * Estado global e inicialização da aplicação.
 * Ponto de entrada — deve ser carregado por último no index.html.
 * Depende de: config.js, auth.js, db.js, ui.js, form.js, historico.js, pdf.js, Secoes.js
 */

/* ── Estado global ──────────────────────────────────────── */

let atual      = 0;
let registroId = null;   // UUID do registro ativo no Supabase
let modoLeitura = false; // true = formulário bloqueado (já finalizado)

/* ── Auto-save (debounce 1,5s) ──────────────────────────── */

let _autoSalvarTimer = null;

function autoSalvar() {
  clearTimeout(_autoSalvarTimer);
  _autoSalvarTimer = setTimeout(() => {
    if (registroId) {
      const dados = coletar();
      window._dadosCarregados = dados;
      persistirDados(registroId, dados);
    }
  }, 1500);
}

/* ── Salvar seção ───────────────────────────────────────── */

async function salvarSecao(i) {
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

  mostrarLoading('Salvando seção…');
  try {
    const dadosSecao  = coletar(i);
    const dadosAtuais = window._dadosCarregados || {};
    const dadosMerged = Object.assign({}, dadosAtuais, dadosSecao);
    window._dadosCarregados = dadosMerged;

    const secoesOk = await buscarSecoesOk(registroId);
    secoesOk[i] = 'true';

    await salvarSecaoNoBanco(registroId, dadosMerged, secoesOk);

    bloquearSecao(i);
    atualizarMenuBadge(i);
    showToast(`Seção "${form.secoes[i].nome}" salva ✅`, 'ok');
  } catch (err) {
    console.error(err);
    showToast('Erro ao salvar seção. Verifique sua conexão.', 'erro');
  } finally {
    esconderLoading();
  }
}

/* ── Enviar tudo ────────────────────────────────────────── */

async function enviarTudo() {
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

/* ── Nova correição ─────────────────────────────────────── */

async function novaCorreicao() {
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

/* ── Inicialização ──────────────────────────────────────── */

async function init() {
  mostrarLoading('Carregando…');
  try {
    exibirBadgeUsuario();
    criarMenu();
    criarForm();

    const reg = await garantirRegistroAberto();
    registroId  = reg.id;
    modoLeitura = reg.finalizado;
    window._dadosCarregados = reg.dados || {};

    carregar();

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
    showToast('Erro ao conectar ao banco de dados. Verifique as credenciais do Supabase.', 'erro');
  } finally {
    esconderLoading();
  }
}

init();
