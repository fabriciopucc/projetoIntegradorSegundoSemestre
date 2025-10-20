window.onload = () => {
  carregarTemplates();
}

const buscarAlunoPeloRA = () => {
  const ra = $("#raAluno").val();
  
  if(ra.length == 8){
    $.ajax({
      method: "GET",
      url: "http://localhost:3000/alunos/ra/".concat(ra),
    }).done(function (dados) {
      if(dados.length){
        buscarLivrosDeUmAluno(dados[0].codigo);
        $("#codigoAluno").val(dados[0].codigo);
      }else{
        exibirMessageBox("Não existe nenhum aluno com este RA!", "Entendido", false);
      }
    }).fail(function (err)  {
      exibirMessageBox(mensagem, "Entendido", false);
    });
  }else{
    exibirMessageBox("Digite o RA corretamente!!", "Entendido", false)
  }
}

const buscarLivrosDeUmAluno = (codigoAluno) => {
  $.ajax({
    method: "GET",
    url: "http://localhost:3000/emprestimos/".concat(codigoAluno),
  }).done(function (dados) {
    gerarSelectDeLivros(dados);
  }).fail(function (err)  {
    exibirMessageBox(mensagem, "Entendido", false);
  });
}

const gerarSelectDeLivros = (livros) => {
  $("#codigoLivro").empty();
  $("#mensagemAlternativa").text("");

  if(livros.length){
     $("#codigoLivro").attr("disabled", false);

    $("#codigoLivro").append(
      "<option value='escolha'>Escolha</option>"
    );

    livros.map((livro) => {
      $("#codigoLivro").append(
        "<option value="+livro.codigo+">"+livro.titulo+"</option>"
      );
    })
  }
  else{
    $("#mensagemAlternativa").text("Este alluno não possui nenhum livro emprestado!");
  }
}

const enviaRFormularioRetirarLivro = () => {
  const devolucao = {
    //data_emprestimo: "2023/12/10 14:30:00",//dataAtualNoBrasil,
    codigo_aluno: $("#codigoAluno").val(),
    codigo_publicacao: $("#codigoLivro").val(),
    //devolvido: false 
  };

  if(validarFormularioDevolverLivro(devolucao)){
    console.log(devolucao);
    $.ajax({
      method: "PUT",
      url: "http://localhost:3000/emprestimos",
      contentType : 'application/json',
      dataType : 'json',
      data: JSON.stringify(devolucao)
    }).done(function (dados) {
      exibirMessageBox(dados, "Prosseguir", true, "../paginaDoTotem/paginaDoTotem.html");
    }).fail(function (erro)  {
      exibirMessageBox(erro.responseJSON, "Entendido", false);
    });
  }
}