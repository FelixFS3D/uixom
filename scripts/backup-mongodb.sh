#!/bin/bash

# ========================================
# UIXOM - MongoDB Backup Script
# ========================================
# Descripción: Script para backup automático de MongoDB
# Uso: ./scripts/backup-mongodb.sh
# Cron: 0 2 * * * /path/to/uixom/scripts/backup-mongodb.sh >> /var/log/uixom-backup.log 2>&1

set -e  # Salir si hay error

# ========================================
# Configuración
# ========================================

# Cargar variables de entorno
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

# Directorios
BACKUP_DIR="${BACKUP_DIR:-/backups/mongodb}"
BACKUP_RETENTION_DAYS="${BACKUP_RETENTION_DAYS:-30}"

# Información del backup
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME="uixom_backup_${DATE}"
CONTAINER_NAME="uixom-db"

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# ========================================
# Funciones
# ========================================

log_info() {
    echo -e "${GREEN}[INFO]${NC} $(date '+%Y-%m-%d %H:%M:%S') - $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $(date '+%Y-%m-%d %H:%M:%S') - $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $(date '+%Y-%m-%d %H:%M:%S') - $1"
}

check_container() {
    if ! docker ps | grep -q "${CONTAINER_NAME}"; then
        log_error "Contenedor ${CONTAINER_NAME} no está corriendo"
        exit 1
    fi
}

create_backup_dir() {
    if [ ! -d "${BACKUP_DIR}" ]; then
        log_info "Creando directorio de backups: ${BACKUP_DIR}"
        mkdir -p "${BACKUP_DIR}"
    fi
}

# ========================================
# Proceso de Backup
# ========================================

log_info "========================================="
log_info "Iniciando backup de MongoDB"
log_info "========================================="

# Verificar que el contenedor está corriendo
check_container

# Crear directorio de backups
create_backup_dir

# Ejecutar mongodump dentro del contenedor
log_info "Ejecutando mongodump..."
docker exec "${CONTAINER_NAME}" mongodump \
    --username="${MONGO_USER}" \
    --password="${MONGO_PASSWORD}" \
    --authenticationDatabase=admin \
    --db="${MONGO_DB}" \
    --out="/tmp/${BACKUP_NAME}" \
    --quiet

if [ $? -ne 0 ]; then
    log_error "Falló mongodump"
    exit 1
fi

# Copiar backup desde el contenedor al host
log_info "Copiando backup al host..."
docker cp "${CONTAINER_NAME}:/tmp/${BACKUP_NAME}" "${BACKUP_DIR}/"

if [ $? -ne 0 ]; then
    log_error "Falló la copia del backup"
    exit 1
fi

# Comprimir backup
log_info "Comprimiendo backup..."
cd "${BACKUP_DIR}"
tar -czf "${BACKUP_NAME}.tar.gz" "${BACKUP_NAME}"

if [ $? -ne 0 ]; then
    log_error "Falló la compresión"
    exit 1
fi

# Eliminar directorio sin comprimir
rm -rf "${BACKUP_NAME}"

# Limpiar backup temporal del contenedor
docker exec "${CONTAINER_NAME}" rm -rf "/tmp/${BACKUP_NAME}"

# Calcular tamaño del backup
BACKUP_SIZE=$(du -h "${BACKUP_NAME}.tar.gz" | cut -f1)
log_info "Backup completado: ${BACKUP_NAME}.tar.gz (${BACKUP_SIZE})"

# ========================================
# Limpieza de backups antiguos
# ========================================

log_info "Limpiando backups antiguos (>${BACKUP_RETENTION_DAYS} días)..."
find "${BACKUP_DIR}" -name "uixom_backup_*.tar.gz" -mtime +${BACKUP_RETENTION_DAYS} -type f -delete

REMAINING_BACKUPS=$(ls -1 "${BACKUP_DIR}"/uixom_backup_*.tar.gz 2>/dev/null | wc -l)
log_info "Backups restantes: ${REMAINING_BACKUPS}"

# ========================================
# Subir a almacenamiento en la nube (OPCIONAL)
# ========================================

# Descomenta y configura según tu servicio de almacenamiento

# AWS S3
# if [ ! -z "${AWS_S3_BUCKET}" ]; then
#     log_info "Subiendo backup a S3..."
#     aws s3 cp "${BACKUP_DIR}/${BACKUP_NAME}.tar.gz" "s3://${AWS_S3_BUCKET}/backups/"
#     if [ $? -eq 0 ]; then
#         log_info "Backup subido a S3 exitosamente"
#     else
#         log_error "Falló la subida a S3"
#     fi
# fi

# Backblaze B2
# if [ ! -z "${B2_BUCKET}" ]; then
#     log_info "Subiendo backup a Backblaze B2..."
#     b2 upload-file "${B2_BUCKET}" "${BACKUP_DIR}/${BACKUP_NAME}.tar.gz" "backups/${BACKUP_NAME}.tar.gz"
#     if [ $? -eq 0 ]; then
#         log_info "Backup subido a B2 exitosamente"
#     else
#         log_error "Falló la subida a B2"
#     fi
# fi

# Rsync a servidor remoto
# if [ ! -z "${REMOTE_BACKUP_HOST}" ]; then
#     log_info "Sincronizando con servidor remoto..."
#     rsync -avz "${BACKUP_DIR}/${BACKUP_NAME}.tar.gz" "${REMOTE_BACKUP_USER}@${REMOTE_BACKUP_HOST}:${REMOTE_BACKUP_PATH}/"
#     if [ $? -eq 0 ]; then
#         log_info "Backup sincronizado exitosamente"
#     else
#         log_error "Falló la sincronización"
#     fi
# fi

# ========================================
# Notificación (OPCIONAL)
# ========================================

# Enviar notificación por email (requiere mailutils o sendmail)
# if [ ! -z "${BACKUP_NOTIFICATION_EMAIL}" ]; then
#     echo "Backup de MongoDB completado exitosamente\nFecha: $(date)\nArchivo: ${BACKUP_NAME}.tar.gz\nTamaño: ${BACKUP_SIZE}" | \
#     mail -s "✅ Backup UIXOM Exitoso" "${BACKUP_NOTIFICATION_EMAIL}"
# fi

# Webhook de Discord/Slack (opcional)
# if [ ! -z "${DISCORD_WEBHOOK_URL}" ]; then
#     curl -H "Content-Type: application/json" -X POST -d "{\"content\":\"✅ Backup MongoDB completado: ${BACKUP_NAME}.tar.gz (${BACKUP_SIZE})\"}" "${DISCORD_WEBHOOK_URL}"
# fi

log_info "========================================="
log_info "Backup completado exitosamente"
log_info "========================================="

exit 0
