import LivroRepository from '../repositories/LivroRepository.js';

class LivroController {

  async listarLivros(req, res) {
    const row = await LivroRepository.listarLivros()
    res.json(row);
  }

  async buscarLivroPorCodigo(req, res) {
    const codigo = req.params.codigo;
    const row = await LivroRepository.buscarLivroPorCodigo(codigo);
    res.json(row);
  }

  async salvarLivro(req, res) {
    const livro = req.body;
    const row = await LivroRepository.salvarLivro(livro);
    res.json(row);
  }

  async atualizarLivro(req, res) {
    const livro = req.body;
    const codigo = req.params.codigo;
    const row = await LivroRepository.atualizarLivro(livro, codigo);
    res.json(row);
  }

  async excluirLivro(req, res) {
    const codigo = req.params.codigo;
    const row = await LivroRepository.excluirLivro(codigo);
    res.json(row);
  }
}

export default new LivroController;