window.onload = () => {
  carregarTema();
  carregarTemplates();
}

const enviarFormularioCadastrarLivro = () => {
  const livro = {
    etiqueta: $("#etiqueta").val(),
    isbn: $("#isbn").val(),
    titulo: $("#titulo").val(),
    sinopse: $("#sinopse").val(),
    genero: $("#genero").val(),
    autor: $("#autor").val(),
    editora: $("#editora").val(),
    ano_publicacao: $("#ano_publicacao").val(),
    quantidade_exemplares: $("#quantidade_exemplares").val()
  };

  if(validarFormularioCadastrarLivro(livro)){
    exibirCardLoader();
    $.ajax({
      method: "POST",
      url: "http://localhost:3000/livros",
      contentType : 'application/json',
      dataType : 'json',
      data: JSON.stringify(livro)
    }).done(function (dados) {
      esconderCardLoader();
      limparInputsDeUmFormulario("formularioCadastrarLivro");
      exibirMessageBox(dados, "Prosseguir", true, "../paginaDoBibliotecario/pagindaDoBibliotecario.html");
    }).fail(function (erro)  {
      esconderCardLoader();
      exibirMessageBox(erro.responseJSON, "Entendido", false);
    });
  }
}