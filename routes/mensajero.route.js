'use strict'

var express = require("express");

var mensajeroController = require("../controllers/mensajero.controller");
var mdAuth = require("../middlewares/authenticated");
var api = express.Router();

api.get("/getMensajeroId/:id",[mdAuth.enshureAuth],mensajeroController.getMensajeroId);
api.get("/getEstadoCivil",[mdAuth.enshureAuth],mensajeroController.getEstadoCivil);

api.post("/saveMensajero",[mdAuth.enshureAuth],mensajeroController.saveMensajero);
api.put("/updateMensajero/:id",[mdAuth.enshureAuth],mensajeroController.updateMensajero);

module.exports = api;