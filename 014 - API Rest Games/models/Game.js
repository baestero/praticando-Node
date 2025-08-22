const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Game = new Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("games", Game);
