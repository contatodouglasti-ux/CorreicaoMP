/**
 * auth.js
 * Gerencia autenticação via Microsoft (MSAL).
 * Depende de: config.js, msal-browser (CDN)
 */

/* ── Helpers de usuário ─────────────────────────────────── */

function getEmailUsuario() {
  try {
    const acc = JSON.parse(localStorage.getItem('msalAccount') || '{}');
    return acc.username || acc.email || 'desconhecido';
  } catch (e) {
    return 'desconhecido';
  }
}

function getNomeUsuario() {
  try {
    const acc = JSON.parse(localStorage.getItem('msalAccount') || '{}');
    return acc.name || acc.displayName || acc.nome || 'desconhecido';
  } catch (e) {
    return 'desconhecido';
  }
}

async function buscarUnidadeCorreicionadaUsuario(userId = getEmailUsuario()) {
  try {
    if (!window.sbClient) return '';

    const { data: pendencia, error: errorPendencia } = await window.sbClient
      .from('pendencias')
      .select('unidade_correicionada')
      .eq('user_id', userId)
      .maybeSingle();

    if (errorPendencia || !pendencia?.unidade_correicionada) return '';

    const unidadeId = String(pendencia.unidade_correicionada).trim();
    if (!unidadeId) return '';

    const { data: unidade, error: errorUnidade } = await window.sbClient
      .from('unidades_correicionadas')
      .select('nome')
      .eq('id', unidadeId)
      .maybeSingle();

    if (errorUnidade) return '';
    return String(unidade?.nome || '').trim();
  } catch (_) {
    return '';
  }
}

async function exibirBadgeUsuario() {
  const nome  = getNomeUsuario();
  const email = getEmailUsuario();
  const badge = document.getElementById('userBadge');
  const span  = document.getElementById('userName');
  const av    = document.getElementById('userAvatar');
  const iniciais = nome.split(' ').slice(0, 2).map(p => p[0]).join('').toUpperCase() || '?';
  const unidade = await buscarUnidadeCorreicionadaUsuario();

  av.textContent = iniciais;
  if (nome !== 'desconhecido') {
    span.textContent = unidade ? `${nome} · ${unidade}` : nome;
  } else {
    span.textContent = email;
  }
  badge.style.display = 'flex';
}

function logout() {
  localStorage.removeItem('msalAccount');
  localStorage.removeItem('msal_email');
  Object.keys(localStorage)
    .filter(k => k.startsWith('msal.'))
    .forEach(k => localStorage.removeItem(k));
  window.location.replace('/login.html');
}
