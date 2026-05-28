# UIXOM - Frontend

Frontend SPA (Single Page Application) construido con React, Vite y Tailwind CSS.

---

## 📋 Índice

- [Características](#características)
- [Stack Tecnológico](#stack-tecnológico)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Scripts Disponibles](#scripts-disponibles)
- [Configuración](#configuración)
- [Rutas y Navegación](#rutas-y-navegación)
- [State Management](#state-management)

---

## ✨ Características

- ✅ React 18 con Hooks
- ✅ Vite para desarrollo ultra-rápido
- ✅ Tailwind CSS para estilos utility-first
- ✅ React Router 6 para navegación
- ✅ Zustand para state management
- ✅ Axios para HTTP requests
- ✅ Autenticación JWT persistente
- ✅ Protección de rutas por rol
- ✅ Responsive design (mobile-first)
- ✅ Hot Module Replacement (HMR)
- ✅ Lucide Icons

---

## 🚀 Stack Tecnológico

| Paquete | Versión | Propósito |
|---------|---------|-----------|
| **react** | ^18.3.1 | UI library |
| **react-dom** | ^18.3.1 | React DOM rendering |
| **react-router-dom** | ^7.1.3 | Client-side routing |
| **zustand** | ^5.0.2 | State management |
| **axios** | ^1.7.9 | HTTP client |
| **tailwindcss** | ^3.4.17 | CSS framework |
| **lucide-react** | ^0.469.0 | Icon library |
| **vite** | ^6.0.5 | Build tool & dev server |

Ver [package.json](package.json) para la lista completa.

---

## 📁 Estructura del Proyecto

```
client/
├── public/              # Assets estáticos
│
├── src/
│   ├── api/             # API clients y configuración
│   │   ├── axios.js            # Configuración de Axios
│   │   ├── authApi.js          # Endpoints de auth
│   │   ├── usersApi.js         # Endpoints de users
│   │   └── requestsApi.js      # Endpoints de requests
│   │
│   ├── assets/          # Imágenes, fonts, etc.
│   │
│   ├── components/      # Componentes reutilizables
│   │   ├── common/             # Componentes comunes
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── StatusBadge.jsx
│   │   │   ├── PriorityBadge.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   │
│   │   └── layout/             # Layout components
│   │       ├── Navbar.jsx
│   │       ├── Sidebar.jsx
│   │       ├── MainLayout.jsx
│   │       ├── PublicNavbar.jsx
│   │       └── PublicLayout.jsx
│   │
│   ├── pages/           # Page components (rutas)
│   │   ├── auth/
│   │   │   └── LoginPage.jsx
│   │   │
│   │   ├── dashboard/
│   │   │   └── DashboardPage.jsx
│   │   │
│   │   ├── requests/
│   │   │   ├── RequestsListPage.jsx
│   │   │   ├── CreateRequestPage.jsx
│   │   │   └── RequestDetailPage.jsx
│   │   │
│   │   ├── users/
│   │   │   ├── UsersListPage.jsx
│   │   │   └── UserDetailPage.jsx
│   │   │
│   │   ├── profile/
│   │   │   └── ProfilePage.jsx
│   │   │
│   │   ├── public/
│   │   │   └── HomePage.jsx
│   │   │
│   │   └── errors/
│   │       ├── NotFoundPage.jsx
│   │       └── UnauthorizedPage.jsx
│   │
│   ├── routes/          # Configuración de rutas
│   │   ├── AppRouter.jsx       # Router principal
│   │   └── ProtectedRoute.jsx  # HOC para rutas protegidas
│   │
│   ├── store/           # Zustand store
│   │   └── authStore.js        # Store de autenticación
│   │
│   ├── utils/           # Utilidades
│   │   ├── constants.js        # Constantes (roles, estados, etc.)
│   │   └── formatters.js       # Formateo de fechas, etc.
│   │
│   ├── App.jsx          # Root component
│   ├── main.jsx         # Entry point
│   ├── App.css          # Estilos globales
│   └── index.css        # Tailwind imports
│
├── Dockerfile           # Build de producción
├── nginx.conf           # Configuración Nginx para producción
├── index.html           # HTML template
├── vite.config.js       # Configuración Vite
├── tailwind.config.js   # Configuración Tailwind
├── postcss.config.js    # Configuración PostCSS
├── eslint.config.js     # Configuración ESLint
├── package.json
└── .env.example         # Template de variables de entorno
```

---

## 🏁 Instalación

### Requisitos Previos

- Node.js 18+ y npm
- Backend corriendo (ver [../server/README.md](../server/README.md))

### Pasos

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env
# Editar .env con la URL del backend

# 3. Iniciar dev server
npm run dev

# 4. Acceder a:
# http://localhost:5173
```

---

## 📜 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Iniciar dev server con HMR (port 5173)

# Producción
npm run build            # Build para producción (output: dist/)
npm run preview          # Preview del build de producción

# Linting
npm run lint             # Ejecutar ESLint
```

---

## ⚙️ Configuración

### Variables de Entorno

Copiar `.env.example` a `.env`:

```env
# URL del backend API
VITE_API_URL=http://localhost:5005

# En producción:
# VITE_API_URL=https://tudominio.com/api
```

**Importante:** Las variables de entorno en Vite **DEBEN** tener el prefijo `VITE_`.

### Configuración de Axios

El cliente Axios está configurado en [src/api/axios.js](src/api/axios.js):

- Base URL desde `import.meta.env.VITE_API_URL`
- Interceptors para agregar JWT token automáticamente
- Manejo de errores 401 (logout automático)

```javascript
// Ejemplo de uso
import { apiClient } from './api/axios';

const response = await apiClient.get('/users');
```

---

## 🗺️ Rutas y Navegación

### Rutas Públicas

| Ruta | Componente | Descripción |
|------|------------|-------------|
| `/` | HomePage | Landing page |
| `/login` | LoginPage | Login |
| `/register` | RegisterPage | Registro |

### Rutas Privadas (Requieren Autenticación)

| Ruta | Componente | Roles | Descripción |
|------|------------|-------|-------------|
| `/dashboard` | DashboardPage | user, manager, admin | Dashboard principal |
| `/requests` | RequestsListPage | user, manager, admin | Lista de solicitudes |
| `/requests/new` | CreateRequestPage | user, manager, admin | Nueva solicitud |
| `/requests/:id` | RequestDetailPage | user, manager, admin | Detalle de solicitud |
| `/users` | UsersListPage | manager, admin | Lista de usuarios |
| `/users/:id` | UserDetailPage | manager, admin | Detalle de usuario |
| `/profile` | ProfilePage | user, manager, admin | Perfil del usuario |

### Protección de Rutas

Las rutas están protegidas con el componente `ProtectedRoute`:

```jsx
<ProtectedRoute allowedRoles={['admin', 'manager']}>
  <UsersListPage />
</ProtectedRoute>
```

Si el usuario no está autenticado, redirige a `/login`.  
Si no tiene el rol requerido, redirige a `/unauthorized`.

---

## 🗂️ State Management

### Zustand Store (authStore)

Estado global de autenticación:

```javascript
import { useAuthStore } from './store/authStore';

// En un componente
const { user, isAuthenticated, login, logout } = useAuthStore();

// Login
await login({ email, password });

// Logout
logout();

// Verificar autenticación
if (isAuthenticated) {
  // Usuario logueado
}

// Verificar rol
if (user?.role === 'admin') {
  // Usuario es admin
}
```

**Persistencia:** El token JWT se guarda en `localStorage` y se carga automáticamente al iniciar la app.

---

## 🎨 Estilos con Tailwind CSS

### Componentes Reutilizables

- **Button:** [src/components/common/Button.jsx](src/components/common/Button.jsx)
- **Input:** [src/components/common/Input.jsx](src/components/common/Input.jsx)
- **Card:** [src/components/common/Card.jsx](src/components/common/Card.jsx)
- **StatusBadge:** [src/components/common/StatusBadge.jsx](src/components/common/StatusBadge.jsx)
- **PriorityBadge:** [src/components/common/PriorityBadge.jsx](src/components/common/PriorityBadge.jsx)

### Configuración Tailwind

Ver [tailwind.config.js](tailwind.config.js) para personalización.

---

## 🐳 Docker

### Build para Producción

```bash
# Desde la raíz del proyecto
docker build -f client/Dockerfile -t uixom-frontend .
```

### Run

```bash
docker run -d \
  --name uixom-frontend \
  -p 3000:80 \
  uixom-frontend
```

La imagen de producción usa:
- **Multi-stage build:** Node para build, Nginx Alpine para servir
- **Nginx:** Configurado para SPA (history mode routing)
- **Tamaño:** ~25MB (solo Nginx + archivos estáticos)

Ver [../docs/DESPLIEGUE.md](../docs/DESPLIEGUE.md) para deployment completo.

---

## 📚 Recursos

- **React:** https://react.dev/
- **Vite:** https://vite.dev/
- **Tailwind CSS:** https://tailwindcss.com/
- **React Router:** https://reactrouter.com/
- **Zustand:** https://zustand.docs.pmnd.rs/
- **Axios:** https://axios-http.com/

---

## 🔗 Enlaces

- [Documentación Principal](../README.md)
- [Backend README](../server/README.md)
- [Guía de Desarrollo](../docs/DESARROLLO.md)
- [Arquitectura](../docs/ARQUITECTURA.md)

---

**Versión:** 1.0.0  
**Última actualización:** Mayo 2026
