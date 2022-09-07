const {response}=require('express');

const usuariosGet=(req, res=response) => {

    const query=req.query;

    const {id='no id',nombre='no name', page=1,limit=10}=query;

    res.json({
        ok: true,
        msg: 'get API',
        id,
        nombre,
        page,
        limit
    });
}

const usuariosPut=(req, res=response) => {

    const id=req.params.id;


    res.json({
        ok: true,
        msg: 'PUT API',
        id
    });
}

const usuariosPost=(req, res=response) => {

    const body=req.body;

    res.json({
        ok: true,
        msg: 'POST API',
        body
    });
}

const usuariosDelete=(req, res=response) => {
    res.json({
        ok: true,
        msg: 'DELETE API'
    });
}


const usuariosPatch=(req, res=response) => {
    res.json({
        ok: true,
        msg: 'PATCH API'
    });
}



module.exports={
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}