const exibirMessageBox = (mensagem, textoBotao, sucesso) => {
  const messageBox = $("#messageBox");

  $("#textoMessageBox").text(mensagem);
  $("#botaoMessageBox").text(textoBotao);

  if(messageBox.hasClass("ativo")){
    messageBox.removeClass("ativo");
  }
  else{
    messageBox.addClass("ativo");
    $("#botaoMessageBox").addClass((sucesso) ? "sucesso" : "erro");
  }
}