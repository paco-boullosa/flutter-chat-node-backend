const { response } = require('express');
const Mensaje = require('../models/mensaje');

const obtenerChat = async (req, res) => {

    const uidReceptor = req.uid;  // primero necesitamos el id del receptor
    const uidEmisor = req.params.de;  // viene del argumento '/:de'

    const ultimos30 = await Mensaje.find({              // hay que recuperar los ultimos N mensajes
        $or: [                                          // de la conversacion entre los 2 usuarios, es decir,
            { de: uidEmisor, para: uidReceptor },       // que se los haya enviado yo al usuario o que
            { de: uidReceptor, para: uidEmisor }        // me los haya enviado el usuario a mi
        ]
    })
    .sort({ createdAt: 'desc' })
    .limit(30);

    res.json({
        ok: true, 
        mensajes: ultimos30
    });

}


module.exports =  {
    obtenerChat
}