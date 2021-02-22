const { response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const employeePositionValidator = async (req, res = response, next) => {
  const token = req.header('x-access-token');
  try {
    const payload = jwt.verify(token, process.env.SECRETKEYJWT);
    const { uid } = payload;
    const user = await User.findOne({ _id: uid });
    const { employeePosition } = user;
    if (employeePosition === 'gerente') {
      return next();
    } else
      return res.status(401).json({
        ok: false,
        msg: 'Unauthorized',
      });
  } catch (err) {
    console.log(`Method: Function
                 Name: employeePositionValidator
                 Date: ${Date()}
                 Error: ${err}`);
    return res.status(501).json({
      ok: false,
      msg: 'Talk with the administrator',
    });
  }
  next();
};

module.exports = {
  employeePositionValidator,
};
