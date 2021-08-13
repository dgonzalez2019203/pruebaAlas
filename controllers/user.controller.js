'use strict'
var mysql = require("mysql")
var configConexion =  require("../config/conexion");
var conexion = configConexion.conexion;
var md5 = require("md5")
var jwt = require("../services/jwt");

function login(req,res){
    if(req.body.userName && req.body.usuarioContrasena){
        let userName = req.body.userName;
        let password = md5(req.body.usuarioContrasena);
        let query1 = 'call Sp_ValidarLogin("'+userName+'","'+password+'")';
        
        conexion.query(query1, (err, findUser)=>{
            if(err){
                res.send({message:"error general"});
            }else if(findUser){
                res.send({message:"Usuario logueado", findUser,token: jwt.createToken(findUser)});
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

            let password = md5( params.usuarioContrasena);
            let query = 'call Sp_AgregarUsuario2("'+params.usuarioNombre+'","'+params.usuarioApellido+'","'+params.userName+'","'+password+'","'+params.usuarioCorreo+'","'+params.tipoUsuarioId+'","'+params.empresaDesc+'","'+params.empresaNumeroCuenta+'","'+params.empresaCuentaTipo+'","'+params.empresaBanco+'","'+params.telefono+'","'+params.estadoUsuarioId+'")';            

            conexion.query(query, (err, userSaved)=>{
                if(err){
                    res.send({message:"error general"});
                }else if(userSaved){
                    res.send({message:"Usuario creado", userSaved});
                }else{
                    res.send({message:"No se ha podido crear este usuario"})
                }
            });
    }else{
        res.send({message:"Ingresa los campos obligatorios"});
    }
}

module.exports ={
    login,
    register
}