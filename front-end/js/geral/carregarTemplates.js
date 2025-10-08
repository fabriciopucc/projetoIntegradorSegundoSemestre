window.onload = () => {
  carregarTemplates();
}

const carregarTemplates = () => {
  $("#carregarMessageBox").load("../../../templates/messageBox.html");
}