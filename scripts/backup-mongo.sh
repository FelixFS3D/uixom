#!/bin/bash

# ============================================
# MongoDB Backup Script for UIXOM
# ============================================
# This script creates a backup of the MongoDB database
# and optionally uploads it to cloud storage
#
# Usage:
#   ./scripts/backup-mongo.sh
#
# Requirements:
#   - Docker and docker-compose installed
#   - uixom-db container running
#   - .env file with MongoDB credentials
#
# Setup cron job for daily backups at 2 AM:
#   crontab -e
#   0 2 * * * /path/to/uixom/scripts/backup-mongo.sh >> /var/log/uixom-backup.log 2>&1

set -e  # Exit on error

# ============================================
# CONFIGURATION
# ============================================

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Backup directory
BACKUP_DIR="${BACKUP_DIR:-./backups/mongodb}"
mkdir -p "$BACKUP_DIR"

# Date format for backup filename
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME="uixom_backup_${DATE}"

# Retention period (days)
RETENTION_DAYS=${BACKUP_RETENTION_DAYS:-30}

# Container name
CONTAINER_NAME="${CONTAINER_NAME:-uixom-db}"

# MongoDB credentials
MONGO_USER="${MONGO_USER:-admin}"
MONGO_PASSWORD="${MONGO_PASSWORD:-changeme}"

# Cloud storage (optional)
ENABLE_S3_UPLOAD=${ENABLE_S3_UPLOAD:-false}
S3_BUCKET="${S3_BUCKET:-}"

# ============================================
# FUNCTIONS
# ============================================

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

error() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ERROR: $1" >&2
}

# ============================================
# BACKUP PROCESS
# ============================================

log "Starting MongoDB backup..."

# Check if container is running
if ! docker ps | grep -q "$CONTAINER_NAME"; then
    error "Container $CONTAINER_NAME is not running"
    exit 1
fi

# Create backup using mongodump
log "Creating database dump..."
docker exec "$CONTAINER_NAME" mongodump \
    --username="$MONGO_USER" \
    --password="$MONGO_PASSWORD" \
    --authenticationDatabase=admin \
    --out="/tmp/$BACKUP_NAME" \
    2>&1 | grep -v "WARNING: mongodb instance"

if [ $? -ne 0 ]; then
    error "mongodump failed"
    exit 1
fi

# Copy backup from container to host
log "Copying backup to host..."
docker cp "$CONTAINER_NAME:/tmp/$BACKUP_NAME" "$BACKUP_DIR/"

if [ $? -ne 0 ]; then
    error "Failed to copy backup from container"
    exit 1
fi

# Compress backup
log "Compressing backup..."
tar -czf "$BACKUP_DIR/$BACKUP_NAME.tar.gz" -C "$BACKUP_DIR" "$BACKUP_NAME"

if [ $? -ne 0 ]; then
    error "Compression failed"
    exit 1
fi

# Remove uncompressed backup
rm -rf "$BACKUP_DIR/$BACKUP_NAME"

# Clean up container
docker exec "$CONTAINER_NAME" rm -rf "/tmp/$BACKUP_NAME"

# Get backup size
BACKUP_SIZE=$(du -h "$BACKUP_DIR/$BACKUP_NAME.tar.gz" | cut -f1)
log "Backup created: $BACKUP_NAME.tar.gz ($BACKUP_SIZE)"

# ============================================
# UPLOAD TO CLOUD STORAGE (Optional)
# ============================================

if [ "$ENABLE_S3_UPLOAD" = "true" ] && [ -n "$S3_BUCKET" ]; then
    log "Uploading backup to S3..."
    
    if command -v aws &> /dev/null; then
        aws s3 cp "$BACKUP_DIR/$BACKUP_NAME.tar.gz" "s3://$S3_BUCKET/backups/" \
            --storage-class STANDARD_IA
        
        if [ $? -eq 0 ]; then
            log "Backup uploaded to S3 successfully"
        else
            error "Failed to upload backup to S3"
        fi
    else
        error "AWS CLI not installed, skipping S3 upload"
    fi
fi

# ============================================
# CLEANUP OLD BACKUPS
# ============================================

log "Cleaning up old backups (older than $RETENTION_DAYS days)..."
find "$BACKUP_DIR" -name "uixom_backup_*.tar.gz" -mtime +$RETENTION_DAYS -delete

# Count remaining backups
BACKUP_COUNT=$(find "$BACKUP_DIR" -name "uixom_backup_*.tar.gz" | wc -l)
log "Total backups retained: $BACKUP_COUNT"

# ============================================
# DISK SPACE CHECK
# ============================================

DISK_USAGE=$(df -h "$BACKUP_DIR" | tail -1 | awk '{print $5}' | sed 's/%//')
if [ "$DISK_USAGE" -gt 80 ]; then
    error "Disk usage is at ${DISK_USAGE}% - consider increasing disk space or reducing retention period"
fi

log "Backup completed successfully!"

# ============================================
# OPTIONAL: Send notification
# ============================================

# Example: Send email notification (requires mailutils)
# echo "MongoDB backup completed: $BACKUP_NAME.tar.gz ($BACKUP_SIZE)" | \
#     mail -s "UIXOM Backup Success" admin@uixom.com

# Example: Send Slack notification (requires curl)
# if [ -n "$SLACK_WEBHOOK_URL" ]; then
#     curl -X POST "$SLACK_WEBHOOK_URL" \
#         -H 'Content-Type: application/json' \
#         -d "{\"text\":\"✅ MongoDB backup completed: $BACKUP_NAME.tar.gz ($BACKUP_SIZE)\"}"
# fi

exit 0
