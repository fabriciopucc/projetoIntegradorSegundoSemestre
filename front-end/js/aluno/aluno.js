const enviarFormularioCadastrarAluno = () => {
  const aluno = {
    ra: $("#ra").val(),
    nome: $("#nome").val(),
    cpf: $("#cpf").val(),
    celular: $("#celular").val()
  }

  if(validarFormularioCadastrarAluno(aluno)){
    $.ajax({
      method: "POST",
      url: "http://localhost:3000/alunos",
      contentType : 'application/json',
      dataType : 'json',
      data: JSON.stringify(aluno)
    }).done(function () {
      limparInputsDeUmFormulario("formularioCadastrarAluno");
      exibirMessageBox("Aluno cadastrado com sucesso!", "Prosseguir", true);
    }).fail(function (err)  {
      let mensagem = err.responseText.split("<pre>")[1].replace("</pre>", "").replace("</body>", "").replace("</html>", "");
      exibirMessageBox(mensagem, "Entendido", false);
    });
  }
}