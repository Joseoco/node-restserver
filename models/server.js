const express = require('express');
var cors = require('cors');
const { dbConnection } = require('../database/config');
class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath='/api/usuarios';
        this.conectarDb();
        //Middlewares

        this.middlewares();

        //Rutas de mi app
        this.routes();
    }

    middlewares = () => {
        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(express.static('public'));
    }

    conectarDb=async()=>{
        await dbConnection();
    }

    routes = () => {

        this.app.use(this.usuariosPath,require('../routes/user'));

    }

    listen = () => {
        this.app.listen(this.port, () => {
            console.log('Servidor escuchando en el puerto', this.port);
        });
    }

}

module.exports = Server;