# Responsive Display Setup - Works Everywhere!

## Overview

Your game now automatically adapts to ANY screen size! 🎮

## How It Works

The **responsive-wrapper.html** detects your screen width and automatically adjusts:

### 1. Normal Monitor (1920x1080, 1792x1024, etc.)
```
┌──────────────────────────────┐
│                              │
│         GAME ONLY            │
│       (1792x1024)            │
│    No side panels            │
│    Centered on screen        │
│                              │
└──────────────────────────────┘
```
- **No side panels** - Just your game
- Perfect for development and testing
- Works on your Dell monitor

### 2. Wide Monitor (2560x1440, etc.)
```
┌────┬──────────────────┬────┐
│ S  │                  │ S  │
│ I  │      GAME        │ I  │
│ D  │   (1792x1024)    │ D  │
│ E  │                  │ E  │
│    │                  │    │
└────┴──────────────────┴────┘
```
- **Adaptive side panels** - Sized to fill space
- Game stays 1792x1024
- Panels scale to available width

### 3. Event Screen (3328x1024)
```
┌─────────┬──────────────┬─────────┐
│  LEFT   │     GAME     │  RIGHT  │
│  768px  │   1792px     │  768px  │
│  Red    │              │  Blue   │
│         │              │         │
└─────────┴──────────────┴─────────┘
```
- **Full side panels** - 768px each
- Red gradient on left
- Blue gradient on right
- Perfect for your event!

## 🚀 Quick Start

### For Development (Your Dell Monitor)
```bash
1. Open: responsive-wrapper.html
2. That's it! No F11, no special settings
```

You'll see:
- ✅ Just the game (1792x1024)
- ✅ Centered on your screen
- ✅ No side panels (not needed)
- ✅ Works perfectly for coding and testing

### For Event (3328x1024 Display)
```bash
1. Connect to event screen
2. Open: responsive-wrapper.html
3. Press F11 for fullscreen
4. Done!
```

You'll see:
- ✅ Game in center (1792x1024)
- ✅ Red panel on left (768px)
- ✅ Blue panel on right (768px)
- ✅ Golden dividers
- ✅ Full 3328x1024 utilized

## File Comparison

| File | Best For | Screen Size |
|------|----------|-------------|
| **responsive-wrapper.html** | **Everything!** ⭐ | Any size |
| index.html | Direct access (no wrapper) | 1792x1024 |
| fullscreen-wrapper.html | Event only (old method) | 3328x1024 only |
| test-layout-scaled.html | Preview layout | Any size |

**Recommendation:** Use **responsive-wrapper.html** for EVERYTHING! It adapts automatically.

## Screen Mode Indicator

When you open `responsive-wrapper.html`, you'll see a yellow box in the top-left corner for 5 seconds showing:

**On your Dell monitor (~1920px):**
```
NORMAL MODE - 1920×1080 - Game Only (No Panels)
```

**On event screen (3328px):**
```
EVENT MODE - 3328×1024 - Full Side Panels (768px each)
```

This helps you confirm which mode is active.

## Testing the Responsive Behavior

### Test 1: On Your Monitor
1. Open `responsive-wrapper.html`
2. You should see: Game centered, no side panels ✓
3. Press F12 to open DevTools console
4. You'll see: "Mode: NORMAL MODE - Game Only"

### Test 2: Simulate Event Screen
1. Open `responsive-wrapper.html`
2. Press F12 (DevTools)
3. Click device toolbar (Ctrl+Shift+M)
4. Set custom: **3328 x 1024**
5. Zoom out DevTools to see full layout
6. You should see: Game + side panels ✓

### Test 3: Resize Window
1. Open `responsive-wrapper.html`
2. Drag your browser window to make it wider/narrower
3. Watch the side panels appear/disappear automatically!

## Breakpoints Explained

The system uses these width breakpoints:

| Screen Width | What Happens | Example |
|--------------|--------------|---------|
| **< 1792px** | Game scales down to fit | Small laptop |
| **1792px - 2559px** | Game centered, no panels | Your Dell monitor ✓ |
| **2560px - 3327px** | Adaptive side panels | Ultrawide monitors |
| **≥ 3328px** | Full 768px side panels | Event display ✓ |

