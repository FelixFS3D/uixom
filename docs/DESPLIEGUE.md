# 🚀 Guía de Despliegue en Producción - UIXOM

> **Stack de Producción:** Hetzner VPS + MongoDB Atlas + Cloudflare + IONOS + Resend  
> **Tiempo estimado:** 3-4 horas (primera vez)  
> **Costo mensual:** €4-6/mes

---

## 📋 Índice

1. [Pre-requisitos](#1-pre-requisitos)
2. [Configurar MongoDB Atlas](#2-configurar-mongodb-atlas)
3. [Contratar y Configurar VPS Hetzner](#3-contratar-y-configurar-vps-hetzner)
4. [Configurar DNS (IONOS + Cloudflare)](#4-configurar-dns-ionos--cloudflare)
5. [Configurar Email (Resend)](#5-configurar-email-resend)
6. [Preparar Variables de Entorno](#6-preparar-variables-de-entorno)
7. [Desplegar la Aplicación](#7-desplegar-la-aplicación)
8. [Configurar SSL (Let's Encrypt)](#8-configurar-ssl-lets-encrypt)
9. [Verificación Final](#9-verificación-final)
10. [Mantenimiento y Backups](#10-mantenimiento-y-backups)

---

## 1. Pre-requisitos

### ✅ Servicios Necesarios

| Servicio | Propósito | Costo | Registro |
|----------|-----------|-------|----------|
| **MongoDB Atlas** | Base de datos cloud | Gratis (512MB) | https://cloud.mongodb.com |
| **Hetzner Cloud** | Servidor VPS | €4.15/mes | https://hetzner.com/cloud |
| **IONOS** | Dominio (ya tienes) | - | https://ionos.es |
| **Cloudflare** | CDN, SSL, Seguridad | Gratis | https://cloudflare.com |
| **Resend** | Email transaccional | Gratis (3K/mes) | https://resend.com |

### 🛠️ Software Local

```powershell
# Verificar SSH
ssh -V

# Si no tienes SSH key, generar:
ssh-keygen -t ed25519 -C "tu@email.com"
cat ~/.ssh/id_ed25519.pub  # Copiar esta clave para Hetzner
```

---

## 2. Configurar MongoDB Atlas

### 2.1 Crear Cuenta y Cluster

1. **Registrarse en MongoDB Atlas:**
   - Ir a https://cloud.mongodb.com
   - Sign Up → Crear cuenta (usar Google/GitHub es más rápido)

2. **Crear Cluster Gratuito:**
   - Build a Database → Free (M0)
   - Provider: **AWS** o **Google Cloud**
   - Region: **Frankfurt (eu-central-1)** o **Amsterdam** (GDPR)
   - Cluster Name: `Cluster0` (default está bien)
   - Create

### 2.2 Configurar Seguridad

1. **Crear Usuario de Base de Datos:**
   - Security → Database Access → Add New Database User
   - Authentication: Password
   - Username: `uixom_prod`
   - Password: **Autogenerate Secure Password** ✅ (guardar en lugar seguro)
   - Database User Privileges: **Atlas admin**
   - Add User

2. **Whitelist de IPs:**
   - ⚠️ **IMPORTANTE:** Haremos esto después de tener la IP del VPS
   - Security → Network Access → Add IP Address
   - Por ahora: **Allow Access from Anywhere** (0.0.0.0/0)
   - ⚠️ Cambiaremos esto más tarde por la IP específica del VPS

### 2.3 Obtener URI de Conexión

1. **Connect to Cluster:**
   - Clusters → Connect → Drivers
   - Driver: Node.js
   - Version: 4.1 or later

2. **Copiar URI:**
   ```
   mongodb+srv://uixom_prod:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

3. **Modificar URI:**
   - Reemplazar `<password>` con tu contraseña real
   - Agregar `/uixom` después de `.net/`:
   ```
   mongodb+srv://uixom_prod:TU_PASSWORD@cluster0.xxxxx.mongodb.net/uixom?retryWrites=true&w=majority
   ```

4. **⚠️ Caracteres Especiales:**
   Si tu password tiene `@`, `#`, etc., codifícalos:
   - `@` → `%40`
   - `#` → `%23`
   - `%` → `%25`

5. **Guardar URI:**
   Guarda la URI completa, la necesitarás más adelante.

---

## 3. Contratar y Configurar VPS Hetzner

### 3.1 Crear Cuenta y Contratar VPS

1. **Registrarse en Hetzner:**
   - https://hetzner.com/cloud
   - Sign Up → Crear cuenta
   - Verificar email

2. **Crear Proyecto:**
   - Projects → New Project
   - Name: `UIXOM Production`

3. **Agregar Servidor:**
   - Add Server
   - **Location:** Falkenstein (Germany) - GDPR compliant
   - **Image:** Ubuntu 22.04 LTS
   - **Type:** CX21 (2 vCPU, 4GB RAM, 40GB SSD) - €4.15/mes
   - **SSH Keys:** Pegar tu clave pública (de `~/.ssh/id_ed25519.pub`)
   - **Name:** `uixom-prod`
   - Create & Buy Now

4. **Anotar IP Pública:**
   - Copiar la **IPv4** que aparece (ej: `159.89.123.45`)
   - ⚠️ **MUY IMPORTANTE:** Esta IP la necesitarás para:
     - MongoDB Atlas (whitelist)
     - DNS (IONOS/Cloudflare)

### 3.2 Conexión Inicial y Seguridad

```powershell
# Conectar como root (primera vez)
ssh root@159.89.123.45  # Reemplazar con tu IP

# ===== EN EL SERVIDOR =====

# Actualizar sistema
apt update && apt upgrade -y

# Crear usuario para la aplicación
adduser uixom
# Ingresar password cuando lo pida (guardar este password)

# Dar privilegios sudo
usermod -aG sudo uixom

# Copiar SSH keys al nuevo usuario
rsync --archive --chown=uixom:uixom ~/.ssh /home/uixom

# Configurar firewall
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable  # Confirmar con 'y'

# Verificar firewall
ufw status

# Salir
exit
```

```powershell
# Probar conexión con nuevo usuario
ssh uixom@159.89.123.45

# Si funciona, continúa. Si no, revuelve al paso anterior.
```

### 3.3 Instalar Software Necesario

```bash
# Conectado como uixom en el VPS

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Instalar Docker Compose
sudo apt install docker-compose -y

# Instalar Git
sudo apt install git -y

# Instalar Nginx
sudo apt install nginx -y

# Instalar Certbot (SSL)
sudo apt install certbot python3-certbot-nginx -y

# Verificar instalaciones
docker --version
docker-compose --version
git --version
nginx -v
certbot --version

# ⚠️ IMPORTANTE: Salir y volver a entrar para que Docker funcione sin sudo
exit
```

```powershell
# Volver a conectar
ssh uixom@159.89.123.45

# Verificar que Docker funciona sin sudo
docker ps
# Debe mostrar tabla vacía (no error de permisos)
```

### 3.4 Actualizar MongoDB Atlas con IP del VPS

Ahora que tienes la IP fija del VPS:

1. **Ir a MongoDB Atlas:**
   - Security → Network Access
   - Edit (el entry 0.0.0.0/0)
   - Delete

2. **Agregar IP específica:**
   - Add IP Address
   - IP: `159.89.123.45` (tu IP del VPS)
   - Comment: `Hetzner VPS Production`
   - Confirm

---

## 4. Configurar DNS (IONOS + Cloudflare)

### 4.1 Registrar Dominio en Cloudflare

1. **Crear cuenta en Cloudflare:**
   - https://cloudflare.com → Sign Up
   - Verificar email

2. **Agregar sitio:**
   - Add a Site
   - Ingresar: `uixom.com`
   - Select Plan: **Free** (es suficiente)
   - Continue

3. **Cloudflare escanea DNS:**
   - Review DNS records
   - Cloudflare detectará automáticamente los registros actuales de IONOS
   - Continue

4. **Copiar Nameservers:**
   Cloudflare te dará 2 nameservers, ejemplo:
   ```
   ava.ns.cloudflare.com
   walt.ns.cloudflare.com
   ```
   **Guardar estos nombres.**

### 4.2 Cambiar Nameservers en IONOS

1. **Panel de IONOS:**
   - https://www.ionos.es → Login
   - Menú → Dominios y SSL
   - Seleccionar: `uixom.com`

2. **Cambiar DNS:**
   - Administrar dominio → Configuración DNS
   - Buscar: "Usar otros servidores de nombres"
   - Cambiar a: **Nameservers personalizados**
   - Nameserver 1: `ava.ns.cloudflare.com`
   - Nameserver 2: `walt.ns.cloudflare.com`
   - Guardar

3. **Esperar propagación:**
   - Puede tomar 2-48 horas
   - Cloudflare te enviará un email cuando esté activo

### 4.3 Configurar Registros DNS en Cloudflare

1. **En Cloudflare → DNS → Records:**

| Type | Name | Content | Proxy | TTL |
|------|------|---------|-------|-----|
| A | @ | 159.89.123.45 | ✅ Proxied | Auto |
| A | www | 159.89.123.45 | ✅ Proxied | Auto |

2. **Configuración SSL/TLS:**
   - SSL/TLS → Overview
   - Encryption mode: **Full (strict)** ⚠️ Configurar DESPUÉS de tener SSL en VPS
   - Por ahora: **Flexible**

3. **Configurar Security:**
   - Security → Settings
   - Security Level: **Medium**
   - Bot Fight Mode: **On**

4. **Verificar propagación:**
   ```powershell
   nslookup uixom.com
   # Debe mostrar IPs de Cloudflare (no tu VPS directamente)
   ```

---

## 5. Configurar Email (Resend)

### 5.1 Crear Cuenta en Resend

1. **Registrarse:**
   - https://resend.com → Sign Up
   - Verificar email

2. **Crear API Key:**
   - Dashboard → API Keys
   - Create API Key
   - Name: `UIXOM Production`
   - Permission: **Send emails**
   - Domain: `uixom.com`
   - Create
   - **⚠️ Copiar y guardar la key:** `re_xxxxxxxxxxxxxxxxx`

### 5.2 Verificar Dominio

1. **Agregar dominio:**
   - Domains → Add Domain
   - Domain: `uixom.com`
   - Add

2. **Configurar DNS en Cloudflare:**
   Resend te dará registros DNS, ejemplos:
   
   Agregar en Cloudflare → DNS:

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| TXT | @ | v=spf1 include:_spf.resend.com ~all | ❌ DNS only |
| CNAME | resend._domainkey | resend._domainkey.uixom.com.resend.email | ❌ DNS only |

3. **Verificar:**
   - En Resend, clic en **Verify**
   - Puede tardar 5-30 minutos

4. **Configuración SMTP (opcional):**
   Resend también ofrece SMTP:
   ```
   SMTP_HOST=smtp.resend.com
   SMTP_PORT=587
   SMTP_USER=resend
   SMTP_PASS=re_xxxxxxxxxxxxxxxxx
   ```

---

## 6. Preparar Variables de Entorno

### 6.1 Crear archivo .env de producción localmente

En tu PC, crea `server/.env.production`:

```env
# ==========================================
# PRODUCCIÓN - UIXOM
# ==========================================

NODE_ENV=production
PORT=5005

# MongoDB Atlas
MONGODB_URI=mongodb+srv://uixom_prod:TU_PASSWORD@cluster0.xxxxx.mongodb.net/uixom?retryWrites=true&w=majority

# Seguridad
JWT_SECRET=<GENERAR_STRING_32_CHARS>
JWT_EXPIRES_IN=7d
BCRYPT_ROUNDS=12

# CORS - Solo tu dominio
CORS_ORIGINS=https://uixom.com,https://www.uixom.com
CORS_ALLOW_CREDENTIALS=true
TRUST_PROXY=true

# Rate Limiting
RATE_LIMIT_WINDOW_MINUTES=15
RATE_LIMIT_MAX=100

# Email - Resend
SMTP_HOST=smtp.resend.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=resend
SMTP_PASS=re_xxxxxxxxxxxxxxxxx

EMAIL_FROM=Uixom <noreply@uixom.com>
EMAIL_TEAM_TO=equipo@uixom.com
EMAIL_REPLY_TO=soporte@uixom.com

# Website
WEBSITE_URL=https://uixom.com

# Admin inicial
ADMIN_NAME=Admin
ADMIN_EMAIL=admin@uixom.com
ADMIN_PASSWORD=<PASSWORD_SEGURO>
```

### 6.2 Generar JWT_SECRET

```powershell
# Opción 1: Online
# Ir a https://randomkeygen.com/
# Copiar un "CodeIgniter Encryption Keys" (256-bit)

# Opción 2: Con Node
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Opción 3: Con OpenSSL
openssl rand -hex 32
```

### 6.3 Crear .env para Docker Compose (desarrollo)

El archivo `.env` en la raíz es solo para desarrollo local con Docker Compose.  
En producción NO usaremos Docker Compose (usaremos Docker directo).

---

## 7. Desplegar la Aplicación

### 7.1 Subir Código al VPS

```powershell
# En tu PC - Commit y push a GitHub
cd C:\Users\felix\uixom
git add .
git commit -m "Preparar para producción"
git push origin main
```

```bash
# En el VPS (conectado por SSH)
cd ~
git clone https://github.com/TU_USUARIO/uixom.git
cd uixom

# Verificar
ls -la
# Debe mostrar: client/ server/ docker-compose.yml README.md
```

### 7.2 Configurar Variables de Entorno en el VPS

```bash
# Desde tu PC, copiar .env al VPS
scp C:\Users\felix\uixom\server\.env.production uixom@159.89.123.45:~/uixom/server/.env

# Verificar en el VPS
cd ~/uixom/server
cat .env
# Debe mostrar todas las variables
```

### 7.3 Construir y Ejecutar Contenedores

**⚠️ IMPORTANTE:** En producción usamos Docker directo, NO Docker Compose.

```bash
# En el VPS
cd ~/uixom

# === BACKEND ===

# Construir imagen del backend
cd ~/uixom
docker build -f server/Dockerfile -t uixom-backend .

# Ejecutar contenedor backend
docker run -d \
  --name uixom-backend \
  --restart unless-stopped \
  -p 5005:5005 \
  --env-file server/.env \
  uixom-backend

# Verificar logs
docker logs uixom-backend
# Buscar: "Connected to MongoDB" y "Server running on port 5005"

# === FRONTEND ===

# Construir imagen del frontend
docker build -f client/Dockerfile \
  --build-arg VITE_API_URL=https://uixom.com/api \
  -t uixom-frontend .

# Ejecutar contenedor frontend
docker run -d \
  --name uixom-frontend \
  --restart unless-stopped \
  -p 3000:80 \
  uixom-frontend

# Verificar
docker ps
# Deben aparecer ambos contenedores con status "Up"
```

### 7.4 Crear Usuario Admin

```bash
# En el VPS
cd ~/uixom/server

# Ejecutar script dentro del contenedor
docker exec -it uixom-backend npm run create-admin

# Debe mostrar: "Admin user created successfully"
```

---

## 8. Configurar SSL (Let's Encrypt)

### 8.1 Configurar Nginx como Proxy Reverso

```bash
# En el VPS
sudo nano /etc/nginx/sites-available/uixom
```

Pegar esta configuración:

```nginx
# Redirigir HTTP a HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name uixom.com www.uixom.com;
    
    # Permitir Let's Encrypt validation
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }
    
    location / {
        return 301 https://$server_name$request_uri;
    }
}

# HTTPS
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name uixom.com www.uixom.com;

    # SSL certificates (configurar después)
    ssl_certificate /etc/letsencrypt/live/uixom.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/uixom.com/privkey.pem;
    
    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers HIGH:!aNULL:!MD5;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Backend API
    location /api {
        proxy_pass http://localhost:5005;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Swagger
    location /api-docs {
        proxy_pass http://localhost:5005;
        proxy_set_header Host $host;
    }
}
```

```bash
# Guardar: Ctrl+O, Enter, Ctrl+X

# Activar sitio
sudo ln -s /etc/nginx/sites-available/uixom /etc/nginx/sites-enabled/

# Eliminar default
sudo rm /etc/nginx/sites-enabled/default

# Por ahora NO testar ni reiniciar Nginx (no tenemos SSL aún)
```

### 8.2 Obtener Certificado SSL

```bash
# Detener Nginx temporalmente
sudo systemctl stop nginx

# Crear directorio para certbot
sudo mkdir -p /var/www/certbot

# Obtener certificado
sudo certbot certonly --standalone \
  -d uixom.com \
  -d www.uixom.com \
  --email tu@email.com \
  --agree-tos \
  --no-eff-email

# Debe mostrar:
# Successfully received certificate.
# Certificate is saved at: /etc/letsencrypt/live/uixom.com/fullchain.pem

# Verificar configuración de Nginx
sudo nginx -t

# Si todo OK, iniciar Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Verificar status
sudo systemctl status nginx
```

### 8.3 Auto-renovación SSL

```bash
# Agregar renovación automática
sudo crontab -e

# Agregar esta línea al final:
0 3 * * * certbot renew --quiet && systemctl reload nginx

# Guardar y salir
```

### 8.4 Actualizar Cloudflare SSL Mode

1. **Cloudflare Dashboard:**
   - SSL/TLS → Overview
   - Encryption mode: **Full (strict)**
   - Guardar

---

## 9. Verificación Final

### 9.1 Tests desde el VPS

```bash
# Backend health
curl http://localhost:5005/api/health
# Respuesta: {"status":"ok"}

# Frontend
curl http://localhost:3000
# Respuesta: HTML del React app

# HTTPS (desde fuera)
curl https://uixom.com
# Respuesta: HTML
```

### 9.2 Tests desde tu navegador

1. **Abrir https://uixom.com**
   - ✅ Debe cargar la aplicación
   - ✅ Candado 🔒 verde en la barra de direcciones
   - ✅ No mostrar warnings de certificado

2. **Verificar API:**
   - https://uixom.com/api-docs
   - ✅ Debe mostrar Swagger UI

3. **Test de Login:**
   - https://uixom.com/login
   - Usuario: `admin@uixom.com` (o el que configuraste)
   - Password: (el de ADMIN_PASSWORD)
   - ✅ Debe iniciar sesión correctamente

4. **Verificar Email:**
   - Registrar nuevo usuario
   - ✅ Debe llegar email de confirmación

### 9.3 Verificar SSL

```powershell
# Desde tu PC
curl -I https://uixom.com
# Debe mostrar: HTTP/2 200 (no HTTP/1.1)

# SSL Labs test
# Ir a: https://www.ssllabs.com/ssltest/
# Ingresar: uixom.com
# ✅ Debe obtener grado A
```

---

## 10. Mantenimiento y Backups

### 10.1 Configurar Backups Automáticos

MongoDB Atlas ya hace backups automáticos (incluido en plan gratuito).

**Verificar:**
1. MongoDB Atlas → Cluster → Backup
2. Debe mostrar: "Continuous backup" enabled

### 10.2 Logs

```bash
# Ver logs del backend
docker logs -f uixom-backend

# Ver logs del frontend
docker logs -f uixom-frontend

# Logs de Nginx
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

### 10.3 Actualizar la Aplicación

```bash
# En el VPS
cd ~/uixom

# Pull cambios
git pull origin main

# Rebuild y restart backend
docker stop uixom-backend
docker rm uixom-backend
docker build -f server/Dockerfile -t uixom-backend .
docker run -d \
  --name uixom-backend \
  --restart unless-stopped \
  -p 5005:5005 \
  --env-file server/.env \
  uixom-backend

# Rebuild y restart frontend
docker stop uixom-frontend
docker rm uixom-frontend
docker build -f client/Dockerfile \
  --build-arg VITE_API_URL=https://uixom.com/api \
  -t uixom-frontend .
docker run -d \
  --name uixom-frontend \
  --restart unless-stopped \
  -p 3000:80 \
  uixom-frontend

# Verificar
docker ps
```

### 10.4 Monitoring

**Recomendado:** UptimeRobot (gratis)

1. **Registrarse:**
   - https://uptimerobot.com → Sign Up

2. **Agregar Monitor:**
   - Add New Monitor
   - Monitor Type: **HTTP(s)**
   - Friendly Name: `UIXOM Production`
   - URL: `https://uixom.com`
   - Monitoring Interval: **5 minutes**
   - Create

3. **Alertas:**
   - Settings → Alert Contacts
   - Agregar email/SMS
   - Te avisará si la web cae

---

## 🎉 ¡Despliegue Completado!

Tu aplicación ahora está en producción:
- 🌐 **Web:** https://uixom.com
- 🔌 **API:** https://uixom.com/api
- 📚 **Docs:** https://uixom.com/api-docs

---

## 📊 Resumen de Costos

| Servicio | Costo |
|----------|-------|
| MongoDB Atlas | €0 (gratis 512MB) |
| Hetzner VPS | €4.15/mes |
| Cloudflare | €0 (plan gratis) |
| Resend | €0 (gratis 3K emails/mes) |
| Let's Encrypt SSL | €0 (gratis) |
| **TOTAL** | **€4.15/mes** |

---

## 🆘 Troubleshooting

### Error: "Cannot connect to MongoDB"
- Verificar IP del VPS en MongoDB Atlas whitelist
- Verificar que MONGODB_URI sea correcta
- Ver logs: `docker logs uixom-backend`

### Error 502 Bad Gateway
- Backend no está corriendo: `docker ps`
- Verificar logs: `docker logs uixom-backend`
- Restart: `docker restart uixom-backend`

### SSL certificate not found
- Verificar que Certbot se ejecutó correctamente
- Ver: `sudo ls -la /etc/letsencrypt/live/uixom.com/`

### Emails no se envían
- Verificar SMTP credentials en `.env`
- Verificar dominio verificado en Resend
- Ver logs de backend

---

**Documentación:** [DESARROLLO.md](DESARROLLO.md) | [ARQUITECTURA.md](ARQUITECTURA.md)  
**Fecha:** Mayo 2026
