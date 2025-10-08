const enviarFormularioCadastrarLivro = () => {
  
  const livro = {
    nome: $("#nome").val()
  };

  console.log("AAA")

  if(validarFormularioCadastrarLivro(livro)){
    $.ajax({
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
    });
  }
}