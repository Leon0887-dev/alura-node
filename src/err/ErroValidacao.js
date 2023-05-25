import RequisicaoIncorreta from "./RequisicaoIncorreta.js";

class ErroValidacao extends RequisicaoIncorreta{
  constructor(erro){
    const mensagemError = Object.values(erro.errors)
      .map(err => err.message)
      .join("; ");
        
    super(mensagemError);
  }
}

export default ErroValidacao; 