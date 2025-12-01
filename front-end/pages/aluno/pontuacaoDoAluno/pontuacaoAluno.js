window.onload = () => {
  carregarTema();
  carregarTemplates();
}

const buscarAlunoPeloRA = (ra) => {
  if(ra.length == 8){
    exibirCardLoader();
    $.ajax({
      method: "GET",
      url: "http://localhost:3000/alunos/ra/".concat(ra),
    }).done(function (dados) {
      buscarLivrosLidos(dados[0].codigo);
      esconderCardLoader();
      carregarAluno(dados[0]);
    }).fail(function (erro)  {
      esconderCardLoader();
      exibirMessageBox(erro.responseJSON, "Entendido", false);
    });
  }else{
    exibirMessageBox("Digite o RA corretamente!!", "Entendido", false)
  }
}

const carregarAluno = (aluno) => {
  $("#tipoLeitor").text("Leitor ".concat(
    (aluno.pontuacao < 6) ? "iniciante" :
    (aluno.pontuacao >= 6 && aluno.pontuacao <= 10) ? "regular" :
    (aluno.pontuacao >= 11 && aluno.pontuacao <= 20) ? "ativo" :
    (aluno.pontuacao > 20) && "extremo"
  ));

  $("#raAluno").text(aluno.ra);
  $("#nomeAluno").text(aluno.nome);
  $("#cpfAluno").text(aluno.cpf);
  $("#celularAluno").text(aluno.celular);
  $("#pontuacaoAluno").text(aluno.pontuacao);

  $("#circuloPontuacao").removeClass(["leitorRegular", "leitorAtivo", "leitorExtremo"])
                        .addClass((aluno.pontuacao >= 6 && aluno.pontuacao <= 10) ? "leitorRegular" : 
                                  (aluno.pontuacao >= 11 && aluno.pontuacao <= 20) ? "leitorAtivo" :
                                  (aluno.pontuacao > 20) && "leitorExtremo"
  );
}

const buscarLivrosLidos = (codigoAluno) => {
  $.ajax({
    method: "GET",
    url: "http://localhost:3000/emprestimos/concluidos/".concat(codigoAluno),
  }).done(function (dados) {
    carregarLivrosLidos(dados);
  }).fail(function (erro)  {
    exibirMessageBox(erro.responseJSON, "Entendido", false);
  });
}

const carregarLivrosLidos = (livros) => {
   $("#livrosLidos").empty();

  livros.map((livro) => {
    $("#livrosLidos").append(
      '<div class="linha">'+
        '<div>'+
          '<p>'+livro.titulo+'</p>'+
        '</div>'+

        '<div>'+
          '<p>'+livro.data_emprestimo.split(" ")[0]+'</p>'+
        '</div>'+

        '<div>'+
          '<p>'+livro.data_devolucao.split(" ")[0]+'</p>'+
        '</div>'+
      '</div>'
    );
  }); 
}