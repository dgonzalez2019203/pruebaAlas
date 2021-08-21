'use strict'

var express = require("express");

var pedidosController = require("../controllers/pedidos.controller");
var mdAuth = require("../middlewares/authenticated");
var api = express.Router();

api.get("/listPedidos",[mdAuth.enshureAuth, mdAuth.enshureAuthAdmin],pedidosController.listPedidos); //Listar pedidos
api.get("/listPedidosF",[mdAuth.enshureAuth, mdAuth.enshureAuthAdmin],pedidosController.listPedidosF); //Listar pedidos por fecha
api.get("/listPedidosC/:id",[mdAuth.enshureAuth],pedidosController.listPedidosC); //listar pedidos por cliente
api.get("/listPedidosCE/:id",[mdAuth.enshureAuth],pedidosController.listPedidosCE); //Listar pedidos cliente especial
api.get("/listPedidosM/:id",[mdAuth.enshureAuth],pedidosController.listPedidosM); //Listar pedidos mensajero
api.get("/listPedidosME/:id",[mdAuth.enshureAuth],pedidosController.listPedidosME); //Listar pedidos especiales por mensajero 
api.get("/listPedidosE/:id",[mdAuth.enshureAuth, mdAuth.enshureAuthAdmin],pedidosController.listPedidosEstado); //Listar pedidos por estado

api.put("/confirmarPedido/:id",[mdAuth.enshureAuth, mdAuth.enshureAuthAdmin],pedidosController.confirmarPedido);
api.post("/confirmarPedidoEspecial/:id",[mdAuth.enshureAuth, mdAuth.enshureAuthAdmin],pedidosController.confirmarPedidoEspecial);
api.post("/savePedido",[mdAuth.enshureAuth],pedidosController.confirmarPedidoEspecial);
api.get("/getMensajero",[mdAuth.enshureAuth],pedidosController.getMensajero);
api.get("/getFormaPago",[mdAuth.enshureAuth],pedidosController.getFormaPago);
api.get("/getZonas",[mdAuth.enshureAuth],pedidosController.getZonas);
api.get("/getZonasYFecha",[mdAuth.enshureAuth],pedidosController.getZonasYFecha);
api.put("/editarPedido/:id",[mdAuth.enshureAuth, mdAuth.enshureAuthAdmin],pedidosController.editarPedido);
api.put("/deletePedido/:id",[mdAuth.enshureAuth, mdAuth.enshureAuthAdmin],pedidosController.deletePedido);



module.exports = api;