var app = require("./app");
var mysql = require('mysql');
var port  = 49152;
var conexion = "";
mysql.Promise = global.Promise;

conexion = mysql.createConnection({
    host: '173.255.247.91',
    database: 'alasgt_DBAlasGt',
    user: 'alasgt_alasgt',
    password: 'Alasgt2020'
});

conexion.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log('conexión EXITOSA');
        app.listen(port,()=>{
            console.log("servidor de express corriendo",port);
        });
    }
})



