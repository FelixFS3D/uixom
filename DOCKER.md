# UIXOM - Docker Deployment Guide

Este proyecto está dockerizado para facilitar el despliegue en cualquier entorno.

## 📋 Requisitos Previos

- Docker (v20.10 o superior)
- Docker Compose (v2.0 o superior)

## 🚀 Inicio Rápido

### 1. Configurar Variables de Entorno

Copia el archivo de ejemplo y edita las variables:

```bash
cp .env.example .env
```

Edita `.env` con tus valores reales:
- Cambia `DB_PASSWORD` por una contraseña segura
- Cambia `JWT_SECRET` por una clave secreta segura
- Configura las credenciales de email si deseas notificaciones

### 2. Construir y Ejecutar los Contenedores

```bash
# Construir e iniciar todos los servicios
docker-compose up -d

# Ver los logs
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f db
```

### 3. Inicializar la Base de Datos

Una vez que los contenedores estén corriendo, necesitas crear las tablas:

```bash
# Ejecutar el script de setup dentro del contenedor
docker-compose exec backend node scripts/setup.js

# Crear un usuario administrador (opcional)
docker-compose exec backend node scripts/createAdmin.js
```

### 4. Acceder a la Aplicación

- **Frontend**: http://localhost
- **Backend API**: http://localhost:5005
- **API Docs (Swagger)**: http://localhost:5005/api-docs

## 🔧 Comandos Útiles

### Gestión de Contenedores

```bash
# Detener todos los servicios
docker-compose down

# Detener y eliminar volúmenes (⚠️ elimina la base de datos)
docker-compose down -v

# Reiniciar un servicio específico
docker-compose restart backend

# Reconstruir las imágenes
docker-compose build

# Reconstruir y reiniciar
docker-compose up -d --build
```

### Inspección y Debugging

```bash
# Ver estado de los contenedores
docker-compose ps

# Acceder a la shell de un contenedor
docker-compose exec backend sh
docker-compose exec db psql -U postgres -d uixom

# Ver logs en tiempo real
docker-compose logs -f --tail=100

# Ver uso de recursos
docker stats
```

### Base de Datos

```bash
# Backup de la base de datos
docker-compose exec db pg_dump -U postgres uixom > backup.sql

# Restaurar backup
docker-compose exec -T db psql -U postgres uixom < backup.sql

# Conectarse a PostgreSQL
docker-compose exec db psql -U postgres -d uixom
```

## 🏗️ Estructura de Docker

El proyecto utiliza una arquitectura multi-contenedor:

- **db**: PostgreSQL 15 Alpine
- **backend**: Node.js API (puerto 5005)
- **frontend**: Nginx sirviendo la app React (puerto 80)

Todos los servicios se comunican a través de una red privada de Docker.

## 🌍 Despliegue en Producción

### Variables de Entorno en Producción

Asegúrate de cambiar estos valores en producción:

```env
DB_PASSWORD=<contraseña-muy-segura>
JWT_SECRET=<clave-secreta-larga-y-aleatoria>
VITE_API_URL=https://tu-dominio.com/api
```

### Usar Docker Compose para Producción

```bash
# Construir para producción
docker-compose -f docker-compose.yml build

# Iniciar en modo producción
docker-compose up -d
```

### Configurar Reverse Proxy (Nginx/Traefik)

Se recomienda usar un reverse proxy como Nginx o Traefik para:
- Gestionar SSL/TLS
- Balanceo de carga
- Compresión
- Seguridad adicional

## 🔒 Seguridad

- Nunca compartas tu archivo `.env` en Git
- Usa contraseñas fuertes para la base de datos
- Cambia `JWT_SECRET` regularmente
- Mantén Docker actualizado
- Revisa los logs regularmente

## 🐛 Solución de Problemas

### El backend no puede conectarse a la base de datos

```bash
# Verificar que la base de datos esté corriendo
docker-compose ps db

# Ver logs de la base de datos
docker-compose logs db
```

### Error de permisos

```bash
# Reconstruir con permisos correctos
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Puerto ya en uso

Si el puerto 80 o 5005 ya está en uso, cambia los puertos en `docker-compose.yml`:

```yaml
ports:
  - "8080:80"  # Frontend en puerto 8080
  - "5006:5005"  # Backend en puerto 5006
```

## 📊 Monitoreo

### Health Checks

Todos los servicios tienen health checks configurados:

```bash
# Ver estado de salud
docker-compose ps
```

### Logs

Los logs del backend se persisten en `./server/logs/`:

```bash
# Ver logs del servidor
tail -f server/logs/all.log
tail -f server/logs/error.log
```

## 🔄 Actualizaciones

Para actualizar el proyecto:

```bash
# Obtener últimos cambios
git pull origin main

# Reconstruir y reiniciar
docker-compose down
docker-compose up -d --build
```

## 📝 Licencia

[Tu Licencia Aquí]
