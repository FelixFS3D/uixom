# 👨‍💻 Guía de Desarrollo - UIXOM

> Guía para desarrolladores que quieren contribuir o ejecutar UIXOM localmente

---

## 📋 Índice

1. [Configuración del Entorno](#1-configuración-del-entorno)
2. [Instalación](#2-instalación)
3. [Ejecución Local](#3-ejecución-local)
4. [Estructura del Proyecto](#4-estructura-del-proyecto)
5. [API Documentation](#5-api-documentation)
6. [Testing](#6-testing)
7. [Convenciones de Código](#7-convenciones-de-código)
8. [Git Workflow](#8-git-workflow)

---

## 1. Configuración del Entorno

### Pre-requisitos

```powershell
# Node.js 18+ y npm
node --version  # v18.x.x o superior
npm --version   # v9.x.x o superior

# Git
git --version

# Docker (opcional para desarrollo)
docker --version
docker-compose --version
```

### Instalación de Node.js

**Windows:**
- Descargar desde: https://nodejs.org/
- Instalar versión LTS (18.x o superior)

**Verificar:**
```powershell
node --version
npm --version
```

---

## 2. Instalación

### 2.1 Clonar Repositorio

```powershell
git clone https://github.com/TU_USUARIO/uixom.git
cd uixom
```

### 2.2 Configurar Variables de Entorno

#### Opción A: Desarrollo con Docker Compose (Recomendado)

```powershell
# Copiar .env.example a .env en la raíz
copy .env.example .env

# Editar .env y ajustar valores
notepad .env
```

Variables importantes:
```env
MONGO_USER=admin
MONGO_PASSWORD=changeme_dev
MONGO_DB=uixom
JWT_SECRET=dev_secret_min_32_chars
VITE_API_URL=http://localhost:5005
```

#### Opción B: Desarrollo sin Docker

```powershell
# Backend
cd server
copy .env.example .env
notepad .env

# Frontend
cd ..\client
copy .env.example .env
notepad .env
```

**server/.env:**
```env
NODE_ENV=development
PORT=5005
MONGODB_URI=mongodb://localhost:27017/uixom
JWT_SECRET=dev_secret_change_this
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
# ... resto de variables
```

**client/.env:**
```env
VITE_API_URL=http://localhost:5005
```

### 2.3 Instalar MongoDB Local (si no usas Docker)

**Windows:**
```powershell
# Opción 1: Instalador
# Descargar desde: https://www.mongodb.com/try/download/community
# Instalar como servicio

# Opción 2: Chocolatey
choco install mongodb

# Verificar
mongosh --version
```

**Iniciar MongoDB:**
```powershell
# Si está como servicio, ya está corriendo
# Si no:
mongod --dbpath C:\data\db
```

---

## 3. Ejecución Local

### Opción A: Con Docker Compose (Recomendado)

```powershell
# Desde la raíz del proyecto
docker-compose up -d

# Ver logs
docker-compose logs -f

# Servicios disponibles:
# - Frontend: http://localhost (puerto 80)
# - Backend: http://localhost:5005
# - MongoDB: localhost:27017
# - Mongo Express: http://localhost:8081

# Detener
docker-compose down

# Detener y eliminar volúmenes (⚠️ borra la DB)
docker-compose down -v
```

### Opción B: Sin Docker (Desarrollo Nativo)

#### Terminal 1: Backend

```powershell
cd server

# Instalar dependencias (solo primera vez)
npm install

# Crear usuario admin (solo primera vez)
npm run create-admin

# Desarrollo (con auto-reload)
npm run dev

# O modo normal
npm start
```

#### Terminal 2: Frontend

```powershell
cd client

# Instalar dependencias (solo primera vez)
npm install

# Desarrollo (con hot-reload)
npm run dev

# El navegador abrirá automáticamente: http://localhost:5173
```

#### Terminal 3: MongoDB

```powershell
# Si MongoDB no está como servicio
mongod --dbpath C:\data\db
```

---

## 4. Estructura del Proyecto

```
uixom/
├── client/                 # Frontend React + Vite
│   ├── src/
│   │   ├── api/            # Cliente HTTP (axios)
│   │   ├── components/     # Componentes React
│   │   │   ├── common/     # Componentes reutilizables
│   │   │   └── layout/     # Layouts (Navbar, Sidebar, etc.)
│   │   ├── pages/          # Páginas/Vistas
│   │   ├── routes/         # Configuración de rutas
│   │   ├── store/          # Estado global (Zustand)
│   │   └── utils/          # Utilidades y helpers
│   ├── Dockerfile          # Build de producción
│   ├── nginx.conf          # Config Nginx para producción
│   └── package.json
│
├── server/                 # Backend Node.js + Express
│   ├── config/             # Configuración (env, logger, swagger)
│   ├── controllers/        # Controladores (lógica de negocio)
│   ├── db/                 # Conexión a MongoDB
│   ├── middleware/         # Middlewares (auth, validation, etc.)
│   ├── models/             # Modelos Mongoose
│   ├── routes/             # Rutas de la API
│   ├── services/           # Servicios (email, etc.)
│   ├── validators/         # Esquemas Joi de validación
│   ├── scripts/            # Scripts útiles (createAdmin, etc.)
│   ├── __tests__/          # Tests unitarios y de integración
│   ├── app.js              # Configuración Express
│   ├── server.js           # Entry point
│   ├── Dockerfile          # Build de producción
│   └── package.json
│
├── docs/                   # Documentación
│   ├── DESPLIEGUE.md       # Guía de despliegue
│   ├── DESARROLLO.md       # Esta guía
│   ├── ARQUITECTURA.md     # Arquitectura del sistema
│   ├── SEGURIDAD.md        # Prácticas de seguridad
│   └── COMANDOS_UTILES.md  # Comandos útiles
│
├── nginx/                  # Configuración Nginx producción
├── scripts/                # Scripts de utilidad (backups, etc.)
├── docker-compose.yml      # Orquestación Docker desarrollo
├── .env.example            # Variables de entorno ejemplo
└── README.md               # Overview del proyecto
```

---

## 5. API Documentation

### Swagger UI

Cuando el backend está corriendo:
- **URL:** http://localhost:5005/api-docs
- **Documentación interactiva** de todos los endpoints

### Endpoints Principales

#### Auth
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout

#### Usuarios (requiere auth)
- `GET /api/users` - Listar usuarios (admin)
- `GET /api/users/me` - Perfil actual
- `PATCH /api/users/me` - Actualizar perfil
- `PATCH /api/users/:id/role` - Cambiar rol (admin)

#### Solicitudes (requiere auth)
- `GET /api/requests` - Listar solicitudes
- `POST /api/requests` - Crear solicitud
- `GET /api/requests/:id` - Detalle de solicitud
- `PATCH /api/requests/:id` - Actualizar solicitud
- `DELETE /api/requests/:id` - Eliminar solicitud

---

## 6. Testing

### Backend Tests

```powershell
cd server

# Ejecutar todos los tests
npm test

# Tests con coverage
npm run test:coverage

# Ver reporte de coverage
start coverage/lcov-report/index.html
```

### Frontend Tests (WIP)

```powershell
cd client

# Tests (cuando estén implementados)
npm test
```

---

## 7. Convenciones de Código

### JavaScript/JSX

#### Nombres
- **Variables/Funciones:** `camelCase`
- **Componentes React:** `PascalCase`
- **Constantes:** `UPPER_SNAKE_CASE`
- **Archivos:** Mismo nombre que el componente/clase principal

#### Formato
```javascript
// ✅ Correcto
const getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw new Error('User not found');
  }
};

// ✅ Correcto - Componente React
export const Button = ({ children, onClick, variant = 'primary' }) => {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  );
};
```

#### ESLint

```powershell
# Backend
cd server
npm run lint

# Frontend
cd client
npm run lint
```

### Commits

Seguir Conventional Commits:
```
feat: agregar endpoint de exportación de reportes
fix: corregir validación de email en registro
docs: actualizar guía de despliegue
style: formatear código con prettier
refactor: reorganizar estructura de carpetas
test: agregar tests para authController
chore: actualizar dependencias
```

---

## 8. Git Workflow

### Branches

- `main` - Producción (siempre estable)
- `develop` - Desarrollo (integración)
- `feature/*` - Features (ej: `feature/export-reports`)
- `fix/*` - Bug fixes (ej: `fix/login-validation`)

### Workflow Típico

```powershell
# 1. Crear nueva feature branch desde develop
git checkout develop
git pull origin develop
git checkout -b feature/nueva-funcionalidad

# 2. Hacer cambios y commits
git add .
git commit -m "feat: agregar nueva funcionalidad"

# 3. Push a tu branch
git push origin feature/nueva-funcionalidad

# 4. Crear Pull Request en GitHub
# develop ← feature/nueva-funcionalidad

# 5. Después de review y merge, actualizar local
git checkout develop
git pull origin develop

# 6. Eliminar branch local
git branch -d feature/nueva-funcionalidad
```

### Pull Request Checklist

Antes de crear PR, verificar:
- [ ] Código sigue convenciones
- [ ] Tests pasan (`npm test`)
- [ ] No hay errores de linting (`npm run lint`)
- [ ] Documentación actualizada si es necesario
- [ ] Variables de entorno documentadas en `.env.example`
- [ ] Commit messages son claros

---

## 9. Comandos Útiles

### Backend

```powershell
cd server

# Desarrollo con auto-reload
npm run dev

# Producción
npm start

# Tests
npm test
npm run test:coverage

# Linting
npm run lint

# Crear admin
npm run create-admin

# Ver logs (si usas Docker)
docker logs -f uixom-backend
```

### Frontend

```powershell
cd client

# Desarrollo
npm run dev

# Build producción
npm run build

# Preview build
npm run preview

# Linting
npm run lint
```

### Docker

```powershell
# Levantar todo
docker-compose up -d

# Ver logs
docker-compose logs -f

# Reiniciar servicio
docker-compose restart backend

# Rebuild
docker-compose up -d --build

# Detener todo
docker-compose down

# Detener y eliminar volúmenes
docker-compose down -v

# Ver contenedores corriendo
docker ps

# Ejecutar comando en contenedor
docker exec -it uixom-backend npm run create-admin
```

### MongoDB

```powershell
# Conectar a MongoDB (local)
mongosh

# Conectar a MongoDB (Docker)
mongosh mongodb://admin:password@localhost:27017/uixom?authSource=admin

# Ver bases de datos
show dbs

# Usar base de datos
use uixom

# Ver colecciones
show collections

# Ver documentos
db.users.find().pretty()
```

---

## 10. Debugging

### Backend

#### VSCode Launch Configuration

Crear `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Backend",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/server/server.js",
      "envFile": "${workspaceFolder}/server/.env"
    }
  ]
}
```

#### Console Logs

```javascript
// Usar el logger configurado
const logger = require('./config/logger');

logger.info('Info message');
logger.error('Error message', { error });
logger.debug('Debug message', { data });
```

### Frontend

#### React DevTools

Instalar extensión: [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools)

#### Console

```javascript
console.log('Debug:', data);
console.error('Error:', error);
console.table(arrayOfObjects);
```

---

## 🆘 Problemas Comunes

### "Cannot connect to MongoDB"
```powershell
# Verificar que MongoDB está corriendo
mongosh

# Si usa Docker
docker ps | grep mongo

# Reiniciar MongoDB
docker-compose restart db
```

### "Port 5005 already in use"
```powershell
# Windows - ver qué usa el puerto
netstat -ano | findstr :5005

# Matar proceso
taskkill /PID <PID> /F

# O cambiar puerto en server/.env
PORT=5006
```

### "Module not found"
```powershell
# Reinstalar dependencias
cd server
rm -rf node_modules package-lock.json
npm install

cd ../client
rm -rf node_modules package-lock.json
npm install
```

### "CORS error"
Verificar en `server/.env`:
```env
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

---

## 📚 Recursos

- **Express:** https://expressjs.com/
- **React:** https://react.dev/
- **Vite:** https://vitejs.dev/
- **MongoDB:** https://www.mongodb.com/docs/
- **Mongoose:** https://mongoosejs.com/
- **Tailwind CSS:** https://tailwindcss.com/
- **Docker:** https://docs.docker.com/

---

**Otras Guías:** [DESPLIEGUE.md](DESPLIEGUE.md) | [ARQUITECTURA.md](ARQUITECTURA.md)  
**Fecha:** Mayo 2026
