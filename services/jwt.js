'use strict'

var jwt = require("jwt-simple");

var moment = require("moment");

var secretKey = 'AlasGt2021';

exports.createToken = (user)=>{
    var payload = {
        sub: user.userId,
        userName:user.userName,
        usuarioContrasena:user.usuarioContrasena,
        usuarioNombre:user.usuarioNombre,
        usuarioApellido:user.usuarioApellido,
        tipoUsuarioId:user.tipoUsuarioId,
        usuarioCorreo:user.usuarioCorreo,
        telefono: user.telefono,
        empresaDesc: user.empresaDesc,
        empresaNumeroCuenta: user.empresaNumeroCuenta,
        estadoUsuarioId: user.estadoUsuarioId,
        empresaCuentaTipo: user.empresaCuentaTipo,
        empresaBanco: user.empresaBanco,
        iat: moment().unix,
        exp: moment().add(1,'hour').unix()
    }
    return jwt.encode(payload,secretKey);
}