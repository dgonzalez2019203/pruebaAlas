'use strict'
var mysql = require("mysql")
var configConexion =  require("../config/conexion");
const { param } = require("../routes/pedidos.route");
var conexion = configConexion.conexion;
var moment = require('moment-timezone')

function listPedidos(req,res){
    var fecha = "2021-01-01"
    let query = 'call Sp_ListarPedido("'+fecha+'")';
    conexion.query(query, (err, findPedidos)=>{
        if(err){
            console.log("hola mundo err")
            res.send({message:"Error general"});
        }else if(findPedidos){
            res.send({message:"Pedidos encontrados", findPedidos});
        }else{
            res.send({message:"Aun no has hecho ningun pedido, te esperamos pronto"})
        }
    });
}

function listPedidosC(req,res){
    var userId = req.params.id;

    let query = 'call Sp_ListarPedidosCliente("'+userId+'")';
    conexion.query(query, (err, findPedidos)=>{
        if(err){
            res.send({message:"Error general"});
        }else if(findPedidos){
            res.send({message:"Pedidos encontrados", findPedidos});
        }else{
            res.send({message:"Aun no has hecho ningun pedido, te esperamos pronto"})
        }
    });
}


function listPedidosEstadoCliente(req,res){
        var estado = req.params.id;
        var cliente = req.params.idUsuario;

        let query = 'call Sp_ListarPedidoPorEstadoCliente("'+estado+'","'+cliente+'")';
        conexion.query(query, (err, findPedidos)=>{
            if(err){
                console.log(err)
                res.send({message:"Error general"});
            }else if(findPedidos){
                res.send({message:"Pedidos encontrados", findPedidos});
            }else{
                
                res.send({message:"Aun no has hecho ningun pedido, te esperamos pronto"})
            }
        });    
}

function listPedidosA(req,res){
    let query = 'call Sp_ListarPedidosCliente("'+userId+'")';
    conexion.query(query, (err, findPedidos)=>{
        if(err){
            res.send({message:"Error general"});
        }else if(findPedidos){
            res.send({message:"Pedidos encontrados", findPedidos});
        }else{
            res.send({message:"Aun no has hecho ningun pedido, te esperamos pronto"})
        }
    });
}

function listPedidosCE(req,res){
    var userId = req.params.id;

    let query = 'call Sp_ListarPedidosClienteEspecial("'+userId+'")';
    conexion.query(query, (err, findPedidos)=>{
        if(err){
            res.send({message:"Error general"});
        }else if(findPedidos){
            res.send({message:"Pedidos encontrados", findPedidos});
        }else{
            res.send({message:"Aun no has hecho ningun pedido, te esperamos pronto"})
        }
    });
}

function listPedidosM(req,res){
    var mensajeroId = req.params.id;

    let query = 'call Sp_ListarPedidoMensajero("'+mensajeroId+'")';
    conexion.query(query, (err, findPedidos)=>{
        if(err){
            res.send({message:"Error general"});
        }else if(findPedidos){
            res.send({message:"Pedidos encontrados", findPedidos});
        }else{
            res.send({message:"Aun no has hecho ningun pedido, te esperamos pronto"})
        }
    });
}

function listPedidosME(req,res){
    var mensajeroId = req.params.id;

        let query = 'call Sp_ListarPedidoMensajeroEspecial("'+mensajeroId+'")';
        conexion.query(query, (err, findPedidos)=>{
            if(err){
                res.send({message:"Error general"});
            }else if(findPedidos){
                res.send({message:"Pedidos encontrados", findPedidos});
            }else{
                res.send({message:"Aun no has hecho ningun pedido, te esperamos pronto"})
            }
        });    
}


function listPedidosEstado(req,res){
    var estado = req.params.id;

        let query = 'call Sp_ListarPedidoPorEstado("'+estado+'")';
        conexion.query(query, (err, findPedidos)=>{
            if(err){
                res.send({message:"Error general"});
            }else if(findPedidos){
                res.send({message:"Pedidos encontrados", findPedidos});
            }else{
                res.send({message:"Aun no has hecho ningun pedido, te esperamos pronto"})
            }
        });    
}

