#!/usr/bin/env bash
set -euo pipefail

VPS_HOST="${VPS_HOST:-103.87.67.209}"
VPS_USER="${VPS_USER:-alpardfm}"
VPS_PORT="${VPS_PORT:-22}"
DEPLOY_PATH="${DEPLOY_PATH:-/var/www/alpardfm.my.id/haze}"
SSH_KEY="${SSH_KEY:-$HOME/.ssh/id_ed25519}"

npm ci
npm run build

ssh -i "$SSH_KEY" -p "$VPS_PORT" "$VPS_USER@$VPS_HOST" "mkdir -p '$DEPLOY_PATH'"
rsync -az --delete -e "ssh -i $SSH_KEY -p $VPS_PORT" dist/ "$VPS_USER@$VPS_HOST:$DEPLOY_PATH/"

echo "Deployed to https://alpardfm.my.id/haze/"
