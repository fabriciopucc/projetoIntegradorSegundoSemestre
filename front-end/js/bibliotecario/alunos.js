window.onload = () => {
  listarAlunosPorOrdemDePontuacao();
  carregarTemplates();
}


const listarAlunosPorOrdemDePontuacao = () => {
  $.ajax({
    method: "GET",
    url: "http://localhost:3000/alunos/ordemDePontuacao"
  }).done(function (dados) {
    carregarAlunos(dados);
  }).fail(function (err)  {
    console.log(err);
  });
}

const carregarAlunos = (alunos) => {
  esconderLoader();

  if(alunos.length){
     alunos.map((aluno, index) => {
      $("#painelAlunos").append(
        '<div class="linha" id="linha-'+index+'">'+
          '<div class="div-1">'+
            '<p id="posicao-'+index+'">#'+(index+1)+'</p>'+
          '</div>'+

          '<div class="div-2">'+
            '<p>'+aluno.ra+'</p>'+
          '</div>'+

          '<div class="div-3">'+
            '<p>'+aluno.nome.split(" ")[0]+'</p>'+
          '</div>'+

          '<div class="div-4">'+
            '<p>'+aluno.pontuacao+'pts</p>'+
          '</div>'+

          '<div class="div-5">'+
            '<button>Dados</button>'+
          '</div>'+
        '</div>'
      );

      if(index % 2 == 0) $("#linha-".concat(index)).addClass("par");

      if(index == 0) $("#posicao-".concat(index)).addClass("ouro");
      else if(index == 1) $("#posicao-".concat(index)).addClass("prata");
      else if(index == 2) $("#posicao-".concat(index)).addClass("bronze");
    });
  }
  else{
     $("#painelAlunos").append("<h1 class='aviso'>Sem registros</h1>")
  }
}