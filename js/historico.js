/**
 * historico.js
 * Histórico de correições: listagem, abertura, exclusão.
 * Depende de: db.js, ui.js, form.js, app.js, modal-viewer.js
 *
 * O modal de "Ver / Imprimir" agora usa o ModalViewer compartilhado,
 * o mesmo utilizado pelo admin.html.
 */

function abrirFormulario() {
  document.getElementById('formContainer').style.display = '';
  document.getElementById('historicoContainer').style.display = 'none';
  if (!modoLeitura) document.getElementById('enviarTudoWrap').style.display = '';
}

async function abrirHistorico() {
  document.getElementById('formContainer').style.display = 'none';
  document.getElementById('enviarTudoWrap').style.display = 'none';

  const hc = document.getElementById('historicoContainer');
  hc.style.display = '';
  hc.innerHTML = '<p style="color:#546E7A;padding:20px">Carregando histórico…</p>';

  try {
    const podePreencher = await usuarioEstaPendente();
    let registros = await listarRegistrosDoUsuario();

    if (!podePreencher) {
      registros = registros.filter(reg => reg.finalizado === true);
    }

    renderHistorico(registros, hc, podePreencher);
  } catch (err) {
    hc.innerHTML = '<p style="color:#c0392b;padding:20px">Erro ao carregar histórico.</p>';
    console.error(err);
  }
}

function renderHistorico(registros, container, podePreencher = true) {
  container.innerHTML = '';

  const titulo = document.createElement('h2');
  titulo.innerText = '📋 Histórico de Correições';
  titulo.style.cssText = 'color:#2c3e50;margin-bottom:20px;';
  container.appendChild(titulo);

  if (!podePreencher) {
    const aviso = document.createElement('div');
    aviso.style.cssText = 'background:#eef7fb;border-left:4px solid #1C799B;padding:12px 14px;border-radius:8px;margin-bottom:16px;color:#36515f;font-size:13px;';
    aviso.innerText = 'Seu acesso está em modo somente leitura. Aqui aparecem apenas registros finalizados.';
    container.appendChild(aviso);
  }

  if (!registros || registros.length === 0) {
    container.innerHTML += '<p style="color:#546E7A">Nenhum registro encontrado.</p>';
    return;
  }

  registros.forEach(reg => {
    const card = document.createElement('div');
    card.style.cssText = `
      background:#fff;border-radius:10px;padding:18px 20px;margin-bottom:14px;
      box-shadow:0 2px 8px rgba(0,0,0,0.08);
      border-left:4px solid ${reg.finalizado ? '#27ae60' : '#1C799B'};
      display:flex;justify-content:space-between;align-items:flex-start;gap:18px;
    `;

    const data = new Date(reg.criado_em);
    const dataStr = isNaN(data) ? reg.criado_em : data.toLocaleString('pt-BR');
    const secoesOk = Object.keys(reg.secoes_ok || {}).length;
    const status = reg.finalizado
      ? '<span style="color:#27ae60;font-weight:700">✅ Finalizado</span>'
      : `<span style="color:#f39c12;font-weight:700">⏳ Em andamento (${secoesOk}/${form.secoes.length} seções)</span>`;

    card.innerHTML = `
      <div>
        <div style="font-weight:700;color:#263238;font-size:15px">Correição — ${dataStr}</div>
        <div style="color:#546E7A;font-size:13px;margin-top:4px">${status}</div>
      </div>
      <div class="historico-card-actions">
        <button class="btn-primary">Abrir</button>
        <button class="btn-gray">👁 Ver / Imprimir</button>
        ${reg.finalizado
          ? '<button class="btn-reaproveitar">♻️ Reaproveitar</button>'
          : '<button class="btn-danger">🗑️ Excluir</button>'
        }
      </div>
    `;

    const btnAbrir = card.querySelector('.btn-primary');
    const btnVer = card.querySelector('.btn-gray');
    const btnRea = card.querySelector('.btn-reaproveitar');
    const btnExcluir = card.querySelector('.btn-danger');

    btnAbrir.onclick = () => carregarRegistro(reg.id, reg.finalizado);

    /* ── Usa o ModalViewer compartilhado ── */
    btnVer.onclick = () => _abrirViewer(reg.id);

    /* ── Reaproveitar respostas de um registro finalizado ── */
    if (btnRea) btnRea.onclick = () => _confirmarReaproveitamento(reg.id);

    if (btnExcluir) {
      btnExcluir.onclick = () => _confirmarExclusao(reg.id);
    }

    container.appendChild(card);
  });
}

/* ── Garante o preenchimento dos campos fixos ao abrir pelo histórico ── */
function aplicarCamposFixosHistorico(reg) {
  const dados = obterDadosHistorico(reg);

  window._dadosCarregados = dados;

  const unidade = document.getElementById('1.1');
  if (unidade) unidade.value = dados['1.1'];

  const membro = document.getElementById('1.3');
  if (membro) membro.value = dados['1.3'];
}

function obterDadosHistorico(reg) {
  const dados = { ...(reg?.dados || {}) };

  // Registros antigos podem não ter a coluna auxiliar preenchida. Nesse caso,
  // preserva o valor originalmente salvo dentro de "dados".
  dados['1.1'] = dados['1.1'] || reg?.unidade_correicionada || '';

  // O nome do registro é a fonte de fallback para formulários antigos.
  if (!dados['1.3']) dados['1.3'] = reg?.nome || '';

  return dados;
}

