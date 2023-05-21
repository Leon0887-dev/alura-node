import mongoose from "mongoose";

const autorSchema = new mongoose.Schema(
    {
        id: {type: 'string'},
        nome: {type: 'string',required: true},
        nacionalidade: {type: 'string'}
    },
    {
        versionKey: false
    }

);

const autores = mongoose.model("autores", autorSchema);

export default autores;

