try {
  const acc = localStorage.getItem('msalAccount');

  // evita rodar na tela de login
  if (window.location.pathname.includes('login.html')) return;

  // pequena espera para o MSAL terminar o fluxo
  setTimeout(() => {
    if (!acc) {
      window.location.href = '/login.html';
    }
  }, 300);

} catch (e) {
  console.error(e);
}