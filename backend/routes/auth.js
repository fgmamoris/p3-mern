/* Rutas de Auth
 * host + /api/auth
 * const express = require('express');
 * const router = express.Router();
 * Pero utilizo la desectructuración directamente
 */
const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

/*
 * Puedo exportar el controlador o exportar directamente el metodo y aplicarlo a la ruta
 * const authController = require('../controllers/authController');
 * router.get('/', authController.revalidateToken);
 */
const { revalidateToken, login } = require('../controllers/authController');
const { fieldsValidator } = require('../middlewares/fields-validator');
const { tokenValidator } = require('../middlewares/token-validator');

//Puedo aplicar un middelware en cualquier ruta que sea necesario, por mas que el Fron tenga su propia validación
router.post(
  '/new',
  [
    //middelwares
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    fieldsValidator,
    /* Utilizo mi middleware personalizado,
     * El mismo se ejecuta en cada check, si pasa el primero ejecuta el segundo
     * gracias a la implementación del metodo next() que esta dentro de mi middleware
     */
  ],
  login
);
router.get('/renew', tokenValidator, revalidateToken);

module.exports = router;
