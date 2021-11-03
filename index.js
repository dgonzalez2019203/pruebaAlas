var app = require("./app");
var mysql = require('mysql');
var port  = 49152;
var conexion = "";
mysql.Promise = global.Promise;

var fs = require('fs');
var https = require('https');
var privateKey  = fs.readFileSync('./eb798_0298d_98bb73e32a46fbec218e5be7bd3a6c5b.key', 'utf8');
var certificate = fs.readFileSync('alasgt_com_eb798_0298d_1665137304_96ff2d16c45e2345a48d088210dd34b6.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

var server = require('http').Server(app); 
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
  });





conexion = mysql.createConnection({
    host: '173.255.247.91',
    database: 'alasgt_DBAlasGt',
    user: 'alasgt_alasgt',
    password: 'Alasgt2020'

});



server.listen(port, function() { 
    console.log('Servidor corriendo en http://localhost:49152');
});



io.on("connection", function (socket) {
    console.log('Un cliente se ha conectado');
    socket.emit('messages', "hola mundo");
 

    socket.on('default',function(res){
       io.emit("defaultRes", res);
    });

    socket.on('SolicitarPedido',function(res){
        io.emit("pedidoSolicitado", res);
        console.log("se ha solicitado un pedido");
        console.log(res);
     });

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});
