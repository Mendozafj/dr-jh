const express = require('express');
const jwt = require('jsonwebtoken');
const Testimonio = require('../models/Testimonio');
const User = require('../models/User');
const router = express.Router();

function auth(req, res, next) {
  const header = req.headers['authorization'];
  if (!header) return res.status(401).json({ error: 'No token' });
  const token = header.split(' ')[1];
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido' });
  }
}

/**
 * @swagger
 * /api/testimonios:
 *   get:
 *     summary: Obtener todos los testimonios
 *     tags: [Testimonios]
 *     responses:
 *       200:
 *         description: Lista de testimonios
 *   post:
 *     summary: Crear un testimonio
 *     tags: [Testimonios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mensaje:
 *                 type: string
 *     responses:
 *       200:
 *         description: Testimonio creado
 */
router.get('/', async (req, res) => {
  const testimonios = await Testimonio.find().sort({ fecha: -1 });
  res.json(testimonios);
});

router.post('/', auth, async (req, res) => {
  const { mensaje } = req.body;
  if (!mensaje) return res.status(400).json({ error: 'Falta el mensaje' });
  const user = await User.findById(req.user.id);
  if (!user) return res.status(401).json({ error: 'Usuario no encontrado' });
  const testimonio = new Testimonio({
    mensaje,
    autor: { _id: user._id, nombre: user.nombre, email: user.email },
  });
  await testimonio.save();
  res.json({ message: 'Testimonio creado' });
});

/**
 * @swagger
 * /api/testimonios/{id}:
 *   put:
 *     summary: Editar un testimonio propio
 *     tags: [Testimonios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mensaje:
 *                 type: string
 *     responses:
 *       200:
 *         description: Testimonio actualizado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Testimonio no encontrado
 *   delete:
 *     summary: Eliminar un testimonio propio
 *     tags: [Testimonios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Testimonio eliminado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Testimonio no encontrado
 */
router.put('/:id', auth, async (req, res) => {
  const { mensaje } = req.body;
  const testimonio = await Testimonio.findById(req.params.id);
  if (!testimonio) return res.status(404).json({ error: 'Testimonio no encontrado' });
  if (String(testimonio.autor._id) !== req.user.id) return res.status(403).json({ error: 'No autorizado' });
  testimonio.mensaje = mensaje;
  await testimonio.save();
  res.json({ message: 'Testimonio actualizado' });
});

router.delete('/:id', auth, async (req, res) => {
  const testimonio = await Testimonio.findById(req.params.id);
  if (!testimonio) return res.status(404).json({ error: 'Testimonio no encontrado' });
  if (String(testimonio.autor._id) !== req.user.id) return res.status(403).json({ error: 'No autorizado' });
  await testimonio.deleteOne();
  res.json({ message: 'Testimonio eliminado' });
});

module.exports = router; 