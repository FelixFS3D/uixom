# 🔒 Guía de Seguridad UIXOM

## ⚠️ ANTES DE HACER PUSH A GITHUB

### ✅ Checklist de Seguridad

Ejecuta este checklist **CADA VEZ** antes de hacer `git push`:

```powershell
# 1. Verificar seguridad automáticamente
.\scripts\verify-security.ps1

# 2. Verificar estado de Git
git status

# 3. Verificar que .env NO aparezca en el output
# Si aparece, DETENTE y ejecuta:
git rm --cached .env
```

---

## 🚨 PROBLEMAS CRÍTICOS Y SOLUCIONES

### Problema 1: `.env` Apareció en `git status`

**❌ NUNCA hagas esto:**
```bash
git add .env
git commit -m "Added env"  # ❌ PELIGRO
```

**✅ Solución:**
```powershell
# Remover del staging
git rm --cached .env

# Verificar que está en .gitignore
Get-Content .gitignore | Select-String "\.env"

# Si NO está, agrégalo:
Add-Content .gitignore "`n.env"
```

---

### Problema 2: Ya Hice Push con Credenciales

**🚨 ACCIÓN INMEDIATA:**

1. **Cambiar TODAS las credenciales expuestas:**
   - Contraseñas de MongoDB
   - JWT Secret
   - Contraseñas de email (App Passwords de Gmail)
   - API Keys

2. **Limpiar historial de Git:**
   ```powershell
   # Opción A: Reescribir historial (DESTRUCTIVO)
   git filter-branch --force --index-filter `
     "git rm --cached --ignore-unmatch .env" `
     --prune-empty --tag-name-filter cat -- --all
   
   # Opción B: BFG Repo Cleaner (MÁS SEGURO)
   # Descargar: https://rtyley.github.io/bfg-repo-cleaner/
   java -jar bfg.jar --delete-files .env
   git reflog expire --expire=now --all
   git gc --prune=now --aggressive
   
   # Forzar push
   git push origin --force --all
   ```

3. **Rotar secretos en producción:**
   - Regenerar JWT_SECRET: `openssl rand -base64 64`
   - Cambiar contraseñas de base de datos
   - Revocar y crear nuevas App Passwords de Gmail

---

## 📋 Variables de Entorno Seguras

### ✅ Archivo `.env.example` (PUEDE subirse a Git)

```env
# Valores de EJEMPLO - NO reales
MONGO_PASSWORD=your_password_here
JWT_SECRET=your_secret_here
SMTP_PASS=your_app_password_here
```

### ❌ Archivo `.env` (NUNCA subir a Git)

```env
# Valores REALES - NUNCA en Git
MONGO_PASSWORD=XkT9mP2vL8nQ4wR7
JWT_SECRET=a8c9e3f1b2d4...
SMTP_PASS=abcd efgh ijkl mnop
```

**Regla de oro:** Si tiene credenciales REALES → `.gitignore`

---

## 🔐 Generar Secretos Seguros

### JWT Secret (64 caracteres base64)

```powershell
# PowerShell
[Convert]::ToBase64String((1..64 | ForEach-Object { Get-Random -Maximum 256 }))

# Linux/Mac
openssl rand -base64 64

# Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"
```

### Contraseñas MongoDB (32 caracteres)

```powershell
# PowerShell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})

# Linux/Mac
openssl rand -base64 32
```

### Gmail App Password

1. Ir a: https://myaccount.google.com/apppasswords
2. Seleccionar "Mail" y "Other (Custom name)"
3. Nombre: "UIXOM Production"
4. Click "Generate"
5. Copiar el password de 16 caracteres

**⚠️ IMPORTANTE:** Si expusiste un App Password, **revócalo inmediatamente** y genera uno nuevo.

---

## 🛡️ Protección de Archivos

### `.gitignore` Esencial

```gitignore
# Variables de entorno
.env
.env.local
.env.*.local
.env.production
.env.development

# Mantener ejemplos
!.env.example
!.env.production.example

# Credenciales
credentials/
secrets/
*.pem
*.key
*.crt

# Backups con datos sensibles
backups/
*.dump
*.sql
*.tar.gz
```

### `.dockerignore` Esencial

```dockerignore
# Variables de entorno
.env
.env.*
!.env.example

# Credenciales
credentials/
secrets/
*.pem
*.key

# Git (no necesario en imagen)
.git
.github
```

---

## 📊 Verificación Pre-Push

### Script Automático

```powershell
# Ejecutar ANTES de cada push
.\scripts\verify-security.ps1
```

**El script verifica:**
- ✅ `.env` NO está en Git
- ✅ `.gitignore` contiene `.env`
- ✅ No hay credenciales en código
- ✅ Archivos `.example` existen
- ✅ `.dockerignore` está configurado

---

## 🚀 Workflow Seguro

### Desarrollo Local

```powershell
# 1. Crear .env desde ejemplo
Copy-Item .env.example .env

# 2. Editar con credenciales LOCALES
notepad .env

# 3. Verificar que NO esté en Git
git status  # .env NO debe aparecer

# 4. Trabajar normalmente
git add .
git commit -m "New feature"

# 5. Verificar seguridad
.\scripts\verify-security.ps1

# 6. Push seguro
git push
```

### Despliegue a Producción

```bash
# 1. En servidor VPS, crear .env.production
cp .env.production.example .env.production

# 2. Generar secretos ÚNICOS
openssl rand -base64 64  # JWT_SECRET
openssl rand -base64 32  # MONGO_PASSWORD

# 3. Editar .env.production con valores seguros
nano .env.production

# 4. El archivo .env.production SOLO existe en el servidor
# NUNCA se sube a Git
```

---

## 🔍 Auditoría de Seguridad

### Verificar Historial de Git

```powershell
# Buscar .env en historial
git log --all --full-history -- .env

# Buscar credenciales en commits
git log -p -S "SMTP_PASS" --all

# Ver archivos en último commit
git ls-tree -r HEAD --name-only
```

### Verificar Archivos Trackeados

```powershell
# Listar todos los archivos en Git
git ls-files

# Buscar archivos sensibles
git ls-files | Select-String "\.env$"
git ls-files | Select-String "credentials"
git ls-files | Select-String "\.pem$"
```

---

## 📞 Recursos Adicionales

### Si Expusiste Credenciales

1. **Cambiar credenciales inmediatamente**
2. **GitHub Secret Scanning:** https://docs.github.com/en/code-security/secret-scanning
3. **GitGuardian:** https://www.gitguardian.com/ (detecta secretos)
4. **TruffleHog:** https://github.com/trufflesecurity/trufflehog (auditoría local)

### Herramientas de Seguridad

```powershell
# Instalar git-secrets (previene commits con secretos)
# https://github.com/awslabs/git-secrets

git secrets --install
git secrets --register-aws
```

---

## ✅ Resumen de Buenas Prácticas

1. ✅ **NUNCA** subir `.env` a Git
2. ✅ **SIEMPRE** usar `.env.example` con valores de ejemplo
3. ✅ **VERIFICAR** con `git status` antes de commit
4. ✅ **EJECUTAR** `verify-security.ps1` antes de push
5. ✅ **ROTAR** secretos si se exponen
6. ✅ **USAR** secretos DIFERENTES en dev y producción
7. ✅ **GENERAR** secretos con herramientas criptográficas
8. ✅ **DOCUMENTAR** pero sin incluir valores reales

---

**🔒 La seguridad es responsabilidad de todos. ¡No comprometas las credenciales!**
