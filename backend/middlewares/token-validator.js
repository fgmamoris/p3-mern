const { response } = require('express');
const jwt = require('jsonwebtoken');

const tokenValidator = (req, res = response, next) => {
  const token = req.header('x-access-token');
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'Token must be provided',
    });
  }
  try {
    const payload = jwt.verify(token, process.env.SECRETKEYJWT);
    const { uid, firstName, lastName, employeePosition } = payload;
    /*
     * Seteo en la request el uid y el name,y la position del empleado
     * para poder pasarlo a la siguiente functiion mediante el next
     * en este caso sería revalidateToken del authController
     */
    req.uid = uid;
    req.firstName = firstName;
    req.lastName = lastName;
    req.employeePosition = employeePosition;
  } catch (err) {
    console.log(`Method: Function
                  Name: token-validator
                  Date: ${Date()}
                  Error: ${err}`);
    return res.status(501).json({
      ok: false,
      msg: 'Token invalid',
    });
  }
  next();
};

module.exports = {
  tokenValidator,
};
