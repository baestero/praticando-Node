const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Jesus te ama");
});

app.listen(3000, () => {
  console.log("Servidor Rodando na Porta 3000!");
});
