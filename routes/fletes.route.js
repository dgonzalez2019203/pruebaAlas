'use strict'

var express = require("express");

var fleteController = require("../controllers/fletes.controller");
var mdAuth = require("../middlewares/authenticated");
var api = express.Router();


api.get("/listarFletes",[mdAuth.enshureAuth],fleteController.listarFletes);
api.post("/agregarFlete",[mdAuth.enshureAuth, mdAuth.enshureAuthAdmin],fleteController.agregarFlete);
api.put("/actualizarFlete/:id",[mdAuth.enshureAuth, mdAuth.enshureAuthAdmin],fleteController.actualizarFlete);
api.put("/eliminarFlete/:id",[mdAuth.enshureAuth, mdAuth.enshureAuthAdmin],fleteController.eliminarFlete);

