#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# setup-apache.sh  —  ตั้งค่า Apache Reverse Proxy + ngrok สำหรับ geserverhub.com
# รันด้วย:  sudo bash deploy/setup-apache.sh
# ---------------------------------------------------------------------------
set -euo pipefail

DEPLOY_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DOMAIN="geserverhub.com"
CONF_SRC="$DEPLOY_DIR/geserverhub.conf"
CONF_DEST="/etc/apache2/sites-available/geserverhub.conf"
NGROK_USER="pavinee"

echo "==> [1/8] เปิดใช้งาน Apache modules..."
a2enmod proxy proxy_http proxy_wstunnel rewrite ssl headers

echo "==> [2/8] คัดลอก virtual host config..."
cp "$CONF_SRC" "$CONF_DEST"

echo "==> [3/8] ปิด default site, เปิด geserverhub..."
a2dissite 000-default.conf 2>/dev/null || true
a2ensite geserverhub.conf

echo "==> [4/8] ติดตั้ง Certbot (Let's Encrypt)..."
if ! command -v certbot &>/dev/null; then
  apt-get install -y certbot python3-certbot-apache
fi

echo "==> [5/8] ขอ SSL Certificate สำหรับ $DOMAIN..."
certbot --apache -d "$DOMAIN" -d "www.$DOMAIN" --non-interactive --agree-tos \
  --email admin@geserverhub.com --redirect

echo "==> [6/8] ติดตั้ง ngrok..."
if ! command -v ngrok &>/dev/null; then
  curl -sSL https://ngrok-agent.s3.amazonaws.com/ngrok.asc \
    | tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null
  echo "deb https://ngrok-agent.s3.amazonaws.com buster main" \
    | tee /etc/apt/sources.list.d/ngrok.list
  apt-get update -qq
  apt-get install -y ngrok
fi

echo "==> [7/8] ติดตั้ง ngrok service..."
cp "$DEPLOY_DIR/ngrok.service" /etc/systemd/system/ngrok.service

echo "==> [8/8] ติดตั้ง Next.js service, เปิด ngrok และ Reload Apache..."
cp "$DEPLOY_DIR/../frontend/geserver-frontend.service" \
   /etc/systemd/system/geserver-frontend.service
systemctl daemon-reload
systemctl enable geserver-frontend ngrok
systemctl restart geserver-frontend ngrok
systemctl reload apache2

echo ""
echo "✅ เสร็จแล้ว! เปิด https://$DOMAIN ได้เลย"
echo "   - Next.js  : systemctl status geserver-frontend"
echo "   - ngrok    : systemctl status ngrok"
echo "   - Apache   : systemctl status apache2"
echo "   - Logs     : journalctl -u ngrok -f"
