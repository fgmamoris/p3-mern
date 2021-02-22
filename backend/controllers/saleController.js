const { response } = require('express');
const Sale = require('../models/sale');

const newSale = async (req, res = response) => {
  try {
    await Sale.find({}, async function (err, sales) {
      //Todo lo que venga de mas en el body lo ingnora
      let sale = new Sale(req.body);
      //sale.paidDate = new Date();
      if (sales.length != 0) {
        sale.code = sales[sales.length - 1].code + 1;
      }

      await sale.save();
      res.status(201).json({
        ok: true,
        sale,
      });
    });
  } catch (err) {
    console.log(`Method: Post
     Path: /api/sale/new
     Date: ${Date()}
     Error: ${err}`);
    res.status(500).json({
      ok: false,
      msg: 'Not register sale',
    });
  }
};
const getSales = async (req, res = response) => {
  try {
    const sales = await Sale.find({});
    res.status(200).json({
      ok: true,
      msg: 'Get Sales',
      sales,
    });
  } catch (err) {
    console.log(`Method: Get
    Path: /api/sale
    Date: ${Date()}
    Error: ${err}`);
    res.status(500).json({
      ok: false,
      msg: 'Error internal',
    });
  }
};
const getSaleById = async (req, res = response) => {
  try {
    const sale = await Sale.findById(req.params.id);
    if (sale) {
      res.status(200).json({
        ok: true,
        msg: 'Get sale by ID',
        sale,
      });
    } else {
      res.status(404).json({
        ok: false,
        msg: 'Sale not found',
      });
    }
  } catch (err) {
    console.log(`Method: Get
    Path: /api/sale/:id
    Date: ${Date()}
    Error: ${err}`);
    res.status(500).json({
      ok: false,
      msg: 'Error internal',
    });
  }
};
const updateSale = async (req, res = response) => {
  try {
    let saleResult = await Sale.findById(req.params.id);
    if (!saleResult) {
      res.status(404).json({
        ok: false,
        msg: 'Sale not found',
      });
    }
    const saleU = { ...req.body, _id: req.params.id };

    saleResult = await Sale.findByIdAndUpdate(req.params.id, saleU, {
      new: true,
    });

    if (!saleResult) {
      res.status(404).json({
        ok: false,
        msg: 'Sale not updated',
      });
    } else {
      res.status(200).json({
        ok: true,
        msg: 'Updated sale',
        sale: saleResult,
      });
    }
  } catch (err) {
    console.log(`Method: Put
    Path: /api/sale/:id
    Date: ${Date()}
    Error: ${err}`);
    res.status(500).json({
      ok: false,
      msg: 'Error internal',
    });
  }
};

module.exports = {
  newSale,
  getSaleById,
  getSales,
  updateSale,
};
