'use strict'

var express = require("express");

var fleteController = require("../controllers/fletes.controller");
var mdAuth = require("../middlewares/authenticated");
var api = express.Router();



//Admin
api.get("/listarFletes",[mdAuth.enshureAuth, mdAuth.enshureAuthAdmin],fleteController.listarFletes);
api.put("/eliminarFlete/:id",[mdAuth.enshureAuth, mdAuth.enshureAuthAdmin],fleteController.eliminarFlete);
api.put("/actualizarFlete/:id",[mdAuth.enshureAuth, mdAuth.enshureAuthAdmin],fleteController.actualizarFlete);

//Cliente
api.post("/agregarFlete/:id",[mdAuth.enshureAuth, mdAuth.enshureAuthClienteFlete],fleteController.agregarFlete);
api.get("/listarFletesByCliente/:id",[mdAuth.enshureAuth, mdAuth.enshureAuthClienteFlete],fleteController.listarFletesByCliente);
api.put("/actualizarFleteByCliente/:id",[mdAuth.enshureAuth, mdAuth.enshureAuthClienteFlete],fleteController.actualizarFleteByCliente);

//Mensajero
api.get("/listarFletesByConductor/:id",[mdAuth.enshureAuth],fleteController.listarFletesByConductor);
api.put("/actualizarEstadoFlete/:id",[mdAuth.enshureAuth],fleteController.actualizarEstadoFlete);


module.exports = api;