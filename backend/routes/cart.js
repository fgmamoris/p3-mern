/* Rutas de Cart
 * host + /api/cart
 * const express = require('express');
 * const router = express.Router();
 * Pero utilizo la desectructuración directamente
 */
const { Router } = require('express');
const router = Router();

const {
  newCart,
  getCart,
  updateCart,
  deleteCart,
  getCartByUser,
} = require('../controllers/cartController');
const { tokenValidator } = require('../middlewares/token-validator');

router.get('/', tokenValidator, getCart);
router.get('/user', tokenValidator, getCartByUser);
router.post('/new', tokenValidator, newCart);
router.put('/:id', tokenValidator, updateCart);
router.delete('/:id', tokenValidator, deleteCart);

module.exports = router;
