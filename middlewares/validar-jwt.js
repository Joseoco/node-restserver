const jwt=require('jsonwebtoken');
const {response,request}=require('express');
const Usuario = require('../models/usuario');

const validaJWT=async(req=request,res=response,next)=>{

const token=req.header('x-token');
    console.log(token);

    if(!token){
        return res.status(401).json({
            msg:'Token no enviado'
        })
    }
    try{

        const {uid}=jwt.verify(token,process.env.SECRET_KEY);
        req.uid=uid; //al agregarlo a la request se vuelve referencia


        const usuarioAutenticado= await Usuario.findById(uid);

        if(!usuarioAutenticado){
            return res.status(401).json({
                msg : 'Usuario no existe'
             })
        }

        if(!usuarioAutenticado.estado){
                return res.status(401).json({
                   msg : 'Token no valido (estado : false)'
                })
        }

        req.usuarioAutenticado=usuarioAutenticado;

     

        next();
    }catch(error){
        return res.status(401).json({
            msg:'Token invalido '+error
        })
    }

    
}

module.exports={
    validaJWT
}