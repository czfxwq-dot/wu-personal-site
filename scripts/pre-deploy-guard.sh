#!/bin/bash
# Pre-deploy guard: catches deployment bugs before they reach production
# Usage: npm run guard (from wu-personal-site directory)

set -e

echo "🛡️  Pre-deploy guard checks..."

ERRORS=0

# 1. Check Astro output directory matches deployment target
ASTRO_OUTDIR=$(grep -oP "outDir:\s*['\"]([^'\"]+)['\"]" astro.config.mjs | grep -oP "['\"][^'\"]+['\"]" | tr -d "'\"")
DEPLOY_DIR=$(grep -oP "wrangler pages deploy \K[^ ]+" package.json | head -1)

echo "  Astro outDir:    $ASTRO_OUTDIR"
echo "  Deploy target:   $DEPLOY_DIR"

if [ "$ASTRO_OUTDIR" != "$DEPLOY_DIR" ]; then
  echo "  ❌ MISMATCH! Astro builds to '$ASTRO_OUTDIR' but deploy script uses '$DEPLOY_DIR'"
  echo "     Fix: Update deploy:cf in package.json to use '$ASTRO_OUTDIR'"
  ERRORS=$((ERRORS + 1))
else
  echo "  ✅ Directories match"
fi

# 2. Check that the output directory actually exists and has content
if [ ! -d "$ASTRO_OUTDIR" ]; then
  echo "  ❌ Output directory '$ASTRO_OUTDIR' does not exist. Run 'npm run build' first."
  ERRORS=$((ERRORS + 1))
elif [ ! -f "$ASTRO_OUTDIR/index.html" ]; then
  echo "  ❌ Output directory '$ASTRO_OUTDIR' is missing index.html"
  ERRORS=$((ERRORS + 1))
else
  FILE_COUNT=$(find "$ASTRO_OUTDIR" -type f | wc -l)
  echo "  ✅ Output directory exists ($FILE_COUNT files)"
fi

# 3. Check deploy command includes --branch main
if ! grep -q "\-\-branch main" package.json; then
  echo "  ❌ Deploy command missing '--branch main' (would deploy to Preview, not Production)"
  ERRORS=$((ERRORS + 1))
else
  echo "  ✅ Deploy targets Production branch (main)"
fi

# 4. Check GitHub Actions workflow matches
if [ -f ".github/workflows/deploy.yml" ]; then
  GA_DEPLOY_DIR=$(grep -oP "wrangler pages deploy \K[^ ]+" .github/workflows/deploy.yml | head -1)
  if [ "$GA_DEPLOY_DIR" != "$ASTRO_OUTDIR" ]; then
    echo "  ⚠️  GitHub Actions uses '$GA_DEPLOY_DIR' but Astro outputs to '$ASTRO_OUTDIR'"
    ERRORS=$((ERRORS + 1))
  else
    echo "  ✅ GitHub Actions matches Astro outDir"
  fi
fi

echo ""
if [ $ERRORS -gt 0 ]; then
  echo "❌ Guard failed: $ERRORS issue(s) found. Fix before deploying."
  exit 1
else
  echo "✅ All checks passed. Safe to deploy."
  exit 0
fi
