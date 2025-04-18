@echo off
cd /d "%~dp0apache2.4.63"
taskkill /F /IM httpd.exe
echo Apache server has been shut down.
timeout 5