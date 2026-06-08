/**
 * ui.js
 * Interface: sidebar fixa com scroll, toast, loading overlay,
 * badge de usuário, bloqueio/desbloqueio de seções.
 */

/* ── Loading Overlay ──── */

function mostrarLoading(msg = 'Carregando…') {
  document.getElementById('loadingMsg').textContent = msg;
  document.getElementById('loadingOverlay').style.display = 'flex';
}

function esconderLoading() {
  document.getElementById('loadingOverlay').style.display = 'none';
}

/* ── Toast ──── */

function showToast(msg, tipo) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.className   = 'toast ' + (tipo === 'erro' ? 'toast-erro' : 'toast-ok');
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 4000);
}

/* ── Sidebar — mobile toggle ──── */

function toggleMenu() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebarOverlay').classList.toggle('open');
}

/* ── Sidebar — renderização ──── */

function criarMenu() {
  const scroll = document.getElementById('sidebarScroll');
  scroll.innerHTML = '';

  // Título da seção de navegação
  const titulo = document.createElement('div');
  titulo.className = 'sidebar-title';
  titulo.textContent = 'Seções';
  scroll.appendChild(titulo);

  // Índices do grupo colapsável "ATUAÇÃO GERAL" (seções 5 a 17)
  const GRUPO_INICIO = 5;
  const GRUPO_FIM    = 6;

  // Cabeçalho colapsável do grupo
  const grupoHeader = document.createElement('div');
  grupoHeader.className = 'sidebar-grupo-header';
  grupoHeader.id        = 'menu-grupo-atuacao';
  grupoHeader.innerHTML = '<span class="grupo-seta">▶</span><span class="grupo-label">INFORMAÇÕES GERAIS</span>';

  const grupoFilhos = document.createElement('div');
  grupoFilhos.className = 'sidebar-grupo-filhos';
  grupoFilhos.style.display = 'none';

  grupoHeader.onclick = () => {
    const aberto = grupoFilhos.style.display !== 'none';
    grupoFilhos.style.display = aberto ? 'none' : 'block';
    grupoHeader.querySelector('.grupo-seta').textContent = aberto ? '▶' : '▼';
  };

  // Itens de seção
  form.secoes.forEach((s, i) => {
    const item = document.createElement('div');
    item.className = 'sidebar-item';
    item.id        = `menu-sec-${i}`;

    const num = document.createElement('span');
    num.className   = 'item-numero';
    num.textContent = i + 1;

    const label = document.createElement('span');
    label.className = 'item-label';
    label.textContent = s.nome;

    item.appendChild(num);
    item.appendChild(label);

    item.onclick = () => {
      abrirFormulario();
      mostrar(i);
      // fecha no mobile
      document.getElementById('sidebar').classList.remove('open');
      document.getElementById('sidebarOverlay').classList.remove('open');
    };

    if (i === GRUPO_INICIO) {
      // Adiciona o cabeçalho do grupo antes do primeiro sub-item
      scroll.appendChild(grupoHeader);
      scroll.appendChild(grupoFilhos);
    }

    if (i >= GRUPO_INICIO && i <= GRUPO_FIM) {
      item.style.paddingLeft = '28px'; // indentação visual
      grupoFilhos.appendChild(item);
    } else {
      scroll.appendChild(item);
    }
  });
}

/* ── Destacar item ativo na sidebar ──── */

function destacarItemAtivo(i) {
  document.querySelectorAll('.sidebar-item').forEach(el => el.classList.remove('ativo'));
  const item = document.getElementById(`menu-sec-${i}`);
  if (item) item.classList.add('ativo');
}

/* ── Badges de seção ──── */

function atualizarMenuBadge(i, enviada = true) {
  const item = document.getElementById(`menu-sec-${i}`);
  if (!item) return;
  let badge = item.querySelector('.badge-enviada');
  if (enviada && !badge) {
    const b = document.createElement('span');
    b.className   = 'badge-enviada';
    b.textContent = '✓';
    item.appendChild(b);
  } else if (!enviada && badge) {
    badge.remove();
  }
}

/* ── Bloqueio / desbloqueio ──── */

function bloquearSecao(i) {
  const section = document.querySelectorAll('.section')[i];
  if (!section) return;

  
  section.querySelectorAll('input, textarea, select').forEach(el => el.disabled = true);

  section.querySelectorAll('.unidade-sugestoes')
    .forEach(el => el.style.display = 'none');
  if (!section.querySelector('.btn-editar') && !modoLeitura) {
    const btnE       = document.createElement('button');
    btnE.innerText   = '✏️ Editar esta seção';
    btnE.className   = 'btn-editar btn-gray';
    btnE.style.marginTop = '16px';
    btnE.onclick     = () => desbloquearSecao(i, btnE);
    const nav = section.querySelector('.nav');
    if (nav) nav.prepend(btnE);
  }
}

function desbloquearSecao(i, btnEditar) {
  const section = document.querySelectorAll('.section')[i];
  if (!section) return;
  section.querySelectorAll('input, textarea, select').forEach(el => el.disabled = false);
  if (btnEditar) btnEditar.remove();
}

/* ── Aviso de modo leitura ──── */

function mostrarAvisoLeitura() {
  if (document.querySelector('.modo-leitura-aviso')) return;
  const aviso = document.createElement('div');
  aviso.className = 'modo-leitura-aviso';
  aviso.innerHTML = '🔒 <b>Correição finalizada.</b> Este registro está em modo somente leitura. Use "➕ Nova correição" no menu para iniciar um novo.';
  document.getElementById('formContainer').prepend(aviso);
}

/* ── Utilitários ──── */

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function btn(text, cls, fn) {
  const b     = document.createElement('button');
  b.innerText = text;
  b.className = cls;
  b.onclick   = fn;
  return b;
}