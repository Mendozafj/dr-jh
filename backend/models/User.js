const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  telefono: { type: String, required: true },
  fechaNacimiento: { type: Date, required: true },
  password: { type: String, required: true },
  rol: { type: String, enum: ['user', 'admin'], default: 'user' },
});

module.exports = mongoose.model('User', UserSchema); 