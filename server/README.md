# Uixom Server (MERN backend)

Instrucciones rápidas para dejar el servidor listo — tipo "vite" para el backend:

1. Copia el ejemplo de variables de entorno:

```powershell
copy .env.example .env
```

2. Instala dependencias:

```powershell
npm install
```

3. Arranca en modo desarrollo (requiere `nodemon`):

```powershell
npm run dev
```

4. Endpoints:
- `GET /` -> prueba rápida
- `POST /api/requests` -> crear solicitud (campos: `name`, `phone`, `email`, `description`)
- `GET /api/requests` -> listar solicitudes (acepta `status`, `priority`, `search`, `sortBy` y `sortOrder`)
- `GET /api/requests/stats` -> totales por estado/prioridad para el panel (requiere admin)

## Variables de entorno mínimas

1. Copia `.env.example` y completa estos campos antes de desplegar:
	- `MONGODB_URI` → usa un cluster accesible públicamente (Atlas recomendado). Render no puede conectarse a tu Mongo local.
	- `JWT_SECRET` → genera una cadena larga y única. Obligatoria en producción.
	- `CORS_ORIGINS` → define los dominios del frontend separados por coma (por ejemplo `https://uixom-web.vercel.app`).
	- `RATE_LIMIT_*` → deja los valores por defecto o ajústalos si esperas más tráfico.
	- `SMTP_*` y `EMAIL_*` → opcional; si los dejas vacíos el backend funcionará sin enviar correos.
2. En Render configura exactamente las mismas variables desde el panel **Environment**.
3. Si vas a usar Vercel para el frontend, recuerda añadir la URL del backend (`https://tu-app.onrender.com`) en sus variables/archivos `.env` para que apunte al servidor correcto.

## Despliegue rápido (Render + Mongo Atlas)

1. **Mongo Atlas**: crea un cluster gratuito, permite acceso desde `0.0.0.0/0` (o la IP de Render) y copia el URI en `MONGODB_URI`.
2. **Render Web Service**:
	- Repositorio → este proyecto.
	- Build Command → `npm install`
	- Start Command → `npm run start`
	- Define `PORT=10000` solo si Render lo exige (normalmente auto-define `PORT`). Nuestro servidor ya usa la variable que provee Render.
	- Activa `Auto Deploy` para cada push en main.
3. **CORS**: ajusta `CORS_ORIGINS` (por ejemplo `https://uixom-web.vercel.app,http://localhost:5173`).
4. **Healthcheck**: Render usará `GET /health`, ya expuesto, para validar que el contenedor responde.
5. **Frontend (Vercel)**: apunta tus llamadas al backend usando la URL pública de Render y mantén las mismas rutas (`/api/...`).

Notas:
- Asegúrate de tener MongoDB corriendo o usar un URI remoto en `MONGODB_URI`.
- Si quieres que el proyecto también cree la parte cliente con Vite, puedo añadir un script que ejecute `npm create vite@latest client -- --template react` y lo configure automáticamente.

Email directo (Nodemailer)
--------------------------
El backend envía correos directamente usando Nodemailer.

1. Rellena estas variables en `.env`:
	```ini
	SMTP_HOST=smtp.gmail.com
	SMTP_PORT=587
	SMTP_SECURE=false
	SMTP_USER=tu_correo@gmail.com
	SMTP_PASS=tu_password_app
	EMAIL_FROM=Uixom <tu_correo@gmail.com>
	EMAIL_TEAM_TO=felix.fs3d@gmail.com
	EMAIL_REPLY_TO=felix.fs3d@gmail.com
	```
	> Si usas Gmail, crea una **App Password** (Google Account → Security → 2FA → App passwords) y úsala en `SMTP_PASS`.

2. Al recibir una nueva solicitud (`POST /api/requests`), el servidor enviará:
	- Un correo interno al equipo (`EMAIL_TEAM_TO`).
	- Una confirmación al cliente (si dejó email).

3. Si faltan variables SMTP, el servidor simplemente registrará una advertencia y seguirá funcionando (sin intentar mandar correos).

## Mapa de carpetas (uso interno)

| Carpeta | Propósito principal |
| --- | --- |
| `app.js` | Bootstrap de Express: seguridad (Helmet, CORS, rate limit), rutas, `/health`. |
| `server.js` | Punto de entrada: levanta `app` leyendo el puerto desde `config`. |
| `config/` | Configuración validada por Joi (`index.js`), logger Winston, Swagger. |
| `controllers/` | Lógica de negocio para auth, usuarios y solicitudes. |
| `routes/` | Definición de endpoints + protección (`authenticate`, `authorize`). |
| `middleware/` | Autenticación JWT, control de roles y `validateBody` genérico para Joi. |
| `validators/` | Esquemas Joi reutilizables (`auth`, `users`, `requests`). |
| `models/` | Esquemas Mongoose (`User`, `Request`). |
| `services/emailService.js` | Envío de notificaciones vía SMTP (opcional). |
| `db/` | Conexión a Mongo con reconexiones y apagado elegante. |
| `error-handling/` | Middleware 404 y 500 centralizados. |
| `utils/httpResponses.js` | Helper para respuestas de error consistentes. |
| `scripts/` | Automatizaciones (`setup` para entorno local, `createAdmin` para bootstrap de super admin). |
| `__tests__/` | Tests con Jest + Supertest para endpoints principales. |
| `logs/` | Salida de Winston (solo útil en local; en Render conviene usar consola). |

## Documentación para frontend / terceros

- **Base URL (dev local):** `http://localhost:5005`
- **Base URL (Render):** `https://<tu-servicio>.onrender.com`
- **Documentación Swagger:** `/api-docs`

### Autenticación
- Login para administradores: `POST /api/auth/login` → body `{ email, password }`, responde `{ token, user }`.
- Perfil actual: `GET /api/auth/me` (requiere header `Authorization: Bearer <token>`).
- El token expira según `JWT_EXPIRES_IN`; cuando reciba 401 debe reloguear.

### Solicitudes públicas
- `POST /api/requests` (sin auth) con `{ name, phone, email, description }`.
- Respuesta: objeto `Request` con `_id`, `status`, `priority`, timestamps.

### Panel admin (requiere token de `admin` o `super_admin`)
- `GET /api/requests` admite filtros `status`, `priority`, `search`, `page`, `limit`, `sortBy`, `sortOrder`.
- `GET /api/requests/stats` devuelve conteos por estado/prioridad.
- `GET /api/requests/:id`, `PATCH /api/requests/:id`, `POST /api/requests/:id/notes`, `DELETE /api/requests/:id` (este último solo `super_admin`).

### Gestión de usuarios internos
- `GET /api/users` lista con filtros `role`, `isActive`, `search`, `page`, `limit`.
- `POST /api/users` crea usuarios; solo `super_admin` puede crear otros `admin/super_admin`.
- `PUT /api/users/:id` actualiza perfil/rol/estado.
- `DELETE /api/users/:id` desactiva (soft delete) – evita auto-eliminación.

### Códigos de error comunes
- `AUTH_TOKEN_MISSING`, `AUTH_USER_INACTIVE`, `ROLE_FORBIDDEN`, `VALIDATION_ERROR`… Consulta `utils/httpResponses.js` para el listado y úsalos en el frontend para mensajes claros.

Con esta guía tienes tanto la referencia interna para mantener el backend como la información básica que el frontend o terceros necesitan para consumir la API.
