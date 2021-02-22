const jwt = require('jsonwebtoken');

//Tegno que generar un promesa
const generateJWT = (uid, firstName, lastName, employeePosition) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, firstName, lastName, employeePosition };
    jwt.sign(
      payload,
      process.env.SECRETKEYJWT,
      { expiresIn: '4h' },
      (err, token) => {
        if (err) {
          console.log(err);
          reject('Token could not be generated');
        }
        resolve(token);
      }
    );
  });
};

module.exports = {
  generateJWT,
};
