import livros from "../models/Livro.js";
import NaoEncontrado from "../err/NaoEncontrado.js";


class LivroController{
   
  static listarLivros = async (req, res, next)=>{
    try {
      const listaLivros = await livros.find().populate("autor");
      res.status(200).json(listaLivros);
    } catch (error) {
      next(error);
    }
  };

  static listarLivroPorId = async (req, res, next)=>{
    try {
      const id = req.params.id; 
      const livroPorId = await livros.findById(id).populate("autor", "nome");
      if(livroPorId === null){
        next(new NaoEncontrado("Livro não encontrado"));
      }
      res.status(200).send(livroPorId);
    } catch (error) {
      next(error);
    }
  };

  static cadastrarLivro = async (req,res, next)=>{
    try {
      let livro = new livros(req.body);
      const novoLivro = await livro.save();
      res.status(201).send(novoLivro.toJSON());
    } catch (error) {
      next(error);
    }
  };

  static atualizarLivro = async (req,res, next)=>{
    try {
      const id = req.params.id; 
      const atualizarLivro = await livros.findByIdAndUpdate(id, {$set: req.body});
      if(atualizarLivro === null){
        next(new NaoEncontrado("Livro não encontrado"));
      } 
      res.status(200).send({message: "Livro atualiado com sucesso"});
    } catch (error) {
      next(error);
    }
  };


  static excluirLivro = async (req,res, next)=>{
    try {
      const id = req.params.id;
      const deleteLivro = await livros.findByIdAndDelete(id);
      if(deleteLivro !== null){
        res.status(200).send({message: "Livro removido com sucesso"});
      }else{
        next(new NaoEncontrado("Livro não encontrado delete"));
      }
    } catch (error) {
      next(error);
    }
  };


  static listarLivroPorEditora = async (req,res, next)=>{
    try {
      const editora = req.query.editora;
      const filtroEditora = await livros.find({editora: editora}, {});
      res.status(200).send(filtroEditora);
    } catch (error) {
      next(error);
    }
  };
}

export default LivroController;