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



module.exports = api;