const { Router } = require('express');
const { check } = require('express-validator');
const { authPost, googleSignIn } = require('../controllers/authController');
const { emailExisteAuth } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');




const router = Router();



router.post('/login',[
    check('correo','El correo es obligatorio').isEmail(),
    check('passwd','La contraseña es obligatoria').not().isEmpty(),
    check('correo').custom(emailExisteAuth),
validarCampos], authPost);

router.post('/google',[
    check('id_token','Token de google obligatorio').not().isEmpty(),
validarCampos], googleSignIn);




module.exports = router;