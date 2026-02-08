# Uixom - Backend de Servicios Web

![Build Status](https://github.com/FelixFS3D/uixom/actions/workflows/ci.yml/badge.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Backend robusto para la plataforma Uixom, construido con el stack MERN (MongoDB, Express, React, Node.js) y preparado para producción con Docker, CI/CD y notificaciones automatizadas.

## ✨ Features

- **API RESTful:** Endpoints para gestionar solicitudes de clientes.
- **Notificaciones Automatizadas:** Integración con **n8n** para enviar correos de confirmación y notificaciones al equipo.
- **Contenerizado con Docker:** Listo para desplegar en cualquier entorno compatible con Docker.
- **Base de Datos NoSQL:** Persistencia de datos con **MongoDB**.
- **Seguridad:** Middlewares de seguridad básicos con Helmet y limitación de tasa de peticiones.
- **CI/CD:** Workflow de GitHub Actions para pruebas automatizadas.

## 🚀 Stack Tecnológico

- **Backend:** Node.js, Express.js
- **Base de Datos:** MongoDB con Mongoose
- **Contenerización:** Docker, Docker Compose
- **Automatización:** n8n
- **Testing:** Jest, Supertest
- **CI/CD:** GitHub Actions

## 📋 Prerrequisitos

- Node.js (v18+)
- Docker y Docker Compose
- Un cliente de terminal (como PowerShell o Git Bash)

## ⚙️ Instalación y Setup

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/FelixFS3D/uixom.git
    cd uixom/server
    ```

2.  **Crear archivo de entorno:**
    Copia el archivo `.env.example` a `.env` y personaliza las variables (especialmente si no usas Docker).
    ```powershell
    copy .env.example .env
    ```

3.  **Instalar dependencias:**
    ```bash
    npm install
    ```

## ධ Ejecución

### Con Docker (Recomendado)

Este método levanta el servidor, la base de datos (Mongo) y el sistema de automatización (n8n) en contenedores aislados.

```bash
docker compose up --build
```

-   **API Server:** [http://localhost:5005](http://localhost:5005)
-   **n8n UI:** [http://localhost:5678](http://localhost:5678)

### Localmente (Modo Desarrollo)

Asegúrate de tener una instancia de MongoDB corriendo.

```bash
npm run dev
```

El servidor se reiniciará automáticamente con cada cambio.

##  API Endpoints

-   `POST /api/requests`: Crea una nueva solicitud.
    -   **Body:** `{ "name": "string", "phone": "string", "email": "string", "description": "string" }`
-   `GET /api/requests`: Obtiene todas las solicitudes.

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
