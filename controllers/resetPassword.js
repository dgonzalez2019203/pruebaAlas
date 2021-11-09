'use strict'
var mysql = require("mysql")
var configConexion =  require("../config/conexion");
var conexion = configConexion.conexion;
var nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars')
const path = require('path')
var md5 = require("md5")

const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('./views'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./views'),
};



var transporter = nodemailer.createTransport({
    service: 'Gmail',
    port: 587,
    auth: {
      user: 'davisrdln@gmail.com',
      pass: 'ordonez2003'
    }   
});

transporter.use('compile', hbs(handlebarOptions))


function resetPassword(req, res){
    let pass = req.params.pass;
    let  mailOptions = {
        from: 'davisrdln@gmail.com',
        to: 'davisrldn@gmail.com' ,
        subject: 'reset password',
        template: 'email', // the name of the template file i.e email.handlebars
        context: {
            password:pass
        }
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {

          console.log(error);
          return res.status(500).send({message:"error general", error});
        } else {
          console.log('Email sent: ' + info.response);
          return res.send({message:"Correo enviado", email:"email"});
        }
    });
}

function searchUser(req, res){
    let username = req.params.username;
    let query = 'call Sp_BuscarCodigoUsuario("'+username+'")'; 
    conexion.query(query, (err,findUser)=>{
        if(err){
            console.log(err)
            return res.status(500).send({message:"error general", err});
        }else if(findUser){
            return res.send({message:"Usuario encontrado", findUser});
        }else{
            return res.send({message:"no se pudo encontrar el usuario"})
        }
    })
}


function updatePass(req, res){
    let passA = req.params.passA;
    let params = req.body;
    let password = md5( params.usuarioContrasena);
    let query = 'call updatePassword("'+password+'", "'+params.userName+'","'+passA+'")'; 
    conexion.query(query, (err,findUser)=>{
        if(err){
            console.log(err)
            return res.status(500).send({message:"error general", err});
        }else if(findUser){
            return res.send({message:"Usuario actualizado", findUser});
        }else{
            return res.send({message:"no se pudo encontrar el usuario"})
        }
    })
}



module.exports ={
    resetPassword,
    searchUser,
    updatePass
}