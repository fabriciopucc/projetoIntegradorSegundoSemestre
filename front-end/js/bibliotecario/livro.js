window.onload = () => {
  carregarTemplates();
}

const enviarFormularioCadastrarLivro = () => {
  
  const livro = {
    etiqueta: $("#etiqueta").val(),
    isbn: $("#isbn").val(),
    titulo: $("#titulo").val(),
    genero: $("#genero").val(),
    autor: $("#autor").val(),
    editora: $("#editora").val(),
    anoPublicacao: $("#anoPublicacao").val(),
    quantidadeExemplares: $("#quantidadeExemplares").val()
  };

  console.log(livro)

  if(validarFormularioCadastrarLivro(livro)){
    /*$.ajax({
      method: "POST",
      url: "http://localhost:3000/livros",
      contentType : 'application/json',
      dataType : 'json',
      data: JSON.stringify(livro)
    }).done(function () {
      limparInputsDeUmFormulario("formularioCadastrarLivro")
      exibirMessageBox("Livro cadastrado com sucesso!", "Prosseguir", true);
    }).fail(function (err)  {
      console.log(err);
    });*/
  }
}