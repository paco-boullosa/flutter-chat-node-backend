
const {io} = require('../index');

// Mensajes de sockets
io.on('connection', client => {
    console.log('cliente Conectado');

    client.on('disconnect', () => { 
        console.log('cliente desconectado');
    });

    // escuchar a clientes
    // client.on('mensaje', ( payload ) => {
    //     console.log('Mensaje -> ', payload);

    //     io.emit('mensaje', { admin: 'Recibido nuevo mensaje' });
    // });

});
