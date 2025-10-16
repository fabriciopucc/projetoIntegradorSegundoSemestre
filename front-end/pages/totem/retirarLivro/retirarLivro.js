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
        buscarLivros();
        $("#codigoAluno").val(dados[0].codigo);
        $("#codigoLivro").attr("disabled", false);
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

const buscarLivros = () => {
  $.ajax({
    method: "GET",
    url: "http://localhost:3000/publicacoes/disponiveis",
  }).done(function (dados) {
    gerarSelectDeLivros(dados);
  }).fail(function (err)  {
    exibirMessageBox(mensagem, "Entendido", false);
  });
}

const gerarSelectDeLivros = (livros) => {
  $("#codigoLivro").empty().append(
    "<option value='escolha'>Escolha</option>"
  );

  livros.map((livro) => {
    $("#codigoLivro").append(
      "<option value="+livro.codigo+">"+livro.titulo+" - "+livro.quantidade_exemplares+" disponíveis</option>"
    );
  })
}

const enviaRFormularioRetirarLivro = () => {
  const dataAtualNoBrasil = new Date().toISOString();
  console.log(dataAtualNoBrasil)

  const emprestimo = {
    data_emprestimo: "2023/12/10 14:30:00",//dataAtualNoBrasil,
    codigo_aluno: $("#codigoAluno").val(),
    codigo_publicacao: $("#codigoLivro").val(),
    devolvido: false 
  };

  if(validarFormularioRetirarLivro(emprestimo)){
    console.log(emprestimo);
    $.ajax({
      method: "POST",
      url: "http://localhost:3000/emprestimos",
      contentType : 'application/json',
      dataType : 'json',
      data: JSON.stringify(emprestimo)
    }).done(function (dados) {
      exibirMessageBox(dados, "Prosseguir", true, "../paginaDoTotem/paginaDoTotem.html");
    }).fail(function (erro)  {
      exibirMessageBox(erro.responseJSON, "Entendido", false);
    });
  }
}