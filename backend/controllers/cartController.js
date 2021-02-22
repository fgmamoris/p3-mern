const { response } = require('express');
const Cart = require('../models/cart');

const getCart = async (req, res = response) => {
  try {
    const cart = await Cart.find();
    if (cart) {
      return res.status(200).json({
        ok: true,
        msg: 'Get cart',
        cart,
      });
    } else {
      return res.status(404).json({
        ok: false,
        msg: 'carts not found ',
      });
    }
  } catch (err) {
    console.log(`Method: Get
                 Path: /api/cart/
                 Date: ${Date()}
                  Error: ${err}`);
    return res.status(500).json({
      ok: false,
      msg: 'Error internal',
    });
  }
};

const getCartByUser = async (req, res = response) => {
  const uid = req.uid;
  try {
    const cart = await Cart.findOne({ user: uid });
    if (cart) {
      return res.status(200).json({
        ok: true,
        msg: 'Get cart by user',
        cart,
      });
    } else {
      return res.status(200).json({
        ok: true,
        msg: 'Get cart by user',
        cart: { user: '', products: [] },
      });
    }
  } catch (err) {
    console.log(`Method: Get
                 Path: /api/cart/
                 Date: ${Date()}
                  Error: ${err}`);
    return res.status(500).json({
      ok: false,
      msg: 'Error internal',
    });
  }
};

const newCart = async (req, res = response) => {
  const uid = req.uid;

  try {
    const cart = await Cart.findOne({ user: uid });
    if (cart) {
      return res.status(412).json({
        ok: false,
        msg: 'this user already owns a cart, cannot create a new one',
      });
    } else {
      const cart = new Cart(req.body);
      await cart.save();
      return res.status(201).json({
        ok: true,
        cart: cart,
      });
    }
  } catch (err) {
    console.log(`Method: Post 
                Path: /api/cart/new
                Date: ${Date()}
                Error: ${err}`);
    return res.status(500).json({
      ok: false,
      msg: 'Not register cart',
    });
  }
};

const updateCart = async (req, res = response) => {
  const uid = req.uid;

  try {
    const cart = await Cart.findOne({ user: uid });
    if (!cart) {
      return res.status(404).json({
        ok: false,
        msg: 'Cart not found',
      });
    }
    const cartU = { ...req.body, _id: req.params.id };

    cartResult = await Cart.findByIdAndUpdate(req.params.id, cartU, {
      new: true,
    });
    if (!cartResult) {
      return res.status(404).json({
        ok: false,
        msg: 'Cart not updated',
      });
    } else {
      return res.status(200).json({
        ok: true,
        msg: 'Update cart',
        cart: cartResult,
      });
    }
  } catch (err) {
    console.log(`Method: Put
                 Path: /api/cart/:id
                Date: ${Date()}
                Error: ${err}`);
    return res.status(500).json({
      ok: false,
      msg: 'Error internal',
    });
  }
};

const deleteCart = async (req, res = response) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (cart) {
      Cart.findByIdAndDelete(cart.id, (err) => {
        if (err) {
          console.log(`Method: Delete
                       Path: /api/cart/:id
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
        msg: 'Cart not found',
      });
    }
  } catch (err) {
    console.log(`Method: Delete
                 Path: /api/cart/:id
                 Date: ${Date()}
                 Error: ${err}`);
    return res.status(500).json({
      ok: false,
      msg: 'Error internal',
    });
  }
};

module.exports = {
  newCart,
  getCart,
  getCartByUser,
  updateCart,
  deleteCart,
};
