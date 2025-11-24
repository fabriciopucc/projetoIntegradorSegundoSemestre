window.onload = () => {
  carregarTema();
  carregarTemplates();
}

const enviarFormularioCadastrarAluno = () => {
  const aluno = {
    ra: $("#ra").val(),
    nome: $("#nome").val(),
    cpf: $("#cpf").val(),
    celular: $("#celular").val()
  }

  if(validarFormularioCadastrarAluno(aluno)){
    exibirCardLoader();
    $.ajax({
      method: "POST",
      url: "http://localhost:3000/alunos",
      contentType : 'application/json',
      dataType : 'json',
      data: JSON.stringify(aluno)
    }).done(function (dados) {
      esconderCardLoader();
      limparInputsDeUmFormulario("formularioCadastrarAluno");
      exibirMessageBox(dados, "Prosseguir", true, "../paginaDoAluno/paginaDoAluno.html");
    }).fail(function (erro)  {
      esconderCardLoader();
      exibirMessageBox(erro.responseJSON, "Entendido", false);
    });
  }
}