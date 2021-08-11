
'use strict'

var mysql = require("mysql")
var conexion = mysql.createConnection({
    host: '173.255.247.91',
    database: 'alasgt_DBAlasGt',
    user: 'alasgt_alasgt',
    password: 'Alasgt2020'

});

module.exports ={
    conexion
}