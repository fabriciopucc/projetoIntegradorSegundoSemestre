window.onload = () => {
  carregarTemplates();
  buscarLivroPorCodigo(localStorage.getItem("codigoLivro"));
}

const buscarLivroPorCodigo = (codigo) => {
  $.ajax({
    method: "GET",
    url: "http://localhost:3000/livros/".concat(codigo),
  }).done(function (dados) {
    $("#cardLoader").addClass("desativado");
    carregarLivro(dados[0]);
  }).fail(function (erro)  {
    $("#cardLoader").addClass("desativado");
    exibirMessageBox(erro, "Entendido", false);
  });
}

const carregarLivro = (livro) => {
  $("#etiquetaLivro").text(livro.etiqueta);
  $("#isbnLivro").text(livro.isbn);
  $("#tituloLivro").text(livro.titulo);
  $("#sinopseLivro").text(livro.sinopse);
  $("#generoLivro").text(livro.genero);
  $("#autorLivro").text(livro.autor);
  $("#editoraLivro").text(livro.editora);
  $("#anoPublicacaoLivro").text(livro.ano_publicacao);
} 

const redirecionarParaEdicaoDoLivro = () => {
  localStorage.setItem("codigoLivro", localStorage.getItem("codigoLivro"));
  location.href="../edicaoLivro/edicaoLivro.html";
}

const excluirLivroPorCodigo = () => {
  $.ajax({
    method: "DELETE",
    url: "http://localhost:3000/livros/".concat(localStorage.getItem("codigoLivro")),
  }).done(function (dados) {
    exibirMessageBox(dados, "Prosseguir", true, "../gestaoDeLivros/gestaoDeLivros.html");
  }).fail(function (erro)  {
    exibirMessageBox(erro.responseJSON, "Entendido", false);
  });
}