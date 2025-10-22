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
          "<div class='margemLivro'>"+
            "<div class='quantidadeDisponiveis'>"+
              "<p class='valorQuantidadeDisponiveis'>"+
                livro.quantidade_exemplares+
              "</p>"+
              
              "<img "+
                "src='../../../assets/icons/exemplares.png' "+
                "alt='Icon correto' "+
                "class='iconCorreto' "+
              ">"+
            "</div>"+
            
            "<h1 class='tituloLivro'>"+livro.titulo+"</h1>"+

            "<p class='sinopseLivro'>"+livro.sinopse+"</p>"+

            "<p class='autorLivro'>"+livro.autor+"</p>"+
            "<p class='anoLivro'>"+livro.ano_publicacao+"</p>"+

            "<button class='botaoDetalhesLivro' onclick='redirecionarParaInformacoesDoLivro("+livro.codigo+")'>"+
              "Detalhes"+
            "</button>"+
          "</div>"+
        "</div>"
      );
    })
  }
  else{
     $("#containerLivros").append("<h1 class='aviso centralizarAviso'>Sem registros</h1>")
  }
}

const redirecionarParaInformacoesDoLivro = (codigoLivro) => {
  localStorage.setItem("codigoLivro", codigoLivro);
  location.href="../informacoesLivro/informacoesLivro.html";
}