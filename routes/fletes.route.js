'use strict'

var express = require("express");

var fleteController = require("../controllers/fletes.controller");
var mdAuth = require("../middlewares/authenticated");
var api = express.Router();


api.get("/listarFletes",[mdAuth.enshureAuth],fleteController.listarFletes);
api.post("/agregarFlete",[mdAuth.enshureAuth],fleteController.agregarFlete);
api.put("/actualizarFlete/:id",[mdAuth.enshureAuth],fleteController.actualizarFlete);
api.put("/eliminarFlete/:id",[mdAuth.enshureAuth],fleteController.eliminarFlete);

module.exports = api;