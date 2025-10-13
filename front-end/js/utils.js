const limparInputsDeUmFormulario = (idDoFormulario) => {
  $('#'+idDoFormulario+' input').val("");
  $('#'+idDoFormulario+' textarea').val("");
  $('#'+idDoFormulario+' select').val("escolha");
}