function listPedidosF(req,res){
    var params = req.body;

    if(params.fechaBusqueda){
        let query = 'call Sp_ListarPedidoPorFecha("'+params.fechaBusqueda+'")';
        conexion.query(query, (err, findPedidos)=>{
            if(err){
                res.send({message:"Error general"});
            }else if(findPedidos){
                res.send({message:"Pedidos encontrados", findPedidos});
            }else{
                res.send({message:"Aun no has hecho ningun pedido, te esperamos pronto"})
            }
        });
    }else{
        res.send({message:"Ingresa los campos obligatorios"});
    }
}


/* Funciones de admin*/
function confirmarPedido(req, res){
    var pedidoId = req.params.id;
    var params = req.body;  
    if(params.mensajerId && params.pedidoCosto && params.estado && params.pedidoMonto>=0 && params.formaPagoId && params.pedidoDesc){
        let query = 'call Sp_ConfirmarPedido("'+pedidoId+'","'+params.mensajerId+'","'+params.pedidoCosto+'","'+params.estado+'","'+params.pedidoMonto+'","'+params.formaPagoId+'","'+params.pedidoDesc+'")';            

        conexion.query(query, (err, pedidoUpdate)=>{
            if(err){
                res.send({message:"error general"});
            }else if(pedidoUpdate){
                res.send({message:"Pedido marcado como confirmado", pedidoUpdate});
            }else{
                res.send({message:"No se pudo actualizar la informacion"});
            }
        })
    }else{
        console.log(params.mensajerId)
        console.log(params.pedidoCosto)
        console.log(params.estado)
        console.log(params.pedidoMonto)
        console.log(params.formaPagoId)
        console.log(params.pedidoDesc)
        res.send({message:"Ingresa los campos obligatorios"});
    }
}


function listPedidoEspecialAdmin(req,res){
    
    let query = 'call Sp_ListarPedidoEspecial()';
    conexion.query(query, (err, findPedidos)=>{
        if(err){
            res.send({message:"Error general"});
        }else if(findPedidos){
            res.send({message:"Pedidos encontrados", findPedidos});
        }else{
            res.send({message:"Aun no has hecho ningun pedido, te esperamos pronto"})
        }
    });
}



function editarPedido(req, res){
    var pedidoId = req.params.id;
    var params = req.body;  

    if(params.mensajerId && params.pedidoCosto && params.estado && params.pedidoMonto && params.formaPagoId && params.pedidoDesc){
        let query = 'call Sp_ConfirmarPedido("'+pedidoId+'","'+params.mensajerId+'","'+params.pedidoCosto+'","'+params.estado+'","'+params.pedidoMonto+'","'+params.formaPagoId+'","'+params.pedidoDesc+'")';            

        conexion.query(query, (err, pedidoUpdate)=>{
            if(err){
                res.send({message:"error general"});
            }else if(pedidoUpdate){
                res.send({message:"se ha editado el pedido de manera exitosa", pedidoUpdate});
            }else{
                res.send({message:"No se pudo actualizar la informacion"});
            }
        })
    }else{
        res.send({message:"Ingresa los campos obligatorios"});
    }
}


function confirmarPedidoEspecial(req, res){
    var pedidoId = req.params.id;
    var params = req.body;

    if(params.mensajero && params.costo && params.estado && params.monto && params.formaP && params.coment){
        let query = 'call Sp_ConfirmarPedido("'+pedidoId+'","'+params.mensajero+'","'+params.costo+'","'+params.estado+'","'+params.monto+'","'+params.formaP+'","'+params.coment+'")';            

        conexion.query(query, (err, pedidoUpdate)=>{
            if(err){
                res.send({message:"error general"});
            }else if(pedidoUpdate){
                res.send({message:"Pedido marcado como confirmado", pedidoUpdate});
            }else{
                res.send({message:"No se pudo actualizar la informacion"});
            }
        })
    }else{
        res.send({message:"Ingresa los campos obligatorios"});
    }
}

