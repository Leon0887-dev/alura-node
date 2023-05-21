import autores from "../models/Autor.js";  

class AutoresController{

  static listarAutores = async (req, res)=>{
    try {
      const autoresResultado = await autores.find();
      res.status(200).json(autoresResultado);
    } catch (error) {
      res.status(500).json({message: "Erro interno no servidor"});
    }
  
  };

  static listarAutoresPorId = async (req, res)=>{
    const id = req.params.id;
    try {
      const autoresResultadoId = await autores.findById(id);
      res.status(200).send(autoresResultadoId);
    } catch (error) {
      res.status(400).send({message: `${error.message} - autor não encontrado`});
    }
  };

  static cadastrarAutores = async  (req, res)=>{
    let autor = new autores(req.body);
    const novoAutor = await autor.save();
    try {
      res.status(201).send(novoAutor.toJSON());
    } catch (error) {
      res.status(500).send({message: `${error.message} - falha ao cadastrar autor`});
    }
  };

  static atualizarAutor = async (req, res) =>{
    const id = req.params.id;
    await autores.findByIdAndUpdate(id,{$set: req.body});
    try {
      res.status(200).send({message: "Autor atualizado com sucesso"});
    } catch (error) {
      res.status(500).send({message: error.message});
    }
  };

  static excluirAutor = async (req, res)=>{
    const id = req.params.id;
    await autores.findByIdAndDelete(id);
    try {
      res.status(200).send({message: "Autor removido com sucesso"});
    } catch (error) {
      res.status(500).send({message: error.message});
    }
      
  };
}

export default AutoresController; 