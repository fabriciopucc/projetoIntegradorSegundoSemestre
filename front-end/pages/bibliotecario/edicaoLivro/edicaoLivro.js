window.onload = () => {
  buscarLivroPorCodigo(localStorage.getItem("codigoLivro"));
  carregarTemplates();
}

const buscarLivroPorCodigo = (codigo) => {
  $.ajax({
    method: "GET",
    url: "http://localhost:3000/publicacoes/".concat(codigo),
  }).done(function (dados) {
    setarValoresNoFormulario(dados[0]);
  }).fail(function (err)  {
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

  if(validarFormularioCadastrarLivro(livro)){
    $.ajax({
      method: "PUT",
      url: "http://localhost:3000/publicacoes/".concat(localStorage.getItem("codigoLivro")),
      contentType : 'application/json',
      dataType : 'json',
      data: JSON.stringify(livro)
    }).done(function () {
      exibirMessageBox("Livro editado com sucesso!", "Prosseguir", true, "../informacoesLivro/informacoesLivro.html");
    }).fail(function (err)  {
      exibirMessageBox(err, "Entendido", false);
    });
  }
}