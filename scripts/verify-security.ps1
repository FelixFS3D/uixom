# Security Verification Script for UIXOM
# Run this BEFORE pushing to GitHub

Write-Host "`n=== UIXOM Security Verification ===" -ForegroundColor Cyan
Write-Host ""

$ERRORS = 0
$WARNINGS = 0

# Check 1: Sensitive files not in Git
Write-Host "Check 1: Verifying sensitive files..." -ForegroundColor Yellow

$sensitiveFiles = @(".env", ".env.production", ".env.local")

foreach ($file in $sensitiveFiles) {
    git ls-files --error-unmatch $file 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ERROR: '$file' is tracked by Git!" -ForegroundColor Red
        Write-Host "  Run: git rm --cached $file" -ForegroundColor Red
        $ERRORS++
    } else {
        Write-Host "  OK: '$file' is NOT in Git" -ForegroundColor Green
    }
}

# Check 2: Verify .gitignore
Write-Host "`nCheck 2: Verifying .gitignore..." -ForegroundColor Yellow

if (Test-Path ".gitignore") {
    $gitignoreContent = Get-Content ".gitignore" -Raw
    if ($gitignoreContent -match "(?m)^\.env$") {
        Write-Host "  OK: .env is in .gitignore" -ForegroundColor Green
    } else {
        Write-Host "  ERROR: .env is NOT in .gitignore" -ForegroundColor Red
        $ERRORS++
    }
} else {
    Write-Host "  ERROR: .gitignore does not exist" -ForegroundColor Red
    $ERRORS++
}

# Check 3: Verify example files exist
Write-Host "`nCheck 3: Verifying example files..." -ForegroundColor Yellow

$exampleFiles = @(".env.example", ".env.production.example")

foreach ($file in $exampleFiles) {
    if (Test-Path $file) {
        Write-Host "  OK: '$file' exists" -ForegroundColor Green
    } else {
        Write-Host "  WARNING: '$file' does not exist" -ForegroundColor DarkYellow
        $WARNINGS++
    }
}

# Check 4: Verify .dockerignore
Write-Host "`nCheck 4: Verifying .dockerignore..." -ForegroundColor Yellow

if (Test-Path ".dockerignore") {
    $dockerignoreContent = Get-Content ".dockerignore" -Raw
    if ($dockerignoreContent -match "(?m)^\.env") {
        Write-Host "  OK: .env is in .dockerignore" -ForegroundColor Green
    } else {
        Write-Host "  WARNING: .env is NOT in .dockerignore" -ForegroundColor DarkYellow
        $WARNINGS++
    }
} else {
    Write-Host "  WARNING: .dockerignore does not exist" -ForegroundColor DarkYellow
    $WARNINGS++
}

# Check 5: Verify directory structure
Write-Host "`nCheck 5: Verifying directory structure..." -ForegroundColor Yellow

$directories = @("scripts/", "nginx/", "docs/")

foreach ($dir in $directories) {
    if (Test-Path $dir) {
        Write-Host "  OK: Directory '$dir' exists" -ForegroundColor Green
    } else {
        Write-Host "  WARNING: Directory '$dir' does not exist" -ForegroundColor DarkYellow
        $WARNINGS++
    }
}

# Summary
Write-Host "`n======================================" -ForegroundColor Cyan
Write-Host "Summary" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "Errors: $ERRORS" -ForegroundColor $(if ($ERRORS -eq 0) { "Green" } else { "Red" })
Write-Host "Warnings: $WARNINGS" -ForegroundColor $(if ($WARNINGS -eq 0) { "Green" } else { "DarkYellow" })
Write-Host ""

if ($ERRORS -eq 0 -and $WARNINGS -eq 0) {
    Write-Host "SUCCESS: Safe to push to GitHub!" -ForegroundColor Green
    exit 0
} elseif ($ERRORS -eq 0) {
    Write-Host "CAUTION: You can push, but review warnings above" -ForegroundColor DarkYellow
    exit 0
} else {
    Write-Host "CRITICAL: DO NOT PUSH - Fix errors first!" -ForegroundColor Red
    exit 1
}
