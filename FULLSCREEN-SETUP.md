# Fullscreen Display Setup Guide

## Overview
Your Physical: Tech tournament is designed for a **3328x1024** event screen with the game centered in the middle.

### Screen Layout
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  LEFT PANEL    │         GAME AREA         │    RIGHT PANEL    │
│   (768x1024)   │        (1792x1024)        │    (768x1024)     │
│                │                           │                   │
│  Red Gradient  │   Your Game Content       │  Blue Gradient    │
│                │                           │                   │
└─────────────────────────────────────────────────────────────────┘
     768px              1792px                    768px
├───────────────────── 3328px total ──────────────────────────────┤
```

## How to Use

### Step 1: Open the Wrapper
Open `fullscreen-wrapper.html` in Google Chrome

### Step 2: Enter Fullscreen
Press **F11** to enter fullscreen mode

### Step 3: Start Tournament
The game will load in the center area automatically

## Chrome Settings for Event Display

### Display Resolution
Make sure your Chrome window is set to **3328x1024**:

1. **Windows:**
   - Right-click Desktop → Display Settings
   - Set resolution to 3328x1024
   - Or use custom resolution if your screen supports it

2. **Launch Chrome in Kiosk Mode (Recommended):**
   ```bash
   chrome.exe --kiosk --window-size=3328,1024 "file:///path/to/fullscreen-wrapper.html"
   ```

3. **Or use App Mode:**
   ```bash
   chrome.exe --app="file:///path/to/fullscreen-wrapper.html" --window-size=3328,1024
   ```

## Features

### Side Panels
- **Left Panel (768px):** Red gradient with "TEAM RED" branding
- **Right Panel (768px):** Blue gradient with "TEAM BLUE" branding
- Animated pulse effects for visual interest
- Vertical divider lines with gold glow

### Center Game Area
- **1792x1024** - Your game displays here
- All game screens (hub, games 1-4, celebration) work normally
- No changes needed to your existing game files

## Customization Options

### Change Side Panel Colors
Edit `fullscreen-wrapper.html` lines 30-42:

```css
/* Make left side more intense red */
.side-panel.left {
    background: linear-gradient(
        90deg,
        #000000 0%,
        #330000 20%,        /* Darker red */
        rgba(255, 45, 85, 0.3) 80%,  /* More red */
        rgba(255, 45, 85, 0.4) 100%
    );
}
```

### Remove Decorative Text
Delete or comment out lines 171-172 and 181-182:
```html
<!-- <div class="panel-logo">TEAM RED</div> -->
```

### Add Team Logos
Replace the text logos with images:
```html
<div class="side-panel left">
    <img src="assets/team-red-logo.png" style="width: 400px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.3;">
</div>
```

## Troubleshooting

### Issue: Game not centered
**Solution:** Check if browser zoom is set to 100% (Ctrl+0)

### Issue: Black bars on sides
**Solution:** Your display resolution might not be exactly 3328x1024. Adjust the wrapper dimensions.

### Issue: Game appears too small
**Solution:** Your game files are designed for 1792px width. If you need to scale, modify the game CSS.

### Issue: Can't exit fullscreen
**Solution:** Press F11 or ESC key

## Testing Without Event Screen

If you don't have a 3328x1024 display for testing:

1. Open Chrome DevTools (F12)
2. Click the device toolbar icon (Ctrl+Shift+M)
3. Set custom device dimensions: 3328 x 1024
4. Refresh the page

Or use browser zoom:
1. Open `fullscreen-wrapper.html`
2. Press Ctrl+- (zoom out) until entire layout is visible
3. This simulates how it will look on the big screen

## Performance Tips

### For Smooth Gameplay:
1. Close all other Chrome tabs
2. Disable Chrome extensions
3. Enable hardware acceleration:
   - Chrome Settings → System → "Use hardware acceleration when available"
4. Clear cache before event: Ctrl+Shift+Delete

### Launch Script (Windows)
Save this as `launch-tournament.bat`:
```batch
@echo off
echo Launching Physical: Tech Tournament...
start chrome.exe --kiosk --window-size=3328,1024 --disable-extensions "file:///%CD%/fullscreen-wrapper.html"
```

## File Structure
```
physical-tech-games/
├── fullscreen-wrapper.html      ← Start here for event display
├── index.html                   ← Main game hub (1792x1024)
├── game-flow.html
├── physical-tech-wall-push-v2.html
├── physical-tech-hanging-endurance.html
├── iron-ball-tug.html
├── castle-conquest-v3-3d.html
└── assets/
    ├── sprites/
    ├── screenshots/
    └── audio/
```

## Notes

- The wrapper file (`fullscreen-wrapper.html`) should be opened instead of `index.html`
- All game navigation happens inside the iframe automatically
- Side panels are purely decorative and don't affect gameplay
- The setup works offline - no internet required during the event

## Support

If you need to adjust sizing or styling:
1. All measurements are in the `<style>` section of `fullscreen-wrapper.html`
2. The game iframe is at line 180
3. Side panel styles start at line 28

---

**Ready to Launch!** Just open `fullscreen-wrapper.html` in Chrome and press F11! 🎮
