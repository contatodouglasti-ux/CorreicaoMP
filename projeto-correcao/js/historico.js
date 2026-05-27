/**
 * historico.js
 * Histórico de correições: listagem, abertura, exclusão.
 * Depende de: db.js, ui.js, form.js, app.js, pdf.js
 */

function abrirFormulario() {
  document.getElementById('formContainer').style.display    = '';
  document.getElementById('historicoContainer').style.display = 'none';
  if (!modoLeitura) document.getElementById('enviarTudoWrap').style.display = '';
}

async function abrirHistorico() {
  document.getElementById('formContainer').style.display    = 'none';
  document.getElementById('enviarTudoWrap').style.display   = 'none';
  const hc = document.getElementById('historicoContainer');
  hc.style.display = '';
  hc.innerHTML     = '<p style="color:#546E7A;padding:20px">Carregando histórico…</p>';

  try {
    const registros = await listarRegistrosDoUsuario();
    renderHistorico(registros, hc);
  } catch (err) {
    hc.innerHTML = '<p style="color:#c0392b;padding:20px">Erro ao carregar histórico.</p>';
    console.error(err);
  }
}

function renderHistorico(registros, container) {
  container.innerHTML = '';

  const titulo = document.createElement('h2');
  titulo.innerText    = '📋 Histórico de Correições';
  titulo.style.cssText = 'color:#1C799B;margin-bottom:20px;';
  container.appendChild(titulo);

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

    const data    = new Date(reg.criado_em);
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
        <button class="btn-gray">📄 PDF</button>
        <button class="btn-danger">🗑️ Excluir</button>
      </div>
    `;

    const btnAbrir   = card.querySelector('.btn-primary');
    const btnPDF     = card.querySelector('.btn-gray');
    const btnExcluir = card.querySelector('.btn-danger');

    btnAbrir.onclick = () => carregarRegistro(reg.id, reg.finalizado);
    btnPDF.onclick   = () => baixarPDF(reg);

    if (reg.finalizado) {
      btnExcluir.disabled          = true;
      btnExcluir.style.opacity     = '0.5';
      btnExcluir.style.cursor      = 'not-allowed';
      btnExcluir.title             = 'Registros finalizados não podem ser excluídos';
    } else {
      btnExcluir.onclick = () => _confirmarExclusao(reg.id);
    }

    container.appendChild(card);
  });
}

async function _confirmarExclusao(id) {
  if (!confirm('Deseja realmente excluir esta correição?\n\nEsta ação não poderá ser desfeita.')) return;

  mostrarLoading('Excluindo registro…');
  try {
    await excluirRegistro(id);
    showToast('Registro excluído com sucesso ✅', 'ok');
    abrirHistorico();
  } catch (err) {
    console.error(err);
    showToast(err.message || 'Erro ao excluir registro.', 'erro');
  } finally {
    esconderLoading();
  }
}

async function carregarRegistro(id) {
  mostrarLoading('Carregando registro…');
  try {
    const reg = await carregarRegistroPorId(id);

    registroId  = reg.id;
    modoLeitura = reg.finalizado;
    window._dadosCarregados = reg.dados || {};

    // Limpa campos e remove bloqueios antigos
    document.querySelectorAll('#formContainer input, #formContainer textarea').forEach(el => {
      if (el.type === 'radio' || el.type === 'checkbox') el.checked = false;
      else el.value = '';
    });
    form.secoes.forEach((_, i) => { desbloquearSecao(i); atualizarMenuBadge(i, false); });

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
