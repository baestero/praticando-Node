const mongoose = require("mongoose");

//Configurando o mongoose
mongoose.Promise = global.Promisse;
mongoose
  .connect("mongodb://localhost/aprendendo")
  .then(() => {
    console.log("Conexão com mongoDB realizada com sucesso");
  })
  .catch((err) => {
    console.log("Houve um erro ao se conecatar ao mongoDB " + err);
  });

/* com try/catch e função anonima assíncrona

  (async () => {
  try {
    await mongoose.connect("mongodb://localhost/aprendendo");
    console.log("Conexão mongoDB realizada com sucesso");
  } catch (erro) {
    console.log("Houve um erro ao se conectar ao mongoDB: " + erro);
  }
})();
  */

//Model - Usuários
//Definindo o Model
const UsuarioSchema = mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  sobrenome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  idade: {
    type: Number,
    required: true,
  },
  pais: {
    type: String,
  },
});

//Collection
mongoose.model("usuarios", UsuarioSchema);

const Usuario = mongoose.model("usuarios");

new Usuario({
  nome: "Leonardo",
  sobrenome: "Baestero",
  email: "teste@emai.com",
  idade: 26,
  pais: "Brasil",
})
  .save()
  .then(() => {
    console.log("Usuário criado com sucesso!");
  })
  .catch((err) => {
    console.log("Houve um erro ao registrar o usuário: " + err);
  });
