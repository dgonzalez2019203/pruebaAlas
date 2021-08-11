'use strict'
var mysql = require("mysql")
var configConexion =  require("../config/conexion");
var conexion = configConexion.conexion;
var md5 = require("md5")
var jwt = require("../services/jwt");

function login(req,res){
    let userName = req.body.userName;
    let password = md5(req.body.password);
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
}

module.exports ={
    login
}