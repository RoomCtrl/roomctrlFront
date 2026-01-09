# Deployment RoomCtrl Frontend

## Spis Treści

1. [Przegląd](#przegląd)
2. [Wymagania](#wymagania)
3. [Środowiska](#środowiska)
4. [Build Proces](#build-proces)
5. [Deployment z Docker](#deployment-z-docker)
6. [Deployment Manualny](#deployment-manualny)
7. [CI/CD](#cicd)
8. [Konfiguracja Serwera](#konfiguracja-serwera)
9. [Monitorowanie](#monitorowanie)
10. [Rollback](#rollback)
11. [Troubleshooting](#troubleshooting)

## Przegląd

RoomCtrl Frontend może być wdrożony na kilka sposobów:

- **Docker** (rekomendowane) - za pomocą przygotowanych Dockerfile
- **Manual** - bezpośrednio na serwerze
- **Cloud Platforms** - Vercel, Netlify, AWS, etc.

## Wymagania

### Środowisko Produkcyjne

- **Node.js**: >= 18.0.0
- **npm**: >= 9.0.0
- **RAM**: Minimum 1GB
- **Disk**: Minimum 500MB
- **OS**: Linux (Ubuntu 20.04+ rekomendowane), Windows Server, lub macOS

### Dla Docker Deployment

- **Docker**: >= 20.10
- **Docker Compose**: >= 2.0 (opcjonalnie)

### Sieć

- Port 3000 (domyślny port Nuxt)
- Dostęp do backendu API: `http://185.25.151.154/api/`

## Środowiska

### Development

```bash
npm run dev
# http://localhost:3000
```

### Staging (opcjonalnie)

```bash
NODE_ENV=staging npm run build
npm run preview
```

### Production

```bash
npm run build
npm run preview
# lub
node .output/server/index.mjs
```

## Build Proces

### 1. Build dla Produkcji

```bash
# Instalacja zależności
npm ci --production=false

# Build aplikacji
npm run build

# Wynik w katalogu .output/
# .output/
# ├── public/        # Static assets
# └── server/        # Server code
```

### 2. Optymalizacja Build

#### Zmienne środowiskowe

Edytuj `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL || 'http://185.25.151.154/api/'
    }
  }
})
```

#### Bundle Analysis

```bash
npm run analyze
```

To pokaże rozmiar bundle'a i pomoże zidentyfikować duże moduły.

### 3. Static Site Generation (SSG)

Dla statycznych stron:

```bash
npm run generate
```

Output w katalogu `.output/public/` może być hostowany na dowolnym static hosting (Netlify, Vercel, S3, etc.).

## Deployment z Docker

### 1. Docker Development

Użyj przygotowanego `Dockerfile.dev`:

```bash
# Build image
docker build -f Dockerfile.dev -t roomctrl-front-dev .

# Run container
docker run -p 3000:3000 roomctrl-front-dev
```

Lub użyj skryptu:

```bash
# Linux/Mac
./start-dev.sh

# Windows
.\start-dev.ps1
```

### 2. Docker Production

Użyj przygotowanego `Dockerfile.prod`:

```dockerfile
# Multi-stage build dla mniejszego obrazu
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/.output ./.output
EXPOSE 3000
ENV HOST=0.0.0.0
ENV PORT=3000
CMD ["node", ".output/server/index.mjs"]
```

Build i uruchomienie:

```bash
# Build image
docker build -f Dockerfile.prod -t roomctrl-front-prod .

# Run container
docker run -d -p 3000:3000 --name roomctrl-front roomctrl-front-prod
```

Lub użyj skryptu:

```bash
# Linux/Mac
./start-prod.sh

# Windows
.\start-prod.ps1
```

### 3. Docker Compose

Przykładowy `docker-compose.yml`:

```yaml
version: '3.8'

services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile.prod
    ports:
      - '3000:3000'
    environment:
      - NODE_ENV=production
      - API_BASE_URL=http://backend:8080/api/
    restart: unless-stopped
    networks:
      - roomctrl-network
    depends_on:
      - backend

  backend:
    image: roomctrl-backend:latest
    ports:
      - '8080:8080'
    networks:
      - roomctrl-network

  nginx:
    image: nginx:alpine
    ports:
      - '80:80'
      - '443:443'
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - frontend
    networks:
      - roomctrl-network

networks:
  roomctrl-network:
    driver: bridge
```

Uruchomienie:

```bash
docker-compose up -d
```

### 4. Docker Best Practices

#### .dockerignore

Utwórz `.dockerignore`:

```
node_modules
.nuxt
.output
.git
.env
npm-debug.log
.DS_Store
dist
coverage
.vscode
```

#### Health Checks

Dodaj healthcheck do Dockerfile:

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"
```

## Deployment Manualny

### 1. Przygotowanie Serwera

#### Ubuntu/Debian

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 (process manager)
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx
```

### 2. Deploy Aplikacji

```bash
# Na serwerze
cd /var/www/

# Clone repository
git clone <repository-url> roomctrl-front
cd roomctrl-front

# Install dependencies
npm ci --production=false

# Build
npm run build

# Start with PM2
pm2 start npm --name "roomctrl-front" -- start

# Save PM2 config
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

### 3. Konfiguracja PM2

Utwórz `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [
    {
      name: 'roomctrl-front',
      script: '.output/server/index.mjs',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      merge_logs: true,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G'
    }
  ]
}
```

Uruchomienie:

```bash
pm2 start ecosystem.config.js
```

### 4. Konfiguracja Nginx

Utwórz `/etc/nginx/sites-available/roomctrl`:

```nginx
upstream roomctrl_frontend {
    server localhost:3000;
}

server {
    listen 80;
    server_name roomctrl.example.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name roomctrl.example.com;

    # SSL Configuration
    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Gzip
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript
               application/x-javascript application/xml+rss
               application/javascript application/json;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Proxy to Nuxt
    location / {
        proxy_pass http://roomctrl_frontend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        proxy_pass http://roomctrl_frontend;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Logs
    access_log /var/log/nginx/roomctrl-access.log;
    error_log /var/log/nginx/roomctrl-error.log;
}
```

Aktywacja:

```bash
sudo ln -s /etc/nginx/sites-available/roomctrl /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 5. SSL Certificate (Let's Encrypt)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d roomctrl.example.com

# Auto-renewal (already configured by certbot)
sudo certbot renew --dry-run
```

## CI/CD

### GitHub Actions

Utwórz `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run tests
        run: npm run test

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build application
        run: npm run build

      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: nuxt-build
          path: .output/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Download build artifacts
        uses: actions/download-artifact@v3
        with:
          name: nuxt-build
          path: .output/

      - name: Deploy to server
        uses: appleboy/scp-action@master
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SERVER_SSH_KEY }}
          source: '.output/*'
          target: '/var/www/roomctrl-front/'

      - name: Restart application
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SERVER_SSH_KEY }}
          script: |
            cd /var/www/roomctrl-front
            pm2 restart roomctrl-front
```

### GitLab CI

Utwórz `.gitlab-ci.yml`:

```yaml
stages:
  - test
  - build
  - deploy

test:
  stage: test
  image: node:18
  script:
    - npm ci
    - npm run lint
    - npm run test
  only:
    - main
    - merge_requests

build:
  stage: build
  image: node:18
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - .output/
    expire_in: 1 hour
  only:
    - main

deploy:
  stage: deploy
  image: alpine:latest
  before_script:
    - apk add --no-cache openssh-client
    - eval $(ssh-agent -s)
    - echo "$SSH_PRIVATE_KEY" | tr -d '\r' | ssh-add -
    - mkdir -p ~/.ssh
    - chmod 700 ~/.ssh
  script:
    - scp -r .output/* $SERVER_USER@$SERVER_HOST:/var/www/roomctrl-front/.output/
    - ssh $SERVER_USER@$SERVER_HOST "cd /var/www/roomctrl-front && pm2 restart roomctrl-front"
  only:
    - main
```

## Konfiguracja Serwera

### 1. Firewall (UFW)

```bash
# Zezwól na SSH
sudo ufw allow 22/tcp

# Zezwól na HTTP/HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Włącz firewall
sudo ufw enable
```

### 2. Bezpieczeństwo SSH

Edytuj `/etc/ssh/sshd_config`:

```
# Wyłącz logowanie root
PermitRootLogin no

# Wyłącz logowanie hasłem (tylko SSH keys)
PasswordAuthentication no

# Zmień port (opcjonalnie)
Port 2222
```

Restart SSH:

```bash
sudo systemctl restart sshd
```

### 3. Automatic Updates

```bash
# Install unattended-upgrades
sudo apt install -y unattended-upgrades

# Configure
sudo dpkg-reconfigure -plow unattended-upgrades
```

## Monitorowanie

### 1. PM2 Monitoring

```bash
# Monitor processes
pm2 monit

# Logs
pm2 logs roomctrl-front

# Status
pm2 status
```

### 2. Nginx Logs

```bash
# Access logs
tail -f /var/log/nginx/roomctrl-access.log

# Error logs
tail -f /var/log/nginx/roomctrl-error.log
```

### 3. System Resources

```bash
# CPU and Memory
htop

# Disk usage
df -h

# Network
netstat -tulpn
```

### 4. Application Performance Monitoring

Opcjonalnie zintegruj z:

- **Sentry** - error tracking
- **New Relic** - APM
- **Datadog** - monitoring
- **Google Analytics** - analytics

## Rollback

### 1. PM2 Rollback

```bash
# Zatrzymaj aplikację
pm2 stop roomctrl-front

# Przywróć poprzednią wersję (git)
cd /var/www/roomctrl-front
git reset --hard HEAD~1

# Rebuild
npm ci
npm run build

# Restart
pm2 restart roomctrl-front
```

### 2. Docker Rollback

```bash
# Lista obrazów
docker images

# Uruchom poprzednią wersję
docker run -d -p 3000:3000 --name roomctrl-front roomctrl-front-prod:previous-tag

# Zatrzymaj aktualną
docker stop roomctrl-front-current
```

### 3. Backup Database

Jeśli masz lokalną bazę danych:

```bash
# Backup przed deploymentem
pg_dump dbname > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore
psql dbname < backup_20240115_120000.sql
```

## Troubleshooting

### Problem: Port 3000 zajęty

```bash
# Znajdź proces
lsof -i :3000

# Zabij proces
kill -9 <PID>
```

### Problem: Out of Memory

```bash
# Sprawdź pamięć
free -h

# Zwiększ swap (tymczasowo)
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

### Problem: Nginx 502 Bad Gateway

```bash
# Sprawdź czy aplikacja działa
pm2 status

# Sprawdź logi Nginx
tail -f /var/log/nginx/error.log

# Restart aplikacji
pm2 restart roomctrl-front

# Restart Nginx
sudo systemctl restart nginx
```

### Problem: Build Failed

```bash
# Wyczyść cache
rm -rf node_modules .nuxt .output
npm cache clean --force

# Reinstall
npm install

# Rebuild
npm run build
```

### Problem: SSL Certificate Issues

```bash
# Renew certificate
sudo certbot renew

# Test renewal
sudo certbot renew --dry-run

# Check certificate
sudo certbot certificates
```

## Checklist Deployment

Przed deploymentem sprawdź:

- [ ] Testy przechodzą (`npm run test`)
- [ ] Linter przechodzi (`npm run lint`)
- [ ] Build się kompiluje (`npm run build`)
- [ ] Zmienne środowiskowe są ustawione
- [ ] Backup bazy danych wykonany (jeśli dotyczy)
- [ ] SSL certificate jest ważny
- [ ] Monitoring działa
- [ ] Firewall skonfigurowany
- [ ] Dokumentacja zaktualizowana

Po deploymencie:

- [ ] Aplikacja działa (`curl http://localhost:3000`)
- [ ] Logi nie pokazują błędów
- [ ] Performance jest OK
- [ ] Wszystkie funkcjonalności działają
- [ ] SSL działa (https://)

## Skrypty Deployment

### deploy-roomctrl.sh (Linux/Mac)

Gotowy skrypt znajduje się w `deploy-roomctrl.sh`:

```bash
#!/bin/bash
./deploy-roomctrl.sh
```

### deploy-roomctrl.ps1 (Windows)

Gotowy skrypt znajduje się w `deploy-roomctrl.ps1`:

```powershell
.\deploy-roomctrl.ps1
```

## Podsumowanie

Deployment RoomCtrl Frontend:

1. **Docker** (rekomendowane):
   - `docker build -f Dockerfile.prod -t roomctrl-front .`
   - `docker run -d -p 3000:3000 roomctrl-front`

2. **Manual z PM2**:
   - `npm ci && npm run build`
   - `pm2 start ecosystem.config.js`

3. **Nginx jako reverse proxy**
4. **SSL z Let's Encrypt**
5. **Monitoring z PM2**
6. **CI/CD z GitHub Actions**

Aplikacja jest gotowa do produkcji! 🚀
