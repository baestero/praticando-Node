const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");

router.get("/registro", (req, res) => {
  res.json({
    message: "Rota de resgistro",
  });
});

router.post("/registro", async (req, res) => {
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
});

router.get("/auth", (req, res) => {
  res.json({ message: "Rota de Login" });
});

router.post("/auth", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      message: "Email e Password, são obrigatórios para o Login!",
    });
  }

  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(404).json({ message: "Usuario ou senha incorretos" });
    }

    const senhaValida = await bcrypt.compare(password, usuario.password);

    if (senhaValida) {
      return res
        .status(200)
        .json({ message: "Login bem-sucedido", type: "success" });
    } else {
      return res
        .status(401)
        .json({ message: "Usuario ou senha incorretos", type: "error" });
    }
  } catch (err) {
    res.status(500).json({ err: err.message, type: "error" });
  }
});

module.exports = router;
