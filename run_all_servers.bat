@echo off
echo ===================================================
echo Starting Backend Servers for Projects 1b, 2, and 3
echo ===================================================
echo.

echo Launching Project 1b: Online Shopping System (Port 3000)...
start cmd /k "cd 1b_shopping_system && title Shopping System (Port 3000) && node server.js"

echo Launching Project 2: Student Performance Monitoring (Port 3001)...
start cmd /k "cd 2_student_monitoring && title Student Monitoring (Port 3001) && node server.js"

echo Launching Project 3: Online Examination System (Port 3002)...
start cmd /k "cd 3_online_exam && title Examination System (Port 3002) && node server.js"

echo.
echo ===================================================
echo All servers launched successfully!
echo - Shopping System:       http://localhost:3000
echo - Student Monitoring:    http://localhost:3001
echo - Examination System:    http://localhost:3002
echo ===================================================
echo.
pause
