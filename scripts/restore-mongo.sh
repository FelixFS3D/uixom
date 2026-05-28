#!/bin/bash

# ============================================
# MongoDB Restore Script for UIXOM
# ============================================
# This script restores a MongoDB backup
#
# Usage:
#   ./scripts/restore-mongo.sh <backup_file.tar.gz>
#
# Example:
#   ./scripts/restore-mongo.sh backups/mongodb/uixom_backup_20260520_020000.tar.gz
#
# ⚠️ WARNING: This will replace all data in the database!

set -e  # Exit on error

# ============================================
# CONFIGURATION
# ============================================

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Container name
CONTAINER_NAME="${CONTAINER_NAME:-uixom-db}"

# MongoDB credentials
MONGO_USER="${MONGO_USER:-admin}"
MONGO_PASSWORD="${MONGO_PASSWORD:-changeme}"
MONGO_DB="${MONGO_DB:-uixom}"

# Temporary directory
TEMP_DIR="/tmp/uixom_restore_$$"

# ============================================
# FUNCTIONS
# ============================================

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

error() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ERROR: $1" >&2
}

cleanup() {
    log "Cleaning up temporary files..."
    rm -rf "$TEMP_DIR"
    docker exec "$CONTAINER_NAME" rm -rf "/tmp/restore_backup" 2>/dev/null || true
}

# ============================================
# VALIDATION
# ============================================

# Check if backup file is provided
if [ $# -eq 0 ]; then
    error "No backup file specified"
    echo "Usage: $0 <backup_file.tar.gz>"
    echo ""
    echo "Available backups:"
    find ./backups/mongodb -name "*.tar.gz" -type f 2>/dev/null | sort -r | head -n 10
    exit 1
fi

BACKUP_FILE="$1"

# Check if backup file exists
if [ ! -f "$BACKUP_FILE" ]; then
    error "Backup file not found: $BACKUP_FILE"
    exit 1
fi

# Check if container is running
if ! docker ps | grep -q "$CONTAINER_NAME"; then
    error "Container $CONTAINER_NAME is not running"
    exit 1
fi

# ============================================
# CONFIRMATION
# ============================================

echo ""
echo "⚠️  WARNING ⚠️"
echo "This will REPLACE ALL DATA in the database: $MONGO_DB"
echo "Backup file: $BACKUP_FILE"
echo ""
read -p "Are you sure you want to continue? (yes/no): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
    log "Restore cancelled"
    exit 0
fi

# Set trap for cleanup
trap cleanup EXIT

# ============================================
# RESTORE PROCESS
# ============================================

log "Starting MongoDB restore from: $BACKUP_FILE"

# Create temporary directory
mkdir -p "$TEMP_DIR"

# Extract backup
log "Extracting backup..."
tar -xzf "$BACKUP_FILE" -C "$TEMP_DIR"

# Find the backup directory
BACKUP_DIR=$(find "$TEMP_DIR" -type d -name "uixom_backup_*" | head -n 1)

if [ -z "$BACKUP_DIR" ]; then
    error "Backup directory not found in archive"
    exit 1
fi

log "Backup extracted to: $BACKUP_DIR"

# Copy backup to container
log "Copying backup to container..."
docker cp "$BACKUP_DIR" "$CONTAINER_NAME:/tmp/restore_backup"

# Drop existing database (optional - comment out if you want to merge)
log "Dropping existing database..."
docker exec "$CONTAINER_NAME" mongosh \
    --username="$MONGO_USER" \
    --password="$MONGO_PASSWORD" \
    --authenticationDatabase=admin \
    --eval "db.getSiblingDB('$MONGO_DB').dropDatabase()" \
    2>&1 | grep -v "WARNING"

# Restore database
log "Restoring database..."
docker exec "$CONTAINER_NAME" mongorestore \
    --username="$MONGO_USER" \
    --password="$MONGO_PASSWORD" \
    --authenticationDatabase=admin \
    --db="$MONGO_DB" \
    "/tmp/restore_backup/$MONGO_DB" \
    2>&1 | grep -v "WARNING"

if [ $? -ne 0 ]; then
    error "mongorestore failed"
    exit 1
fi

# ============================================
# VERIFICATION
# ============================================

log "Verifying restore..."

# Count documents in User collection
USER_COUNT=$(docker exec "$CONTAINER_NAME" mongosh \
    --username="$MONGO_USER" \
    --password="$MONGO_PASSWORD" \
    --authenticationDatabase=admin \
    --quiet \
    --eval "db.getSiblingDB('$MONGO_DB').users.countDocuments()" \
    2>&1 | tail -n 1)

log "Restored users: $USER_COUNT"

# ============================================
# SUCCESS
# ============================================

log "Database restored successfully!"
log "Please verify that the application is working correctly"

# ============================================
# RECOMMENDATIONS
# ============================================

echo ""
echo "Next steps:"
echo "1. Restart the backend service: docker-compose restart backend"
echo "2. Verify application functionality"
echo "3. Check logs: docker-compose logs -f backend"
echo ""

exit 0
