const { response } = require('express');
const Usuario = require('../models/usuario');

const getUsuarios = async ( req, res = response ) => {
    // paginacion
    // --> req.query.PARAM equivale a http://url?PARAM=valor
    const desde = Number( req.query.desde ) || 0;

    // accede a la BD para obtener un listado de todos los usuarios.
    // el orden es, primero conectados, luego desconectados
    // En el listado no debe venir mi usuario: _id <> req.uid   ---->  _id: {$notequal: req.uid}
    const usuarios = await Usuario
        .find( { _id: { $ne: req.uid } } )
        .sort('-online')
        .skip( desde )
        .limit( 10 );

    res.json ({
        ok: true,
        usuarios
    }); 
}

module.exports =  {
    getUsuarios
}