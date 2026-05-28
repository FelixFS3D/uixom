# UIXOM - Sistema de Gestión de Solicitudes

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.x-green.svg)](https://www.mongodb.com/)

Sistema web completo para gestión de solicitudes y usuarios con control de acceso basado en roles (RBAC). Built con Node.js, Express, React y MongoDB.

---

## 📸 Vista Previa

```
┌─────────────────────────────────────────┐
│  UIXOM - Gestión de Solicitudes         │
├─────────────────────────────────────────┤
│                                         │
│  🎯 Roles: Admin, Manager, User         │
│  📊 Dashboard con métricas             │
│  📋 CRUD completo de solicitudes        │
│  👥 Gestión de usuarios                 │
│  🔒 Autenticación JWT                   │
│  📧 Notificaciones por email            │
│  📱 Responsive (mobile-first)           │
│                                         │
└─────────────────────────────────────────┘
```

---

## ✨ Características

### Funcionalidades

- ✅ **Sistema de Autenticación**
  - Registro y login con JWT
  - Recuperación de contraseña por email
  - Sesiones persistentes

- ✅ **Control de Acceso (RBAC)**
  - 3 roles: User, Manager, Admin
  - Permisos granulares por endpoint
  - Dashboard personalizado por rol

- ✅ **Gestión de Solicitudes**
  - CRUD completo
  - Estados: Pending, In Progress, Completed, Rejected
  - Prioridades: Low, Medium, High, Urgent
  - Asignación de solicitudes
  - Filtros y búsqueda

- ✅ **Gestión de Usuarios** (Admin/Manager)
  - Lista de usuarios
  - Cambio de roles
  - Activar/desactivar cuentas

- ✅ **Dashboard y Métricas**
  - Estadísticas en tiempo real
  - Gráficos y visualizaciones
  - Filtros por fecha y estado

- ✅ **Notificaciones**
  - Emails de confirmación de registro
  - Notificaciones de cambios de estado
  - Emails transaccionales

### Técnicas

- 🔒 **Seguridad:**
  - Validación de datos (Joi)
  - Rate limiting
  - CORS configurado
  - Passwords hasheados (bcrypt)
  - Headers de seguridad

- 📚 **Documentación:**
  - API documentada con Swagger/OpenAPI
  - Guías de despliegue
  - Diagramas de arquitectura

- 🧪 **Testing:**
  - Tests unitarios (Jest)
  - Tests de integración
  - Coverage reports

- 🐳 **DevOps:**
  - Docker y Docker Compose
  - Scripts de deployment
  - Backups automatizados

---

## 🚀 Stack Tecnológico

### Frontend
- **React** 18.x - Library UI
- **Vite** 5.x - Build tool
- **React Router** 6.x - Routing
- **Zustand** 4.x - State management
- **Tailwind CSS** 3.x - Styling
- **Axios** - HTTP client

### Backend
- **Node.js** 18.x LTS
- **Express** 4.x - Web framework
- **MongoDB** 7.x - Database
- **Mongoose** 8.x - ODM
- **JWT** - Authentication
- **Joi** - Validation
- **Nodemailer** - Emails
- **Winston** - Logging

### DevOps & Tools
- **Docker** - Containerización
- **Nginx** - Reverse proxy
- **Jest** - Testing
- **Swagger** - API docs
- **ESLint** - Code quality

---

## 📁 Estructura del Proyecto

```
uixom/
├── client/              # Frontend React + Vite
│   ├── src/
│   │   ├── api/         # HTTP clients
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── routes/      # Routing config
│   │   ├── store/       # Zustand store
│   │   └── utils/       # Utilities
│   └── Dockerfile       # Frontend container
│
├── server/              # Backend Node.js + Express
│   ├── config/          # Configuration
│   ├── controllers/     # Business logic
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── middleware/      # Middlewares
│   ├── services/        # Services (email, etc.)
│   ├── validators/      # Joi schemas
│   ├── __tests__/       # Tests
│   └── Dockerfile       # Backend container
│
├── docs/                # Documentation
│   ├── DESPLIEGUE.md    # Production deployment guide
│   ├── DESARROLLO.md    # Development guide
│   ├── ARQUITECTURA.md  # Architecture docs
│   ├── SEGURIDAD.md     # Security best practices
│   └── COMANDOS_UTILES.md # Useful commands
│
├── nginx/               # Nginx config for production
├── scripts/             # Utility scripts (backups, etc.)
├── docker-compose.yml   # Docker orchestration
└── .env.example         # Environment variables template
```

Ver [docs/ARQUITECTURA.md](docs/ARQUITECTURA.md) para detalles completos.

---

## 🏁 Quick Start

### Pre-requisitos

- **Node.js** 18+ y npm (para desarrollo sin Docker)
- **Docker** y Docker Compose (para desarrollo con Docker - recomendado)
- **MongoDB** 7+ (si no usas Docker)

### Opción 1: Con Docker (Recomendado) 🐳

```bash
# 1. Clonar repositorio
git clone https://github.com/TU_USUARIO/uixom.git
cd uixom

# 2. Copiar y configurar variables de entorno
cp .env.example .env
# Editar .env con tus valores

# 3. Levantar todos los servicios
docker-compose up -d

# 4. Crear usuario admin
docker-compose exec backend npm run create-admin

# 5. Acceder a:
# - Frontend: http://localhost
# - Backend: http://localhost:5005
# - API Docs: http://localhost:5005/api-docs
# - Mongo Express: http://localhost:8081
```

### Opción 2: Desarrollo Nativo (Sin Docker)

```bash
# 1. Clonar repositorio
git clone https://github.com/TU_USUARIO/uixom.git
cd uixom

# 2. Configurar Backend
cd server
cp .env.example .env
# Editar server/.env
npm install
npm run create-admin  # Crear usuario admin
npm run dev           # Iniciar en desarrollo

# 3. Configurar Frontend (en otra terminal)
cd ../client
cp .env.example .env
# Editar client/.env
npm install
npm run dev           # Iniciar en desarrollo

# 4. Acceder a:
# - Frontend: http://localhost:5173
# - Backend: http://localhost:5005
```

Ver [docs/DESARROLLO.md](docs/DESARROLLO.md) para instrucciones detalladas.

---

## 🌐 Despliegue en Producción

### Stack de Producción

- **VPS:** Hetzner Cloud (€4-6/mes)
- **Database:** MongoDB Atlas (Free tier)
- **CDN/Security:** Cloudflare (Free)
- **Email:** Resend (Free tier)
- **SSL:** Let's Encrypt (Free)
- **DNS:** IONOS

**Costo total:** ~€4-6/mes

### Guías de Despliegue

1. **[docs/DESPLIEGUE.md](docs/DESPLIEGUE.md)** - 📖 Guía completa paso a paso
   - Configurar MongoDB Atlas
   - Contratar VPS Hetzner
   - Configurar DNS (IONOS + Cloudflare)
   - Configurar email (Resend)
   - Instalar SSL (Let's Encrypt)
   - Deploy con Docker

2. **[docs/COMANDOS_UTILES.md](docs/COMANDOS_UTILES.md)** - ⚡ Comandos de administración
   - Backups y restauración
   - Logs y monitoring
   - Actualizaciones

---

## 📚 Documentación

### Para Desarrolladores
- [DESARROLLO.md](docs/DESARROLLO.md) - Guía de desarrollo
- [ARQUITECTURA.md](docs/ARQUITECTURA.md) - Arquitectura del sistema
- [SEGURIDAD.md](docs/SEGURIDAD.md) - Prácticas de seguridad

### Para DevOps
- [DESPLIEGUE.md](docs/DESPLIEGUE.md) - Deploy en producción
- [COMANDOS_UTILES.md](docs/COMANDOS_UTILES.md) - Comandos útiles

### API
- **Swagger UI:** http://localhost:5005/api-docs (en desarrollo)
- **Swagger UI:** https://tudominio.com/api-docs (en producción)

---

## 🧪 Testing

```bash
# Backend tests
cd server
npm test                # Ejecutar tests
npm run test:coverage   # Coverage report

# Ver reporte de coverage
start coverage/lcov-report/index.html
```

---

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una feature branch (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'feat: agregar nueva funcionalidad'`)
4. Push a la branch (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

### Convenciones de Commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: nueva funcionalidad
fix: corrección de bug
docs: cambios en documentación
style: formateo de código
refactor: refactorización
test: agregar o actualizar tests
chore: cambios en build, CI/CD, etc.
```

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

---

## 👨‍💻 Autor

**Felix** - [GitHub](https://github.com/FelixFS3D)

---

## 🆘 Soporte

¿Problemas o preguntas?

1. Revisa la [documentación](docs/)
2. Busca en [Issues](https://github.com/TU_USUARIO/uixom/issues)
3. Crea un nuevo Issue

---

## 🗺️ Roadmap

- [ ] PWA (Progressive Web App)
- [ ] Notificaciones push
- [ ] Export PDF/Excel de reportes
- [ ] API versioning (v2)
- [ ] Internacionalización (i18n)
- [ ] Dark mode
- [ ] Webhooks
- [ ] GraphQL API

---

**Versión:** 1.0.0  
**Última actualización:** Mayo 2026