/* Rutas de Products
 * host + /api/product
 * const express = require('express');
 * const router = express.Router();
 * Pero utilizo la desectructuración directamente
 */
const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const {
  newProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getProducts,
} = require('../controllers/productController');
const {
  employeePositionValidator,
} = require('../middlewares/employeePosition-validator');
const { fieldsValidator } = require('../middlewares/fields-validator');
const { tokenValidator } = require('../middlewares/token-validator');

router.get('/', tokenValidator, getProducts);
router.get('/:id', tokenValidator, getProductById);
router.post(
  '/new',
  [
    //middelwares
    check('name', 'name is required').not().isEmpty(),
    check('tradeMark', 'tradeMark is required').not().isEmpty(),
    check('price', 'price is required and must be number').isNumeric(),
    check('qty', 'qty is required and must be number').isNumeric(),
    fieldsValidator,
    tokenValidator,
    employeePositionValidator,
  ],
  newProduct
);
router.put(
  '/:id',
  [
    check('name', 'name is required').not().isEmpty(),
    check('tradeMark', 'tradeMark is required').not().isEmpty(),
    check('price', 'price is required and must be number').isNumeric(),
    check('qty', 'qty is required and must be number').isNumeric(),
    fieldsValidator,
    tokenValidator,
  ],
  updateProduct
);
router.delete(
  '/:id',
  [tokenValidator, employeePositionValidator],
  deleteProduct
);

module.exports = router;
