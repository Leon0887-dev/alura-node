import livros from "../models/Livro.js";


class LivroController{
   
  static listarLivros = async (req, res)=>{

    const listaLivros = await livros.find().populate("autor");
    try {
      res.status(200).json(listaLivros);
    } catch (error) {
      res.status(500).send({message: "servidor indisponivel"});
    }
  };

  static listarLivroPorId = async (req, res)=>{
    const id = req.params.id; 
    const livroPorId = await livros.findById(id).populate("autor", "nome");

    try {
      res.status(200).send(livroPorId);
    } catch (error) {
      res.status(400).send({message:`${error.message} - Livro não localizado`});
    }
  };

  static cadastrarLivro = async (req,res)=>{
    let livro = new livros(req.body);
    const novoLivro = await livro.save();
    try {
      res.status(201).send(novoLivro.toJSON());
    } catch (error) {
      res.status(500).send({message: `${error.message} - falha ao cadastrar livro`});
    }
  };

  static atualizarLivro = async (req,res)=>{
    const id = req.params.id; 
    await livros.findByIdAndUpdate(id, {$set: req.body});
    try {
      res.status(200).send({message: "Livro atualiado com sucesso"});
    } catch (error) {
      res.status(500).send({message: error.message});
    }
  };


  static excluirLivro = async (req,res)=>{
    const id = req.params.id;
    await livros.findByIdAndDelete(id);
    try {
      res.status(200).send({message: "Livro removido com sucesso"});
    } catch (error) {
      res.status(500).send({message: error.message});
    }
  };


  static listarLivroPorEditora = async (req,res)=>{
    const editora = req.query.editora;
    const filtroEditora = await livros.find({editora: editora}, {});
    try {
      res.status(200).send(filtroEditora);
    } catch (error) {
      res.status(500).send({message: "filtro incorreto"});
    }
    // livros.find({"editora": editora}, {}, (err, livros) =>{
    //   res.status(200).send(livros);
    // });
  };
}

export default LivroController;