'use strict'

var express = require("express");

var userController = require("../controllers/user.controller");
var mdAuth = require("../middlewares/authenticated");
var api = express.Router();

api.post("/login",userController.login);
api.post("/register",userController.register);
api.get("/getBancos",userController.getBancos);
api.post("/updateUser/:id",userController.updateUser);
api.post("/passRecovery/:id",userController.passRecovery);

api.post("/saveByAdmin",[mdAuth.enshureAuth, mdAuth.enshureAuthAdmin],userController.saveByAdmin);
api.get("/listUsuario",[mdAuth.enshureAuth, mdAuth.enshureAuthAdmin],userController.listUsuario);
api.put("/deleteUser/:id",[mdAuth.enshureAuth, mdAuth.enshureAuthAdmin],userController.disableUser);
api.put("/updateAccount/:id",[mdAuth.enshureAuth],userController.updateAccount);
api.put("/confirmarCorreo",[mdAuth.enshureAuth],userController.confirmarCorreo);


module.exports = api;