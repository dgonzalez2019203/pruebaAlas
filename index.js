var app = require("./app");
var mysql = require('mysql');
var port  = 3800;
var conexion = "";
mysql.Promise = global.Promise;


conexion = mysql.createConnection({
    host: 'localhost',
    database: 'pruebaAlasGT',
    user: 'root',
    password: 'Fernando2003'

});

conexion.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log('CONEXINO EXITOSA');
        app.listen(port,()=>{
            console.log("servidor de express corriendo",port);
        });
    }
})

/*
conexion.query('Select * from persona', (err, findPersona)=>{
    if(err){
        throw err;
    }else if(findPersona){
        findPersona.forEach(element => {
            console.log(element);
        });
    }
})*/

module.exports = conexion;