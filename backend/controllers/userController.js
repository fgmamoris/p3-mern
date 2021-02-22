const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
let base64 = require('base-64');
const fetch = require('node-fetch');

const newUser = async (req, res = response) => {
  const { email } = req.body;
  try {
    await User.find({}, async function (err, users) {
      //Todo lo que venga de mas en el body lo ingnora
      let user = await User.findOne({ email: email.toLowerCase() });
      if (user) {
        return res.status(400).json({
          ok: false,
          msg: 'Email already registered',
        });
      }
      user = new User(req.body);
      user.email = email.toLowerCase();
      //Encriptar contraseña
      //Uso el sincrono para poder generar las vueltas y la complejidad de contraseña 10 default
      const salt = bcrypt.genSaltSync();
      user.password = bcrypt.hashSync(user.password, salt);
      await user.save();
      return res.status(201).json({
        ok: true,
        uid: user.id,
        name: user.firstName,
        employeePosition: user.employeePosition,
      });
    });
  } catch (err) {
    console.log(`Method: Post 
                Path: /api/user/new
                Date: ${Date()}
                Error: ${err}`);
    return res.status(500).json({
      ok: false,
      msg: 'Not register user',
    });
  }
};

const getUsers = async (req, res = response) => {
  try {
    const users = await User.find({});
    return res.status(200).json({
      ok: true,
      msg: 'Get users',
      users,
    });
  } catch (err) {
    console.log(`Method: Get
                 Path: /api/user
                 Date: ${Date()}
                 Error: ${err}`);
    return res.status(500).json({
      ok: false,
      msg: 'Error internal',
    });
  }
};

const getUserById = async (req, res = response) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      return res.status(200).json({
        ok: true,
        msg: 'Get user by ID',
        user,
      });
    } else {
      return res.status(404).json({
        ok: false,
        msg: 'User not found',
      });
    }
  } catch (err) {
    console.log(`Method: Get
                 Path: /api/user/:id
                 Date: ${Date()}
                Error: ${err}`);
    return res.status(500).json({
      ok: false,
      msg: 'Error internal',
    });
  }
};

const updateUser = async (req, res = response) => {
  try {
    let userResult = await User.findById(req.params.id);
    if (!userResult) {
      return res.status(404).json({
        ok: false,
        msg: 'User not found',
      });
    }
    const userU = { ...req.body, _id: req.params.id };
    userU.email = userU.email.toLowerCase();
    //Encriptar contraseña
    //Uso el sincrono para poder generar las vueltas y la complejidad de contraseña 10 default
    const salt = bcrypt.genSaltSync();
    userU.password = bcrypt.hashSync(userU.password, salt);
    userResult = await User.findByIdAndUpdate(req.params.id, userU, {
      new: true,
    });
    if (!userResult) {
      return res.status(404).json({
        ok: false,
        msg: 'User not updated',
      });
    } else {
      return res.status(200).json({
        ok: true,
        msg: 'Update user',
        user: userResult,
      });
    }
  } catch (err) {
    console.log(`Method: Put
                 Path: /api/user/:id
                 Date: ${Date()}
                 Error: ${err}`);
    return res.status(500).json({
      ok: false,
      msg: 'Error internal',
    });
  }
};

const deleteUser = async (req, res = response) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      User.findByIdAndDelete(user.id, (err) => {
        if (err) {
          console.log(`Method: Delete
                       Path: /api/user/:id
                       Date: ${Date()}
                       Error: ${err}`);
          return res.status(500).json({
            ok: false,
            msg: 'Error internal - delete not concreted',
          });
        }
        return res.status(200).json({
          ok: true,
          msg: 'Delete',
          proccess: 'ok',
        });
      });
    } else {
      return res.status(404).json({
        ok: false,
        msg: 'User not found',
      });
    }
  } catch (err) {
    console.log(`Method: Delete
                 Path: /api/user/:id
                 Date: ${Date()}
                 Error: ${err}`);
    return res.status(500).json({
      ok: false,
      msg: 'Error internal',
    });
  }
};

module.exports = {
  newUser,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
};
