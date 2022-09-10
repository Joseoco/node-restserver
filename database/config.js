const mongoose = require('mongoose');


const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_ATLAS, {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        });
        console.log('Base de datos online');
    } catch (error) {
        console.log('Problema al conectar ' + error);
        throw new Error('Problema al conectar ' + error);
    }
}

module.exports = {
    dbConnection
}