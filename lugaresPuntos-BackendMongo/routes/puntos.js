// comentario para saber cual es la ruta de aca
/*
        RUTAS DE lugares
        HOST + '/api/detalle'
*/

const { Router } = require('express');
const { getPunto, crearPunto, actualizarPunto, eliminarPunto } = require('../controllers/puntos');
const router = Router();
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

router.use(validarJWT );


// Obtener punto
router.get('/:id', getPunto);

router.post('/:id', 
[
        check('codigo', 'El codigo es obligatorio').not().isEmpty(),
        check('latitud', 'latitud es obligatoria').not().isEmpty(),
        check('longitud', 'longitud es obligatoria').not().isEmpty(),
        validarCampos
],
crearPunto);

router.put('/:id',[
        check('codigo', 'El codigo es obligatorio').not().isEmpty(),
        check('latitud', 'latitud es obligatoria').not().isEmpty(),
        check('longitud', 'longitud es obligatoria').not().isEmpty(),
        validarCampos
], actualizarPunto);

router.delete('/:id', eliminarPunto);


module.exports = router;