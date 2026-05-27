/**
 * red_login.js
 * Proteção secundária de rota.
 * A principal está no <head> do index.html (executa antes da renderização).
 * Este script garante consistência caso o estado mude após o carregamento.
 */
(function () {
  try {
    if (window.location.pathname.includes('login.html')) return;
    if (!localStorage.getItem('msalAccount')) {
      document.documentElement.style.visibility = 'hidden';
      window.location.replace('/login.html');
    }
  } catch (e) {
    console.error('red_login.js:', e);
  }
})();
