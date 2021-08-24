'use strict'
var mysql = require("mysql")
var configConexion =  require("../config/conexion");
var conexion = configConexion.conexion;
var md5 = require("md5")
var jwt = require("../services/jwt");
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'davisrldn@gmail.com',
      pass: 'ordonez2003'
    }
});

function login(req,res){
    if(req.body.userName && req.body.usuarioContrasena){
        let userName = req.body.userName;
        let password = md5(req.body.usuarioContrasena);
        let query1 = 'call Sp_ValidarLogin("'+userName+'","'+password+'")';
        
        conexion.query(query1, (err, findUser)=>{
            if(err){
                res.send({message:"error general"});
            }else if(findUser){
                res.send({message:"Usuario logueado", findUser,token: jwt.createToken(findUser[0][0])});
            }else{
                res.send({message:"no se ha econtrado un usuario con este usuario o password"})
            }
        });
    }else{
        res.send({message:"Ingresa los campos obligatorios"})
    }
}

function register(req,res){
    var params = req.body;

    if(params.userName, params.usuarioNombre, params.usuarioApellido, params.usuarioCorreo, params.usuarioContrasena, params.empresaDesc, params.empresaNumeroCuenta,
        params.tipoUsuarioId, params.estadoUsuarioId, params.empresaCuentaTipo, params.empresaBanco, params.telefono){
            let query1 = "SELECT * FROM Usuario WHERE userName = '"+params.userName+"' or usuarioCorreo='"+params.usuarioCorreo+"'";
            conexion.query(query1, (err, userFind)=>{
                if(err){
                    console.log(err)
                    return res.send({message:"error general"});
                }else if(userFind){
                    console.log(userFind)
                   return  res.send({message:"username o correo ya están en uso", userFind});
                }else{
                    let password = md5( params.usuarioContrasena);
                    let query = 'call Sp_AgregarUsuario2("'+params.usuarioNombre+'","'+params.usuarioApellido+'","'+params.userName+'","'+password+'","'+params.usuarioCorreo+'","'+params.tipoUsuarioId+'","'+params.empresaDesc+'","'+params.empresaNumeroCuenta+'","'+params.empresaCuentaTipo+'","'+params.empresaBanco+'","'+params.telefono+'","'+params.estadoUsuarioId+'")';            
                    conexion.query(query, (err, userSaved)=>{
                        if(err){
                            console.log(err)
                            res.send({message:"error general"});
                        }else if(userSaved){
                            console.log(userSaved)
                            res.send({message:"Usuario creado", userSaved});
                        }else{
                            res.send({message:"No se ha podido crear este usuario"})
                        }
                    });
                }
            });

    }else{
        res.send({message:"Ingresa los campos obligatorios"});
    }
}

function getBancos(req,res){
    let query1 = 'call Sp_ListarBanco()';
        
    conexion.query(query1, (err, bancos)=>{
        if(err){
            res.send({message:"error general"});
        }else if(bancos){
            res.send({message:"bancos encontrados", bancos});
        }else{
            res.send({message:"no se ha econtrado bancos"})
        }
    });
}

