'use strict'

var express = require("express");

var pedidosController = require("../controllers/pedidos.controller");
var mdAuth = require("../middlewares/authenticated");
var api = express.Router();
var connectMultiparty = require('connect-multiparty');

var mdUpload = connectMultiparty({ uploadDir: './uploads/pedidos'});


/*Global*/
api.get("/listPedidos",[mdAuth.enshureAuth, mdAuth.enshureAuthAdmin],pedidosController.listPedidos); //Listar pedidos
api.get("/listPedidosF",[mdAuth.enshureAuth, mdAuth.enshureAuthAdmin],pedidosController.listPedidosF); //Listar pedidos por fecha
api.get("/listPedidosC/:id",[mdAuth.enshureAuth],pedidosController.listPedidosC); //listar pedidos por cliente
api.get("/listPedidosEstadoCliente/:id/:idUsuario",[mdAuth.enshureAuth],pedidosController.listPedidosEstadoCliente); //listar pedidos por cliente
api.get("/listPedidosME/:id",[mdAuth.enshureAuth],pedidosController.listPedidosME); //Listar pedidos especiales por mensajero 
api.get("/listPedidosE/:id",[mdAuth.enshureAuth, mdAuth.enshureAuthAdmin],pedidosController.listPedidosEstado); //Listar pedidos por estado

/*Adminnistrador*/
api.put("/confirmarPedido/:id",[mdAuth.enshureAuth, mdAuth.enshureAuthAdmin],pedidosController.confirmarPedido);
api.put("/confirmarPedidoEspecial/:id",[mdAuth.enshureAuth, mdAuth.enshureAuthAdmin],pedidosController.confirmarPedidoEspecial);
api.get("/getMensajero",[mdAuth.enshureAuth],pedidosController.getMensajero);
api.get("/getFormaPago",[mdAuth.enshureAuth],pedidosController.getFormaPago);
api.get("/getZonas",[mdAuth.enshureAuth],pedidosController.getZonas);
api.get("/getZonasYFecha",[mdAuth.enshureAuth,],pedidosController.getZonasYFecha);
api.get("/listPedidoEspecialAdmin",[mdAuth.enshureAuth,mdAuth.enshureAuthAdmin],pedidosController.listPedidoEspecialAdmin);
api.put("/cancelPedidoAdmin/:id",[mdAuth.enshureAuth, mdAuth.enshureAuthAdmin],pedidosController.cancelPedidoAdmin);

api.get("/listPedidoFecha/:fecha",[mdAuth.enshureAuth],pedidosController.getFechaPedidos); // fecha pedidos
api.get("/listPedidoFechaEmpresa/:fecha/:id",[mdAuth.enshureAuth],pedidosController.getFechaPedidosEmpresa); // fecha pedidos y empresa
api.get("/listEmpresa",[mdAuth.enshureAuth],pedidosController.getEmpresa); // empresa
api.get("/listPedidoMensajero/:id",[mdAuth.enshureAuth],pedidosController.getEmpresaMensajero); // mensajero
api.get("/getPedidoMensajeroFechaRango/:start/:end/:id",[mdAuth.enshureAuth],pedidosController.getPedidoMensajeroFechaRango); // mensajero y rango
api.get("/getPedidoMensajeroFechaRangoEstado/:start/:end/:id/:estado",[mdAuth.enshureAuth],pedidosController.getPedidoMensajeroFechaRangoEstado); // empresa y rango estado


api.get("/getNoMensajero/:id",[mdAuth.enshureAuth],pedidosController.getPendientesMensajero);



//ESTADO
api.get("/listPedidoFechaEstado/:fecha/:estado",[mdAuth.enshureAuth],pedidosController.getFechaPedidosEStado); // fecha pedidos estado
api.get("/listPedidoFechaEmpresaEstado/:fecha/:estado/:id",[mdAuth.enshureAuth],pedidosController.getFechaPedidosEmpresaEstado); // fecha emrpesa estado
api.get("/listPedidoMensajeroEstado/:id/:estado",[mdAuth.enshureAuth],pedidosController.getPedidoMensajeroEstado); // mensajero y estado
api.get("/listPedidoRangoEstado/:start/:end/:id/:estado",[mdAuth.enshureAuth],pedidosController.getRangoEmpresaEstado); // empresa y rango
api.get("/listEspecialEstado/:estado",[mdAuth.enshureAuth],pedidosController.getEspecialEstado); // empresa y rango
api.get("/listPedidoRango/:start/:end/:id",[mdAuth.enshureAuth],pedidosController.getRangoEmpresa); // empresa y rango



