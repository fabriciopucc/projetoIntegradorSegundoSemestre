window.onload = () => {
  carregarTema();
  carregarTemplates();
  buscarLivroPorCodigo(localStorage.getItem("codigoLivro"));
}

const buscarLivroPorCodigo = (codigo) => {
  $.ajax({
    method: "GET",
    url: "http://localhost:3000/livros/".concat(codigo),
  }).done(function (dados) {
    $("#cardLoader").addClass("desativado");
    setarValoresNoFormulario(dados[0]);
  }).fail(function (err)  {
    $("#cardLoader").addClass("desativado");
    exibirMessageBox(err, "Entendido", false);
  });
}

const setarValoresNoFormulario = (dados) => {
  $("#etiqueta").val(dados.etiqueta);
  $("#isbn").val(dados.isbn);
  $("#titulo").val(dados.titulo),
  $("#sinopse").val(dados.sinopse);
  $("#genero").val(dados.genero);
  $("#autor").val(dados.autor);
  $("#editora").val(dados.editora);
  $("#ano_publicacao").val(dados.ano_publicacao);
  $("#quantidade_exemplares").val(dados.quantidade_exemplares);
}

const enviarFormularioEditarLivro = () => {
  const livro = {
    etiqueta: $("#etiqueta").val(),
    isbn: $("#isbn").val(),
    titulo: $("#titulo").val(),
    sinopse: $("#sinopse").val(),
    genero: $("#genero").val(),
    autor: $("#autor").val(),
    editora: $("#editora").val(),
    ano_publicacao: $("#ano_publicacao").val(),
    quantidade_exemplares: $("#quantidade_exemplares").val()
  };

  console.log(livro);

  if(validarFormularioCadastrarLivro(livro)){    
    exibirCardLoader();
    $.ajax({
      method: "PUT",
      url: "http://localhost:3000/livros/".concat(localStorage.getItem("codigoLivro")),
      contentType : 'application/json',
      dataType : 'json',
      data: JSON.stringify(livro)
    }).done(function (dados) {
      esconderCardLoader();
      exibirMessageBox(dados, "Prosseguir", true, "../informacoesLivro/informacoesLivro.html");
    }).fail(function (erro)  {
      esconderCardLoader();
      exibirMessageBox(erro.responseJSON, "Entendido", false);
    });
  }
}