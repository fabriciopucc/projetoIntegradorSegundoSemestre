window.onload = () => {
  carregarTema();
  carregarTemplates();
}

const buscarAlunoPeloRA = () => {
  const ra = $("#raAluno").val();
  
  if(ra.length == 8){
    exibirCardLoader();

    $.ajax({
      method: "GET",
      url: "http://localhost:3000/alunos/ra/".concat(ra),
    }).done(function (dados) {
      esconderCardLoader();
      buscarLivrosDeUmAluno(dados[0].codigo);
      $("#codigoAluno").val(dados[0].codigo);
    }).fail(function (erro)  {
      esconderCardLoader();
      exibirMessageBox(erro.responseJSON, "Entendido", false);
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
  }).fail(function (erro)  {
    exibirMessageBox(erro.responseJSON, "Entendido", false);
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
    });
  }
  else{
    $("#mensagemAlternativa").text("Este aluno não possui nenhum livro emprestado!");
  }
}

const enviarFormularioDevolverLivro = () => {
  const dataEHoraNoBrasil = new Date().toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo'}).replace(",", "");

  const devolucao = {
    fk_codigo_aluno: $("#codigoAluno").val(),
    fk_codigo_livro: $("#codigoLivro").val(), 
    data_devolucao: dataEHoraNoBrasil,
  };

  if(validarFormularioDevolverLivro(devolucao)){
     exibirCardLoader();
    
    $.ajax({
      method: "PUT",
      url: "http://localhost:3000/emprestimos",
      contentType : 'application/json',
      dataType : 'json',
      data: JSON.stringify(devolucao)
    }).done(function (dados) {
      esconderCardLoader();
      exibirMessageBox(dados, "Prosseguir", true, "../paginaDoTotem/paginaDoTotem.html");
    }).fail(function (erro)  {
      esconderCardLoader();
      exibirMessageBox(erro.responseJSON, "Entendido", false);
    });
  }
}