$REMOTE = "roomctrl_admin@185.25.151.154"
$REMOTE_PATH = "roomctrlFront"

Write-Host "Building the application..." -ForegroundColor Green
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Błąd podczas builda" -ForegroundColor Red
    exit 1
}

Write-Host "Stopping Nuxt on the server..." -ForegroundColor Green
ssh $REMOTE "pkill -f '.output/server/index.mjs' || true"

Write-Host "Removing old .output version..." -ForegroundColor Green
ssh $REMOTE "rm -rf $REMOTE_PATH/.output"

Write-Host "Uploading new .output version..." -ForegroundColor Green
scp -r .output "${REMOTE}:${REMOTE_PATH}"

Write-Host "Application started, press ctrl + c..." -ForegroundColor Green
ssh $REMOTE "cd $REMOTE_PATH && node .output/server/index.mjs --host 0.0.0.0 --port 3000 > out.log 2>&1 < /dev/null & disown"