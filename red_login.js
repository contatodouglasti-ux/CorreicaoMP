
  //Redireciona para a página de login se não estiver autenticado
  try{
    const acc = localStorage.getItem('msalAccount');
    // Permite acessar a própria página de login sem loop
    if(!acc && !window.location.pathname.endsWith('login.html')){
      window.location.href = 'login.html';
    }
  }catch(e){
    console.error(e);
  }
