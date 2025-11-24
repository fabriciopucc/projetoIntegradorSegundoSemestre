const alterarTema = () => {
  localStorage.setItem('tema', (localStorage.getItem('tema') == "temaClaro") ? "temaEscuro" : "temaClaro");
  carregarTema();
}

const carregarTema = () => {
  const html = $('html');
  const circulo = $("#circulo");
 
  if(localStorage.getItem('tema') == "temaClaro"){
    circulo.addClass('escuro');
    html.removeClass("temaClaro").addClass("temaEscuro");
  }
  else{
    circulo.removeClass('escuro');
    html.removeClass("temaEscuro").addClass("temaClaro");
  }
}