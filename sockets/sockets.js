
const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');
const { usuarioConectado, usuarioDesconectado, grabaMensaje } = require ('../controllers/socket-db')

// Mensajes de sockets
io.on('connection', client => {
    console.log('cliente conectando...');

    // es necesario validar si el cliente tiene un JWT valido
    // console.log(client.handshake.headers);  // muestra informacion de las cabeceras
    const [ tokenValido, uid ] = comprobarJWT( client.handshake.headers['x-token'] );
    if ( !tokenValido ) {
        return client.disconnect();
    }

    // Cliente autenticado => marcarlo en BD
    usuarioConectado( uid );  // no se marca con await / async porque no hay que esperar a esta actualizacion

    // Ingresar al usuario en su sala de chat
    // Por defecto hay 2 salas: una sala global y una sala privada (uid del receptor)
    client.join( uid );

    // cuando se recibe un mensaje de un usuario a otro
    client.on('mensaje-personal', async ( payload ) => {
        // Grabar el mensaje en la BD
        await grabaMensaje ( payload ); // so se graba correctamente se continua.
        // el server recibe el mensaje y ahora se lo emite solo al receptor (.para)
        io.to( payload.para ).emit('mensaje-personal', payload ); 
    });

    console.log('cliente AUTENTICADO');

    client.on('disconnect', () => { 
        usuarioDesconectado ( uid );
    });

    // escuchar a clientes
    // client.on('mensaje', ( payload ) => {
    //     console.log('Mensaje -> ', payload);

    //     io.emit('mensaje', { admin: 'Recibido nuevo mensaje' });
    // });

});