// CLIENTE ESPECIAL
api.get("/listPedidosCE/:id",[mdAuth.enshureAuth],pedidosController.listPedidosCE); //Listar pedidos cliente especial
api.post("/savePedidoEspecial/:id",[mdAuth.enshureAuth],pedidosController.savePedidoEspecial); //AGREGAR pedidos cliente especial
api.get("/listRangoEspecial/:id/:start/:end",[mdAuth.enshureAuth],pedidosController.getEspecialRango); //AGREGAR pedidos cliente especial
api.get("/listEspecialEmpresa",[mdAuth.enshureAuth],pedidosController.getEmpresaEspecial); //list empresa especial
api.get("/listEspecialFecha/:fecha",[mdAuth.enshureAuth],pedidosController.getPedidoEspecialFecha); //list empresa especial

//cliente especial estado
api.get("/listEspecialFechaEstado/:fecha/:estado",[mdAuth.enshureAuth],pedidosController.getPedidoEspecialFechaEstado); //list empresa especial
api.get("/listEspecialRangoEstado/:start/:end/:id/:estado",[mdAuth.enshureAuth],pedidosController.getEspecialRangoEstado); //list empresa especial



/*Mensajero*/
api.put("/updatePedidoM/:id",[mdAuth.enshureAuth],pedidosController.updatePedidoM);
api.put("/updatePedidoME/:id",[mdAuth.enshureAuth],pedidosController.updatePedidoME);
api.get("/listPedidosM/:id",[mdAuth.enshureAuth],pedidosController.listPedidosM); //Listar pedidos mensajero
api.post("/entregarPedido",[mdAuth.enshureAuth],pedidosController.entregarPedido);



// CREDITOS
api.get("/buscarCredito/:usuarioId",[mdAuth.enshureAuth,mdAuth.enshureAuthAdmin], pedidosController.buscarCredito);
api.put("/setCredito/:creditoId/:pedidoId",[mdAuth.enshureAuth,mdAuth.enshureAuthAdmin], pedidosController.setCredito);
api.post("/addCredito/:usuarioId",[mdAuth.enshureAuth,mdAuth.enshureAuthAdmin],pedidosController.addCredito);
api.post("/addPedidoCredito/:creditoId/:pedidoId",[mdAuth.enshureAuth,mdAuth.enshureAuthAdmin],pedidosController.addPedidoCredito);
api.get("/listCreditos",[mdAuth.enshureAuth,mdAuth.enshureAuthAdmin],pedidosController.listCreditos);
api.get("/listarCreditosDesc/:id",[mdAuth.enshureAuth,mdAuth.enshureAuthAdmin],pedidosController.listarCreditosDesc);

api.put("/confirmarCredito/:id",[mdAuth.enshureAuth,mdAuth.enshureAuthAdmin],pedidosController.confirmarCredito);


/*Usuario*/
api.put("/editarPedido/:id",[mdAuth.enshureAuth],pedidosController.editarPedido);
api.put("/removePedido/:id",[mdAuth.enshureAuth],pedidosController.removePedido);
api.put("/cancelPedido/:id",[mdAuth.enshureAuth],pedidosController.cancelPedido);
api.post("/savePedido",[mdAuth.enshureAuth],pedidosController.savePedido);


// GLOBAL
api.get("/getPuntoInicio",[mdAuth.enshureAuth],pedidosController.getPuntoInicio);
api.get("/getPuntoFinal/:id",[mdAuth.enshureAuth],pedidosController.getPuntoFinal);
api.get("/getDireccionesRecolecta/:id",[mdAuth.enshureAuth],pedidosController.getDireccionesRecolecta);
api.get("/getDireccionesFinal/:id",[mdAuth.enshureAuth],pedidosController.getDireccionesFinal);
api.get("/getCosto/:puntoInicio/:puntoFinal",[mdAuth.enshureAuth],pedidosController.getCosto);


//Imganes 
api.put('/uploadImgPedido/:id',[mdUpload],pedidosController.uploadImgPedido);
api.get("/getImgPedidos/:fileName",[mdUpload],pedidosController.getImgPedidos);


module.exports = api;