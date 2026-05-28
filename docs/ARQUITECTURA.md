# 🏗️ Arquitectura del Sistema - UIXOM

> Documentación técnica de la arquitectura, diseño y decisiones tecnológicas

---

## 📋 Índice

1. [Vista General](#1-vista-general)
2. [Stack Tecnológico](#2-stack-tecnológico)
3. [Arquitectura de Producción](#3-arquitectura-de-producción)
4. [Arquitectura de Desarrollo](#4-arquitectura-de-desarrollo)
5. [Base de Datos](#5-base-de-datos)
6. [Autenticación y Autorización](#6-autenticación-y-autorización)
7. [API Design](#7-api-design)
8. [Seguridad](#8-seguridad)
9. [Escalabilidad](#9-escalabilidad)

---

## 1. Vista General

UIXOM es una aplicación web full-stack para gestión de solicitudes y usuarios con tres roles: Admin, Manager y User.

### Características Principales

- ✅ Sistema de autenticación con JWT
- ✅ Control de acceso basado en roles (RBAC)
- ✅ CRUD completo de usuarios y solicitudes
- ✅ Dashboard con métricas en tiempo real
- ✅ Notificaciones por email
- ✅ API RESTful documentada (Swagger)
- ✅ Interfaz responsive (mobile-first)

### Principios de Diseño

1. **Separation of Concerns:** Frontend y backend completamente desacoplados
2. **API First:** API RESTful bien documentada y versionada
3. **Security by Default:** Validación, sanitización y rate limiting en todos los endpoints
4. **Scalability:** Arquitectura preparada para escalar horizontalmente
5. **Developer Experience:** Hot reload, linting, testing automatizado

---

## 2. Stack Tecnológico

### Frontend

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **React** | 18.x | Library UI |
| **Vite** | 5.x | Build tool & dev server |
| **React Router** | 6.x | Client-side routing |
| **Zustand** | 4.x | State management |
| **Axios** | 1.x | HTTP client |
| **Tailwind CSS** | 3.x | Utility-first CSS |
| **Lucide React** | 0.x | Icon library |

### Backend

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Node.js** | 18.x LTS | Runtime |
| **Express** | 4.x | Web framework |
| **MongoDB** | 7.x | Database (NoSQL) |
| **Mongoose** | 8.x | ODM para MongoDB |
| **Joi** | 17.x | Validación de datos |
| **JWT** | 9.x | Autenticación stateless |
| **Bcrypt** | 5.x | Hash de passwords |
| **Nodemailer** | 6.x | Envío de emails |
| **Winston** | 3.x | Logging |
| **Swagger** | 5.x | Documentación API |
| **Jest** | 29.x | Testing framework |

### Infraestructura

| Servicio | Propósito |
|----------|-----------|
| **Hetzner Cloud** | VPS hosting |
| **MongoDB Atlas** | Database cloud (producción) |
| **Cloudflare** | CDN, SSL, DDoS protection |
| **Resend** | Email transaccional |
| **Docker** | Containerización |
| **Nginx** | Reverse proxy, SSL termination |
| **Let's Encrypt** | Certificados SSL gratuitos |

---

## 3. Arquitectura de Producción

### Diagrama de Infraestructura

```
┌──────────────────────────────────────────────────────────────────┐
│                        INTERNET                                   │
│                  Usuario: https://uixom.com                      │
└────────────────────────┬─────────────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────────────┐
│                    CLOUDFLARE                                     │
│  ┌────────────────────────────────────────────────────────┐     │
│  │  • CDN Global                                          │     │
│  │  • DDoS Protection                                     │     │
│  │  • Web Application Firewall (WAF)                      │     │
│  │  • SSL/TLS (Flexible)                                  │     │
│  │  • Caché estático                                      │     │
│  └────────────────────────────────────────────────────────┘     │
└────────────────────────┬─────────────────────────────────────────┘
                         │ HTTPS
                         ▼
┌──────────────────────────────────────────────────────────────────┐
│              HETZNER VPS (159.89.123.45)                         │
│              Ubuntu 22.04 LTS - 2 vCPU, 4GB RAM                  │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  NGINX (Port 443 - HTTPS)                               │   │
│  │  • SSL/TLS Termination (Let's Encrypt)                  │   │
│  │  • Reverse Proxy                                        │   │
│  │  • Static file serving                                  │   │
│  │  • HTTP → HTTPS redirect                                │   │
│  │  • Security headers                                     │   │
│  └──────────────┬──────────────────────────────────────────┘   │
│                 │                                                │
│        ┌────────┴────────┐                                      │
│        ▼                 ▼                                       │
│  ┌──────────┐     ┌─────────────┐                              │
│  │ Frontend │     │  Backend    │                              │
│  │ (Port 80)│     │ (Port 5005) │                              │
│  └──────────┘     └─────────────┘                              │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  DOCKER CONTAINERS                                      │   │
│  │                                                          │   │
│  │  ┌──────────────────────────────────────────────┐     │   │
│  │  │ uixom-frontend (Nginx Alpine)                │     │   │
│  │  │  • React SPA (built)                         │     │   │
│  │  │  • Served by Nginx                           │     │   │
│  │  │  • Port: 3000 → 80                           │     │   │
│  │  └──────────────────────────────────────────────┘     │   │
│  │                                                          │   │
│  │  ┌──────────────────────────────────────────────┐     │   │
│  │  │ uixom-backend (Node 18 Alpine)               │     │   │
│  │  │  • Express API                               │     │   │
│  │  │  • Mongoose ODM                              │     │   │
│  │  │  • Port: 5005                                │     │   │
│  │  └──────────────────────────────────────────────┘     │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  SISTEMA                                                │   │
│  │  • Firewall (UFW): 22, 80, 443                         │   │
│  │  • Logs: /var/log/nginx/                               │   │
│  │  • SSL Certs: /etc/letsencrypt/                        │   │
│  │  • Auto-renewal: Cron @ 3AM daily                      │   │
│  └─────────────────────────────────────────────────────────┘   │
└────────────────────────┬─────────────────────────────────────────┘
                         │
                         │ TLS Connection (mongodb+srv://)
                         │
                         ▼
┌──────────────────────────────────────────────────────────────────┐
│              MONGODB ATLAS (Cloud)                                │
│              Frankfurt, Germany (eu-central-1)                    │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Cluster M0 (Free Tier)                                 │   │
│  │  • 512MB Storage                                        │   │
│  │  • Shared RAM                                           │   │
│  │  • Automated Backups (daily)                            │   │
│  │  • Network Access: 159.89.123.45/32 only               │   │
│  │                                                          │   │
│  │  Databases:                                             │   │
│  │    └─ uixom                                             │   │
│  │         ├─ users                                        │   │
│  │         └─ requests                                     │   │
│  └─────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘
                         
┌──────────────────────────────────────────────────────────────────┐
│              RESEND (Email Service)                               │
│              SMTP: smtp.resend.com:587                           │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  • Transactional emails                                 │   │
│  │  • Domain verified: uixom.com                           │   │
│  │  • SPF, DKIM configured                                 │   │
│  │  • Free: 3,000 emails/month                             │   │
│  └─────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘
```

### Flujo de una Request

1. **Usuario** hace una petición a `https://uixom.com/api/users`
2. **DNS** (Cloudflare) resuelve a IP de Cloudflare
3. **Cloudflare**:
   - Verifica caché
   - Aplica WAF rules
   - Proxy a IP real del VPS (159.89.123.45)
4. **Nginx** en VPS:
   - Termina SSL
   - Aplica security headers
   - Proxy pass a `http://localhost:5005/api/users`
5. **Backend Docker Container**:
   - Express recibe request
   - Middleware de autenticación verifica JWT
   - Middleware de autorización verifica rol
   - Controller ejecuta lógica
   - Mongoose consulta MongoDB Atlas
6. **MongoDB Atlas**:
   - Ejecuta query
   - Retorna documentos
7. **Response** sigue el camino inverso hasta el usuario

---

## 4. Arquitectura de Desarrollo

### Docker Compose (Desarrollo Local)

```
┌──────────────────────────────────────────────────────────────────┐
│                   LOCALHOST (Tu PC)                               │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  DOCKER COMPOSE NETWORK                                 │   │
│  │                                                          │   │
│  │  ┌─────────────────────────────────────────────┐       │   │
│  │  │  Frontend Container                         │       │   │
│  │  │  • React + Vite dev server                  │       │   │
│  │  │  • Hot Module Reload (HMR)                  │       │   │
│  │  │  • Port: 80 (http://localhost)              │       │   │
│  │  │  • VITE_API_URL=http://localhost:5005       │       │   │
│  │  └─────────────────────────────────────────────┘       │   │
│  │                                                          │   │
│  │  ┌─────────────────────────────────────────────┐       │   │
│  │  │  Backend Container                          │       │   │
│  │  │  • Node.js + Express                        │       │   │
│  │  │  • Nodemon (auto-restart)                   │       │   │
│  │  │  • Port: 5005                               │       │   │
│  │  │  • Swagger: /api-docs                       │       │   │
│  │  └─────────────────────────────────────────────┘       │   │
│  │                         │                                     │
│  │                         ▼                                     │
│  │  ┌─────────────────────────────────────────────┐       │   │
│  │  │  MongoDB Container                          │       │   │
│  │  │  • MongoDB 7                                │       │   │
│  │  │  • Port: 27017                              │       │   │
│  │  │  • Volume: mongo_data                       │       │   │
│  │  │  • Auth: admin/password                     │       │   │
│  │  └─────────────────────────────────────────────┘       │   │
│  │                                                          │   │
│  │  ┌─────────────────────────────────────────────┐       │   │
│  │  │  Mongo Express (UI)                         │       │   │
│  │  │  • MongoDB Web UI                           │       │   │
│  │  │  • Port: 8081                               │       │   │
│  │  │  • http://localhost:8081                    │       │   │
│  │  └─────────────────────────────────────────────┘       │   │
│  └─────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘
```

### Workflow de Desarrollo

1. Desarrollador clona el repo
2. Copia `.env.example` → `.env`
3. Ejecuta `docker-compose up -d`
4. Accede a:
   - Frontend: http://localhost
   - Backend: http://localhost:5005
   - Swagger: http://localhost:5005/api-docs
   - MongoDB UI: http://localhost:8081
5. Hace cambios en código
6. Hot reload automático (frontend)
7. Nodemon restart automático (backend)

---

## 5. Base de Datos

### Modelo de Datos

#### Collection: `users`

```javascript
{
  _id: ObjectId,
  name: String,          // min 2, max 100
  email: String,         // único, lowercase, validado
  password: String,      // bcrypt hash (12 rounds en prod)
  role: String,          // enum: ['user', 'manager', 'admin']
  isActive: Boolean,     // default: true
  createdAt: Date,       // auto
  updatedAt: Date        // auto
}
```

**Índices:**
- `email` (único)
- `role`
- `createdAt`

#### Collection: `requests`

```javascript
{
  _id: ObjectId,
  title: String,              // 5-200 chars
  description: String,        // 10-2000 chars
  priority: String,           // enum: ['low', 'medium', 'high', 'urgent']
  status: String,             // enum: ['pending', 'in_progress', 'completed', 'rejected']
  requestedBy: ObjectId,      // ref: 'User'
  assignedTo: ObjectId,       // ref: 'User', nullable
  createdAt: Date,
  updatedAt: Date
}
```

**Índices:**
- `requestedBy`
- `assignedTo`
- `status`
- `priority`
- `createdAt`

### Relaciones

```
┌────────┐           ┌──────────┐
│  User  │◄─────────┤ Request  │
└────────┘  1    *   └──────────┘
    │                     │
    │ requestedBy         │ assignedTo
    │                     │
    └─────────────────────┘
            1    *
```

---

## 6. Autenticación y Autorización

### Autenticación (JWT)

#### Flow de Login

```
1. Usuario envía email + password
   POST /api/auth/login
   
2. Backend verifica credenciales
   - User.findOne({ email })
   - bcrypt.compare(password, user.password)
   
3. Si válido, genera JWT
   - Payload: { userId, role }
   - Secret: process.env.JWT_SECRET
   - Expires: 7d (configurable)
   
4. Retorna JWT al cliente
   { token, user: { id, name, email, role } }
   
5. Cliente guarda JWT
   - Zustand store (memoria)
   - localStorage (persistencia)
   
6. Requests subsecuentes incluyen token
   Authorization: Bearer <token>
```

#### Middleware de Autenticación

```javascript
// middleware/auth.js
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
```

### Autorización (RBAC)

#### Matriz de Permisos

| Recurso | User | Manager | Admin |
|---------|------|---------|-------|
| **Auth** |
| Login | ✅ | ✅ | ✅ |
| Register | ✅ | ✅ | ✅ |
| **Perfil** |
| Ver propio | ✅ | ✅ | ✅ |
| Editar propio | ✅ | ✅ | ✅ |
| **Solicitudes** |
| Ver propias | ✅ | - | - |
| Crear | ✅ | ✅ | ✅ |
| Ver todas | - | ✅ | ✅ |
| Asignar | - | ✅ | ✅ |
| Cambiar status | - | ✅ | ✅ |
| Eliminar propia | ✅ | - | - |
| Eliminar cualquiera | - | - | ✅ |
| **Usuarios** |
| Listar | - | ✅ | ✅ |
| Cambiar rol | - | - | ✅ |
| Activar/Desactivar | - | - | ✅ |

#### Middleware de Autorización

```javascript
// middleware/roles.js
const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.userRole)) {
      return res.status(403).json({ 
        message: 'Access denied' 
      });
    }
    next();
  };
};

// Uso:
router.get('/users', 
  verifyToken, 
  requireRole('admin', 'manager'), 
  getAllUsers
);
```

---

## 7. API Design

### Principios

1. **RESTful:** Usa métodos HTTP correctamente
2. **Stateless:** No sesiones en servidor
3. **Versionado:** `/api/v1/...` (actualmente sin versión, futuro: v1)
4. **HATEOAS:** Links a recursos relacionados (WIP)
5. **Pagination:** Queries que retornan listas

### Estructura de Response

#### Success (200-299)

```json
{
  "data": { ... },
  "message": "Operation successful"
}
```

#### Error (400-599)

```json
{
  "error": "Error message",
  "details": [ ... ],  // opcional
  "code": "ERROR_CODE"  // opcional
}
```

### Paginación

```javascript
GET /api/requests?page=1&limit=10&sort=-createdAt

Response:
{
  "data": [...],
  "pagination": {
    "total": 100,
    "page": 1,
    "pages": 10,
    "limit": 10
  }
}
```

---

## 8. Seguridad

Ver [SEGURIDAD.md](SEGURIDAD.md) para detalles completos.

### Principales Medidas

1. **Input Validation:** Joi schemas en todos los endpoints
2. **SQL/NoSQL Injection:** Mongoose sanitization
3. **XSS Protection:** Headers + sanitización
4. **CSRF:** SameSite cookies
5. **Rate Limiting:** 100 req/15min por IP
6. **HTTPS Only:** Redirect HTTP→HTTPS
7. **Secrets Management:** Variables de entorno
8. **Dependencies:** `npm audit` en CI/CD

---

## 9. Escalabilidad

### Escenarios de Crecimiento

#### Fase 1: <1,000 usuarios (Actual)
- ✅ VPS único
- ✅ MongoDB Atlas M0 (gratis)
- ✅ Cloudflare gratis
- **Costo:** ~€4/mes

#### Fase 2: 1,000-10,000 usuarios
- Upgrade VPS: CX31 (8GB RAM) - €11/mes
- MongoDB Atlas: M10 (2GB RAM) - $10/mes
- Múltiples workers backend (PM2 cluster mode)
- **Costo:** ~€25/mes

#### Fase 3: 10,000-100,000 usuarios
- Load Balancer (Hetzner) - €5/mes
- 2-3 VPS backend (CX31) - €33/mes
- MongoDB Atlas: M20 (4GB) - $30/mes
- Redis para sessions/caché
- **Costo:** ~€90/mes

#### Fase 4: >100,000 usuarios
- Kubernetes (Hetzner Cloud)
- MongoDB Atlas: M30+ con replicas
- CDN premium
- Microservicios (separar auth, notifications, etc.)
- **Costo:** €300+/mes

### Estrategias de Optimización

1. **Frontend:**
   - Code splitting
   - Lazy loading
   - Service Workers (PWA)
   - CDN para assets estáticos

2. **Backend:**
   - Clustering (PM2)
   - Caché con Redis
   - Database connection pooling
   - Query optimization (índices)

3. **Base de Datos:**
   - Índices en campos frecuentes
   - Aggregation pipelines eficientes
   - Read replicas (MongoDB Atlas)
   - Archivado de datos antiguos

4. **Infraestructura:**
   - Auto-scaling con Docker Swarm/K8s
   - Health checks y auto-restart
   - Monitoring con Prometheus + Grafana
   - APM (New Relic / Datadog)

---

**Otras Guías:** [DESPLIEGUE.md](DESPLIEGUE.md) | [DESARROLLO.md](DESARROLLO.md) | [SEGURIDAD.md](SEGURIDAD.md)  
**Fecha:** Mayo 2026
