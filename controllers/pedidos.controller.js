'use strict'
var mysql = require("mysql")
var configConexion =  require("../config/conexion");
var conexion = configConexion.conexion;


function listPedidos(req,res){
    var fecha = "2021-01-01"
    let query = 'call Sp_ListarPedido("'+fecha+'")';
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

function confirmarPedido(req, res){
    var pedidoId = req.params.id;
    var params = req.body;  

    if(params.mensajerId && params.pedidoCosto && params.estado && params.pedidoMonto && params.formaPagoId && params.pedidoDesc){
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

function savePedido(req, res){
    var params = req.body;

    if(params.pedidoPuntoInicio && params.pedidoDireccionInicio && params.pedidoPuntoFinal && params.pedidoDireccionFinal && params.pedidoUsuarioId
        && params.pedidoTelefonoReceptor && params.pedidoCosto && params.pedidoMonto && params.nombreReceptor && params.pedidoDesc && params.pedidoFecha){

            let query = 'call Sp_ConfirmarPedido("'+params.pedidoPuntoInicio+'","'+params.pedidoDireccionInicio+'","'+params.pedidoPuntoFinal+'","'+params.pedidoDireccionFinal+'","'+params.pedidoUsuarioId+'","'+params.pedidoTelefonoReceptor+'","'+params.pedidoCosto+'","'+params.pedidoMonto+'","'+params.nombreReceptor+'","'+params.params.pedidoDesc+'","'+params.params.pedidoFecha+'")';            
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

function deletePedido(req,res){
    var id = req.params.id;
    let query = 'call Sp_EliminarPedido('+id+')';
        
    conexion.query(query, (err, pedidoDeleted)=>{
        if(err){
            res.send({message:"error general"});
        }else if(pedidoDeleted){
            res.send({message:"Pedido eliminado exitosamente", pedidoDeleted});
        }else{
            res.send({message:"no se ha podido eliminar este pedido"})
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
    getMensajero,
    deletePedido
}