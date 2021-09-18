'use strict'

var express = require("express");

var zonasController = require("../controllers/zonasRojas.controller");
var mdAuth = require("../middlewares/authenticated");
var api = express.Router();


api.get("/listarFletes",[mdAuth.enshureAuth],zonasController.listarZonasRojas);
api.post("/agregarFlete",[mdAuth.enshureAuth],zonasController.agregarZonaRoja);
api.put("/actualizarFlete/:id",[mdAuth.enshureAuth],zonasController.actualizarZonaRoja);
api.put("/eliminarFlete/:id",[mdAuth.enshureAuth],zonasController.eliminarZonaRoja);

module.exports = api;