/* ── Abre o ModalViewer compartilhado para um registro do histórico ── */
async function _abrirViewer(id) {
  mostrarLoading('Carregando detalhes…');
  try {
    const reg = await carregarRegistroPorId(id);
    const data = new Date(reg.criado_em).toLocaleString('pt-BR');

    ModalViewer.abrir({
      titulo: reg.nome || reg.user_id || 'Registro',
      sub: `${reg.user_id || '—'} · ${data}`,
      dados: obterDadosHistorico(reg),
      secoes: form.secoes,
    });
  } catch (err) {
    console.error(err);
    showToast('Erro ao carregar detalhes.', 'erro');
  } finally {
    esconderLoading();
  }
}

/* ── Exclusão ── */
async function _confirmarExclusao(id) {
  if (!confirm('Deseja realmente excluir esta correição?\n\nEsta ação não poderá ser desfeita.')) return;

  mostrarLoading('Excluindo registro…');
  try {
    await excluirRegistro(id);
    showToast('Registro excluído com sucesso ✅', 'ok');
    location.reload();
  } catch (err) {
    console.error(err);
    showToast(err.message || 'Erro ao excluir registro.', 'erro');
  } finally {
    esconderLoading();
  }
}

/* ── Confirmação e execução do reaproveitamento ── */
async function _confirmarReaproveitamento(id) {
  if (!confirm(
    'Deseja reaproveitar as respostas desta correição?\n\n' +
    'A correição atualmente em andamento será substituída e todas as respostas já preenchidas nela serão descartadas. ' +
    'A correição finalizada escolhida permanecerá preservada.\n\n' +
    'Você poderá revisar e editar as respostas antes de finalizar.'
  )) return;

  mostrarLoading('Carregando respostas para reaproveitamento…');
  try {
    const reg = await carregarRegistroPorId(id);

    const podePreencher = await usuarioEstaPendente();
    if (!podePreencher) {
      showToast('Você precisa estar como pendente para criar um novo registro.', 'erro');
      return;
    }

    // Reutiliza o rascunho aberto, substituindo seus dados e liberando todas as
    // seções para revisão. A correição finalizada de origem não é alterada.
    const regAberto = await garantirRegistroAberto();
    const dadosReaproveitados = obterDadosHistorico(reg);
    const unidadeAtual = await buscarUnidadeDoUsuario();

    if (getNomeUsuario()) dadosReaproveitados['1.3'] = getNomeUsuario();
    if (unidadeAtual) dadosReaproveitados['1.1'] = unidadeAtual;

    await substituirRascunhoPorReaproveitamento(regAberto.id, dadosReaproveitados);

    registroId = regAberto.id;
    modoLeitura = false;
    window._dadosCarregados = dadosReaproveitados;

    // Limpa campos e remove bloqueios antigos
    document.querySelectorAll('#formContainer input, #formContainer textarea').forEach(el => {
      if (el.type === 'radio' || el.type === 'checkbox') el.checked = false;
      else el.value = '';
    });
    form.secoes.forEach((_, i) => { desbloquearSecao(i); atualizarMenuBadge(i, false); });
    document.querySelectorAll('#formContainer .chip').forEach(ch => { delete ch.dataset.autoAberto; });

    // Pré-preenche os campos com os dados reaproveitados
    carregar();
    await preencherCamposFixos();

    // Nenhuma seção é marcada como enviada — tudo fica editável
    document.getElementById('enviarTudoWrap').style.display = '';
    const aviso = document.querySelector('.modo-leitura-aviso');
    if (aviso) aviso.remove();

    abrirFormulario();
    mostrar(0);
    avaliarCondicionais();

    showToast('✅ Respostas carregadas! Revise e finalize o novo registro.', 'ok');
  } catch (err) {
    console.error(err);
    showToast('Erro ao reaproveitar registro.', 'erro');
  } finally {
    esconderLoading();
  }
}

/* ── Carrega e reabre o formulário no registro selecionado ── */
async function carregarRegistro(id) {
  mostrarLoading('Carregando registro…');
  try {
    const reg = await carregarRegistroPorId(id);

    const podePreencher = await usuarioEstaPendente();

    if (!reg.finalizado && !podePreencher) {
      showToast('Você só pode abrir para edição registros finalizados ou quando estiver como pendente.', 'erro');
      await abrirHistorico();
      return;
    }

    registroId = reg.id;
    modoLeitura = reg.finalizado || !podePreencher;
    aplicarCamposFixosHistorico(reg);

    // Limpa campos e remove bloqueios antigos
    document.querySelectorAll('#formContainer input, #formContainer textarea').forEach(el => {
      if (el.type === 'radio' || el.type === 'checkbox') el.checked = false;
      else el.value = '';
    });
    form.secoes.forEach((_, i) => { desbloquearSecao(i); atualizarMenuBadge(i, false); });

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
    } else {
      document.getElementById('enviarTudoWrap').style.display = '';
      const aviso = document.querySelector('.modo-leitura-aviso');
      if (aviso) aviso.remove();
    }

    abrirFormulario();
    mostrar(0);
    avaliarCondicionais();
  } catch (err) {
    console.error(err);
    showToast('Erro ao carregar registro.', 'erro');
  } finally {
    esconderLoading();
  }
}
