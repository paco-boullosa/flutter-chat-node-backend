const mongoose = require('mongoose');


const dbConnection = async() => {

    try {
        console.log('iniciando dbconfig');
        await mongoose.connect( process.env.DB_CNN );
        console.log('DB conectada');
    }
    catch(error) {
        console.log(error);
        throw new Error('No se ha podido conectar la base de datos');
    }
}

module.exports = {
    dbConnection
}
