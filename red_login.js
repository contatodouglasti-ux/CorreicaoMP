// red_login.js — Proteção de rota secundária
(function () {
  try {
    var acc = localStorage.getItem('msalAccount');
    if (!acc) {
      document.documentElement.style.visibility = 'hidden';
      window.location.replace('/login.html');
    }
  } catch (e) {
    document.documentElement.style.visibility = 'hidden';
    window.location.replace('/login.html');
  }
})();
