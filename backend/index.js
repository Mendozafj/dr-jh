require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de la base de datos
const dbName = 'drjh';
let mongoUri = process.env.MONGO_URI;
if (!mongoUri.endsWith('/')) mongoUri += '/';
mongoUri += dbName;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Swagger/OpenAPI setup
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Dr. JGH',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'],
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Importar rutas de usuarios, noticias y testimonios
app.use('/api/auth', require('./routes/auth'));
app.use('/api/news', require('./routes/news'));
app.use('/api/testimonios', require('./routes/testimonios'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en puerto ${PORT}`);
}); 