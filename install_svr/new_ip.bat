@echo off
setlocal enabledelayedexpansion

set /p new_ip=new_ip plz:

for /f "tokens=*" %%i in ('type ..\project\.env') do (
    set str=%%i
    echo !str! | findstr /C:"SERVER_IP=" >nul && (
        set str=SERVER_IP=!new_ip!
    )
    echo !str!>> .env.tmp
)
move /y .env.tmp ..\project\.env

for /f "tokens=*" %%i in ('type ..\project\easy_react\src\utils\config.ts') do (
    set str=%%i
    echo !str! | findstr /C:"API_BASE_URL =" >nul && (
        set str=export const API_BASE_URL = 'http://!new_ip!';
    )
    echo !str!>> config.ts.tmp
)
move /y config.ts.tmp ..\project\easy_react\src\utils\config.ts

pause
