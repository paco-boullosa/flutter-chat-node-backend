/*
    path: api/login
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { crearUsuario, login, renovarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// validar que se puede llamar pq contiene toda la info necesaria

router.post('/new', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('email','El formato del email no es correcto').isEmail(),
    check('password','El password es obligatorio').not().isEmpty(),
    validarCampos
], crearUsuario);

router.post('/', [
    check('email','El formato del email no es correcto').isEmail(),
    check('password','El password es obligatorio').not().isEmpty(),
    validarCampos
], login);

router.get('/renovar', validarJWT, renovarToken );


module.exports = router;