## Customization

### Change Side Panel Width (Event Mode)

Edit `responsive-wrapper.html` line 177:
```css
@media (min-width: 3328px) {
    .side-panel {
        display: flex;
        width: 768px;  /* Change this value */
    }
}
```

### Change Side Panel Colors

Lines 33-50:
```css
.side-panel.left {
    background: linear-gradient(
        90deg,
        #000000 0%,
        #1a0a0a 20%,
        rgba(255, 45, 85, 0.25) 100%  /* More/less red */
    );
}
```

### Disable Screen Indicator

Line 120 - Change opacity to 0:
```css
.screen-indicator {
    opacity: 0; /* Always hidden */
}
```

Or remove the entire `<div class="screen-indicator">` element (lines 265-268).

### Add Team Logos to Side Panels

Replace lines 271 and 283:
```html
<!-- Instead of text logo -->
<div class="panel-logo">TEAM RED</div>

<!-- Use image -->
<img src="assets/team-red-logo.png" style="width: 400px; opacity: 0.3;">
```

## Development Workflow

### Recommended Setup:

**Use ONE file for everything:** `responsive-wrapper.html`

**Development:**
1. Work on your normal monitor
2. Open `responsive-wrapper.html`
3. Develop your games normally
4. Test everything

**Event Day:**
1. Copy same file to event computer
2. Open `responsive-wrapper.html`
3. Connect to 3328x1024 display
4. Press F11
5. Side panels appear automatically!

**No need to:**
- ❌ Switch between files
- ❌ Change any code
- ❌ Modify game files
- ❌ Remember which file to use

## Browser Settings

### Chrome (Recommended)

**For best results:**
```
Settings → Appearance → Page zoom: 100%
Settings → System → Use hardware acceleration: ON
```

**Launch in kiosk mode (event):**
```batch
chrome.exe --kiosk "file:///C:/path/to/responsive-wrapper.html"
```

### Fullscreen Hotkeys

- **F11** - Toggle fullscreen
- **ESC** - Exit fullscreen
- **Ctrl+0** - Reset zoom to 100%

## Troubleshooting

### Issue: Side panels not showing on event screen
**Check:**
1. Is screen width actually 3328px? (Check the indicator)
2. Is browser zoom at 100%? (Press Ctrl+0)
3. Are you in fullscreen? (Press F11)

### Issue: Game looks too small on my monitor
**This is normal if:**
- Your monitor is smaller than 1792px
- The game automatically scales to fit
- On event screen it will be full size

### Issue: I see scrollbars
**Fix:**
- Press Ctrl+0 (reset zoom)
- Maximize browser window
- Press F11 for fullscreen

### Issue: Colors look different on event screen
**Cause:** Different display calibration
**Fix:** Adjust colors in the CSS (see Customization section)

## Production Checklist

Before your event:

- [ ] Test `responsive-wrapper.html` on your monitor
- [ ] Verify game navigation works (all 4 games + hub)
- [ ] Test fullscreen mode (F11)
- [ ] Check audio works
- [ ] Prepare launch.bat file for kiosk mode
- [ ] Test on actual event screen if possible
- [ ] Have backup: USB drive with all files
- [ ] Close all other programs before event
- [ ] Disable Windows notifications
- [ ] Set display to never sleep

## Quick Reference Commands

### Test current mode:
```javascript
// In browser console (F12)
console.log(window.innerWidth, 'x', window.innerHeight);
```

### Force fullscreen:
```javascript
document.documentElement.requestFullscreen();
```

### Check if in fullscreen:
```javascript
console.log(document.fullscreenElement ? 'Fullscreen' : 'Windowed');
```

## Summary

✅ **One file works everywhere:** `responsive-wrapper.html`
✅ **Automatically adapts** to screen size
✅ **No manual configuration** needed
✅ **Works on your Dell monitor** for development
✅ **Works on event screen** for presentation
✅ **No changes to game files** required

You're all set! Just use `responsive-wrapper.html` for everything! 🎮
