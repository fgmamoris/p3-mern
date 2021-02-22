/* Rutas de Products
 * host + /api/image
 * const express = require('express');
 * const router = express.Router();
 * Pero utilizo la desectructuración directamente
 */
const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const { deleteImage } = require('../controllers/imageController');
const {
  employeePositionValidator,
} = require('../middlewares/employeePosition-validator');
const { tokenValidator } = require('../middlewares/token-validator');

router.delete('/:id', [tokenValidator, employeePositionValidator], deleteImage);

module.exports = router;
