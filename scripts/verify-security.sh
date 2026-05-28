#!/bin/bash

# ========================================
# UIXOM - Security Verification Script
# ========================================
# Ejecutar ANTES de hacer push a GitHub
# Uso: bash scripts/verify-security.sh

echo "🔒 VERIFICACIÓN DE SEGURIDAD - UIXOM"
echo "======================================"
echo ""

ERRORS=0
WARNINGS=0

# ========================================
# 1. Verificar archivos sensibles NO estén en Git
# ========================================
echo "📋 1. Verificando archivos sensibles..."

SENSITIVE_FILES=(".env" ".env.production" ".env.local" "credentials/" "secrets/")

for file in "${SENSITIVE_FILES[@]}"; do
    if git ls-files --error-unmatch "$file" 2>/dev/null; then
        echo "❌ ERROR: '$file' está siendo rastreado por Git"
        echo "   Ejecuta: git rm --cached $file"
        ERRORS=$((ERRORS + 1))
    else
        echo "✅ '$file' NO está en Git"
    fi
done

# ========================================
# 2. Verificar .gitignore contiene .env
# ========================================
echo ""
echo "📋 2. Verificando .gitignore..."

if grep -q "^\.env$" .gitignore; then
    echo "✅ .env está en .gitignore"
else
    echo "❌ ERROR: .env NO está en .gitignore"
    ERRORS=$((ERRORS + 1))
fi

# ========================================
# 3. Buscar posibles credenciales en código
# ========================================
echo ""
echo "📋 3. Buscando posibles credenciales en código..."

# Patrones peligrosos
PATTERNS=(
    "password.*=.*['\"].*['\"]"
    "api[_-]?key.*=.*['\"].*['\"]"
    "secret.*=.*['\"].*['\"]"
    "token.*=.*['\"].*['\"]"
)

for pattern in "${PATTERNS[@]}"; do
    MATCHES=$(git grep -i -E "$pattern" -- '*.js' '*.jsx' '*.ts' '*.tsx' '*.json' 2>/dev/null || true)
    if [ -n "$MATCHES" ]; then
        echo "⚠️  ADVERTENCIA: Posibles credenciales encontradas:"
        echo "$MATCHES"
        WARNINGS=$((WARNINGS + 1))
    fi
done

if [ $WARNINGS -eq 0 ]; then
    echo "✅ No se encontraron patrones sospechosos"
fi

# ========================================
# 4. Verificar archivos .example existen
# ========================================
echo ""
echo "📋 4. Verificando archivos de ejemplo..."

EXAMPLE_FILES=(".env.example" ".env.production.example")

for file in "${EXAMPLE_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ '$file' existe"
    else
        echo "⚠️  ADVERTENCIA: '$file' no existe"
        WARNINGS=$((WARNINGS + 1))
    fi
done

# ========================================
# 5. Verificar .dockerignore contiene .env
# ========================================
echo ""
echo "📋 5. Verificando .dockerignore..."

if [ -f ".dockerignore" ]; then
    if grep -q "^\.env" .dockerignore; then
        echo "✅ .env está en .dockerignore"
    else
        echo "⚠️  ADVERTENCIA: .env NO está en .dockerignore"
        WARNINGS=$((WARNINGS + 1))
    fi
else
    echo "⚠️  ADVERTENCIA: .dockerignore no existe"
    WARNINGS=$((WARNINGS + 1))
fi

# ========================================
# 6. Verificar estructura de directorios seguros
# ========================================
echo ""
echo "📋 6. Verificando estructura de directorios..."

SECURE_DIRS=("scripts/" "nginx/" "docs/")

for dir in "${SECURE_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        echo "✅ Directorio '$dir' existe"
    else
        echo "⚠️  ADVERTENCIA: Directorio '$dir' no existe"
        WARNINGS=$((WARNINGS + 1))
    fi
done

# ========================================
# RESUMEN
# ========================================
echo ""
echo "======================================"
echo "📊 RESUMEN DE VERIFICACIÓN"
echo "======================================"
echo "❌ Errores críticos: $ERRORS"
echo "⚠️  Advertencias: $WARNINGS"
echo ""

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo "✅ ¡TODO CORRECTO! Es seguro hacer push a GitHub"
    exit 0
elif [ $ERRORS -eq 0 ]; then
    echo "⚠️  Hay advertencias, pero puedes hacer push"
    echo "   Revisa las advertencias arriba antes de continuar"
    exit 0
else
    echo "❌ HAY ERRORES CRÍTICOS - NO HAGAS PUSH"
    echo "   Soluciona los errores antes de subir a GitHub"
    exit 1
fi
