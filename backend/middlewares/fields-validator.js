const { response } = require('express');
const { validationResult } = require('express-validator');

const fieldsValidator = (req, res = response, next) => {
  // const fieldsValidator = funtion (req, res = response, next)  {}
  /* el next es una función que se ejecuta si el codigo se ejecuta
   * correctamente, me va a servir para indicarle al check que prosiga con su acción,
   * es decir, que continue con el controlador
   */
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }

  next();
};

module.exports = {
  fieldsValidator,
};