function getFormaPago(req,res){
    let query = 'call Sp_ListarFormaPago()';
        
    conexion.query(query, (err, formaPagos)=>{
        if(err){
            res.send({message:"error general"});
        }else if(formaPagos){
            res.send({message:"Forma de pagos encontrados", formaPagos});
        }else{
            res.send({message:"no se ha econtrado forma de pagos"})
        }
    });
}


function getMensajero(req,res){
    let query = 'call Sp_ListarMensajero()';
        
    conexion.query(query, (err, mensajeros)=>{
        if(err){
            res.send({message:"error general"});
        }else if(mensajeros){
            res.send({message:"Mensajeros encontrados", mensajeros});
        }else{
            res.send({message:"no se ha econtrado mensajeros"})
        }
    });
}

function getZonas(req,res){
    var params = req.body;
    // Es un dato INT
    let query = 'call Sp_ListarPorzonas("'+params.nombreLugar+'")';
        
    conexion.query(query, (err, porZonas)=>{
        if(err){
            res.send({message:"error general"});
        }else if(porZonas){
            res.send({message:"Zonas encontradas", porZonas});
        }else{
            res.send({message:"no se ha econtrado forma de pagos"})
        }
    });
}

function getZonasYFecha(req,res){
    var params = req.body;
    // Es un dato INT

    if(params.nombreLugar && params.pedidoFecha){
        let query = 'call Sp_ListarPorfechaYzona("'+params.nombreLugar+'","'+params.pedidoFecha+'")';
        
        conexion.query(query, (err, porZonas)=>{
            if(err){
                res.send({message:"error general"});
            }else if(porZonas){
                res.send({message:"Zonas encontradas", porZonas});
            }else{
                res.send({message:"no se ha econtrado forma de pagos"})
            }
        });
    }else{
        res.send({message:"Ingresa los campos obligatorios"}); 
    }
}


function savePedidoCredito(req,res){
    var pedidoId = req.params.id;
    var creditoId = req.params.idC;

    let query = 'call Sp_AgregarPedidoCredito("'+creditoId+'","'+pedidoId+'")';

    conexion.query(query, (err, pedidoSaved)=>{
        if(err){
            res.send({message:"error general"});
        }else if(pedidoSaved){
            res.send({message:"Credito asignado exitosamente"})
        }else{
            res.send({message:"Pedido no encontrado"})
        }
    })
}

function cancelPedidoAdmin(req,res){
    var params = req.body;
    var pedidoId = req.params.id;

    if(params.pedidoEstadoId && params.pedidoFecha){
        let query = 'call Sp_CancelarPedidoAdmin("'+pedidoId+'","'+params.pedidoEstadoId+'","'+params.pedidoFecha+'")';
        conexion.query(query, (err, cancel)=>{
            if(err){
                res.send({message:"error general"});
            }else if(cancel){
                res.send({message:"Pedido cancelado exitosamente"})
            }else{
                res.send({message:"El pedido no se pudo cancelar"})
            }
        })
    }else{
        res.send({message:"Envia los datos minimos para poder hacer la cancelacion."})
    }
}



