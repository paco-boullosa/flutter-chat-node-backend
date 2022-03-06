const response = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const res = require('express/lib/response');

const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body;  // se extraen email y pass del body: para validar y encriptar

    try {
        // buscar en la BD si ya existe el email
        const existeEmail = await Usuario.findOne({ email });
        if ( existeEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'El email ya está registrado'
            });
        }

        const usuario = new Usuario( req.body );

        // encriptar la contraseña
        const salt = bcrypt.genSaltSync();   // 'salt' es para que contraseñas iguales generen hash diferentes
        usuario.password = bcrypt.hashSync( password, salt );

        // grabar en BD
        await usuario.save();

        // Generar el JWT
        // ahora se genera un token para el usuario para que pueda ser utilizado para tener acceso a nuestra aplicacion
        const token = await generarJWT( usuario.id );

        res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error); 
        res.status(500).json({
            ok: false,
            msg: 'Error de aplicación'
        });
    }

}


const login = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        // buscar en la BD el email
        const usuarioDB = await Usuario.findOne({ email });
        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Credenciales no válidas'
            });
        } 
        // validar el password
        const passwordCorrecta = bcrypt.compareSync( password, usuarioDB.password );
        if ( !passwordCorrecta ) {
            return res.status(404).json({
                ok: false,
                msg: 'Credenciales no válidas'
            });
        }
        // Credenciales correctas => generar el JWT
        const token = await generarJWT( usuarioDB.id );
        return res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error de aplicación'
        });        
    }
}


const renovarToken = async ( req, res = response ) => {
    // en el proceso anterior (validarJWT) se ha obtenido el id
    const uid = req.uid;
    // se genera un nuevo JWT
    const token = await generarJWT( uid );
    // se obtiene el usuario mediante el UID (findById)
    const usuario = await Usuario.findById( uid );
    res.json ({
        ok: true,
        usuario,
        token
    });
}

module.exports = {
    crearUsuario,
    login,
    renovarToken
}