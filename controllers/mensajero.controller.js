'use strict'
var mysql = require("mysql")
var configConexion =  require("../config/conexion");
var conexion = configConexion.conexion;

function getMensajeroId(req,res){
    var mensajeroId = req.params.id;
    let query = 'call Sp_BuscarDatosMensajero("'+mensajeroId+'")';

    conexion.query(query, (err, mensajeroFind)=>{
        if(err){
            res.send({message:"Error general"});
        }else if(mensajeroFind){
            res.send({message:"Datos del mensajero", mensajeroFind});
        }else{
            res.send({message:"No se encontraron datos"})
        }
    });
}

function getEstadoCivil(req,res){
    let query = 'call Sp_listarEstadoCivil()';

    conexion.query(query, (err, estadoFind)=>{
        if(err){
            res.send({message:"Error general"});
        }else if(estadoFind){
            res.send({message:"Estado civil", estadoFind});
        }else{
            res.send({message:"No se encontraron datos"})
        }
    });
}

function saveMensajero(req,res){
    var params = req.body;

    if(params.primerNombreMensajero && params.segundoNombreMensajero && params.primerApellidoMensajero && params.segundoApellidoMensajero && params.usuarioId && params.dpiMensajero
        && params.placasMensajero && params.telefonoMensajero && params.direccionMensajero && params.estadoCivil){
            let query = "SELECT * FROM Mensajero WHERE dpiMensajero = '"+params.dpiMensajero+"' or telefonoMensajero='"+params.telefonoMensajero+"'";
           
            conexion.query(query, (err, mensajeroFind)=>{
                if(err){
                    res.send({message:"Error general"});
                }else if(mensajeroFind){
                    res.send({message:"Numero de DPI o Telefono ya están en uso", mensajeroFind});
                }else{
                    let queryAdd = 'call Sp_AgregarDatos("'+params.primerNombreMensajero+'","'+params.segundoNombreMensajero+'","'+params.primerApellidoMensajero+'","'+params.segundoApellidoMensajero+'","'+params.usuarioId+'","'+params.dpiMensajero+'","'+params.placasMensajero+'","'+params.telefonoMensajero+'","'+params.direccionMensajero+'","'+params.estadoCivil+'")';            

                    conexion.query(queryAdd, (err, mensajeroSaved)=>{
                        if(err){
                            res.send({message:"error general"});
                        }else if(mensajeroSaved){
                            res.send({message:"Mensajero creado", mensajeroSaved});
                        }else{
                            res.send({message:"No se ha podido crear este mensajero"})
                        }
                    });
                }
            });

        }
}


function updateMensajero(req,res){
    var params = req.body;
    var mensajeroId = req.params.id;

    if(params.primerNombreMensajero && params.segundoNombreMensajero && params.primerApellidoMensajero && params.segundoApellidoMensajero && params.usuarioId && params.dpiMensajero
        && params.placasMensajero && params.telefonoMensajero && params.direccionMensajero && params.estadoCivil){
            let query = "SELECT * FROM Mensajero WHERE dpiMensajero = '"+params.dpiMensajero+"' or telefonoMensajero='"+params.telefonoMensajero+"' or placasMensajero='"+params.placasMensajero+"'";

            conexion.query(query, (err, mensajeroFind)=>{
                if(err){
                    res.send({message:"Error general"});
                }else if(mensajeroFind){
                    var pass1 = Number.parseInt(mensajeroId);
                    var pass2 = Number.parseInt(mensajeroFind[0].usuarioId);

                    if(pass1 == pass2){
                        let queryAdd = 'call Sp_ActualizarDatos("'+params.primerNombreMensajero+'","'+params.segundoNombreMensajero+'","'+params.primerApellidoMensajero+'","'+params.segundoApellidoMensajero+'","'+params.usuarioId+'","'+params.dpiMensajero+'","'+params.placasMensajero+'","'+params.telefonoMensajero+'","'+params.direccionMensajero+'","'+params.estadoCivil+'")';            

                        conexion.query(queryAdd, (err, mensajeroSaved)=>{
                            if(err){
                                res.send({message:"error general"});
                            }else if(mensajeroSaved){
                                res.send({message:"Mensajero actualizado con exito", mensajeroSaved});
                            }else{
                                res.send({message:"No se ha podido actualizar este mensajero"})
                            }
                        });
                    }else{
                        res.send({message:"Numero de DPI o Telefono ya están en uso", mensajeroFind});

                    }
                }else{
                    let queryAdd = 'call Sp_ActualizarDatos("'+params.primerNombreMensajero+'","'+params.segundoNombreMensajero+'","'+params.primerApellidoMensajero+'","'+params.segundoApellidoMensajero+'","'+params.usuarioId+'","'+params.dpiMensajero+'","'+params.placasMensajero+'","'+params.telefonoMensajero+'","'+params.direccionMensajero+'","'+params.estadoCivil+'")';            

                    conexion.query(queryAdd, (err, mensajeroSaved)=>{
                        if(err){
                            res.send({message:"error general"});
                        }else if(mensajeroSaved){
                            res.send({message:"Mensajero actualizado con exito", mensajeroSaved});
                        }else{
                            res.send({message:"No se ha podido actualizar este mensajero"})
                        }
                    });
                }
            });
        }
}



module.exports ={
    getMensajeroId,
    getEstadoCivil,
    saveMensajero,
    updateMensajero
}