const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWTSecret = "feiewifwepfmdwpfjdsfhjqwadfjpwqo"; //env

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Todos os campos são obrigatórios" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const novoUsuario = await Usuario.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      message: "Usuario criado com sucesso!",
      user: {
        id: novoUsuario.id,
        name: novoUsuario.name,
        email: novoUsuario.email,
      },
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ msg: "Email já cadastrado!" });
    }
    res.status(500).json({ err: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(404).json({
      message: "Email e Senha, são obrigatórios para o Login!",
      type: "error",
    });
  }

  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res
        .status(401)
        .json({ message: "Usuario ou senha incorretos", type: "error" });
    }

    const senhaValida = await bcrypt.compare(password, usuario.password);

    if (!senhaValida) {
      return res
        .status(401)
        .json({ message: "Usuario ou senha incorretos", type: "error" });
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
      },
      JWTSecret,
      {
        expiresIn: "24h",
      }
    );

    res.status(200).json({
      message: "Login bem-sucedido",
      type: "success",
      token,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Erro interno do servidor", type: "error" });
  }
};
