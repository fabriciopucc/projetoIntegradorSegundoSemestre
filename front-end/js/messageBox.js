const exibirMessageBox = (mensagem, textoBotao, sucesso, destino = '') => {
  const messageBox = $("#messageBox");

  $("#textoMessageBox").text(mensagem);
  $("#botaoMessageBox").text(textoBotao);

  if(messageBox.hasClass("ativo")){
    messageBox.removeClass("ativo");
  }
  else{
    messageBox.addClass("ativo");
    $("#botaoMessageBox").removeClass(["sucesso", "erro"]).addClass((sucesso) ? "sucesso" : "erro");
    if(destino) $("#botaoMessageBox").attr('href', destino);
  }
}