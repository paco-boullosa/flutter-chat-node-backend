const express = require('express');
const path = require('path');
require('dotenv').config();  // lee el archivo .env

require('./database/config').dbConnection(); // DB config

// App de express
const app = express();

// Lectura y parseo del body
app.use( express.json() );

// Servidor de sockets
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/sockets');

// path publico
const publicPath = path.resolve( __dirname, 'public' );
app.use( express.static(publicPath) ); 


// Mis Rutas
app.use( '/api/login', require('./routes/auth') );
app.use( '/api/usuarios', require('./routes/usuarios') );
app.use( '/api/mensajes', require('./routes/mensajes') );


// app.listen(process.env.PORT, (err) =>{
server.listen(process.env.PORT, (err) =>{
    
    if ( err ) throw new Error(err);
    console.log('Servidor ejecutandose en puerto ', process.env.PORT);

});
