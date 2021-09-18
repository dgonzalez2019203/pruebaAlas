'use strict'
var mysql = require("mysql")
var configConexion =  require("../config/conexion");
var conexion = configConexion.conexion;

function listarFletes(req,res){
    let query = 'call Sp_ListarPedido()';
    conexion.query(query, (err, findFletes)=>{
        if(err){
            res.send({message:"Error general", err});
        }else if(findPedidos){
 
            res.send({message:"Fletes encontrados", findFletes});
        }else{
            res.send({message:"Aun no has hecho ningun flete, te esperamos pronto"})
        }
    });
}

function actualizarFlete(req, res){
    var fleteId = req.params.id;
    var params = req.body;  

    if(params.mensajerId && params.pedidoCosto && params.estado && params.pedidoMonto && params.formaPagoId && params.pedidoDesc){
        let query = 'call Sp_ConfirmarPedido("'+fleteId+'","'+params.mensajerId+'","'+params.pedidoCosto+'","'+params.estado+'","'+params.pedidoMonto+'","'+params.formaPagoId+'","'+params.pedidoDesc+'")';            

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

    if(params.mensajerId && params.pedidoCosto && params.estado && params.pedidoMonto && params.formaPagoId && params.pedidoDesc){
        let query = 'call Sp_AgregarFlete("'+params.mensajerId+'","'+params.pedidoCosto+'","'+params.estado+'","'+params.pedidoMonto+'","'+params.formaPagoId+'","'+params.pedidoDesc+'")';

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