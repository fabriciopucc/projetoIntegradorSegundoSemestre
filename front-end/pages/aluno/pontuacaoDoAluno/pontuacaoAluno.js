window.onload = () => {
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

const buscarAlunoPeloRA = (ra) => {
  if(ra.length == 8){
    $.ajax({
      method: "GET",
      url: "http://localhost:3000/alunos/ra/".concat(ra),
    }).done(function (dados) {
      if(dados.length){
         carregarAluno(dados[0]);
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