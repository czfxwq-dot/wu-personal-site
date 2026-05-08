#!/bin/bash
# Auto-update Quick Tunnel URL in ChatWidget and redeploy
# Usage: ./update-tunnel-url.sh

set -e

PROJECT_DIR="/home/18151201278_wy/openclaw/workspace-xs001/wu-personal-site"
WIDGET_FILE="$PROJECT_DIR/src/components/ChatWidget.astro"

echo "[$(date)] Extracting new Quick Tunnel URL..."

# Wait for cloudflared to register the URL
sleep 3

# Extract URL from journalctl
NEW_URL=$(sudo journalctl -u cloudflared-tunnel.service --no-pager -n 50 2>/dev/null | grep -o 'https://[a-z0-9-]*\.trycloudflare\.com' | tail -1)

if [ -z "$NEW_URL" ]; then
  echo "ERROR: Could not find Quick Tunnel URL in journalctl"
  exit 1
fi

echo "New URL: $NEW_URL"

# Update ChatWidget.astro
cd "$PROJECT_DIR"
sed -i "s|https://[a-z0-9-]*\.trycloudflare\.com|$NEW_URL|g" "$WIDGET_FILE"
echo "Updated ChatWidget.astro"

# Build
echo "Building..."
npm run build 2>&1 | tail -3

# Deploy
echo "Deploying to Production..."
source .env
npx wrangler pages deploy docs --project-name wu-personal-site --branch main --commit-dirty=true --commit-message "Auto: Quick Tunnel URL updated to $(echo $NEW_URL | cut -d'.' -f1)" 2>&1 | tail -5

echo "[$(date)] Done! New URL deployed: $NEW_URL"
