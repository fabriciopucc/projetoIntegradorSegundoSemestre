window.onload = () => {
  buscarLivroPorCodigo(localStorage.getItem("codigoLivro"));
}

const buscarLivroPorCodigo = (codigo) => {
  $.ajax({
    method: "GET",
    url: "http://localhost:3000/publicacoes/".concat(codigo),
  }).done(function (dados) {
    carregarLivro(dados[0]);
  }).fail(function (err)  {
    exibirMessageBox(err, "Entendido", false);
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