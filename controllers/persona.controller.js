'use strict'

var conexion = require("../index");

function getUsers(req,res){
    conexion.query('Select * from persona', (err, findPersona)=>{
        if(err){
            throw err;
        }else if(findPersona){
            res.send({message: 'Personas', findPersona});
        }
    });
}

function prueba(req,res){    
}

module.exports ={
    getUsers
}