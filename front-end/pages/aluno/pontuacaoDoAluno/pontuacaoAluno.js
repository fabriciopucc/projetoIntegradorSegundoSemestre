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