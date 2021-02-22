const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var saleSchema = new Schema({
  code: { type: Number, default: 1 },
  seller: {
    type: String,
    required: true,
  },
  products: [
    {
      code: {
        type: Number,
        required: true,
      },
      name: { type: String, required: true },
      tradeMark: { type: String, required: true },
      qty: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      amountProduct: {
        type: Number,
        required: true,
      },
    },
  ],
  client: {
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
  },
  paymentBreakdown: {
    paymentMethod: { type: String, required: true },
    card: { type: Number },
    paidDate: { type: Date, default: Date() },
  },

  totalAmount: {
    type: Number,
    required: true,
  },
  state: {
    type: String,
    default: 'active',
  },
});

//Metodo de instancias, responde a la instancia de este esquema
saleSchema.methods.toString = function () {
  return (
    'Code of Sale: ' +
    this.code +
    'Customer: ' +
    this.user +
    'List of product: ' +
    this.products +
    'Total amount: ' +
    this.totalAmount +
    '\n Client ' +
    this.client +
    '\n Payment ' +
    this.paymentBreakdown
  );
};

module.exports = mongoose.model('Sale', saleSchema);
