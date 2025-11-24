//Validação formulário cadastro aluno
const validarFormularioCadastrarAluno = (aluno) => {
  if(aluno.nome && aluno.nome && aluno.cpf && aluno.celular){
    let erros = [];

    if(aluno.ra.length !== 8) erros.push("Digite o RA corretamente!");
    if(aluno.nome.split(" ").length <= 1) erros.push("Digite o nome completo!");
    if(aluno.cpf.length !== 11)  erros.push("Digite o CPF corretamente!");
    else{
      if(!validarCPF(aluno.cpf)) erros.push("Digite um CPF válido!");
    }
    if(aluno.celular.length !== 11)  erros.push("Digite o celular corretamente!");


    if(erros.length === 0){
      return true;
    }
    else{
      exibirMessageBox(erros, "Entendido", false);
    }
  }else{
    exibirMessageBox("Preencha todos os dados obrigatórios!", "Entendido", false);
    return false;
  }
}

//Validação formulário cadastro livro
const validarFormularioCadastrarLivro = (livro) => {
  let anoAtual = new Date().getFullYear();

  if(livro.etiqueta && livro.isbn && livro.titulo && livro.sinopse 
  && livro.autor && livro.editora && livro.ano_publicacao && livro.quantidade_exemplares){
    let erros = [];

    if(livro.isbn.length !== 13) erros.push("Digite o ISBN corretamente!");
    if(livro.genero == "escolha") erros.push("Escolha um gênero válido!");
    if(livro.ano_publicacao.length !== 4 || livro.ano_publicacao > anoAtual) erros.push("Digite o ano de publicação corretamente!");
    if(livro.quantidade_exemplares <= 0) erros.push("O livro deve possuir ao menos um exemplar!");
    
    if(erros.length == 0){
      return true;
    }
    else{
      exibirMessageBox(erros, "Entendido", false);
    }
  }else{
    exibirMessageBox("Preencha todos os dados obrigatórios!", "Entendido", false);
    return false;
  }
}

const validarFormularioRetirarLivro = (emprestimo) => {
  if(emprestimo.fk_codigo_aluno !== "escolha" && emprestimo.fk_codigo_livro && emprestimo.fk_codigo_livro !== "escolha"){
    return true;
  }else{
    exibirMessageBox("Preencha todos os dados obrigatórios!", "Entendido", false);
    return false;
  }
}

const validarFormularioDevolverLivro = (devolucao) => {
  if(devolucao.fk_codigo_aluno !== "escolha" && devolucao.fk_codigo_livro && devolucao.fk_codigo_livro !== "escolha"){
    return true;
  }else{
    exibirMessageBox("Preencha todos os dados obrigatórios!", "Entendido", false);
    return false;
  }
}

function validarCPF(cpf){
  const digitoJ = gerarDigitoVerificador(cpf, 10);
  const digitoK = gerarDigitoVerificador(cpf, 11);

  if(digitoJ == cpf.substring(9, 10) && digitoK == cpf.substring(10,11)) return true;
  else return false;
}

function gerarDigitoVerificador(cpf, maximo){
  let somaDigitos = 0;
  let inicio = 0;
  let fim = 1;
  for(var i = maximo; i >= 2; i--){
      somaDigitos += cpf.substring(inicio, fim) * i;
      inicio++;
      fim++;
  }
  if((11 - (somaDigitos % 11)) >= 10) return 0;
  else return (11 - (somaDigitos % 11));
}