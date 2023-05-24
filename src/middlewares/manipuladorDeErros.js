import mongoose from "mongoose";

// eslint-disable-next-line no-unused-vars
function manipulandoErros(erro, req, res, next){
  if(erro instanceof mongoose.Error.CastError) {
    res.status(400).send({message: "Um ou mais dados fornecidos estão incorretos"});
  }else if(erro instanceof mongoose.Error.ValidationError){
    const mensagemError = Object.values(erro.errors)
      .map(err => err.message)
      .join("; ");
    res.status(400).send({message: mensagemError}); 
  } else{
    res.status(500).send({message: "Error interno do servidor"});
  }
}


export default manipulandoErros;