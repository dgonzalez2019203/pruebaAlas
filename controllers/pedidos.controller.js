'use strict'
var mysql = require("mysql")
var configConexion =  require("../config/conexion");
var conexion = configConexion.conexion;


function listPedidos(req,res){
    var fecha = "2021-01-01"

    let query = 'call Sp_ListarPedido("'+fecha+'")';
    console.log(query);

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
    console.log(query);

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
    console.log(query);

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
    console.log(query);

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
        console.log(query);
    
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
        console.log(query);
    
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

module.exports ={
    listPedidosC,
    listPedidosCE,
    listPedidos,
    listPedidosM,
    listPedidosME,
    listPedidosF
}