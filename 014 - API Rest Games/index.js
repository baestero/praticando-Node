const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

(async () => {
  try {
    await mongoose.connect("mongodb://localhost/gameapp");
    console.log("Mongo conectado com sucesso");
  } catch (err) {
    console.log("Erro ao se conectar ao mongo " + err);
  }
})();

app.get("/", (req, res) => {
  res.json({
    message: "Bem vindo ao meu app",
  });
});

const gameRoutes = require("./routes/game");
app.use("/games", gameRoutes);

const usuarioRoutes = require("./routes/usuario");
app.use("/usuario", usuarioRoutes);

app.listen(3000, () => console.log("Servidor Rodando na porta 3000"));
