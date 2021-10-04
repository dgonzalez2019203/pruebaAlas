'use strict'

var express = require("express");

var tokenController = require("../controllers/TokenNotification.controller");
var mdAuth = require("../middlewares/authenticated");
var api = express.Router();



api.post("/saveNotificationToken",tokenController.saveNotification);
api.get("/listNotificationCliente",tokenController.listNotificationCliente);
api.get("/listNotificationAdmin",tokenController.listNotificationAdmin);
api.get("/listNotificationMensajero",tokenController.listNotificationMensajero);
api.get("/listNotificationByUsuario/:id",tokenController.listNotificationByUsuario);
