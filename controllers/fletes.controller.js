'use strict'
var mysql = require("mysql")
var configConexion =  require("../config/conexion");
var conexion = configConexion.conexion;

function listarFletes(req,res){
    let query = 'call Sp_ListarFletes()';
    conexion.query(query, (err, findFletes)=>{
        if(err){
            res.send({message:"Error general", err});
        }else if(findFletes){
 
            res.send({message:"Fletes encontrados", findFletes});
        }else{
            res.send({message:"Aun no has hecho ningun flete, te esperamos pronto"})
        }
    });
}

function actualizarFlete(req, res){
    var fleteId = req.params.id;
    var params = req.body;  

    if(params.fletesFecha && params.fletesFechaEntrega && params.estadoFlete && params.fletesGanancia && params.fletesMensajeroCobro && params.fletesGasto && params.fleteDescripcion && params.fletesUsuarioId && params.fletesConductor){

        var total = Number.parseFloat(params.fletesGanancia) - (Number.parseFloat(params.fletesMensajeroCobro) + Number.parseFloat(params.fletesGasto))

        let query = 'call Sp_ActualizarFlete("'+fleteId+'","'+params.fletesFecha+'","'+params.fletesFechaEntrega+'","'+params.estadoFlete+'","'+params.fletesGanancia+'","'+params.fletesMensajeroCobro+'","'+params.fletesGasto+'","'+total+'","'+params.fleteDescripcion+'","'+params.fletesUsuarioId+'","'+params.fletesConductor+'")';            

        conexion.query(query, (err, fletesUpdate)=>{
            if(err){
                res.send({message:"error general", err});
            }else if(fletesUpdate){
                res.send({message:"Flete actualizado de manera exitosa", fletesUpdate});
            }else{
                res.send({message:"No se pudo actualizar la informacion"});
            }
        })
    }else{
        res.send({message:"Ingresa los campos obligatorios"});
    }
}

function agregarFlete(req, res){
    var params = req.body;  

    if(params.fletesFecha && params.fletesFechaEntrega && params.estadoFlete && params.fletesGanancia && params.fletesMensajeroCobro && params.fletesGasto && params.fleteDescripcion && params.fletesUsuarioId && params.fletesConductor){

        var total = Number.parseFloat(params.fletesGanancia) - (Number.parseFloat(params.fletesMensajeroCobro) + Number.parseFloat(params.fletesGasto))

        let query = 'call Sp_AgregarFlete("'+params.fletesFecha+'","'+params.fletesFechaEntrega+'","'+params.estadoFlete+'","'+params.fletesGanancia+'","'+params.fletesMensajeroCobro+'","'+params.fletesGasto+'","'+total+'","'+params.fleteDescripcion+'","'+params.fletesUsuarioId+'","'+params.fletesConductor+'")';

        conexion.query(query, (err, fleteSaved)=>{
            if(err){
                res.send({message:"error general", err});
            }else if(fleteSaved){
                res.send({message:"Registro guardado exitosamente", fleteSaved});
            }else{
                res.send({message:"No se pudo actualizar la informacion"});
            }
        })
    }else{
        res.send({message:"Ingresa los campos obligatorios"});  
    }
}

function eliminarFlete(req, res){
    var fleteId = req.params.id;

        let query = 'call Sp_EliminarFlete("'+fleteId+'")';

        conexion.query(query, (err, fleteRemove)=>{
            if(err){
                res.send({message:"error general", err});
            }else if(fleteRemove){
                res.send({message:"Flete eliminado exitosamente", fleteRemove});
            }else{
                res.send({message:"No se pudo eliminar"});
            }
        })
}

module.exports ={
    eliminarFlete,
    agregarFlete,
    actualizarFlete,
    listarFletes
}