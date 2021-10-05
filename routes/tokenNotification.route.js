'use strict'

var express = require("express");

var tokenController = require("../controllers/TokenNotification.controller");
var mdAuth = require("../middlewares/authenticated");
var api = express.Router();



api.post("/saveNotificationToken",tokenController.saveNotification);
api.post("/listNotificationCliente",tokenController.listNotificationCliente);
api.post("/listNotificationAdmin",tokenController.listNotificationAdmin);
api.post("/listNotificationMensajero",tokenController.listNotificationMensajero);
api.post("/listNotificationByUsuario/:id",tokenController.listNotificationByUsuario);


module.exports = api;