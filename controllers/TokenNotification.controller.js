'use strict'
var mysql = require("mysql")
var configConexion =  require("../config/conexion");
var conexion = configConexion.conexion;
var md5 = require("md5")
var nodemailer = require('nodemailer');

// save notification token

function saveNotification(req,res){
    if(req.body.usuarioId  &&  req.body.token && req.body.tipoUsuarioId){
        
        let query1 = 'call saveNotificationToken("'+req.body.usuarioId+'","'+req.body.token+'","'+req.body.tipoUsuarioId+'")';
        
        conexion.query(query1, (err, insertNotificationToken)=>{
            if(err){
                console.log(err)
                res.send({message:"error general"});
            }else if(insertNotificationToken){
                res.send({message:"se ha guardado correctamente la notificación",insertNotificationToken});
            }else{
                res.send({message:"no se ha guardado el token de notificación"})
            }
        });
    }else{
        res.send({message:"Ingresa los campos obligatorios"})
    }
}

//listar by cliente


function listNotificationCliente(req,res){
    
   let tipoUsuario =    3;  
    let query1 = 'call listarTokenNotificationByTipo("'+tipoUsuario+'")';
    
    conexion.query(query1, (err, findToken)=>{
        if(err){
            console.log(err)
            res.send({message:"error general"});
        }else if(findToken){
            res.send({message:"Token notification",findToken});
        }else{
            res.send({message:"no se ha guardado el token de notificación"})
        }
    });

}


//listar by administrador

function listNotificationAdmin(req,res){
    
    let tipoUsuario =    1;  
     let query1 = 'call listarTokenNotificationByTipo("'+tipoUsuario+'")';
     
     conexion.query(query1, (err, findToken)=>{
         if(err){
             console.log(err)
             res.send({message:"error general"});
         }else if(findToken){
             res.send({message:"Token notification",findToken});
         }else{
             res.send({message:"no se ha guardado el token de notificación"})
         }
     });
 
 }



 //listar by mensajero

function listNotificationMensajero(req,res){
    
    let tipoUsuario =    2;  
     let query1 = 'call listarTokenNotificationByTipo("'+tipoUsuario+'")';
     
     conexion.query(query1, (err, findToken)=>{
         if(err){
             console.log(err)
             res.send({message:"error general"});
         }else if(findToken){
             res.send({message:"Token notification",findToken});
         }else{
             res.send({message:"no se ha guardado el token de notificación"})
         }
     });
 
 }


 function listNotificationByUsuario(req,res){
    
    let usuario = req.params.id;
     let query1 = 'call listarTokenNotificationUsuario("'+usuario+'")';
     
     conexion.query(query1, (err, findToken)=>{
         if(err){
             console.log(err)
             res.send({message:"error general"});
         }else if(findToken){
             res.send({message:"Token notification",findToken});
         }else{
             res.send({message:"no se ha guardado el token de notificación"})
         }
     });
 
}



module.exports ={
    saveNotification,
    listNotificationCliente,
    listNotificationAdmin,
    listNotificationMensajero,
    listNotificationByUsuario
}