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
    try {
      const id = req.params.id;
      const autoresResultadoId = await autores.findById(id);
      res.status(200).send(autoresResultadoId);
    } catch (error) {
      res.status(400).send({message: `${error.message} - autor não encontrado`});
    }
  };

  static cadastrarAutores = async  (req, res)=>{
    try {
      let autor = new autores(req.body);
      const novoAutor = await autor.save();
      res.status(201).send(novoAutor.toJSON());
    } catch (error) {
      res.status(500).send({message: `${error.message} - falha ao cadastrar autor`});
    }
  };

  static atualizarAutor = async (req, res) =>{
    try {
      const id = req.params.id;
      await autores.findByIdAndUpdate(id,{$set: req.body});  
      res.status(200).send({message: "Autor atualizado com sucesso"});
    } catch (error) {
      res.status(500).send({message: error.message});
    }
  };

  static excluirAutor = async (req, res)=>{
    try {
      const id = req.params.id;
      await autores.findByIdAndDelete(id);
      res.status(200).send({message: "Autor removido com sucesso"});
    } catch (error) {
      res.status(500).send({message: error.message});
    }
      
  };
}

export default AutoresController; 