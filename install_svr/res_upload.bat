@echo off
setlocal enabledelayedexpansion

for /f "tokens=1,2 delims==" %%i in ('type ..\project\.env') do (
    if "%%i"=="MYSQL_USER" set MYSQL_USER=%%j
    if "%%i"=="MYSQL_ROOT_PASSWORD" set MYSQL_ROOT_PASSWORD=%%j
    if "%%i"=="MYSQL_DATABASE" set MYSQL_DATABASE=%%j
)

echo.
echo.
echo tar -xzvf /tmp/backup.tar.gz -C /var/lib/docker/volumes/project_web_data/_data/
echo.
echo.
echo docker exec -i mysql mysql -u %MYSQL_USER% -p'%MYSQL_ROOT_PASSWORD%' %MYSQL_DATABASE% ^< /var/lib/docker/volumes/project_web_data/_data/mysql_backup.sql
echo.
echo.
echo rm -f /tmp/backup.tar.gz /var/lib/docker/volumes/project_web_data/_data/mysql_backup.sql
echo.
echo.
pause