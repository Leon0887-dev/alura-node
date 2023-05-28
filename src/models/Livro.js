import mongoose from "mongoose";

const livroSchema = new mongoose.Schema({
  id: {type: String},
  titulo: {
    type: String, 
    required: [true, "O título do livro é obrigatório"]
  },
  autor: {
    type: mongoose.Types.ObjectId, 
    ref: "autores", 
    required: [true, "O autor é obrigatório"]
  },
  editora: {
    type: String, 
    required: [true, "A editora é obrigatório"],
    enum:{
      values: ["Casa do código", "Alura"],
      message: "A editora {VALUE} não é um valor permitido."
    }
  },
  paginas: {
    type: Number,
    min: [10, "Número de {VALUE} página inferior ao permitido"],
    max: [5000, "Número de {VALUE} página superior ao permitido"]
  }
});

const livros = mongoose.model("livros", livroSchema);

export default livros;

