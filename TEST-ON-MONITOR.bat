@echo off
echo ================================
echo PHYSICAL: TECH - Test Mode
echo ================================
echo.
echo Opening in normal window mode for testing...
echo This will work on your regular monitor.
echo.

REM Launch Chrome in normal mode with the responsive wrapper
start chrome.exe "%~dp0responsive-wrapper.html"

echo.
echo Test mode launched!
echo The game will center on your screen.
echo No side panels on normal monitors - this is correct!
echo.
