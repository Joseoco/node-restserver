const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { emailExiste } = require('../helpers/db-validators');


const usuariosGet = async (req, res = response) => {

    const query = req.query;

    // const {id='no id',nombre='no name', page=1,limit=10}=query;

    const { id = 'no id', nombre = 'no name', page = 1, limit = 5, desde = 1 } = query;

    /*const usuarios = Usuario.find({ estado: true })
        .limit(Number(limit))
        .skip(Number(desde));

    const total = Usuario.countDocuments().and({ estado: true });*/

    const [total,usuarios] = await Promise.all([
        Usuario.countDocuments().and({ estado: true }),
        Usuario.find({ estado: true })
            .limit(Number(limit))
            .skip(Number(desde))
    ]);



    res.json({
        //resp
        total,
        usuarios
    });
}

const usuariosPut = async (req, res = response) => {

    const id = req.params.id;
    const { _id, passwd, google, correo, ...resto } = req.body;

    if (passwd) {
        const salt = bcryptjs.genSaltSync();
        resto.passwd = bcryptjs.hashSync(passwd, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        ok: true,
        msg: 'PUT API',
        usuario
    });
}

const usuariosPost = async (req, res = response) => {



    const { nombre, correo, passwd, rol } = req.body;
    const usuario = new Usuario({
        nombre, correo, passwd, rol
    });

    const salt = bcryptjs.genSaltSync();
    usuario.passwd = bcryptjs.hashSync(passwd, salt);
    await usuario.save();
    res.json({
        ok: true,
        msg: 'POST API',
        usuario
    });
}

const usuariosDelete = async(req, res = response) => {
    const id = req.params.id;
    //const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});
    res.json({
        ok: true,
        msg: 'DELETE API',
        usuario
    });
}


const usuariosPatch = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'PATCH API'
    });
}



module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}