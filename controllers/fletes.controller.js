'use strict'
var mysql = require("mysql")
var configConexion =  require("../config/conexion");
var conexion = configConexion.conexion;
var moment = require('moment-timezone')
var fs = require("fs");
var path = require("path");

//funciones admin
function listarFletes(req,res){
    let query = 'call Sp_ListarFletes()';
    conexion.query(query, (err, findFletes)=>{
        if(err){
            res.send({message:"Error general", err});
        }else if(findFletes){
 
            res.send({message:"Fletes encontrados", findFletes});
        }else{
            res.send({message:"Aun no se han registrado fletes"})
        }
    });
}

function listarFleteByEstado(req,res){
    var id = req.params.id;
    let query = 'call ListarFleteByEstado("'+id+'")';
    conexion.query(query, (err, findFletes)=>{
        if(err){
            res.send({message:"Error general", err});
        }else if(findFletes){
 
            res.send({message:"Fletes encontrados", findFletes});
        }else{
            res.send({message:"Aun no se han registrado fletes"})
        }
    });
}

function actualizarFlete(req, res){
    var fleteId = req.params.id;
    var params = req.body;  
    var fecha = moment().tz('America/Guatemala').format("YYYY-MM-DD");
    if(params.fletesFechaEntrega && params.estadoFlete && params.fletesGanancia && params.fletesMensajeroCobro && params.fletesGasto && params.fleteDescripcion && params.fletesUsuarioId && params.fletesConductor){

        var total = Number.parseFloat(params.fletesGanancia) + (Number.parseFloat(params.fletesMensajeroCobro) + Number.parseFloat(params.fletesGasto))
        let query = 'call Sp_ActualizarFlete("'+fleteId+'","'+fecha+'","'+params.fletesFechaEntrega+'","'+params.estadoFlete+'","'+params.fletesGanancia+'","'+params.fletesMensajeroCobro+'","'+params.fletesGasto+'","'+total+'","'+params.fleteDescripcion+'","'+params.fletesUsuarioId+'","'+params.fletesConductor+'")';            

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

//funciones cliente
function listarFletesByCliente(req,res){
    var clienteId = req.params.id;
    let query = 'call Sp_ListarFleteByCliente("'+clienteId+'")';

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

function agregarFlete(req, res){
    var params = req.body;  
    var usuarioId = req.params.id;
    var conductorId = 1;
    var estadoFlete = 1;
    var fecha = moment().tz('America/Guatemala').format("YYYY-MM-DD");

    if(params.fletesFechaEntrega && params.fleteDescripcion){        
        let query = 'call Sp_AgregarFlete("'+fecha+'","'+params.fletesFechaEntrega+'","'+usuarioId+'","'+estadoFlete+'","'+params.fleteDescripcion+'","'+conductorId+'")';

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

function actualizarFleteByCliente(req, res){
    var params = req.body;  
    var fleteId = req.params.id;

    if(params.fletesFechaEntrega && params.fleteDescripcion){        
        let query = 'call Sp_ActualizarFleteByCliente("'+params.fletesFechaEntrega+'","'+params.fleteDescripcion+'","'+fleteId+'")';

        conexion.query(query, (err, fleteSaved)=>{
            if(err){
                res.send({message:"error general", err});
            }else if(fleteSaved){
                res.send({message:"Registro actualizado exitosamente", fleteSaved});
            }else{
                res.send({message:"No se pudo actualizar la informacion"});
            }
        })
    }else{
        res.send({message:"Ingresa los campos obligatorios"});  
    }
}

// Funciones conductor
function listarFletesByConductor(req,res){
    var conductorId = req.params.id;
    let query = 'call Sp_ListarFleteByConductor("'+conductorId+'")';

    conexion.query(query, (err, findFletes)=>{
        if(err){
            res.send({message:"Error general", err});
        }else if(findFletes){
 
            res.send({message:"Fletes encontrados", findFletes});
        }else{
            res.send({message:"Aun no se te ha asignado ningun flete"})
        }
    });
}

function listarFletesByConductorEstado(req,res){
    var conductorId = req.params.id;
    var estado = req.params.estado;
    let query = 'call sp_ListarFleteConductorEstado("'+conductorId+'","'+estado+'")';

    conexion.query(query, (err, findFletes)=>{
        if(err){
            res.send({message:"Error general", err});
        }else if(findFletes){
 
            res.send({message:"Fletes encontrados", findFletes});
        }else{
            res.send({message:"Aun no se te ha asignado ningun flete"})
        }
    });
}


function actualizarEstadoFlete(req, res){
    var fleteId = req.params.id;
    var params = req.body;  
    params.estadoFlete = 2;
    params.nombreImagen="";
    if(params.estadoFlete && params.comentarioMensajero){
        let query = 'call Sp_ActualizarEstadoFlete("'+params.estadoFlete+'","'+fleteId+'","'+params.comentarioMensajero+'","'+params.nombreImagen+'")';

        conexion.query(query, (err, fletesUpdate)=>{
            if(err){
                res.send({message:"Error general", err});
            }else if(fletesUpdate){
                res.send({message:"Fletes marcado como entregado", fletesUpdate});
            }else{
                res.send({message:"No se pudo marcar como entregado, intenta nuevamente"})
            }
        });


    }else{
        res.send({message:"Ingrese campos obligatorios"})
    }
    
}


function getPilotos(req,res){
    
    let query = 'call listpiloto()';

    conexion.query(query, (err, getPiloto)=>{
        if(err){
            res.send({message:"Error general", err});
        }else if(getPiloto){
            res.send({message:"Pilotos encontrados", getPiloto});
        }else{
            res.send({message:"No hay pilotos registrados"})
        }
    });
}



function uploadImgFlete(req, res){
    var fleteId = req.params.id;
    var fileName = "Sin imagen";    

    if(req.files){
        //captura la ruta de la imagen
        var filePath = req.files.image.path;
        //separa en indices cada carpeta
        //si se trabaja en linux ('\');
        var fileSplit = filePath.split('\\');
        //captura el nombre de la imagen
        var fileName = fileSplit[2];

        var ext = fileName.split('\.');
        var fileExt = ext[1];

        if( fileExt == 'png' ||
            fileExt == 'jpg' ||
            fileExt == 'jpeg' ||
            fileExt == 'gif'){
                
                let query = 'call spActualizarIMGFlete("'+fileName+'","'+fleteId+'")';
                console.log(query);
                conexion.query(query, (err, updateIMG)=>{
                    if(err){
                        res.send({message:"error general", err, query});
                    }else if(updateIMG){
                        res.send({message:"Imagen actualizada", updateIMG});
                    }else{
                        res.send({message:"no se pudo actualizar la imagen"})
                    }
                });
            }else{
                fs.unlink(filePath, (err)=>{
                    if(err){
                        return res.status(500).send({message: 'Error al eliminar y la extensión no es válida'});
                    }else{
                        return res.status(403).send({message: 'Extensión no válida, y archivo eliminado'});
                    }
                })
            }
    }else{
        return res.status(404).send({message: 'No has subido una imagen'});
    }
}


function getImgFlete(req, res){
    var fileName = req.params.fileName;
    var pathFile = './uploads/fletes/' + fileName;
    fs.exists(pathFile, (exists)=>{
        if(exists){                    
            return res.sendFile(path.resolve(pathFile))
        }else{
           return res.status(404).send({message: 'Imagen inexistente'});
        }
    })
}

module.exports ={
    eliminarFlete,
    agregarFlete,
    actualizarFlete,
    actualizarFleteByCliente,
    listarFletes,
    listarFletesByCliente,
    listarFletesByConductor,
    actualizarEstadoFlete  ,
    getPilotos,
    listarFleteByEstado,
    uploadImgFlete,
    getImgFlete,
    listarFletesByConductorEstado
}