/* Funciones de usuario normal*/
function savePedido(req, res){
    var params = req.body;
    if(params.pedidoPuntoInicio && params.pedidoDireccionInicio && params.pedidoPuntoFinal && params.pedidoDireccionFinal && params.pedidoUsuarioId
        && params.pedidoTelefonoReceptor && params.pedidoCosto && params.pedidoMonto && params.nombreReceptor && params.pedidoDesc && params.pedidoFecha){

            let query = 'call Sp_AgregarPedido("'+params.pedidoFecha+'","'+params.pedidoPuntoInicio+'","'+params.pedidoDireccionInicio+'","'+params.pedidoPuntoFinal+'","'+params.pedidoDireccionFinal+'","'+params.pedidoUsuarioId+'","'+params.pedidoTelefonoReceptor+'","'+params.pedidoCosto+'","'+params.pedidoMonto+'","'+params.nombreReceptor+'","'+params.pedidoDesc+'")';            
            conexion.query(query, (err, pedidoSaved)=>{
                if(err){
                    res.send({message:"error general"});
                }else if(pedidoSaved){
                    res.send({message:"Pedido solicitado exitosamente", pedidoSaved});
                }else{
                    res.send({message:"no se ha econtrado forma de pagos"})
                }
            });
    }else{
        return res.send({message:"ingrese los campos obligatorios"})
    }
}

function removePedido(req,res){
    var pedidoId = req.params.id;
    let query = 'call Sp_EliminarPedido("'+ pedidoId +'")';            

    conexion.query(query, (err, pedidoRemoved)=>{
        if(err){
            res.send({message:"error general"});
        }else if(pedidoRemoved){
            res.send({message:"Pedido eliminado exitosamente",pedidoRemoved})
        }else{
            res.send({message:"Pedido no encontrado"})
        }
    })
}


function savePedidoEspecial(req,res){
    var userId = req.params.id;
    var params = req.body;    
    params.pedidoFecha = moment().tz('America/Guatemala').format("YYYY-MM-DD");
    if(params.pedidoDesc && params.pedidoFecha){
        let query = 'call Sp_AgregarPedidoEspecial("'+userId+'","'+params.pedidoDesc+'","'+params.pedidoFecha+'")';
        conexion.query(query, (err, pedidoSaved)=>{
            if(err){
                res.send({message:"error general"});
            }else if(pedidoSaved){
                res.send({message:"Pedido especial creado exitosamente",pedidoSaved})
            }else{
                res.send({message:"Pedido no encontrado"})
            }
        })
    }else{
        res.send({message:"Envia los datos minimos para la creacion de tu pedido"})
    }
}

function buscarCredito(req,res){
    var id = req.params.usuarioId;
    let query = 'call Sp_buscarCredito1('+id+')';
        
    conexion.query(query, (err, pedidoCredito)=>{
        if(err){
            res.send({message:"error general"});
        }else if(pedidoCredito){
            res.send({message:"creditos encontrados:", pedidoCredito});
        }else{
            res.send({message:"no hay registros de creditos"})
        }
    });
}

function setCredito(req,res){
    var id = req.params.creditoId;
    var pedido = req.params.pedidoId;
    let query = 'call Sp_AgregarPedidoCredito('+id+','+pedido+')';
        
    conexion.query(query, (err, creditoUpdated)=>{
        if(err){
            console.log(err)
            res.send({message:"error general"});
        }else if(creditoUpdated){
            res.send({message:"se ha actualizado el credito con exito", creditoUpdated});
        }else{
            res.send({message:"no se ha podido actualizar el credito"})
        }
    });
}




function addCredito(req,res){
    var id = req.params.usuarioId;
    let query = 'call Sp_AgregarCredito('+id+')';
        
    conexion.query(query, (err, creditoAdd)=>{
        if(err){
            res.send({message:"error general"});
        }else if(creditoAdd){
            res.send({message:"se ha actualizado el credito con exito", creditoAdd});
        }else{
            res.send({message:"no se ha podido actualizar el credito"})
        }
    });
}


function addPedidoCredito(req,res){
    var id = req.params.creditoId;
    var pedido = req.params.pedidoId;
    let query = 'call Sp_AgregarPedidoCredito('+id+','+pedido+')';
        console.log(query)
    conexion.query(query, (err, creditoAdd)=>{
        if(err){
            console.log(err);
            res.send({message:"error general"});
        }else if(creditoAdd){
            res.send({message:"se ha actualizado el credito con exito", creditoAdd});
        }else{
            res.send({message:"no se ha podido actualizar el credito"})
        }
    });
}

