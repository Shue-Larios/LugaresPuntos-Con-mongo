// comentario para saber cual es la ruta de aca
/*
        RUTAS DE lugares
        HOST + '/api/lugares'
*/

const { Router } = require('express');
const { getLugar, crearLugar, actualizarLugar, eliminarLugar } = require('../controllers/lugares');
const router = Router();
const { validarCampos } = require('../middlewares/validar-campos');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');

router.use(validarJWT);


// Obtener lugar
router.get('/', getLugar);

router.post('/',
        [
                check('nombre', 'El nombre es obligatorio').not().isEmpty(),
                check('disponible', 'Disponibilidad es obligatoria').not().isEmpty(),
                check('rango', 'Rango es obligatoria').not().isEmpty(),
                check('tipo', 'Tipo es obligatoria').not().isEmpty(),
                validarCampos
        ],
        crearLugar);

router.put('/:id',
[
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('disponible', 'Disponibilidad es obligatoria').not().isEmpty(),
        check('rango', 'Rango es obligatoria').not().isEmpty(),
        check('tipo', 'Tipo es obligatoria').not().isEmpty(),
        validarCampos
],
actualizarLugar);

router.delete('/:id', eliminarLugar);


module.exports = router;