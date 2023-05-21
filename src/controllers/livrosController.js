import livros from "../models/Livro.js";


class LivroController{
   
  static listarLivros = async (req, res)=>{
    try {
      const listaLivros = await livros.find().populate("autor");
      res.status(200).json(listaLivros);
    } catch (error) {
      res.status(500).send({message: "servidor indisponivel"});
    }
  };

  static listarLivroPorId = async (req, res)=>{
    try {
      const id = req.params.id; 
      const livroPorId = await livros.findById(id).populate("autor", "nome");
      res.status(200).send(livroPorId);
    } catch (error) {
      res.status(400).send({message:`${error.message} - Livro não localizado`});
    }
  };

  static cadastrarLivro = async (req,res)=>{
    try {
      let livro = new livros(req.body);
      const novoLivro = await livro.save();
      res.status(201).send(novoLivro.toJSON());
    } catch (error) {
      res.status(500).send({message: `${error.message} - falha ao cadastrar livro`});
    }
  };

  static atualizarLivro = async (req,res)=>{
    try {
      const id = req.params.id; 
      await livros.findByIdAndUpdate(id, {$set: req.body});
      res.status(200).send({message: "Livro atualiado com sucesso"});
    } catch (error) {
      res.status(500).send({message: error.message});
    }
  };


  static excluirLivro = async (req,res)=>{
    try {
      const id = req.params.id;
      await livros.findByIdAndDelete(id);
      res.status(200).send({message: "Livro removido com sucesso"});
    } catch (error) {
      res.status(500).send({message: error.message});
    }
  };


  static listarLivroPorEditora = async (req,res)=>{
    try {
      const editora = req.query.editora;
      const filtroEditora = await livros.find({editora: editora}, {});
      res.status(200).send(filtroEditora);
    } catch (error) {
      res.status(500).send({message: "filtro incorreto"});
    }
  };
}

export default LivroController;