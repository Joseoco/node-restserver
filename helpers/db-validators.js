const Role = require('../models/role');
const {response}=require('express');
const Usuario = require('../models/usuario');


const esRolValido =async(rol='')=>{
    const existeRol=await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no existe en la base de datos`);
    }
}

const emailExiste=async(correo='')=>{
    emailExisteEnBd=await Usuario.findOne({correo});
    if(emailExisteEnBd){
        throw new Error(`El correo ${correo} ya existe en la base de datos`);
    }

}

const idExiste=async(id='')=>{
    idExisteEnBd= await Usuario.findById(id);
    if(!idExisteEnBd){
        console.log('EXC');
        throw new Error(`El id ${id} no existe en la base de datos`);
    }

}

module.exports={
    esRolValido,
    emailExiste,
    idExiste
}