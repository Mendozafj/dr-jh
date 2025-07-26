# Cátedra Dr. José Gregorio Hernández

Landing page responsiva para la Cátedra Dr. José Gregorio Hernández con sistema de autenticación, gestión de noticias y testimonios.

## Requerimientos del Proyecto

### Versiones Requeridas
- **Node.js**: v16.0.0 o superior
- **npm**: v8.0.0 o superior
- **MongoDB**: v5.0.0 o superior

### Dependencias Principales
- **Frontend**: React, React Router DOM, Fontsource
- **Backend**: Express.js, Mongoose, bcryptjs, jsonwebtoken, cors

#### Instalar Dependencias
```bash
cd backend
npm install
```

#### Configurar Variables de Entorno
Crear un archivo `.env` en la carpeta `backend/` con las siguientes variables:

```env
# Configuración de la Base de Datos
MONGO_URI=mongodb://localhost:27017
DB_NAME=drjh

# Configuración del Servidor
PORT=4000

# Configuración de JWT (cambiar por una clave segura en producción)
JWT_SECRET=tu_clave_secreta_aqui

# Configuración de CORS (opcional)
CORS_ORIGIN=http://localhost:5173
```

### 3. Configurar el Frontend

#### Instalar Dependencias
```bash
cd frontend
npm install
```

##  Ejecutar el Proyecto

### Ejecutar el Backend
```bash
cd backend
npm start
```
El servidor estará disponible en: `http://localhost:4000`

### Ejecutar el Frontend
```bash
cd frontend
npm run dev
```
La aplicación estará disponible en: `http://localhost:5173`

## Estructura del Proyecto

```
dr-jh/
├── frontend/                 # Aplicación React
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   ├── assets/         # Imágenes y recursos
│   │   ├── App.jsx         # Componente principal
│   │   └── App.css         # Estilos globales
│   └── package.json
├── backend/                  # Servidor Express
│   ├── models/             # Modelos de MongoDB
│   ├── routes/             # Rutas de la API
│   ├── index.js            # Servidor principal
│   └── package.json
└── README.md
```

## API Endpoints

### Autenticación
- `POST /api/auth/register` - Registro de usuarios
- `POST /api/auth/login` - Inicio de sesión

### Noticias
- `GET /api/news` - Obtener todas las noticias
- `POST /api/news` - Crear noticia (solo admin)
- `GET /api/news/:id` - Obtener noticia específica
- `DELETE /api/news/:id` - Eliminar noticia (solo admin)

### Testimonios
- `GET /api/testimonios` - Obtener todos los testimonios
- `POST /api/testimonios` - Crear testimonio (usuario autenticado)
- `PUT /api/testimonios/:id` - Editar testimonio (autor)
- `DELETE /api/testimonios/:id` - Eliminar testimonio (autor)

## Roles de Usuario

- **Usuario**: Puede crear testimonios y ver noticias
- **Administrador**: Puede crear, editar y eliminar noticias

## Documentación API

La documentación de la API está disponible en:
`http://localhost:4000/api-docs`
