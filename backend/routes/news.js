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
  const noticia = new News({ title, description, image, author: req.user.email });
  await noticia.save();
  res.json({ message: 'Noticia creada' });
});

module.exports = router; 