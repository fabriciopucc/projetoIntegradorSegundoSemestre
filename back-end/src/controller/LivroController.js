import LivroRepository from "../repositories/LivroRepository.js";

class LivroController{

  async listarLivros(req, res) {
    const retorno = await LivroRepository.listarLivros();
    res.status(200).json(retorno);
  }

  async listarLivrosDisponiveis(req, res) {
    const retorno = await LivroRepository.listarLivrosDisponiveis();
    res.status(200).json(retorno);
  }

  async buscarLivroPorCodigo(req, res) {
    const codigo = req.params.codigo;
    const retorno = await LivroRepository.buscarLivroPorCodigo(codigo);
    res.status(200).json(retorno);
  }

  async salvarLivro(req, res) {
    let retorno = "Livro salvo com sucesso!";
    let status = 400;

    const livro = req.body;

    const buscaPelaEtiqueta = await LivroRepository.buscarLivroPelaEtiqueta(livro.etiqueta);
    const buscaPeloISBN = await LivroRepository.buscarLivroPeloISBN(livro.isbn);

    if(buscaPelaEtiqueta.length){
      retorno = "Desculpe, esta etiqueta foi cadastrada!";
    }
    else if(buscaPeloISBN.length){
      retorno = "Desculpe, este ISBN já foi cadastrado!";
    }
    else{
      await LivroRepository.salvarLivro(livro);
      status = 201;
    }

    res.status(status).json(retorno);
  }

  async atualizarLivro(req, res) {
    let retorno = "Livro atualizado com sucesso!";
    let status = 400;

    const livro = req.body;
    const codigo = req.params.codigo;

    const buscaPeloCodigo = await LivroRepository.buscarLivroPorCodigo(codigo);

    if(buscaPeloCodigo.length){
      await LivroRepository.atualizarLivro(livro, codigo);
      status = 200;
    }
    else{
      retorno = "Livro inexistente";
    }

    res.status(status).json(retorno);
  }

  async excluirLivroPorCodigo(req, res) {
    let retorno = "Livro deletado com sucesso!";
    let status = 400;

    const codigo = req.params.codigo;

    const buscaPeloCodigo = await LivroRepository.buscarLivroPorCodigo(codigo);

    if(buscaPeloCodigo.length){
      await LivroRepository.excluirLivroPorCodigo(codigo);
      status = 200;
    }
    else{
      retorno = "Livro inexistente";
    }

    res.status(status).json(retorno);
  }
}

export default new LivroController;