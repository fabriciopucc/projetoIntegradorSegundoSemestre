window.onload = () => {
  listarLivros();
  carregarTemplates();
}

const listarLivros = () => {
  $.ajax({
      method: "GET",
      url: "http://localhost:3000/livros"
  }).done(function (dados) {
    carregarLivros(dados);
  }).fail(function (err)  {
      console.log(err);
  });
}

const carregarLivros = (livros) => {
  esconderLoader();

  if(livros.length){
    livros.map((livro) => {
      $("#containerLivros").append(
        "<div class='livro'>"+
          "<h1>"+livro.nome+"</h1>"+
        "</div>"
      );
    })
  }
  else{
     $("#containerLivros").append("<h1 class='aviso centralizarAviso'>Sem registros</h1>")
  }
}