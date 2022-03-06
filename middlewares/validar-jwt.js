const jwt = require('jsonwebtoken');

const validarJWT = ( req, res, next ) => {
    // Leer Token (lo leemos de la cabeera "x-token" que hemos creado para almacenarlo)
    const token = req.header('x-token');
    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'Falta el token en la peticion'
        });
    }

    try {
        // extraer el uid del token
        const { uid } = jwt.verify( token, process.env.JWT_KEY );
        req.uid = uid;
        next();
    
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });        
    }
}

module.exports = {
    validarJWT
}