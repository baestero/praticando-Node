const Sequelize = require("sequelize");
const sequelize = new Sequelize("teste", "root", "981219", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Conectado com sucesso!");
  })
  .catch((erro) => {
    console.log("Falha ao se conectar: " + erro);
  });

const Postagem = sequelize.define("postagens", {
  titulo: {
    type: Sequelize.STRING,
  },

  conteudo: {
    type: Sequelize.TEXT,
  },
});

//Postagem.sync({ force: true });

/*Postagem.create({
  titulo: "Um titulo qualquer",
  conteudo: "Conteudo qualquer",
});
*/

const Usuario = sequelize.define("usuarios", {
  nome: {
    type: Sequelize.STRING,
  },
  sobrenome: {
    type: Sequelize.STRING,
  },
  idade: {
    type: Sequelize.INTEGER,
  },
  email: {
    type: Sequelize.STRING,
  },
});

//Usuario.sync({ force: true });

Usuario.create({
  nome: "Leonardo",
  sobrenome: "Baestero",
  idade: "26",
  email: "teste@email.com",
});
