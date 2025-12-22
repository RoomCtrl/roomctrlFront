#!/bin/bash

echo "Uruchamianie środowiska deweloperskiego..."

echo "Budowanie obrazu Docker..."
docker build --no-cache -f Dockerfile.dev -t roomctrl-front-dev .

echo "Czyszczenie starych kontenerów..."
docker stop roomctrl-front-dev-container 2>/dev/null || true
docker rm roomctrl-front-dev-container 2>/dev/null || true

echo "Uruchamianie kontenera..."
docker run -d \
  --name roomctrl-front-dev-container \
  -p 3000:3000 \
  -p 24678:24678 \
  -v "$(pwd):/app" \
  -v /app/node_modules \
  roomctrl-front-dev

echo "Aplikacja deweloperska działa na http://localhost:3000"
echo "Logi: docker logs -f roomctrl-front-dev-container"
echo "Zatrzymaj: docker stop roomctrl-front-dev-container"