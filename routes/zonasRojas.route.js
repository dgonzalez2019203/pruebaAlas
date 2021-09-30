'use strict'

var express = require("express");

var zonasController = require("../controllers/zonasRojas.controller");
var mdAuth = require("../middlewares/authenticated");
var api = express.Router();


api.get("/listarZonas",[mdAuth.enshureAuth],zonasController.listarZonasRojas);
api.post("/agregarZonas",[mdAuth.enshureAuth],zonasController.agregarZonaRoja);
api.put("/actualizarZonas/:id",[mdAuth.enshureAuth],zonasController.actualizarZonaRoja);
api.put("/eliminarZonas/:id",[mdAuth.enshureAuth],zonasController.eliminarZonaRoja);

module.exports = api;