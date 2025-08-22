const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Game = require("../models/Game");

router.get("/", async (req, res) => {
  try {
    const games = await Game.find();
    res.status(200).json(games);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "ID inválido" });
  }

  try {
    const game = await Game.findById(id);
    if (!game) {
      return res.status(404).json({ msg: "Game não encontrado" });
    }
    res.status(200).json(game);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "ID inválido" });
  }

  try {
    const game = await Game.findByIdAndDelete(id);
    if (!game) {
      return res.status(404).json({ msg: "Game não encontrado" });
    }
    res.status(200).json({ msg: "Game deletado com sucesso!" });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, year, price } = req.body;
    const novoGame = await Game.create({ title, year, price });
    res.status(201).json(novoGame);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ msg: "Game já cadastrado" });
    }
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
