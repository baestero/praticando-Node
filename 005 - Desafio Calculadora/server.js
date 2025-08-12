const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send(`<h1>Calculadora usando Express</h1>
    <form action="/calcular">
    <input type="Number" name="n1" placeholder="Primeiro número" required>
    <input type="Number" name="n2" placeholder="Segundo número" required>
    <button type="submit">Calcular</button>
    </form>
    `);
});

app.get("/calcular", (req, res) => {
  const resultado = +req.query.n1 + +req.query.n2;
  res.send(`<p>O resultado é ${resultado}</p>`);
});

app.listen(3001, () => {
  console.log("Servidor Rodando na Porta 3001!");
});
