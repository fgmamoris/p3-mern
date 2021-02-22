/* Rutas de Users
 * host + /api/user
 * const express = require('express');
 * const router = express.Router();
 * Pero utilizo la desectructuración directamente
 */
const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const {
  newUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  deleteImage,
} = require('../controllers/userController');
const {
  employeePositionValidator,
} = require('../middlewares/employeePosition-validator');
const { fieldsValidator } = require('../middlewares/fields-validator');
const { tokenValidator } = require('../middlewares/token-validator');

/*
 * Todas las peticiones tiene la validacion employeePositionValidator
 *  puedo protegerla de la siguiente manera router.use (employeePositionValidator)
 * aplica a todas las rutas mi middleware personalizado
 */

router.get('/', [tokenValidator, employeePositionValidator], getUsers);

router.get('/:id', [tokenValidator, employeePositionValidator], getUserById);

router.post(
  '/new',
  [
    //middelwares
    check('firstName', 'FirstName is required').not().isEmpty(),
    check('lastName', 'LastName is required').not().isEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({
      min: 6,
    }),
    check(
      'employeePosition',
      'Employee Position is required and must be valid position'
    ).isIn(['gerente', 'vendedor']),
    check('email', 'Email is required').isEmail(),
    fieldsValidator,
    tokenValidator,
    employeePositionValidator,
  ],
  newUser
);

router.put(
  '/:id',
  [
    //middelwares
    check('firstName', 'FirstName is required').not().isEmpty(),
    check('lastName', 'LastName is required').not().isEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({
      min: 6,
    }),
    check(
      'employeePosition',
      'Employee Position is required and must be valid position'
    ).isIn(['gerente', 'vendedor']),
    check('email', 'Email is required').isEmail(),
    fieldsValidator,
    tokenValidator,
    employeePositionValidator,
  ],
  updateUser
);

router.delete('/:id', [tokenValidator, employeePositionValidator], deleteUser);

module.exports = router;
