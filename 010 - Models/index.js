const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Seja Bem vindo ao meu APP"));

app.listen(3000, () =>
  console.log("Servidor Rodando na url http://localhost:3000/")
);
