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
- `GET /api/requests` -> listar solicitudes

Notas:
- Asegúrate de tener MongoDB corriendo o usar un URI remoto en `MONGODB_URI`.
- Si quieres que el proyecto también cree la parte cliente con Vite, puedo añadir un script que ejecute `npm create vite@latest client -- --template react` y lo configure automáticamente.

Importar workflow n8n (emails)
--------------------------------
1. Importa el flujo `n8n/workflow-send-request.json` en la interfaz de n8n:
	- Abre n8n (por defecto en http://localhost:5678).
	- Ve a la rueda de configuración (top-right) → "Import/Export" → "Import" y pega el contenido del JSON o sube el archivo.

2. Configura credenciales SMTP en n8n:
	- Crea unas credenciales SMTP (Settings → Credentials) con tu servidor SMTP o proveedor (SendGrid/SMTP).
	- Asocia esas credenciales a ambos nodos `Send confirmation email` y `Notify team email`.

3. Ajusta destinatarios:
	- En el nodo `Notify team email` cambia `team@yourdomain.com` por el correo de tu equipo.

4. Prueba:
	- Si usas `docker-compose` que añadimos, el server enviará por defecto al webhook `http://n8n:5678/webhook/receive-request` dentro de la red Docker.
	- Para probar desde fuera (localhost) y con n8n local, apunta `N8N_WEBHOOK_URL` a `http://localhost:5678/webhook/receive-request` y POSTea a `/api/requests`.

Si quieres, puedo generar también un `workflow-export-with-credentials.json` con instrucciones exactas para SendGrid o Mailgun.
