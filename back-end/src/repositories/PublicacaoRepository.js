import { consulta } from "../database/conexao.js";

class PublicacaoRepository{

  listarPublicacoes(){
    const query = "select * from publicacoes;"
    return consulta(query, 'Não foi possível listar!')  
  }

  buscarPublicacaoPorCodigo(codigo){
    const query = "select * from publicacoes where codigo = ?;"
    return consulta(query, codigo, 'Nenhuma publicação possui este código!') ;
  }

  salvarPublicacao(publicacao){
    const query = "insert into publicacoes set ?;";
    return consulta(query, publicacao, 'Não foi possível salvar!');
  }

  atualizarPublicacao(publicacao, codigo){
    const query = "update publicacoes set ? where codigo = ?";
    return consulta(query, [publicacao, codigo], 'Não foi possível atualizar!');
  }

  excluirPublicacao(codigo){
    const query = "delete from publicacoes where codigo = ?;"
    return consulta(query, codigo, 'Não foi possível excluir!')  
  }
}

export default new PublicacaoRepository;