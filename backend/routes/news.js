const express = require('express');
const jwt = require('jsonwebtoken');
const News = require('../models/News');
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
 * /api/news:
 *   get:
 *     summary: Obtener todas las noticias
 *     tags: [News]
 *     responses:
 *       200:
 *         description: Lista de noticias
 */
router.get('/', async (req, res) => {
  const news = await News.find().sort({ date: -1 });
  res.json(news);
});

/**
 * @swagger
 * /api/news:
 *   post:
 *     summary: Crear una noticia
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Noticia creada
 */
router.post('/', auth, async (req, res) => {
  const { title, description, image } = req.body;
  if (!title || !description || !image) return res.status(400).json({ error: 'Faltan datos' });
  const user = await require('../models/User').findById(req.user.id);
  if (!user || user.rol !== 'admin') return res.status(403).json({ error: 'Solo administradores pueden publicar noticias' });
  const noticia = new News({ title, description, image, author: user.email });
  await noticia.save();
  res.json({ message: 'Noticia creada' });
});

/**
 * @swagger
 * /api/news/{id}:
 *   get:
 *     summary: Obtener una noticia por ID
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Noticia encontrada
 *       404:
 *         description: Noticia no encontrada
 *   delete:
 *     summary: Eliminar una noticia
 *     tags: [News]
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
 *         description: Noticia eliminada
 *       404:
 *         description: Noticia no encontrada
 */
router.get('/:id', async (req, res) => {
  try {
    const noticia = await News.findById(req.params.id);
    if (!noticia) return res.status(404).json({ error: 'Noticia no encontrada' });
    res.json(noticia);
  } catch {
    res.status(404).json({ error: 'Noticia no encontrada' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  const user = await require('../models/User').findById(req.user.id);
  if (!user || user.rol !== 'admin') return res.status(403).json({ error: 'Solo administradores pueden eliminar noticias' });
  const noticia = await News.findById(req.params.id);
  if (!noticia) return res.status(404).json({ error: 'Noticia no encontrada' });
  await noticia.deleteOne();
  res.json({ message: 'Noticia eliminada' });
});

module.exports = router; 