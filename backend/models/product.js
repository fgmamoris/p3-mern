const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var productSchema = new Schema({
  name: { type: String, required: true },
  tradeMark: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  qty: { type: Number, required: true },
  mediaUrl: {
    type: String,
  },
  code: { type: Number, default: 1 },
});
//Metodo de instancias, responde a la instancia de este esquema
productSchema.methods.toString = function () {
  return (
    'Code of Product: ' +
    this.code +
    'Name: ' +
    this.name +
    'TradeMark: ' +
    this.tradeMark +
    '\n Description: ' +
    this.description +
    '\n Price: ' +
    this.price +
    '\n Quantity: ' +
    this.qty
  );
};

module.exports = mongoose.model('Product', productSchema);
