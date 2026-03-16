# Uixom - Backend de Servicios Web

![Build Status](https://github.com/FelixFS3D/uixom/actions/workflows/ci.yml/badge.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Backend robusto para la plataforma Uixom, construido con Node.js, Express, React y MongoDB, preparado para producción con Docker, CI/CD y notificaciones por correo.

## ✨ Features

- **API RESTful:** Endpoints para gestionar solicitudes de clientes y usuarios
- **Autenticación JWT:** Sistema de autenticación seguro con roles (admin, user)
- **Notificaciones Automatizadas:** Correos de confirmación usando Nodemailer
- **Panel de Control:** Dashboard con métricas y estadísticas
- **Base de Datos:** MongoDB con Mongoose
- **Seguridad:** Middlewares de seguridad con validación de datos
- **Docker:** Despliegue completamente dockerizado
- **CI/CD:** Workflow de GitHub Actions para pruebas automatizadas
- **Documentación API:** Swagger/OpenAPI integrado

## 🚀 Stack Tecnológico

- **Backend:** Node.js, Express.js
- **Frontend:** React, Vite, TailwindCSS
- **Base de Datos:** MongoDB con Mongoose
- **Autenticación:** JWT
- **Notificaciones:** Nodemailer
- **Testing:** Jest, Supertest
- **Containerización:** Docker, Docker Compose
- **CI/CD:** GitHub Actions

## 📋 Prerrequisitos

### Opción 1: Con Docker (Recomendado)
- Docker (v20.10+)
- Docker Compose (v2.0+)

### Opción 2: Sin Docker
- Node.js (v18+)
- MongoDB (v6+)

## ⚙️ Instalación y Setup

### 🐳 Usando Docker (Recomendado)

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/FelixFS3D/uixom.git
   cd uixom
   ```

2. **Configurar variables de entorno:**
   ```bash
   cp .env.example .env
   # Edita .env con tus valores
   ```

3. **Construir e iniciar los contenedores:**
   ```bash
   docker-compose up -d
   ```

4. **Crear usuario administrador:**
   ```bash
   docker-compose exec backend node scripts/createAdmin.js
   ```

5. **Acceder a la aplicación:**
   - Frontend: http://localhost
   - Backend API: http://localhost:5005
   - API Docs: http://localhost:5005/api-docs

📖 **Documentación completa de Docker:** Ver [DOCKER.md](./DOCKER.md)

### 💻 Instalación Manual (Sin Docker)

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/FelixFS3D/uixom.git
    cd uixom/server
    ```

2.  **Crear archivo de entorno:**
    Copia el archivo `.env.example` a `.env` y personaliza las variables necesarias para tu entorno local.
    ```powershell
    copy .env.example .env
    ```

3.  **Instalar dependencias:**
    ```bash
    npm install
    ```

## ධ Ejecución

### Localmente (Modo Desarrollo)

Asegúrate de tener una instancia de MongoDB corriendo.

```bash
npm run dev
```

El servidor se reiniciará automáticamente con cada cambio.

##  API Endpoints

-   `POST /api/requests`: Crea una nueva solicitud.
    -   **Body:** `{ "name": "string", "phone": "string", "email": "string", "description": "string" }`
-   `GET /api/requests`: Obtiene todas las solicitudes. Acepta filtros (`status`, `priority`, `search`) y ordenamiento (`sortBy`, `sortOrder`).
-   `GET /api/requests/stats`: Totales por estado y prioridad (requiere token de admin).

## 🧪 Testing

Para ejecutar las pruebas unitarias y de integración:

```bash
npm test
```

## 🚢 Despliegue

El repositorio está configurado con un workflow de GitHub Actions que ejecuta las pruebas en cada `push` a la rama `main`. Un paso de despliegue puede ser añadido fácilmente.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un *issue* para discutir cambios mayores o un *pull request* con tus mejoras.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.
