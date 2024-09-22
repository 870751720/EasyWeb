@echo off
nvm version
if %errorlevel% NEQ 0 (
    start nvm-setup.exe
    echo plz install nvm-setup
    pause
    exit /B
)

nvm install 22.1.0
nvm use 22.1.0

timeout /t 1 /nobreak >nul

call npm config set registry https://registry.npmmirror.com

cd ../project/easy_react
if exist node_modules (
    exit /B
)
npm install
pause