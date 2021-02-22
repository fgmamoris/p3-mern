const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var cartSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      qtyOrder: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model('Cart', cartSchema);
