'use strict'
var mysql = require("mysql")
var configConexion =  require("../config/conexion");
var conexion = configConexion.conexion;

function listarZonasRojas(req,res){
    let query = 'call SpListarZonasRojas()';
    conexion.query(query, (err, findZonas)=>{
        if(err){
            res.send({message:"Error general", err});
        }else if(findZonas){ 
            res.send({message:"Zonas encontradas", findZonas});
        }else{
            res.send({message:"Aun no has hecho ninguna zona, te esperamos pronto"})
        }
    });
}

function actualizarZonaRoja(req, res){
    var zonaId = req.params.id;
    var params = req.body;  
    if(params.zonaRojaMunicipio && params.zonaRojaZona){        
        let query = 'call SpActualizarZonaRoja("'+params.zonaRojaMunicipio+'","'+params.zonaRojaZona+'","'+zonaId+'")';            

        conexion.query(query, (err, zonaUpdate)=>{
            if(err){
                res.send({message:"error general", err});
            }else if(zonaUpdate){
                res.send({message:"Zona Roja actualizada de manera exitosa", zonaUpdate});
            }else{
                res.send({message:"No se pudo actualizar la informacion"});
            }
        })
    }else{
        res.send({message:"Ingresa los campos obligatorios"});
    }
}

function agregarZonaRoja(req, res){
    var params = req.body;  

    if(params.zonaRojaMunicipio && params.zonaRojaZona){        
        let query = 'call SpAgregarZonaRoja("'+params.zonaRojaMunicipio+'","'+params.zonaRojaZona+'")';            

        conexion.query(query, (err, zonaSaved)=>{
            if(err){
                res.send({message:"error general", err});
            }else if(zonaSaved){
                res.send({message:"Zona Roja agregada de manera exitosa", zonaSaved});
            }else{
                res.send({message:"No se pudo actualizar la informacion"});
            }
        })
    }else{
        res.send({message:"Ingresa los campos obligatorios"});
    }
}


function eliminarZonaRoja(req, res){
    var zonaId = req.params.id;

        let query = 'call SpEliminarZonaRoja("'+zonaId+'")';

        conexion.query(query, (err, zonaRemove)=>{
            if(err){
                res.send({message:"error general", err});
            }else if(zonaRemove){
                res.send({message:"Zona Roja eliminado exitosamente", zonaRemove});
            }else{
                res.send({message:"No se pudo eliminar"});
            }
        })
}

module.exports ={
    eliminarZonaRoja,
    agregarZonaRoja,
    actualizarZonaRoja,
    listarZonasRojas
}