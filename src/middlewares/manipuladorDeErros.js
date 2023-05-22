import mongoose from "mongoose";

class ManipuladorDeErros{
// eslint-disable-next-line no-unused-vars
  manipulandoErros(erro, req, res, next){
    if(erro instanceof mongoose.Error.CastError) {
      res.status(400).send({message: "Um ou mais dados fornecidos estão incorretos"});
    }else{
      res.status(500).send({message: "Error interno do servidor"});
    }
  }
}

export default ManipuladorDeErros;