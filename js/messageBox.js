const exibirMessageBox = () => {

    var messageBox = document.getElementById('messageBox');

    if(messageBox.classList.contains('ativo')){
        messageBox.classList.remove('ativo');
    }else{
        messageBox.classList.add('ativo');
    }
}