function listCreditos(req,res){
    let query = 'call Sp_ListarCredito()';

    conexion.query(query, (err, creditosFind)=>{
        if(err){
            console.log(err);
            res.send({message:"error general"});
        }else if(creditosFind){
            res.send({message:"Creditos registrados:", creditosFind});
        }else{
            res.send({message:"no se han encontrado creditos"})
        }
    });
}

function confirmarCredito(req,res){
    var id = req.params.id;
    let query = 'call Sp_ConfirmarPedidoCredito('+id+')';

    conexion.query(query, (err, creditoConfirm)=>{
        if(err){
            console.log(err);
            res.send({message:"error general"});
        }else if(creditoConfirm){
            res.send({message:"Creditos registrados:", creditoConfirm});
        }else{
            res.send({message:"no se han encontrado creditos"})
        }
    });
}

function listarCreditosDesc(req,res){
    var id = req.params.id;
    let query = 'call Sp_ListarPedidoCredito('+id+')';

    conexion.query(query, (err, creditosFind)=>{
        if(err){
            console.log(err);
            res.send({message:"error general"});
        }else if(creditosFind){
            res.send({message:"Creditos registrados:", creditosFind});
        }else{
            res.send({message:"no se han encontrado creditos"})
        }
    });
}



function cancelPedido(req,res){
    var pedidoId = req.params.id;
    var params = req.body;

    if(params.pedidoEstadoId && params.comentarioMensajero && params.pedidoFecha && params.pedidoCosto && params.pedidoMonto){
        let query = 'call Sp_CancelarPedido("'+pedidoId+'","'+params.pedidoEstadoId+'","'+params.comentarioMensajero+'","'+params.pedidoFecha+'","'+params.pedidoCosto+'","'+params.pedidoMonto+'")';
        conexion.query(query, (err, cancel)=>{
            if(err){
                res.send({message:"error general"});
            }else if(cancel){
                res.send({message:"Pedido cancelado exitosamente"})
            }else{
                res.send({message:"Pedido no encontrado"})
            }
        })
    }else{
        res.send({message:"Envia los datos minimos para la cancelacion de tu pedido"})
    }
}

/* Funciones de mensajero*/
function updatePedidoM(req,res){
    var pedidoId = req.params.id;
    var params = req.body;
    
    if(params.pedidoDireccionFinal && params.pedidoMonto){
        let query = 'call SpEditarPedidoMensajero("'+pedidoId+'","'+params.pedidoMonto+'","'+params.pedidoDireccionFinal+'")';
        conexion.query(query, (err, updatePedido)=>{
            if(err){
                res.send({message:"error general"});
            }else if(updatePedido){
                res.send({message:"Pedido especial creado exitosamente"})
            }else{
                res.send({message:"Pedido no encontrado"})
            }
        })
    }else{
        res.send({message:"Tienes que enviar todos los datos para poder actualizar el pedido"})        
    }

}

function updatePedidoME(req,res){
    var pedidoId = req.params.id;
    var params = req.body;
    
    if(params.pedidoDireccionFinal && params.pedidoMonto){
        let query = 'call SpEditarPedidoMensajeroEspecial("'+pedidoId+'","'+params.pedidoMonto+'","'+params.pedidoMontoCosto+'")';
        conexion.query(query, (err, updatePedido)=>{
            if(err){
                res.send({message:"error general"});
            }else if(updatePedido){
                res.send({message:"Pedido especial creado exitosamente"})
            }else{
                res.send({message:"Pedido no encontrado"})
            }
        })
    }else{
        res.send({message:"Tienes que enviar todos los datos para poder actualizar el pedido"})        
    }

}


