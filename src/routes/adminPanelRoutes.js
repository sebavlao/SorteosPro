const express = require("express");
const controller = require("../controller/adminController");
const validatorAdmin = require("../middlewares/validatorAdmin");
const validatorPdf = require("../middlewares/validatorPdf");
const checkJwtAdmin = require("../middlewares/checkJwtAdmin");
const addCurrentPath = require("../middlewares/currentPath");

const adminPanelRouter = express.Router();

adminPanelRouter.get("/login", controller.login);

adminPanelRouter.post("/login", validatorAdmin(), controller.tryLogin);

adminPanelRouter.get(
  "/panel",
  checkJwtAdmin,
  addCurrentPath,
  controller.drawPanel
);

adminPanelRouter.post(
  "/panel",
  checkJwtAdmin,
  addCurrentPath,
  controller.drawPanel
);

adminPanelRouter.post(
  "/panel/pdf",
  checkJwtAdmin,
  addCurrentPath,
  validatorPdf(),
  controller.createPdf
);

adminPanelRouter.get(
  "/registros",
  checkJwtAdmin,
  addCurrentPath,
  controller.peoplePage
);

adminPanelRouter.get(
  "/registros/get",
  checkJwtAdmin,
  addCurrentPath,
  controller.getPeople
);

adminPanelRouter.get(
  "/registros/dwd",
  checkJwtAdmin,
  addCurrentPath,
  controller.dwnPeople
);

adminPanelRouter.post("/logout", checkJwtAdmin, controller.logout);

module.exports = adminPanelRouter;
