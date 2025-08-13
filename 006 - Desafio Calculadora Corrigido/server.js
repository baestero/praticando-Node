const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.post("/", (req, res) => {
  const resultado = +req.body.num1 + +req.body.num2;
  res.send(`O resultado é: ${resultado}`);
});

app.get("/bmiCalculator", (req, res) => {
  res.sendFile(`${__dirname}/bmiCalculator.html`);
});

app.post("/bmiCalculator", (req, res) => {
  const peso = parseFloat(req.body.peso);
  const altura = parseFloat(req.body.altura);

  const resultado = peso / (altura * altura);

  res.send(`Seu IMC é: ${resultado.toFixed(2)}`);
});

app.listen(3000, () => {
  console.log("Servidor Rodando na Porta 3000!");
});
