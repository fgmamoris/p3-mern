//const express = require('express'); uso la librería ya cargada para tener la ayuda el tipado
const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');
/*
 * Tengo tres formas de exportar el controlador:
 * module.exports = {primerMetodo: function (req, res, next) {}, segundoMetodo: function (req, res, next) {}};
 * Otra forma sería
 * exports.productList = function (req, res) { Acción de la función };
 */

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: 'Email not found in DB',
      });
    }
    //Confirmar match password
    const validatePassword = bcrypt.compareSync(password, user.password);
    if (!validatePassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Password error',
      });
    }
    //Gerenar JWT
    const token = await generateJWT(
      user.id,
      user.firstName,
      user.lastName,
      user.employeePosition
    );

    return res.status(200).json({
      ok: true,
      uid: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      employeePosition: user.employeePosition,
      token,
    });
  } catch (error) {
    console.log(`Method: Post
                Path: /api/auth
                Date: ${Date()}
                Error: ${error}`);
    return res.status(500).json({
      ok: false,
      msg: 'Not register user',
    });
  }
};

const revalidateToken = async (req, res = response) => {
  const uid = req.uid;
  const firstName = req.firstName;
  const lastName = req.lastName;
  const employeePosition = req.employeePosition;
  try {
    //Gerenar JWT
    const token = await generateJWT(uid, firstName, lastName, employeePosition);
    console.log(token);
    return res.status(200).json({
      ok: true,
      uid: uid,
      firstName: firstName,
      lastName: lastName,
      employeePosition: employeePosition,
      token,
    });
  } catch (err) {
    console.log(`Method: Post
                Path: /api/auth/renew
                Date: ${Date()}
                Error: ${err}`);
    return res.status(500).json({
      ok: false,
      msg: 'NoToken could not be generated',
    });
  }
};

module.exports = {
  revalidateToken: revalidateToken,
  login,
};
