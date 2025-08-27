const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");
const auth = require("../middlewares/auth");

router.use(auth);

router.get("/", gameController.getAllGames);

router.get("/:id", gameController.getGamesById);

router.post("/", gameController.createGame);

router.put("/:id", gameController.updateGame);

router.delete("/:id", gameController.deleteGame);

module.exports = router;
