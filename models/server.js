const express = require('express');
var cors = require('cors');
const { dbConnection } = require('../database/config');
class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            usuariosPath: '/api/usuarios',
            authPath: '/api/auth',
            categoryPath: '/api/categorias'
        }
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

    conectarDb = async () => {
        await dbConnection();
    }

    routes = () => {

        this.app.use(this.paths.authPath, require('../routes/auth'));
        this.app.use(this.paths.usuariosPath, require('../routes/user'));
        this.app.use(this.paths.categoryPath, require('../routes/category'));

    }

    listen = () => {
        this.app.listen(this.port, () => {
            console.log('Servidor escuchando en el puerto', this.port);
        });
    }

}

module.exports = Server;