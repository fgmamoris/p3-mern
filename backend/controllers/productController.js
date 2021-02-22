const { response } = require('express');
const Product = require('../models/product');

const newProduct = async (req, res = response) => {
  try {
    await Product.find({}, async function (err, products) {
      //Todo lo que venga de mas en el body lo ingnora
      let product = new Product(req.body);
      if (products.length != 0) {
        product.code = products[products.length - 1].code + 1;
      }
      await product.save();
      return res.status(201).json({
        ok: true,
        product,
      });
    });
  } catch (err) {
    console.log(`Method: Post
                 Path: /api/product/new
                 Date: ${Date()}
                 Error: ${err}`);
    return res.status(500).json({
      ok: false,
      msg: 'Not register product',
    });
  }
};
const getProducts = async (req, res = response) => {
  try {
    const products = await Product.find({});
    return res.status(200).json({
      ok: true,
      msg: 'Get Products',
      products,
    });
  } catch (err) {
    console.log(`Method: Get
    Path: /api/product
    Date: ${Date()}
    Error: ${err}`);
    return res.status(500).json({
      ok: false,
      msg: 'Error internal',
    });
  }
};
const getProductById = async (req, res = response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      return res.status(200).json({
        ok: true,
        msg: 'Get product by ID',
        product,
      });
    } else {
      return res.status(404).json({
        ok: false,
        msg: 'Product not found',
      });
    }
  } catch (err) {
    console.log(`Method: Get
                 Path: /api/product/:id
                 Date: ${Date()}
                 Error: ${err}`);
    return res.status(500).json({
      ok: false,
      msg: 'Error internal',
    });
  }
};
const updateProduct = async (req, res = response) => {
  try {
    let productResult = await Product.findById(req.params.id);
    if (!productResult) {
      return res.status(404).json({
        ok: false,
        msg: 'Product not found',
      });
    }
    const productU = { ...req.body, _id: req.params.id };
    productResult = await Product.findByIdAndUpdate(req.params.id, productU, {
      new: true,
    });
    if (!productResult) {
      return res.status(404).json({
        ok: false,
        msg: 'Product not updated',
      });
    } else {
      return res.status(200).json({
        ok: true,
        msg: 'Updated product',
        productResult,
      });
    }
  } catch (err) {
    console.log(`Method: Put
                 Path: /api/product/:id
                 Date: ${Date()}
                 Error: ${err}`);
    return res.status(500).json({
      ok: false,
      msg: 'Error internal',
    });
  }
};
const deleteProduct = async (req, res = response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      Product.findByIdAndDelete(product.id, (err) => {
        if (err) {
          console.log(`Method: Delete
                      Path: /api/product/:id
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
        msg: 'Product not found',
      });
    }
  } catch (err) {
    console.log(`Method: Delete
                 Path: /api/product/:id
                 Date: ${Date()}
                 Error: ${err}`);
    return res.status(500).json({
      ok: false,
      msg: 'Error internal',
    });
  }
};

module.exports = {
  newProduct,
  getProductById,
  getProducts,
  updateProduct,
  deleteProduct,
};
