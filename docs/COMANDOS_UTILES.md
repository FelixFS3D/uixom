# 🛠️ Comandos Útiles - UIXOM

Referencia rápida de comandos para administrar el proyecto UIXOM.

> **💡 Para desplegar por primera vez:** Ve a [MANUAL_DESPLIEGUE.md](./MANUAL_DESPLIEGUE.md)

## 📋 Índice

- [Docker Compose](#docker-compose)
- [Backups y Restauración](#backups-y-restauración)
- [Monitoreo y Logs](#monitoreo-y-logs)
- [Base de Datos MongoDB](#base-de-datos-mongodb)
- [SSL/Certificados](#sslcertificados)
- [Seguridad](#seguridad)
- [Mantenimiento](#mantenimiento)
- [Troubleshooting](#troubleshooting)

---

## Docker Compose

### Iniciar Servicios
```bash
# Iniciar todos los servicios
docker-compose up -d

# Iniciar solo servicios específicos
docker-compose up -d backend
docker-compose up -d frontend db

# Iniciar con reconstrucción de imágenes
docker-compose up -d --build

# Iniciar sin modo detached (ver logs en tiempo real)
docker-compose up
```

### Detener Servicios
```bash
# Detener todos los servicios
docker-compose down

# Detener y eliminar volúmenes (⚠️ CUIDADO: elimina datos)
docker-compose down -v

# Detener servicio específico
docker-compose stop backend
docker-compose stop frontend
```

### Reiniciar Servicios
```bash
# Reiniciar todos
docker-compose restart

# Reiniciar servicio específico
docker-compose restart backend
docker-compose restart frontend
docker-compose restart db
```

### Estado de Servicios
```bash
# Ver estado de todos los servicios
docker-compose ps

# Ver procesos dentro de los contenedores
docker-compose top

# Ver uso de recursos
docker stats
```

---

## Backups y Restauración

### Crear Backup
```bash
# Backup manual con el script
./scripts/backup-mongo.sh

# Backup manual con docker exec
docker exec uixom-db mongodump \
  --username=admin \
  --password=tu_password \
  --authenticationDatabase=admin \
  --out=/tmp/backup_manual

# Copiar backup del contenedor al host
docker cp uixom-db:/tmp/backup_manual ./backups/
```

### Restaurar Backup
```bash
# Usando el script de restauración
./scripts/restore-mongo.sh backups/mongodb/uixom_backup_20260520_020000.tar.gz

# Restauración manual
docker cp ./backups/backup_folder uixom-db:/tmp/restore
docker exec uixom-db mongorestore \
  --username=admin \
  --password=tu_password \
  --authenticationDatabase=admin \
  --db=uixom \
  /tmp/restore
```

### Listar Backups
```bash
# Ver todos los backups
ls -lh backups/mongodb/

# Ver los 10 backups más recientes
ls -lt backups/mongodb/*.tar.gz | head -n 10

# Ver tamaño total de backups
du -sh backups/mongodb/
```

### Eliminar Backups Antiguos
```bash
# Eliminar backups más antiguos de 30 días
find backups/mongodb -name "*.tar.gz" -mtime +30 -delete

# Ver cuánto espacio liberarías (sin eliminar)
find backups/mongodb -name "*.tar.gz" -mtime +30 -exec du -ch {} + | tail -n 1
```

---

## Monitoreo y Logs

### Ver Logs
```bash
# Logs de todos los servicios (en tiempo real)
docker-compose logs -f

# Logs de un servicio específico
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f db

# Últimas 100 líneas
docker-compose logs --tail=100 backend

# Logs desde hace 1 hora
docker-compose logs --since 1h backend

# Logs con timestamps
docker-compose logs -f -t backend
```

### Logs Específicos

#### Backend
```bash
# Logs del servidor
docker-compose logs -f backend

# Logs de errores del servidor
docker-compose exec backend cat logs/error.log

# Logs completos del servidor
docker-compose exec backend cat logs/all.log

# Ver logs en tiempo real dentro del contenedor
docker-compose exec backend tail -f logs/all.log
```

#### Frontend (NGINX)
```bash
# Logs de acceso de NGINX
docker-compose exec frontend cat /var/log/nginx/access.log

# Logs de errores de NGINX
docker-compose exec frontend cat /var/log/nginx/error.log
```

### Métricas de Sistema
```bash
# Uso de recursos de contenedores
docker stats

# Espacio usado por Docker
docker system df

# Ver imágenes
docker images

# Ver volúmenes
docker volume ls

# Inspeccionar volumen
docker volume inspect uixom_mongo_data
```

---

## Base de Datos MongoDB

### Conectar a MongoDB
```bash
# Conectar con mongosh
docker-compose exec db mongosh \
  --username admin \
  --password tu_password \
  --authenticationDatabase admin

# Conectar directamente a la base de datos uixom
docker-compose exec db mongosh \
  --username admin \
  --password tu_password \
  --authenticationDatabase admin \
  uixom
```

### Comandos MongoDB Útiles
```javascript
// Dentro de mongosh

// Listar bases de datos
show dbs

// Usar base de datos
use uixom

// Listar colecciones
show collections

// Contar usuarios
db.users.countDocuments()

// Ver todos los usuarios (limitado)
db.users.find().limit(10).pretty()

// Buscar usuario por email
db.users.findOne({ email: "admin@example.com" })

// Contar requests
db.requests.countDocuments()

// Ver estadísticas de requests por estado
db.requests.aggregate([
  { $group: { _id: "$status", count: { $sum: 1 } } }
])

// Ver índices
db.users.getIndexes()

// Estadísticas de la base de datos
db.stats()

// Verificar salud de la DB
db.adminCommand({ ping: 1 })
```

### Administración de Usuarios MongoDB
```bash
# Crear usuario de solo lectura
docker-compose exec db mongosh \
  --username admin \
  --password tu_password \
  --authenticationDatabase admin \
  --eval '
    db.getSiblingDB("uixom").createUser({
      user: "readonly",
      pwd: "password_readonly",
      roles: [{ role: "read", db: "uixom" }]
    })
  '

# Listar usuarios
docker-compose exec db mongosh \
  --username admin \
  --password tu_password \
  --authenticationDatabase admin \
  --eval 'db.getSiblingDB("admin").getUsers()'
```

### Exportar/Importar Datos
```bash
# Exportar colección a JSON
docker-compose exec db mongoexport \
  --username=admin \
  --password=tu_password \
  --authenticationDatabase=admin \
  --db=uixom \
  --collection=users \
  --out=/tmp/users.json

# Importar colección desde JSON
docker-compose exec db mongoimport \
  --username=admin \
  --password=tu_password \
  --authenticationDatabase=admin \
  --db=uixom \
  --collection=users \
  --file=/tmp/users.json
```

---

## SSL/Certificados

### Obtener Certificado Let's Encrypt
```bash
# Detener servicios que usan puerto 80/443
docker-compose stop frontend

# Obtener certificado
sudo certbot certonly --standalone \
  -d uixom.com \
  -d www.uixom.com \
  -d api.uixom.com \
  --agree-tos \
  --email admin@uixom.com

# Copiar certificados
sudo cp /etc/letsencrypt/live/uixom.com/fullchain.pem nginx/ssl/
sudo cp /etc/letsencrypt/live/uixom.com/privkey.pem nginx/ssl/

# Ajustar permisos
sudo chown $USER:$USER nginx/ssl/*.pem
chmod 644 nginx/ssl/fullchain.pem
chmod 600 nginx/ssl/privkey.pem

# Reiniciar servicios
docker-compose up -d
```

### Renovar Certificado
```bash
# Renovar manualmente
sudo certbot renew

# Renovar y reiniciar servicios
sudo certbot renew --deploy-hook "cd $(pwd) && docker-compose restart frontend"

# Verificar cuando expira
sudo certbot certificates
```

### Verificar SSL
```bash
# Verificar certificado localmente
openssl x509 -in nginx/ssl/fullchain.pem -noout -dates

# Verificar certificado desde servidor remoto
openssl s_client -connect uixom.com:443 -servername uixom.com

# Test SSL online (desde otra máquina)
curl -vI https://uixom.com
```

---

## Seguridad

### Generar Secretos Seguros
```bash
# Generar JWT secret (64 caracteres base64)
openssl rand -base64 64

# Generar contraseña MongoDB (32 caracteres)
openssl rand -base64 32

# Generar contraseña aleatoria legible
# (requiere pwgen: apt install pwgen)
pwgen 20 1
```

### Escanear Vulnerabilidades
```bash
# Escanear imágenes Docker
docker scan uixom-backend
docker scan uixom-frontend

# Auditar dependencias npm (backend)
docker-compose exec backend npm audit

# Auditar y arreglar vulnerabilidades
docker-compose exec backend npm audit fix

# Ver reporte detallado
docker-compose exec backend npm audit --json
```

### Verificar Configuración de Seguridad
```bash
# Verificar que MongoDB no esté expuesto
netstat -tuln | grep 27017
# No debe mostrar nada si está bien configurado

# Verificar puertos abiertos
sudo ss -tulpn

# Verificar firewall
sudo ufw status

# Test de headers de seguridad (desde otra máquina)
curl -I https://uixom.com
```

---

## Mantenimiento

### Limpiar Docker
```bash
# Eliminar contenedores detenidos
docker container prune

# Eliminar imágenes no usadas
docker image prune

# Eliminar volúmenes no usados (⚠️ CUIDADO)
docker volume prune

# Limpieza completa (⚠️ MUCHO CUIDADO)
docker system prune -a

# Ver espacio que se liberaría
docker system df
docker system prune --dry-run
```

### Actualizar Dependencias
```bash
# Backend
docker-compose exec backend npm outdated
docker-compose exec backend npm update
docker-compose restart backend

# Frontend
docker-compose exec frontend npm outdated
# (El frontend es una imagen estática, necesitas rebuild)
```

### Rebuild Completo
```bash
# Reconstruir todas las imágenes
docker-compose build --no-cache

# Reconstruir y reiniciar
docker-compose up -d --build

# Reconstruir solo backend
docker-compose build --no-cache backend
docker-compose up -d backend
```

### Rotar Logs
```bash
# Ver tamaño de logs de Docker
du -sh /var/lib/docker/containers/*/*-json.log

# Limpiar logs de un contenedor (⚠️ mientras está detenido)
# Ejemplo:
echo "" > /var/lib/docker/containers/CONTAINER_ID/*-json.log
```

---

## Troubleshooting

### Backend no responde
```bash
# Ver logs
docker-compose logs backend

# Verificar que esté corriendo
docker-compose ps backend

# Entrar al contenedor
docker-compose exec backend sh

# Verificar conectividad a MongoDB
docker-compose exec backend node -e "
  require('dotenv').config();
  const mongoose = require('mongoose');
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ DB OK'))
    .catch(err => console.log('❌ Error:', err.message));
"

# Reiniciar backend
docker-compose restart backend
```

### Frontend no carga
```bash
# Ver logs de NGINX
docker-compose logs frontend

# Verificar archivos estáticos
docker-compose exec frontend ls -la /usr/share/nginx/html

# Test de NGINX config
docker-compose exec frontend nginx -t

# Reiniciar frontend
docker-compose restart frontend
```

### MongoDB problemas de conexión
```bash
# Ver logs de MongoDB
docker-compose logs db

# Verificar que esté corriendo
docker-compose ps db

# Healthcheck manual
docker-compose exec db mongosh --eval "db.adminCommand('ping')"

# Ver configuración de red
docker network inspect uixom_uixom-network

# Reiniciar MongoDB (⚠️ puede causar downtime)
docker-compose restart db
```

### Problemas de permisos
```bash
# Arreglar permisos de logs
sudo chown -R $USER:$USER server/logs
chmod -R 755 server/logs

# Arreglar permisos de scripts
chmod +x scripts/*.sh

# Arreglar permisos de SSL
chmod 644 nginx/ssl/fullchain.pem
chmod 600 nginx/ssl/privkey.pem
```

### Disco lleno
```bash
# Ver uso de disco
df -h

# Ver espacio usado por Docker
docker system df

# Limpiar Docker (sin afectar datos)
docker system prune

# Ver backups grandes
du -sh backups/mongodb/*

# Eliminar backups antiguos
find backups/mongodb -name "*.tar.gz" -mtime +30 -delete
```

### Resetear completamente (⚠️ DESTRUYE DATOS)
```bash
# Detener todo
docker-compose down

# Eliminar volúmenes (ELIMINA BASE DE DATOS)
docker-compose down -v

# Limpiar todo Docker
docker system prune -a

# Eliminar imágenes
docker rmi uixom-backend uixom-frontend

# Iniciar desde cero
docker-compose up -d --build
docker-compose exec backend node scripts/createAdmin.js
```

---

## Comandos de Producción

### Deploy/Actualización
```bash
# 1. Hacer backup antes de actualizar
./scripts/backup-mongo.sh

# 2. Descargar última versión
git pull origin main

# 3. Rebuild y reiniciar
docker-compose build --no-cache
docker-compose up -d

# 4. Verificar logs
docker-compose logs -f

# 5. Verificar health
curl https://api.uixom.com/health
```

### Rollback
```bash
# 1. Detener servicios
docker-compose down

# 2. Volver a versión anterior
git checkout <commit_hash>

# 3. Rebuild
docker-compose build --no-cache
docker-compose up -d

# 4. Restaurar base de datos si es necesario
./scripts/restore-mongo.sh backups/mongodb/backup_antes_del_deploy.tar.gz
```

### Health Check Manual
```bash
# Backend
curl https://api.uixom.com/health

# Frontend
curl https://uixom.com

# SSL
openssl s_client -connect uixom.com:443 -servername uixom.com < /dev/null

# Ping a MongoDB (desde backend)
docker-compose exec backend node -e "
  require('dotenv').config();
  require('./db');
  setTimeout(() => {
    console.log('✅ DB Connected');
    process.exit(0);
  }, 2000);
"
```

---

## Aliases Útiles (opcional)

Agrega estos a tu `~/.bashrc` o `~/.zshrc`:

```bash
# Alias para UIXOM
alias uixom-logs='docker-compose -f /path/to/uixom/docker-compose.yml logs -f'
alias uixom-ps='docker-compose -f /path/to/uixom/docker-compose.yml ps'
alias uixom-restart='docker-compose -f /path/to/uixom/docker-compose.yml restart'
alias uixom-backup='cd /path/to/uixom && ./scripts/backup-mongo.sh'
alias uixom-logs-backend='docker-compose -f /path/to/uixom/docker-compose.yml logs -f backend'
alias uixom-logs-db='docker-compose -f /path/to/uixom/docker-compose.yml logs -f db'
```

Luego recargar:
```bash
source ~/.bashrc  # o ~/.zshrc
```

---

## 📚 Referencias

- [Docker Compose CLI](https://docs.docker.com/compose/reference/)
- [MongoDB Shell Commands](https://docs.mongodb.com/manual/reference/mongo-shell/)
- [NGINX Commands](https://www.nginx.com/resources/wiki/start/topics/tutorials/commandline/)
- [Certbot Commands](https://certbot.eff.org/docs/using.html)

---

**Tip:** Guarda este archivo en favoritos para consulta rápida.

**Última actualización:** Mayo 2026
