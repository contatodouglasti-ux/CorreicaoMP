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

function exibirBadgeUsuario() {
  const nome  = getNomeUsuario();
  const email = getEmailUsuario();
  const badge = document.getElementById('userBadge');
  const span  = document.getElementById('userName');
  const av    = document.getElementById('userAvatar');
  const iniciais = nome.split(' ').slice(0, 2).map(p => p[0]).join('').toUpperCase() || '?';
  av.textContent   = iniciais;
  span.textContent = nome !== 'desconhecido' ? nome : email;
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
