/* Rutas de Sales
 * host + /api/sale
 * const express = require('express');
 * const router = express.Router();
 * Pero utilizo la desectructuración directamente
 */
const { Router } = require('express');
const router = Router();
const { check, sanitize } = require('express-validator');

const {
  newSale,
  getSaleById,
  getSales,
  updateSale,
} = require('../controllers/saleController');
const {
  employeePositionValidator,
} = require('../middlewares/employeePosition-validator');
const { fieldsValidator } = require('../middlewares/fields-validator');
const { tokenValidator } = require('../middlewares/token-validator');

router.get('/', [tokenValidator, employeePositionValidator], getSales);
router.get('/:id', [tokenValidator, employeePositionValidator], getSaleById);
router.post(
  '/new',
  [
    check('seller').not().isEmpty(),
    check('products').not().isEmpty(),
    check('products.*.name').not().isEmpty(),
    check('products.*.price').isNumeric(),
    check('products.*.code').isNumeric(),
    check('products.*.qty').isNumeric(),
    check('products.*.amountProduct').isNumeric(),
    check('client', 'client is required').exists(),
    check('client.fullName', 'fullName into client is required')
      .not()
      .isEmpty(),
    check('client.address').not().isEmpty(),
    check('paymentBreakdown', 'paymentBreakdown is required').exists(),
    check(
      'paymentBreakdown.paymentMethod',
      'paymentMethod is required and must be valid parameter'
    ).isIn(['cash', 'creditCard', 'debitCard']),
    check(
      'totalAmount',
      'totalAmount is required and must be number'
    ).isNumeric(),
    fieldsValidator,
    tokenValidator,
  ],
  newSale
);
router.put('/:id', [tokenValidator, employeePositionValidator], updateSale);

module.exports = router;
