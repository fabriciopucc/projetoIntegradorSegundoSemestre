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
      buscarLivros();
      $("#codigoAluno").val(dados[0].codigo);
      $("#codigoLivro").attr("disabled", false);
    }).fail(function (erro)  {
      exibirMessageBox(erro.responseJSON, "Entendido", false);
    });
  }else{
    exibirMessageBox("Digite o RA corretamente!!", "Entendido", false)
  }
}

const buscarLivros = () => {
  $.ajax({
    method: "GET",
    url: "http://localhost:3000/livros/disponiveis",
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
    $("#codigoLivro").append(
      "<option value='escolha'>Escolha</option>"
    );

    livros.map((livro) => {
      $("#codigoLivro").append(
        "<option value="+livro.codigo+">"+livro.titulo+" - "+livro.quantidade_exemplares+" disponíveis</option>"
      );
    });
  }else{
    $("#mensagemAlternativa").text("Não existe nenhum livro com exemplares disponíveis no momento!");
  }
}

const enviaRFormularioRetirarLivro = () => {
  const dataEHoraNoBrasil = new Date().toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo'}).replace(",", "");
  
  const emprestimo = {
    data_emprestimo: dataEHoraNoBrasil,
    fk_codigo_aluno: $("#codigoAluno").val(),
    fk_codigo_livro: $("#codigoLivro").val(),
    devolvido: false 
  };

  if(validarFormularioRetirarLivro(emprestimo)){
    exibirCardLoader();

    $.ajax({
      method: "POST",
      url: "http://localhost:3000/emprestimos",
      contentType : 'application/json',
      dataType : 'json',
      data: JSON.stringify(emprestimo)
    }).done(function (dados) {
      esconderCardLoader();
      exibirMessageBox(dados, "Prosseguir", true, "../paginaDoTotem/paginaDoTotem.html");
      $("#cardLoader").removeClass("ativo");
    }).fail(function (erro)  {
      esconderCardLoader();
      exibirMessageBox(erro.responseJSON, "Entendido", false);
    });
  }
}