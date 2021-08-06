'use strict'

var express = require("express");

var userController = require("../controllers/persona.controller");

var api = express.Router();

api.get("/getusers",userController.getUsers);

module.exports = api;