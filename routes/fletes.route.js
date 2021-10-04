'use strict'

var express = require("express");

var fleteController = require("../controllers/fletes.controller");
var mdAuth = require("../middlewares/authenticated");
var api = express.Router();

var connectMultiparty = require('connect-multiparty');

var mdUpload = connectMultiparty({ uploadDir: './uploads/fletes'});

//Admin
api.get("/listarFletes",[mdAuth.enshureAuth, mdAuth.enshureAuthAdmin],fleteController.listarFletes);
api.put("/eliminarFlete/:id",[mdAuth.enshureAuth, mdAuth.enshureAuthAdmin],fleteController.eliminarFlete);
api.put("/actualizarFlete/:id",[mdAuth.enshureAuth, mdAuth.enshureAuthAdmin],fleteController.actualizarFlete);
api.get("/getPilotos",[mdAuth.enshureAuth, mdAuth.enshureAuthAdmin],fleteController.getPilotos);
api.get("/listarFleteByEstado/:id",[mdAuth.enshureAuth, mdAuth.enshureAuthAdmin],fleteController.listarFleteByEstado);

//Cliente
api.post("/agregarFlete/:id",[mdAuth.enshureAuth, mdAuth.enshureAuthClienteFlete],fleteController.agregarFlete);
api.get("/listarFletesByCliente/:id",[mdAuth.enshureAuth, mdAuth.enshureAuthClienteFlete],fleteController.listarFletesByCliente);
api.put("/actualizarFleteByCliente/:id",[mdAuth.enshureAuth, mdAuth.enshureAuthClienteFlete],fleteController.actualizarFleteByCliente);

//Mensajero
api.get("/listarFletesByConductor/:id",[mdAuth.enshureAuth],fleteController.listarFletesByConductor);
api.put("/actualizarEstadoFlete/:id",[mdAuth.enshureAuth],fleteController.actualizarEstadoFlete);
api.get("/listarFletesByConductorEstado/:id/:estado",[mdAuth.enshureAuth],fleteController.listarFletesByConductorEstado);

//Imganes 
api.put('/uploadImgFlete/:id',[mdUpload],fleteController.uploadImgFlete);
api.get("/getImgFlete/:fileName",[mdUpload],fleteController.getImgFlete);

module.exports = api;