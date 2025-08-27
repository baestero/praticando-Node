const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/userController");

router.post("/register", usuarioController.register);

router.post("/auth", usuarioController.login);

module.exports = router;
