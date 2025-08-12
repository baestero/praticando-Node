const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/contato", (req, res) => {
  res.send("<h1>Pagina de Contato</h1>");
});

app.get("/sobre", (req, res) => {
  res.send("<p>Estudando Node + Express</p>");
});

app.listen(3000, () => {
  console.log("Servidor Rodando na Porta: 3000!");
});
