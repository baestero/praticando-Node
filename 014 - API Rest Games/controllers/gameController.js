const Game = require("../models/Game");
const mongoose = require("mongoose");

exports.getAllGames = async (req, res) => {
  try {
    const games = await Game.find();
    res.status(200).json({ games: games });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

exports.getGamesById = async (req, res) => {
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
    res.status(500).json({ msg: err.message });
  }
};

exports.createGame = async (req, res) => {
  try {
    const { title, year, price } = req.body;
    const novoGame = await Game.create({ title, year, price });
    res.status(201).json(novoGame);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Game já cadastrado" });
    }
    res.status(500).json({ err: err.message });
  }
};

exports.updateGame = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "ID inválido" });
  }

  try {
    const { title, year, price } = req.body;

    const game = await Game.findByIdAndUpdate(
      id,
      { title, year, price },
      { new: true, runValidators: true }
    );
    if (!game) {
      return res.status(404).json({ msg: "Game não encontrado" });
    }

    res.status(200).json(game);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

exports.deleteGame = async (req, res) => {
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
};
