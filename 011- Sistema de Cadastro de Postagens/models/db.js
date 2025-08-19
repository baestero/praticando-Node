const Sequelize = require("sequelize");

//Conexão com banco de dados Mysql
const sequelize = new Sequelize("postapp", "root", "981219", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize,
};