function entregarPedido(req,res){
    var params = req.body;
    params.estado = 3;
    params.ruta = "default";
    params.fecha = moment().tz('America/Guatemala').format("YYYY-MM-DD");
    if(params.pedidoId && params.estado &&  params.ruta && params.comentarioMensajero && params.fecha  && params.pedidoCosto &&  params.formaPagoId && params.pedidoMonto){
        
        let query = 'call Sp_EntregarPedido("'+params.pedidoId+'","'+params.estado+'","'+params.ruta+'","'+params.comentarioMensajero+'","'+params.fecha+'","'+params.pedidoCosto+'","'+params.formaPagoId+'","'+params.pedidoMonto+'")';
        console.log(query);
        conexion.query(query, (err, entregarPedido)=>{
            if(err){
                res.send({message:"error general"});
            }else if(entregarPedido){
                res.send({message:"el pedido se ha entregado exitosamente", entregarPedido})
            }else{
                res.send({message:"Pedido no encontrado"})
            }
        })
    }else{
        res.send({message:"Tienes que enviar todos los datos para poder actualizar el pedido"})        
    }

}

// ZONAS DIRECCIONES



function getPuntoInicio(req,res){
    let query = 'call Sp_ListarPuntoInicio()';
        
    conexion.query(query, (err, puntoInicio)=>{
        if(err){
            res.send({message:"error general"});
        }else if(puntoInicio){
            res.send({message:"registros de punto de inicio", puntoInicio});
        }else{
            res.send({message:"no hay registros"})
        }
    });
}



function getPuntoFinal(req,res){

    var idInicio = req.params.id;

    let query = 'call Sp_ListarPuntoFinal('+idInicio+')';
        
    conexion.query(query, (err, puntoFinal)=>{
        if(err){
            res.send({message:"error general"});
        }else if(puntoFinal){
            res.send({message:"registros de punto de final", puntoFinal});
        }else{
            res.send({message:"no hay registros"})
        }
    });
}


function getDireccionesRecolecta(req,res){

    var cliente = req.params.id;
    let query = 'call SpClientesDireccionesR('+cliente+')';

    conexion.query(query, (err, recolecta)=>{
        if(err){
            res.send({message:"error general"});
        }else if(recolecta){
            res.send({message:"registros de punto de final", recolecta});
        }else{
            res.send({message:"no hay registros"})
        }
    });
}


function getDireccionesFinal(req,res){

    var cliente = req.params.id;

    let query = 'call SpClientesDireccionesF('+cliente+')';
        
    conexion.query(query, (err, DireccionFinal)=>{
        if(err){
            res.send({message:"error general"});
        }else if(DireccionFinal){
            res.send({message:"registros de punto de final", DireccionFinal});
        }else{
            res.send({message:"no hay registros"})
        }
    });
}

function getCosto(req,res){
    var puntoInicio = req.params.puntoInicio;
    var puntoFinal = req.params.puntoFinal;

    let query = 'call SP_BuscarCostoPedido('+puntoInicio+','+puntoFinal+')';
        
    conexion.query(query, (err, pedidoCosto)=>{
        if(err){
            res.send({message:"error general"});
        }else if(pedidoCosto){
            res.send({message:"costo encontrado", pedidoCosto});
        }else{
            res.send({message:"no hay registros de costos"})
        }
    });
}

module.exports ={
    listPedidosC,
    listPedidosCE,
    listPedidos,
    listPedidosM,
    listPedidosME,
    listPedidosF,
    confirmarPedido,
    confirmarPedidoEspecial,
    getFormaPago,
    getZonas,
    getZonasYFecha,
    savePedido,
    removePedido,
    savePedidoCredito,
    savePedidoEspecial,
    listPedidosEstado,
    editarPedido,
    getMensajero,
    editarPedido,
    listPedidosEstado,
    buscarCredito,
    setCredito,
    addCredito,
    addPedidoCredito,
    cancelPedidoAdmin,
    updatePedidoM,
    updatePedidoME,
    cancelPedido,
    listCreditos,
    listarCreditosDesc,
    confirmarCredito,
    listPedidosEstadoCliente,
    getPuntoInicio,
    getPuntoFinal,
    getDireccionesRecolecta,
    getDireccionesFinal,
    getCosto,
    entregarPedido,
    listPedidoEspecialAdmin
}