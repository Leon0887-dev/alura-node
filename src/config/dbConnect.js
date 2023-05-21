import mongoose from "mongoose";

mongoose.connect("mongodb+srv://node:123@node-livros.hgpc1ye.mongodb.net/node-livros");

let db = mongoose.connection

export default db;