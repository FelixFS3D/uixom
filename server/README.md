# UIXOM - Backend API

Backend API RESTful construido con Node.js, Express y MongoDB.

---

## 📋 Índice

- [Características](#características)
- [Stack Tecnológico](#stack-tecnológico)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Scripts Disponibles](#scripts-disponibles)
- [API Endpoints](#api-endpoints)
- [Variables de Entorno](#variables-de-entorno)
- [Testing](#testing)

---

## ✨ Características

- ✅ API RESTful con Express
- ✅ Autenticación JWT
- ✅ Control de acceso basado en roles (RBAC)
- ✅ Validación de datos con Joi
- ✅ ODM con Mongoose
- ✅ Rate limiting por IP
- ✅ Logging con Winston
- ✅ Notificaciones por email (Nodemailer)
- ✅ Documentación con Swagger/OpenAPI
- ✅ Tests con Jest y Supertest
- ✅ CORS configurado
- ✅ Security headers
- ✅ Error handling centralizado

---

## 🚀 Stack Tecnológico

| Paquete | Versión | Propósito |
|---------|---------|-----------|
| **express** | ^4.18.2 | Web framework |
| **mongoose** | ^8.0.0 | MongoDB ODM |
| **jsonwebtoken** | ^9.0.2 | JWT authentication |
| **bcryptjs** | ^2.4.3 | Password hashing |
| **joi** | ^17.11.0 | Data validation |
| **nodemailer** | ^6.9.7 | Email sending |
| **winston** | ^3.11.0 | Logging |
| **cors** | ^2.8.5 | CORS middleware |
| **helmet** | ^7.1.0 | Security headers |
| **express-rate-limit** | ^7.1.5 | Rate limiting |
| **swagger-jsdoc** | ^6.2.8 | Swagger generation |
| **swagger-ui-express** | ^5.0.0 | Swagger UI |
| **jest** | ^29.7.0 | Testing framework |
| **supertest** | ^6.3.3 | HTTP testing |

Ver [package.json](package.json) para la lista completa.

---

## 📁 Estructura del Proyecto

```
server/
├── config/
│   ├── index.js         # Configuración central (env vars)
│   ├── logger.js        # Configuración Winston
│   └── swagger.js       # Configuración Swagger
│
├── controllers/
│   ├── authController.js       # Login, register, logout
│   ├── usersController.js      # CRUD usuarios
│   └── requestsController.js   # CRUD solicitudes
│
├── db/
│   └── index.js         # Conexión MongoDB
│
├── middleware/
│   ├── auth.js          # Verificación JWT
│   ├── roles.js         # Control de acceso por rol
│   └── validateBody.js  # Validación con Joi
│
├── models/
│   ├── User.js          # Modelo de usuario
│   └── Request.js       # Modelo de solicitud
│
├── routes/
│   ├── auth.js          # Rutas de autenticación
│   ├── users.js         # Rutas de usuarios
│   └── requests.js      # Rutas de solicitudes
│
├── services/
│   └── emailService.js  # Servicio de emails
│
├── validators/
│   ├── authSchemas.js   # Schemas Joi para auth
│   ├── userSchemas.js   # Schemas Joi para users
│   └── requestSchemas.js # Schemas Joi para requests
│
├── scripts/
│   ├── createAdmin.js   # Script para crear admin
│   └── setup.js         # Script de setup inicial
│
├── __tests__/
│   └── requests.test.js # Tests de integración
│
├── logs/                # Archivos de log (ignorado en git)
├── app.js               # Configuración Express
├── server.js            # Entry point
├── Dockerfile           # Build de producción
├── package.json
└── .env.example         # Template de variables de entorno
```

---

## 🏁 Instalación

### Requisitos Previos

- Node.js 18+ y npm
- MongoDB 7+ (local o MongoDB Atlas)

### Pasos

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus valores

# 3. (Opcional) Crear usuario admin
npm run create-admin

# 4. Iniciar servidor
npm run dev  # Desarrollo con auto-reload
npm start    # Producción
```

---

## 📜 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Iniciar con nodemon (auto-reload)

# Producción
npm start                # Iniciar servidor

# Testing
npm test                 # Ejecutar tests
npm run test:coverage    # Tests con coverage

# Utilidades
npm run create-admin     # Crear usuario administrador
npm run lint             # Linter (si está configurado)
```

---

## 🔌 API Endpoints

### Autenticación

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Registrar usuario | No |
| POST | `/api/auth/login` | Login | Sí |
| POST | `/api/auth/logout` | Logout | Sí |

### Usuarios

| Método | Endpoint | Descripción | Rol Requerido |
|--------|----------|-------------|---------------|
| GET | `/api/users` | Listar usuarios | manager, admin |
| GET | `/api/users/me` | Perfil actual | user, manager, admin |
| PATCH | `/api/users/me` | Actualizar perfil | user, manager, admin |
| PATCH | `/api/users/:id/role` | Cambiar rol | admin |
| PATCH | `/api/users/:id/status` | Activar/desactivar | admin |

### Solicitudes (Requests)

| Método | Endpoint | Descripción | Rol Requerido |
|--------|----------|-------------|---------------|
| GET | `/api/requests` | Listar solicitudes | user, manager, admin |
| POST | `/api/requests` | Crear solicitud | user, manager, admin |
| GET | `/api/requests/:id` | Detalle de solicitud | user (solo propias), manager, admin |
| PATCH | `/api/requests/:id` | Actualizar solicitud | manager, admin |
| DELETE | `/api/requests/:id` | Eliminar solicitud | admin |

### Documentación

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api-docs` | Swagger UI (documentación interactiva) |
| GET | `/api/health` | Health check |

**Documentación completa:** http://localhost:5005/api-docs (cuando el servidor esté corriendo)

---

## ⚙️ Variables de Entorno

Copiar `.env.example` a `.env` y configurar:

### Esenciales

```env
NODE_ENV=development              # development | production | test
PORT=5005                         # Puerto del servidor
MONGODB_URI=mongodb://...         # URI de MongoDB
JWT_SECRET=your_secret_here       # Secret para JWT (min 32 chars)
```

### CORS y Seguridad

```env
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
CORS_ALLOW_CREDENTIALS=true
TRUST_PROXY=false                 # true en producción con nginx
RATE_LIMIT_WINDOW_MINUTES=15
RATE_LIMIT_MAX=100
```

### Email (Opcional)

```env
SMTP_HOST=smtp.gmail.com          # O smtp.resend.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=tu@email.com
SMTP_PASS=tu_app_password
EMAIL_FROM=Uixom <noreply@example.com>
EMAIL_TEAM_TO=equipo@example.com
EMAIL_REPLY_TO=soporte@example.com
```

### Admin Inicial

```env
ADMIN_NAME=Admin
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=changeme123
```

Ver [.env.example](.env.example) para todas las variables disponibles.

---

## 🧪 Testing

```bash
# Ejecutar todos los tests
npm test

# Tests con coverage
npm run test:coverage

# Ver reporte de coverage
start coverage/lcov-report/index.html  # Windows
open coverage/lcov-report/index.html    # Mac/Linux
```

### Estructura de Tests

```
__tests__/
├── requests.test.js     # Tests de endpoints de requests
├── users.test.js        # Tests de endpoints de users (TODO)
└── auth.test.js         # Tests de autenticación (TODO)
```

---

## 🔒 Seguridad

### Medidas Implementadas

1. **Autenticación:**
   - JWT stateless
   - Tokens con expiración
   - Refresh tokens (TODO)

2. **Passwords:**
   - Bcrypt con 10-12 rounds
   - Nunca se retornan en responses

3. **Validación:**
   - Joi schemas en todos los inputs
   - Sanitización de datos

4. **Rate Limiting:**
   - 100 requests/15min por IP (configurable)

5. **Headers de Seguridad:**
   - Helmet configurado
   - CORS restrictivo

6. **MongoDB:**
   - Mongoose sanitization
   - Prevención de NoSQL injection

Ver [../docs/SEGURIDAD.md](../docs/SEGURIDAD.md) para más detalles.

---

## 📝 Logging

Winston está configurado para logging:

```javascript
const logger = require('./config/logger');

logger.info('Info message');
logger.error('Error message', { error });
logger.warn('Warning message');
logger.debug('Debug message', { data });
```

**Archivos de log:**
- `logs/combined.log` - Todos los logs
- `logs/error.log` - Solo errores
- Console output en desarrollo

---

## 🐳 Docker

### Build

```bash
# Desde la raíz del proyecto
docker build -f server/Dockerfile -t uixom-backend .
```

### Run

```bash
docker run -d \
  --name uixom-backend \
  -p 5005:5005 \
  --env-file server/.env \
  uixom-backend
```

Ver [../docs/DESPLIEGUE.md](../docs/DESPLIEGUE.md) para deployment completo.

---

## 📚 Recursos

- **Express:** https://expressjs.com/
- **Mongoose:** https://mongoosejs.com/
- **JWT:** https://jwt.io/
- **Joi:** https://joi.dev/
- **Winston:** https://github.com/winstonjs/winston
- **Swagger:** https://swagger.io/

---

## 🔗 Enlaces

- [Documentación Principal](../README.md)
- [Frontend README](../client/README.md)
- [Guía de Desarrollo](../docs/DESARROLLO.md)
- [Arquitectura](../docs/ARQUITECTURA.md)

---

**Versión:** 1.0.0  
**Última actualización:** Mayo 2026
