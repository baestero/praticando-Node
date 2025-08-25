const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Usuario = {
  name: {
    type: String,
    required: [true, "O nome é Obrigatório"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "O email é Obrigatório"],
  },
  password: {
    type: String,
    required: [true, "A senha é Obrigatório"],
  },
};

module.exports = mongoose.model("usuarios", Usuario);
