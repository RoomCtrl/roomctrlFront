#!/bin/bash

echo "Uruchamianie środowiska produkcyjnego..."

echo "Budowanie obrazu Docker (może potrwać kilka minut)..."
docker build --no-cache -f Dockerfile.prod -t roomctrl-front-prod .

echo "Czyszczenie starych kontenerów..."
docker stop roomctrl-front-prod-container 2>/dev/null || true
docker rm roomctrl-front-prod-container 2>/dev/null || true

echo "Uruchamianie kontenera..."
docker run -d \
  --name roomctrl-front-prod-container \
  -p 3000:3000 \
  -e NODE_ENV=production \
  roomctrl-front-prod

echo "Aplikacja produkcyjna działa na http://localhost:3000"
echo "Logi: docker logs -f roomctrl-front-prod-container"
echo "Zatrzymaj: docker stop roomctrl-front-prod-container"