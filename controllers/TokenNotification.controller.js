'use strict'
var mysql = require("mysql")
var configConexion =  require("../config/conexion");
var conexion = configConexion.conexion;
var md5 = require("md5")
var nodemailer = require('nodemailer');


var firebaseAdmin = require("../firebase-config");



const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24,
};

// save notification token

function saveNotification(req,res){
    if(req.body.usuarioId  &&  req.body.token && req.body.tipoUsuarioId){
        let query = 'call searchNotification("'+req.body.token+'")';

        let query1 = 'call saveNotificationToken("'+req.body.usuarioId+'","'+req.body.token+'","'+req.body.tipoUsuarioId+'")';
        let query2 = 'call updateNotification("'+req.body.token+'","'+req.body.tipoUsuarioId+'", "'+req.body.usuarioId+'")';
        
        conexion.query(query, (err, findToken)=>{
            if(err){
                console.log(err)
                res.send({message:"error general"});
            }else if(findToken){
                if(findToken[0].length!=0){
                    conexion.query(query2, (err, updateToken)=>{
                        if(err){
                            console.log(err)
                            res.send({message:"error general"});
                        }else if(updateToken){
                            res.send({message:"se ha actualizado correctamente la notificación",updateToken});
                        }else{
                            res.send({message:"no se ha actualizado el token de notificación"})
                        }
                    });
                }else{
                    console.log("find not have value")
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
                }
            }else{
                console.log("no se encontraron")
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
            }
        })


        
       
    }else{
        res.send({message:"Ingresa los campos obligatorios"})
    }
}

//listar by cliente


function listNotificationCliente(req,res){
    if(req.message && req.title){
        let tipoUsuario =    3;  
        let query1 = 'call listarTokenNotificationByTipo("'+tipoUsuario+'")';
        
        conexion.query(query1, (err, findToken)=>{
            if(err){
                console.log(err)
                res.send({message:"error general"});
            }else if(findToken){
                for(let find of findToken[0]){
                    const options = notification_options;
                    console.log(find.tokenValue);
                    let notificationMessage = {
                        notification: { 
                            title: req.body.title, 
                            body: req.body.message
                        },
                        token: find.tokenValue,
                    }
                    firebaseAdmin.messaging().sendToDevice(notificationMessage).then((response)=>{
                        console.log("notificación enviada")
                    }).catch((error)=>{
                        res.send({message:"error general", error});
                    })
                }
                res.send({message:"Token notification",findToken});
            }else{
                res.send({message:"no se ha guardado el token de notificación"})
            }
        });
    
    }else{
        res.send({message:"Ingresa los campos obligatorios"})
    }


}


//listar by administrador

function listNotificationAdmin(req,res){
    if(req.body.message && req.body.title){
        let tipoUsuario =    1;  
        let query1 = 'call listarTokenNotificationByTipo("'+tipoUsuario+'")';
        
        conexion.query(query1, (err, findToken)=>{
            if(err){
                console.log(err)
                res.send({message:"error general"});
            }else if(findToken){
                let response;
                for(let find of findToken[0]){
                    const options = notification_options;
                    console.log(find.tokenValue);
                    let notificationMessage = {
                        notification: { 
                            title: req.body.title, 
                            body: req.body.message
                        },
                        token: find.tokenValue,
                    }
                    firebaseAdmin.messaging().send(notificationMessage).then((response)=>{
                        console.log("notificación enviada")
                        response =response;
                    }).catch((error)=>{
                        response = error;
                        res.send({message:"error general", error});
                    })
                }
                res.send({message:"Token notification",findToken});
            }else{
                res.send({message:"no se ha guardado el token de notificación"})
            }
        });
 
    }else{
        res.send({message:"Ingresa los campos obligatorios"})
    }
    
 }



 //listar by mensajero

function listNotificationMensajero(req,res){
    if(req.body.message && req.body.title){
    
        let tipoUsuario =    2;  
        let query1 = 'call listarTokenNotificationByTipo("'+tipoUsuario+'")';
        
        conexion.query(query1, (err, findToken)=>{
            if(err){
                console.log(err)
                res.send({message:"error general"});
            }else if(findToken){
                for(let find of findToken[0]){
                    const options = notification_options;
                    console.log(find.tokenValue);
                    let notificationMessage = {
                        notification: { 
                            title: req.body.title, 
                            body: req.body.message
                        },
                        token: find.tokenValue,
                    }
                    firebaseAdmin.messaging().send(notificationMessage).then((response)=>{
                        console.log("notificación enviada")
                    }).catch((error)=>{
                        res.send({message:"error general", error});
                    })
                }
                res.send({message:"Token notification",findToken});
            }else{
                res.send({message:"no se ha guardado el token de notificación"})
            }
        });
    
    }else{
        res.send({message:"Ingresa los campos obligatorios"})
    }
   
 
 }


 function listNotificationByUsuario(req,res){
    if(req.body.message && req.body.title){
        let usuario = req.params.id;
        let query1 = 'call listarTokenNotificationUsuario("'+usuario+'")';
        
        conexion.query(query1, (err, findToken)=>{
            if(err){
                console.log(err)
                res.send({message:"error general"});
            }else if(findToken){
                for(let find of findToken[0]){
                    const options = notification_options;
                    console.log(find.tokenValue);
                    let notificationMessage = {
                        notification: { 
                            title: req.body.title, 
                            body: req.body.message
                        },
                        token: find.tokenValue,
                    }
                    firebaseAdmin.messaging().sendToDevice( notificationMessage).then((response)=>{
                        console.log("notificación enviada")
                    }).catch((error)=>{
                        res.send({message:"error general", error});
                    })
                }
                res.send({message:"Token notification",findToken});
            }else{
                res.send({message:"no se ha guardado el token de notificación"})
            }
        });
    }else{
        res.send({message:"Ingresa los campos obligatorios"})
    }
    
 
}



module.exports ={
    saveNotification,
    listNotificationCliente,
    listNotificationAdmin,
    listNotificationMensajero,
    listNotificationByUsuario
}