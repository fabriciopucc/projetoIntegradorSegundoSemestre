import { consulta } from "../database/conexao.js";

class EmprestimoRepository{

  listaREmprestimos(){
    const query = "select * from emprestimos";
    return consulta(query, "Não foi possível executar a consulta!");
  }

  listarLivrosNaoDevolvidosDeUmAlunoPeloSeuCodigo(codigoAluno){
    const query = "select p.codigo as codigo, p.titulo as titulo from alunos a  inner join emprestimos e on a.codigo = e.codigo_aluno inner join publicacoes p on p.codigo = e.codigo_publicacao where a.codigo = ? and e.devolvido = false";
    return consulta(query, codigoAluno, "Não foi possível executar a consulta!");
  }

  buscarEmprestimoPeloCodigo(codigo){
    const query = "select * from emprestimos where codigo = ?";
    return consulta(query, codigo, "Não foi possível executar a consulta!");
  }

  buscarCodigoDeUmEmprestimoNaoDevolvidoPeloCodigoDoAlunoEPublicacao(codigoAluno, codigoPublicacao){
    const query = "select e.codigo as codigo_emprestimo from alunos a inner join emprestimos e on a.codigo = e.codigo_aluno inner join publicacoes p on p.codigo = e.codigo_publicacao where a.codigo = ? and p.codigo = ? and e.devolvido = false limit 1;";
    return consulta(query, [codigoAluno, codigoPublicacao], "Não foi possível executar a consulta!");
  }

  buscarSeCertoAlunoEstaComAPosseDeCertaPublicacaoPeloCodigoDoAlunoEDaPublicacao(codigoAluno, codigoPublicacao){
    const query = "select count(p.codigo) as quantidade from alunos a inner join emprestimos e on a.codigo = e.codigo_aluno inner join publicacoes p on p.codigo = e.codigo_publicacao where a.codigo = ? and p.codigo = ? and e.devolvido = false;"
    return consulta(query, [codigoAluno, codigoPublicacao], "Não foi possível executar a consulta!");
  }

  salvarUmEmprestimo(emprestimo){
    const query = "insert into emprestimos set ?;";
    return consulta(query, emprestimo, 'Não foi possível salvar!');
  }

  atualizarEmprestimoComoDevolvido(codigo){
    const query = "update emprestimos set devolvido = true where codigo = ?;";
    return consulta(query, codigo, 'Não foi possível atualizar status!');
  }
};

export default new EmprestimoRepository;