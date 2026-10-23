@echo off
echo ========================================================
echo   Starting Aesthetic Chennai Transit Platform...
echo ========================================================
echo.
echo Launching Backend (Port 5000) and Frontend (Port 3000)...
echo Press Ctrl+C in this terminal window to stop all servers.
echo.
npx --yes concurrently -k -p "[{name}]" -n "BACKEND,FRONTEND" -c "cyan,magenta" "npm --prefix backend run dev" "npm --prefix frontend run dev"
