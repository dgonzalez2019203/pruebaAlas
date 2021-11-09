'use strict'

var express = require("express");

var resetController = require("../controllers/resetPassword");
var mdAuth = require("../middlewares/authenticated");
var api = express.Router();


api.post("/reset/:pass",resetController.resetPassword);
api.get("/searchuser/:username",resetController.searchUser);
api.put("/updatePass/:passA",resetController.updatePass);

module.exports = api;