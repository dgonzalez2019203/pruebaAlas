var app = require("./app");
var mysql = require('mysql');
var port  = 3800;
var conexion = "";
mysql.Promise = global.Promise;


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
    console.log('Servidor corriendo en http://localhost:3800');
});



io.on("connection", function (socket) {
    console.log('Un cliente se ha conectado');
    socket.emit('messages', "hola mundo");


    socket.on('default',function(res){
       io.emit("defaultRes", res);
       console.log("hola")
    });

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});


module.exports = conexion;