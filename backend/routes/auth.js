const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario registrado
 */
router.post('/register', async (req, res) => {
  const { email, password, nombre, telefono, fechaNacimiento } = req.body;
  if (!email || !password || !nombre || !telefono || !fechaNacimiento) return res.status(400).json({ error: 'Faltan datos' });
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ error: 'Usuario ya existe' });
  const hash = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hash, nombre, telefono, fechaNacimiento });
  await user.save();
  res.json({ message: 'Usuario registrado' });
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token JWT
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: 'Credenciales inválidas' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: 'Credenciales inválidas' });
  const token = jwt.sign(
    { id: user._id, email: user.email, rol: user.rol },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '1d' }
  );
  res.json({ token });
});

module.exports = router; 