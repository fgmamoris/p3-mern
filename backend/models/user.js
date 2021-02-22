const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true, min: 6 },
  employeePosition: {
    type: String,
    required: true,
    enum: ['gerente', 'vendedor'],
  },
  mediaUrl: {
    type: String,
  },
});
//Metodo de instancias, responde a la instancia de este esquema
userSchema.methods.toString = function () {
  return (
    'Name: ' +
    this.firstName +
    '\n Last Name: ' +
    this.lastName +
    '\n Employee Position: ' +
    this.employeePosition +
    '\n Email: ' +
    this.email
  );
};

module.exports = model('User', userSchema);
