const express = require("express");
const registerController = require("../controller/registerController");
const validatorUser = require("../middlewares/validatorUser");
const sanatizeTokenEmail = require("../middlewares/sanatizeTokenEmail");
const addCurrentPath = require("../middlewares/currentPath");

const routerRegister = express.Router();

routerRegister.get("/", addCurrentPath, registerController.index);

routerRegister.post(
  "/",
  addCurrentPath,
  validatorUser(),
  registerController.register
);

routerRegister.get("/tyc", addCurrentPath, registerController.tyc);

routerRegister.get(
  "/confirmar/:token",
  sanatizeTokenEmail(),
  registerController.confirmarEmail
);

routerRegister.get(
  "/participantes",
  addCurrentPath,
  registerController.participants
);

module.exports = routerRegister;
