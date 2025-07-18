#!/bin/bash

REMOTE="root@185.25.151.154"
REMOTE_PATH="/var/www/html/roomctrlFront"
REMOTE_NODE_CMD="nohup node .output/server/index.mjs --host 0.0.0.0 --port 3000 > out.log 2>&1 &"

echo "Buduję aplikację..."
npm run build || { echo "Błąd podczas builda"; exit 1; }

echo "Zatrzymuję Nuxt na serwerze..."
ssh "$REMOTE" "pkill -f '.output/server/index.mjs' || true"

echo "Usuwam starą wersję .output..."
ssh "$REMOTE" "rm -rf $REMOTE_PATH/.output"

echo "Wysyłam nową wersję .output..."
scp -r .output "$REMOTE:$REMOTE_PATH"

echo "Aplikacja uruchomiona, naciśnij ctrl + c..."
ssh "$REMOTE" "cd $REMOTE_PATH && /root/.nvm/versions/node/v22.17.1/bin/node .output/server/index.mjs --host 0.0.0.0 --port 3000 > out.log 2>&1 < /dev/null & disown"

echo "Deploy zakończony! Aplikacja: http://185.25.151.154:3000"
