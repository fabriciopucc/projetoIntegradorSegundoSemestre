window.onload = () => {
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

  console.log(livro);

  if(validarFormularioCadastrarLivro(livro)){
    $.ajax({
      method: "POST",
      url: "http://localhost:3000/publicacoes",
      contentType : 'application/json',
      dataType : 'json',
      data: JSON.stringify(livro)
    }).done(function () {
      limparInputsDeUmFormulario("formularioCadastrarLivro");
      exibirMessageBox("Livro cadastrado com sucesso!", "Prosseguir", true, "../paginaDoBibliotecario/pagindaDoBibliotecario.html");
    }).fail(function (err)  {
      let mensagem = err.responseText.split("<pre>")[1].replace("</pre>", "").replace("</body>", "").replace("</html>", "");
      exibirMessageBox(mensagem, "Entendido", false);
    });
  }
}