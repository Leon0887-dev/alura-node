import NaoEncontrado from "../err/NaoEncontrado.js";
import autores from "../models/Autor.js";  

class AutoresController{

  static listarAutores = async (req, res, next)=>{
    try {
      const autoresResultado = await autores.find();
      res.status(200).json(autoresResultado);
    } catch (error) {
      next(error);
    }
  
  };

  static listarAutoresPorId = async (req, res, next)=>{
    try {
      const id = req.params.id;
      const autoresResultadoId = await autores.findById(id);

      if(autoresResultadoId === null){
        next(new NaoEncontrado("autor não encontrado"));
      }
      res.status(200).send(autoresResultadoId);
    } catch (error) {
      next(error);  
    }
  };

  static cadastrarAutores = async  (req, res, next)=>{
    try {
      let autor = new autores(req.body);
      const novoAutor = await autor.save();
      res.status(201).send(novoAutor.toJSON());
    } catch (error) {
      next(error);
    }
  };

  static atualizarAutor = async (req, res, next) =>{
    try {
      const id = req.params.id;
      await autores.findByIdAndUpdate(id,{$set: req.body});  
      res.status(200).send({message: "Autor atualizado com sucesso"});
    } catch (error) {
      next(error);
    }
  };

  static excluirAutor = async (req, res, next)=>{
    try {
      const id = req.params.id;
      await autores.findByIdAndDelete(id);
      res.status(200).send({message: "Autor removido com sucesso"});
    } catch (error) {
      next(error);
    }
      
  };
}

export default AutoresController; 