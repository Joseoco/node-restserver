const { Router } = require('express');
const { check } = require('express-validator');
const { authPost, googleSignIn } = require('../controllers/authController');
const { emailExisteAuth } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');




const router = Router();

/**
 * http://localhost:8085/api/categorias
 */


//Obtener todas las categorias public
router.get('/', (req, res) => {
    res.json('get');
});

//Obtiene una categoria public
router.get('/:id', (req, res) => {
    res.json('get/:id');
});

//crear una categoria -cualquier persona con token valido
router.post('/', (req, res) => {
    res.json('Post');
});

//Actualiza categoria -cualquier persona con token valido
router.put('/:id', (req, res) => {
    res.json('put');
});

//Actualiza categoria -Admin
router.delete('/:id', (req, res) => {
    res.json('delete');
});

/*
router.post('/login',[
    check('correo','El correo es obligatorio').isEmail(),
    check('passwd','La contraseña es obligatoria').not().isEmpty(),
    check('correo').custom(emailExisteAuth),
validarCampos], authPost);

router.post('/google',[
    check('id_token','Token de google obligatorio').not().isEmpty(),
validarCampos], googleSignIn);
*/



module.exports = router;