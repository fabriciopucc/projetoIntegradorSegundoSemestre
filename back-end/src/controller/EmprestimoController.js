import EmprestimoRepository from "../repositories/EmprestimoRepository.js";
import PublicacaoRepository from "../repositories/PublicacaoRepository.js";
import AlunoRepository from '../repositories/AlunoRepository.js';

class EmprestimoController{

  async listarEmprestimos(req, res){
    const retorno = await EmprestimoRepository.listaREmprestimos();
    res.json(retorno);
  }

  async listarLivrosNaoDevolvidosDeUmAlunoPeloSeuCodigo(req, res){
    const codigoAluno = req.params.codigoAluno;
    const retorno = await EmprestimoRepository.listarLivrosNaoDevolvidosDeUmAlunoPeloSeuCodigo(codigoAluno);
    res.json(retorno);
  }

  async salvarEmprestimo(req, res){
    let retorno = "Aluno ou publicação inexistente!"; //Mensagem padrão caso falhe o 1º IF
    let status = 400; //Status padrão caso falhe qualquer um dos IF's

    const emprestimo = req.body;

    const codigoAluno = emprestimo.codigo_aluno;
    const codigoPublicacao = emprestimo.codigo_publicacao;

    const aluno = await AlunoRepository.buscarAlunoPeloCodigo(codigoAluno);
    const publicacao = await PublicacaoRepository.buscarPublicacaoPorCodigo(codigoPublicacao);
    
    if(publicacao.length && aluno.length){ //Verifica se o aluno e publicação existem
      const quantidadeExemplares = publicacao[0].quantidade_exemplares;
      
      if(quantidadeExemplares > 0){ //Verifica se a publicação possui ao menos 1 exemplar disponível
        const resultado = await EmprestimoRepository.buscarSeCertoAlunoEstaComAPosseDeCertaPublicacaoPeloCodigoDoAlunoEDaPublicacao(codigoAluno, codigoPublicacao);
        const quantidadeDeEmprestimosIguaisNaoDevolvidos = resultado[0].quantidade;
        
        if(quantidadeDeEmprestimosIguaisNaoDevolvidos == 0){ //Verifica se o aluno já não possui tal publicação em mãos. Se não possui, é apto para o empréstimo
          await EmprestimoRepository.salvarUmEmprestimo(emprestimo);
          await PublicacaoRepository.atualizarQuantidadeDeExemplaresDaPublicacao((quantidadeExemplares - 1), codigoPublicacao);// Diminui 1 na qauntidade de exemplares do livro
          
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

    const codigoAluno = devolucao.codigo_aluno;
    const codigoPublicacao = devolucao.codigo_publicacao;
    const codigoEmprestimoNaoDevolvido = await EmprestimoRepository.buscarCodigoDeUmEmprestimoNaoDevolvidoPeloCodigoDoAlunoEPublicacao(codigoAluno, codigoPublicacao);

    if(codigoEmprestimoNaoDevolvido.length){ //Verifica se o empretimo não devolvido realmente existe
      const codigoEmprestimo = codigoEmprestimoNaoDevolvido[0].codigo_emprestimo;
      const aluno = await AlunoRepository.buscarAlunoPeloCodigo(codigoAluno);
      const publicacao = await PublicacaoRepository.buscarPublicacaoPorCodigo(codigoPublicacao);

      if(aluno.length && publicacao.length){ //Verifica se o aluno e publicação ainda existem
        const pontuacaoAluno = aluno[0].pontuacao;
        const quantidadeExemplares = publicacao[0].quantidade_exemplares;

        await PublicacaoRepository.atualizarQuantidadeDeExemplaresDaPublicacao((quantidadeExemplares + 1), codigoPublicacao); //Devolve 1 exemplar para o estoque
        await AlunoRepository.atualizarPontuacaoDoAluno((pontuacaoAluno + 1), codigoAluno); //Aumenta pontuação do aluno
        await EmprestimoRepository.atualizarEmprestimoComoDevolvido(codigoEmprestimo); //Altera empréstimo para devolvido = true

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