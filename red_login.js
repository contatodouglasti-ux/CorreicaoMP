// Proteção secundária de rota (a principal está no <head> do index.html)
// Este script garante consistência caso o estado mude após o carregamento.
try {
  // Evita rodar na tela de login
  if (window.location.pathname.includes('login.html')) return;

  const acc = localStorage.getItem('msalAccount');
  if (!acc) {
    document.documentElement.style.visibility = 'hidden';
    window.location.replace('/login.html');
  }
} catch (e) {
  console.error(e);
}