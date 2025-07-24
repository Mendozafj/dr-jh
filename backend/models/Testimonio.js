const mongoose = require('mongoose');

const TestimonioSchema = new mongoose.Schema({
  mensaje: { type: String, required: true },
  autor: {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    nombre: { type: String, required: true },
    email: { type: String, required: true },
  },
  fecha: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Testimonio', TestimonioSchema); 