function updateUser(req,res){
    var params = req.body;
    var userId = req.params.id;

    if(params.usuarioNombre && params.usuarioApellido && params.userName && params.usuarioContrasena && params.usuarioCorreo){
        let query = "SELECT * FROM Usuario WHERE userName = '"+params.userName+"' or usuarioCorreo='"+params.usuarioCorreo+"'";

        conexion.query(query, (err, userFind)=>{
            if(err){
                res.send({message:"error general"});
            }else if(userFind){
                var pass1 = Number.parseInt(userId);
                var pass2 = Number.parseInt(userFind[0].usuarioId);

                if(pass2 ==  pass1){
                    let password = md5( params.usuarioContrasena);
                    let query1 = 'call Sp_EditarUsuarioSC("'+userId+'","'+params.usuarioNombre+'","'+params.usuarioApellido+'","'+params.userName+'","'+password+'","'+params.usuarioCorreo+'")';            
                    conexion.query(query1, (err, userUpdate)=>{
                        if(err){
                            res.send({message:"error general"});
                        }else if(userUpdate){
                            res.send({message:"Usuario actualizado", userUpdate});
                        }else{
                            res.send({message:"No se pudo actualizar la informacion"});
                        }
                    })
                }else{
                   return  res.send({message:"username o correo ya están en uso", userFind});
                }
            }else{
                let password = md5( params.usuarioContrasena);
                let query1 = 'call Sp_EditarUsuarioSC("'+userId+'","'+params.usuarioNombre+'","'+params.usuarioApellido+'","'+params.userName+'","'+password+'","'+params.usuarioCorreo+'")';            
                conexion.query(query1, (err, userUpdate)=>{
                    if(err){
                        res.send({message:"error general"});
                    }else if(userUpdate){
                        res.send({message:"Usuario actualizado", userUpdate});
                    }else{
                        res.send({message:"No se pudo actualizar la informacion"});
                    }
                })
            }
        })
    }else{
        res.send({message:"Ingresa los campos obligatorios"});
    }
}

function passRecovery(req,res){
    var userId = req.params.id;
    var params = req.body;

    if(params.usuarioContrasena){
        let password = md5( params.usuarioContrasena);
        let query1 = 'call 	Sp_RecoveryPass("'+userId+'","'+password+'")'; 
    
        conexion.query(query1, (err, userUpdate)=>{
            if(err){
                res.send({message:"error general", err});
            }else if(userUpdate){
                res.send({message:"Contraseña actualizada", userUpdate});
            }else{
                res.send({message:"No se pudo actualizar la informacion"});
            }
        })
    }else{
        res.send({message:"Ingresa los campos obligatorios"});
    }
}


function saveByAdmin(req,res){
    var params = req.body;
    if(params.userName, params.usuarioNombre, params.usuarioApellido, params.usuarioCorreo, params.usuarioContrasena, params.empresaDesc, params.empresaNumeroCuenta,
        params.tipoUsuarioId, params.estadoUsuarioId, params.empresaCuentaTipo, params.empresaBanco, params.telefono){
            let query1 = "SELECT * FROM Usuario WHERE userName = '"+params.userName+"' or usuarioCorreo='"+params.usuarioCorreo+"'";
            conexion.query(query1, (err, userFind)=>{
                if(err){
                    console.log(err)
                    return res.send({message:"error general"});
                }else if(userFind){
                    if(userFind.length == 0){
                        let password = md5( params.usuarioContrasena);
                        let query = 'call Sp_AgregarUsuario2("'+params.usuarioNombre+'","'+params.usuarioApellido+'","'+params.userName+'","'+password+'","'+params.usuarioCorreo+'","'+params.tipoUsuarioId+'","'+params.empresaDesc+'","'+params.empresaNumeroCuenta+'","'+params.empresaCuentaTipo+'","'+params.empresaBanco+'","'+params.telefono+'","'+params.estadoUsuarioId+'")';            
                        conexion.query(query, (err, userSaved)=>{
                            if(err){
                                console.log(err)
                                res.send({message:"error general"});
                            }else if(userSaved){
                                console.log(userSaved)
                                res.send({message:"Usuario creado", userSaved});
                            }else{
                                res.send({message:"No se ha podido crear este usuario"})
                            }
                        });
                    }else{
                        return  res.send({message:"username o correo ya están en uso", userFind});
                    }
                   
                }else{
                    let password = md5( params.usuarioContrasena);
                    let query = 'call Sp_AgregarUsuario2("'+params.usuarioNombre+'","'+params.usuarioApellido+'","'+params.userName+'","'+password+'","'+params.usuarioCorreo+'","'+params.tipoUsuarioId+'","'+params.empresaDesc+'","'+params.empresaNumeroCuenta+'","'+params.empresaCuentaTipo+'","'+params.empresaBanco+'","'+params.telefono+'","'+params.estadoUsuarioId+'")';            
                    conexion.query(query, (err, userSaved)=>{
                        if(err){
                            console.log(err)
                            res.send({message:"error general"});
                        }else if(userSaved){
                            console.log(userSaved)
                            res.send({message:"Usuario creado", userSaved});
                        }else{
                            res.send({message:"No se ha podido crear este usuario"})
                        }
                    });
                }
            });

    }else{
        res.send({message:"Ingresa los campos obligatorios"});
    }
}

