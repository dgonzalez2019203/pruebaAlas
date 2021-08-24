'use strict'

var express = require("express");

var bodyParser = require("body-parser");

var app= express();

var userRoutes = require("./routes/persona.route");
var pedidosRoutes = require("./routes/pedidos.route");
var mensajeroRoutes = require("./routes/mensajero.route");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

app.use("/alasgt",userRoutes);
app.use("/alasgt",pedidosRoutes);
app.use("/alasgt",mensajeroRoutes);

module.exports = app;