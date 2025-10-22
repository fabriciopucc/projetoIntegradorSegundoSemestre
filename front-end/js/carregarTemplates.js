const carregarTemplates = () => {
  $("#carregarMessageBox").load("../../../templates/messageBox.html");
  $("#carregarLoading").load("../../../templates/loading.html");
  $("#carregarCardLoader").load("../../../templates/cardLoader.html");
}

const esconderLoader = () => {
  $('#carregarLoading').css('display', 'none');
}