function listUsuario(req,res){
    let query1 = 'call ListUser()';
        
    conexion.query(query1, (err, usuarios)=>{
        if(err){
            res.send({message:"error general"});
        }else if(usuarios){
            res.send({message:"usuarios encontrados", usuarios});
        }else{
            res.send({message:"no se han econtrado usuarios"})
        }
    });
}


function disableUser(req,res){
    let id = req.params.id;

    let query1 = 'call disableUser('+id+')';
    console.log(query1)        
    conexion.query(query1, (err, userDeleted)=>{
        if(err){
            res.status(500).send({message:"error general", err});
        }else if(userDeleted){
            res.send({message:"usuario Eliminado", userDeleted});
        }else{
            res.send({message:"no se han econtrado el usuario"})
        }
    });

}

function updateAccount(req,res){
    let params = req.body;
    let id = req.params.id;
    let queryUpdate = 'call updateAccount('+id+',"'+params.usuarioNombre+'","'+params.usuarioApellido+'","'+params.userName+'","'+params.usuarioCorreo+'","'+params.empresaDesc+'","'+params.empresaNumeroCuenta+'",'+params.empresaCuentaTipo+','+params.empresaBanco+',"'+params.telefono+'")';
    let query = 'select * from Usuario where Usuario.userName="'+params.userName+'"';
    console.log(queryUpdate)
    conexion.query(query, (err,userFind)=>{
        if(err){
            return res.status(500).send({message:"error general", err});
        }else if(userFind){
            if(userFind.length >0){
                if(params.userid == userFind.userid){
                    conexion.query(queryUpdate, (err,userUpdated)=>{
                        if(err){
                            console.log(err);
                            return res.status(500).send({message:"error general", err});
                        }else if(userUpdated){
                            return res.send({message:"usuario Actualizado", userUpdated});
                        }else{
                            return res.send({message:"no se pudo actualizar el usuario"})
                        }
                    })
                }else{
                    return res.send({message:"username ya en uso..."});
                }
            }else{
                conexion.query(queryUpdate, (err,userUpdated)=>{
                    if(err){
                        return res.status(500).send({message:"error general", err});
                    }else if(userUpdated){
                        return res.send({message:"usuario Actualizado", userUpdated});
                    }else{
                        return res.send({message:"no se pudo actualizar el usuario"})
                    }
                })
            }
        }else{
            conexion.query(queryUpdate, (err,userUpdated)=>{
                if(err){
                    return res.status(500).send({message:"error general", err});
                }else if(userUpdated){
                    return res.send({message:"usuario Actualizado", userUpdated});
                }else{
                    return res.send({message:"no se pudo actualizar el usuario"})
                }
            })
        }
    })

}

function confirmarCorreo(req,res){
    let params = req.body;

    if(params.estadoUsuarioId && params.usuarioCorreo){
        let query = 'call Sp_ConfirmarCorreo("'+params.estadoUsuarioId+'","'+params.usuarioCorreo+'")'; 
        conexion.query(query, (err,confirmar)=>{
            if(err){
                return res.status(500).send({message:"error general", err});
            }else if(confirmar){
                return res.send({message:"Correo confirmado", confirmar});
            }else{
                return res.send({message:"no se pudo confirmar al usuario"})
            }
        })
    }else{
        return res.send({message:"Ingresa los campos obligatorios"})
    }
}

module.exports ={
    login,
    register,
    getBancos,
    updateUser,
    passRecovery,
    saveByAdmin,
    listUsuario,
    disableUser,
    updateAccount,
    confirmarCorreo
}