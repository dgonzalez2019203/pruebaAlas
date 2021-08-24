'use strict'

var express = require("express");

var pedidosController = require("../controllers/pedidos.controller");
var mdAuth = require("../middlewares/authenticated");
var api = express.Router();


/*Global*/
api.get("/listPedidos",[mdAuth.enshureAuth, mdAuth.enshureAuthAdmin],pedidosController.listPedidos); //Listar pedidos
api.get("/listPedidosF",[mdAuth.enshureAuth, mdAuth.enshureAuthAdmin],pedidosController.listPedidosF); //Listar pedidos por fecha
api.get("/listPedidosC/:id",[mdAuth.enshureAuth],pedidosController.listPedidosC); //listar pedidos por cliente
api.get("/listPedidosCE/:id",[mdAuth.enshureAuth],pedidosController.listPedidosCE); //Listar pedidos cliente especial
api.get("/listPedidosM/:id",[mdAuth.enshureAuth],pedidosController.listPedidosM); //Listar pedidos mensajero
api.get("/listPedidosME/:id",[mdAuth.enshureAuth],pedidosController.listPedidosME); //Listar pedidos especiales por mensajero 
api.get("/listPedidosE/:id",[mdAuth.enshureAuth, mdAuth.enshureAuthAdmin],pedidosController.listPedidosEstado); //Listar pedidos por estado

/*Adminnistrador*/
api.put("/confirmarPedido/:id",[mdAuth.enshureAuth, mdAuth.enshureAuthAdmin],pedidosController.confirmarPedido);
api.post("/confirmarPedidoEspecial/:id",[mdAuth.enshureAuth, mdAuth.enshureAuthAdmin],pedidosController.confirmarPedidoEspecial);
api.get("/getMensajero",[mdAuth.enshureAuth],pedidosController.getMensajero);
api.get("/getFormaPago",[mdAuth.enshureAuth],pedidosController.getFormaPago);
api.get("/getZonas",[mdAuth.enshureAuth],pedidosController.getZonas);
api.get("/getZonasYFecha",[mdAuth.enshureAuth],pedidosController.getZonasYFecha);
api.put("/cancelPedidoAdmin/:id",[mdAuth.enshureAuth, mdAuth.enshureAuthAdmin],pedidosController.cancelPedidoAdmin);

/*Mensajero*/
api.put("/updatePedidoM/:id",[mdAuth.enshureAuth, mdAuth.enshureAuthCliente],pedidosController.updatePedidoM);
api.put("/updatePedidoME/:id",[mdAuth.enshureAuth, mdAuth.enshureAuthCliente],pedidosController.updatePedidoME);

// CREDITOS

api.get("buscarCredito/:usuarioId",[mdAuth.enshureAuth,mdAuth.enshureAuthAdmin], pedidosController.buscarCredito);
api.put("setCredito/:creditoId/:pedidoId",[mdAuth.enshureAuth,mdAuth.enshureAuthAdmin], pedidosController.setCredito);
api.post("addCredito/:usuarioId",[mdAuth.enshureAuth,mdAuth.enshureAuthAdmin],pedidosController.addCredito);
api.post("addPedidoCredito/:creditoId/:pedidoId",[mdAuth.enshureAuth,mdAuth.enshureAuthAdmin],pedidosController.addPedidoCredito);


/*Usuario*/
api.put("/editarPedido/:id",[mdAuth.enshureAuth],pedidosController.editarPedido);
api.put("/removePedido/:id",[mdAuth.enshureAuth],pedidosController.removePedido);
api.put("/cancelPedido/:id",[mdAuth.enshureAuth],pedidosController.cancelPedido);

module.exports = api;