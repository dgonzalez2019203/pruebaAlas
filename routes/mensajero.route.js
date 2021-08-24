'use strict'

var express = require("express");

var mensajeroController = require("../controllers/mensajero.controller");
var mdAuth = require("../middlewares/authenticated");
var api = express.Router();

api.get("/getMensajeroId/:id",[mdAuth.enshureAuth, mdAuth.enshureAuthAdmin],mensajeroController.getMensajeroId);
api.get("/getEstadoCivil",[mdAuth.enshureAuth, mdAuth.enshureAuthAdmin],mensajeroController.getEstadoCivil);

api.post("/saveMensajero",[mdAuth.enshureAuth, mdAuth.enshureAuthAdmin],mensajeroController.saveMensajero);
api.put("/updateMensajero/:id",[mdAuth.enshureAuth, mdAuth.enshureAuthAdmin],mensajeroController.updateMensajero);

module.exports = api;