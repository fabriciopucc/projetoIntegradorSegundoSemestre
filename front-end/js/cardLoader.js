const esconderCardLoader = () => {
  $("#cardLoader").removeClass("ativo");
  $("button").attr("disabled", false);
}

const exibirCardLoader = () => {
  $("#cardLoader").addClass("ativo");
  $("button").attr("disabled", true);
}