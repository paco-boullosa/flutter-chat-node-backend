const Usuario = require('../models/usuario');
const Mensaje = require('../models/mensaje');

const usuarioConectado = async ( uid = '' ) => {
    const usuario = await Usuario.findById( uid );  // se obtienen los datos del usuario
    usuario.online = true;  // se cambia el estado del usuario
    await usuario.save();   // y se actualiza en la BD
    return usuario;
}

const usuarioDesconectado = async ( uid = '' ) => {
    const usuario = await Usuario.findById( uid );  
    usuario.online = false;  
    await usuario.save(); 
    return usuario;
}


const grabaMensaje = async ( payload ) => {
    /* payload  {
        de: ''
        para: ''
        mensaje: ''
    }  */
    try {
        // creamos instancia del mensaje
        const mensaje = new Mensaje (payload);
        await mensaje.save();
        return true;

    } catch (error) {
        return false;
    }
}

module.exports = {
    usuarioConectado,
    usuarioDesconectado,
    grabaMensaje
}