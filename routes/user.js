const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/userController');
const { esRolValido, emailExiste ,idExiste} = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validaJWT } = require('../middlewares/validar-jwt');


const router = Router();


router.get('/', usuariosGet);


router.put('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(idExiste),
    check('rol').custom(esRolValido),
    validarCampos], usuariosPut);

router.post('/',[
    check('correo','El correo no es valido').isEmail(),
    check('nombre','El nombre es obligatorio').notEmpty(),
    check('correo','El correo es obligatorio').notEmpty(),
    check('passwd','El password es minimo de 6 y maximo de 10').isLength({min:6,max:10}),
    check('rol').custom(esRolValido),
    check('correo').custom(emailExiste),
    validarCampos
], usuariosPost);//segundo param es un middlelware de express-validator

router.delete('/:id',[
    validaJWT,
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(idExiste),
    validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);





module.exports = router;