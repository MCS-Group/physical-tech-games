@echo off
echo ================================
echo PHYSICAL: TECH Tournament
echo ================================
echo.
echo Starting in fullscreen kiosk mode...
echo Press any key to launch, or close this window to cancel.
echo.
pause

REM Launch Chrome in kiosk mode with the responsive wrapper
start chrome.exe --kiosk --disable-infobars --window-size=3328,1024 "%~dp0responsive-wrapper.html"

echo.
echo Tournament launched!
echo Press F11 to toggle fullscreen
echo Press Alt+F4 to exit
echo.
