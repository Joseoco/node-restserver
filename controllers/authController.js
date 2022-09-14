const { response, json } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { emailExisteAuth } = require('../helpers/db-validators');
const { generarJWT } = require('../helpers/generator-jwt');
const { googleVerify } = require('../helpers/google-verify');

//const { emailExiste } = require('../helpers/db-validators');




const authPost = async (req, res = response) => {



    const {  correo, passwd } = req.body;
    

    try{
        const usuarioBd = await Usuario.findOne({correo}).and({ estado: true });
        if(!usuarioBd){
            return res.status(500).json({
                msg:'No existe el usuario'
            })
        }

        const validPasswd=bcryptjs.compareSync(passwd,usuarioBd.passwd);

        if(!validPasswd){
            return res.status(500).json({
                msg:'Contraseña invalida'
            })
        }

        const token=await generarJWT(usuarioBd.id);

        res.json({
            ok: true,
            msg: 'AUTH POST API',
            usuarioBd,
            token

        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
        msg:'Problema de autenticación, contacte al administrador'
    });
    }
    

    
}


const googleSignIn=async(req, res = response)=>{

const {id_token}=req.body;

try{

    const {nombre, img, correo}=await googleVerify(id_token);

    let usuario=await Usuario.findOne({correo});

    if(!usuario){
        const data={

            nombre,
            correo,
            passwd:'1',
            img,
            google:true

        }

        usuario=new Usuario(data);
        await usuario.save();
    }

    //si el usuario tiene estado en false

    if(!usuario.estado){
        return res.status(401).json({
            msg:'Hable con el administrador, usuario bloqueado'
        })
    }

    //Generar JWT

    const token=await generarJWT(usuario.id);

    res.json({
        usuario,token
    })



}catch(error){
  json.status(400).json({
    ok:false,
    msg:'El token no se pudo verificar'
  })
}



}


module.exports = {

    authPost,
    googleSignIn,

}