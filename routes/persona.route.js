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

module.exports = api;