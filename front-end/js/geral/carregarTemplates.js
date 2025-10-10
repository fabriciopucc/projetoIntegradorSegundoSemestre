const carregarTemplates = () => {
  $("#carregarMessageBox").load("../../../templates/messageBox.html");
  $("#carregarLoading").load("../../../templates/loading.html");
}

const esconderLoader = () => {
  $('#carregarLoading').css('display', 'none');
}