import express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";
import manipuladorNotFound from "./middlewares/manipuladorNotFound.js";


db.on("error", console.log.bind(console, "Erro de conexão no banco"));
db.once("open", () => console.log("conexão realizada com sucesso"));

const app = express();
app.use(express.json());
routes(app);

app.use(manipuladorNotFound);

//middleware para tratamento de erros
app.use(manipuladorDeErros);


export default app;