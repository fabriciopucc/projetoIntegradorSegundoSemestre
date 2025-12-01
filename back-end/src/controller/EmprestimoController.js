import EmprestimoRepository from "../repositories/EmprestimoRepository.js";
import LivroRepository from "../repositories/LivroRepository.js";
import AlunoRepository from '../repositories/AlunoRepository.js';

class EmprestimoController{

  async listarEmprestimos(req, res){
    const retorno = await EmprestimoRepository.listarEmprestimos();
    res.status(200).json(retorno);
  }

  async listarLivrosNaoDevolvidosDeUmAlunoPeloSeuCodigo(req, res){
    let retorno = "Aluno inexistente!";
    let status = 400;

    const codigoAluno = req.params.codigoAluno;

    const buscaAlunoPorCodigo = await AlunoRepository.buscarAlunoPeloCodigo(codigoAluno);

    if(buscaAlunoPorCodigo.length){
      retorno = await EmprestimoRepository.listarLivrosNaoDevolvidosDeUmAlunoPeloSeuCodigo(codigoAluno);
      status = 200;
    }

    res.status(status).json(retorno);
  }

  async buscarEmprestimosNaoConcluidosDeUmAluno(req, res){
    let retorno = "Aluno inexistente!";
    let status = 400;

    const codigoAluno = req.params.codigoAluno;

    const buscaAlunoPorCodigo = await AlunoRepository.buscarAlunoPeloCodigo(codigoAluno);

    if(buscaAlunoPorCodigo.length){
      retorno = await EmprestimoRepository.buscarEmprestimosNaoConlcuidosDeUmAluno(codigoAluno);
      status = 200;
    }

    res.status(status).json(retorno);
  }

  async buscarEmprestimosConcluidosDeUmAluno(req, res){
    let retorno = "Aluno inexistente!";
    let status = 400;

    const codigoAluno = req.params.codigoAluno;

    const buscaAlunoPorCodigo = await AlunoRepository.buscarAlunoPeloCodigo(codigoAluno);

    if(buscaAlunoPorCodigo.length){
      retorno = await EmprestimoRepository.buscarEmprestimosConlcuidosDeUmAluno(codigoAluno);
      status = 200;
    }

    res.status(status).json(retorno);
  }

  async salvarEmprestimo(req, res){
    let retorno = "Aluno ou livro inexistente!"; //Mensagem padrão caso falhe o 1º IF
    let status = 400; //Status padrão caso falhe qualquer um dos IF's

    const emprestimo = req.body;

    const codigoAluno = emprestimo.fk_codigo_aluno;
    const codigoLivro = emprestimo.fk_codigo_livro;

    const aluno = await AlunoRepository.buscarAlunoPeloCodigo(codigoAluno);
    const livro = await LivroRepository.buscarLivroPorCodigo(codigoLivro);
    
    if(livro.length && aluno.length){ //Verifica se o aluno e livro existem
      const quantidadeExemplares = livro[0].quantidade_exemplares;
      
      if(quantidadeExemplares > 0){ //Verifica se o livro possui ao menos 1 exemplar disponível
        const resultado = await EmprestimoRepository.buscarSeCertoAlunoEstaComAPosseDeCertoLivroPeloCodigoDoAlunoEDoLivro(codigoAluno, codigoLivro);
        const quantidadeDeEmprestimosIguaisNaoDevolvidos = resultado[0].quantidade;
        
        if(quantidadeDeEmprestimosIguaisNaoDevolvidos == 0){ //Verifica se o aluno já não possui tal publicação em mãos. Se não possui, é apto para o empréstimo
          await EmprestimoRepository.salvarUmEmprestimo(emprestimo);
          await LivroRepository.atualizarQuantidadeDeExemplaresDoLivro((quantidadeExemplares - 1), codigoLivro);// Diminui 1 na qauntidade de exemplares do livro
          
          retorno = "Emprestado com sucesso!";
          status = 201;
        }else{
          retorno = "Este aluno já possui um empréstimo não finalizado deste livro!";
        }
      }else{
        retorno = "Esta publicação não possui nenhum exemplar disponível para empréstimo!!";
      }
    }

    res.status(status).json(retorno);
  }

  async devolverEmprestimo(req, res){
    let retorno = "Não existe nenhum empréstimo não devolvido para este aluno e publicação!"; //Mensagem padrão caso falhe o 1º IF
    let status = 400; //Status padrão caso falhe qualquer um dos IF's

    const devolucao = req.body;

    const codigoAluno = devolucao.fk_codigo_aluno;
    const codigoLivro = devolucao.fk_codigo_livro;
    const codigoEmprestimoNaoDevolvido = await EmprestimoRepository.buscarCodigoDeUmEmprestimoNaoDevolvidoPeloCodigoDoAlunoELivro(codigoAluno, codigoLivro);
    
    if(codigoEmprestimoNaoDevolvido.length){ //Verifica se o empretimo não devolvido realmente existe
      const codigoEmprestimo = codigoEmprestimoNaoDevolvido[0].codigo_emprestimo;
      const dataDevolucao = devolucao.data_devolucao;
      const aluno = await AlunoRepository.buscarAlunoPeloCodigo(codigoAluno);
      const livro = await LivroRepository.buscarLivroPorCodigo(codigoLivro);

      if(aluno.length && livro.length){ //Verifica se o aluno e livro ainda existem
        const pontuacaoAluno = aluno[0].pontuacao;
        const quantidadeExemplares = livro[0].quantidade_exemplares;

        await LivroRepository.atualizarQuantidadeDeExemplaresDoLivro((quantidadeExemplares + 1), codigoLivro); //Devolve 1 exemplar para o estoque
        await AlunoRepository.atualizarPontuacaoDoAluno((pontuacaoAluno + 1), codigoAluno); //Aumenta pontuação do aluno
        await EmprestimoRepository.atualizarEmprestimoComoDevolvido(dataDevolucao, codigoEmprestimo); //Altera empréstimo para devolvido = true

        retorno = "Empréstimo devolvido com sucesso!";
        status = 200;
      }else{
        retorno = "Aluno ou publicação inexistentes";
      }
    }

    res.status(status).json(retorno);
  }
};

export default new EmprestimoController;