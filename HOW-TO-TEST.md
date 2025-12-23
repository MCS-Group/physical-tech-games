# How to Test Your Display Setup

## The Problem You Experienced

You tried to test with `test-fullscreen.html` in Chrome DevTools at 3328x1024, but you could only see the top-left corner. **This is normal!**

Your Dell monitor is probably **1920x1080**, but the layout is **3328x1024** - almost twice as wide! So when Chrome renders the full 3328px, your monitor can only show a portion of it.

## ✅ CORRECT Way to Test (3 Options)

### Option 1: SCALED TEST (Easiest - Use This First!)

**File:** `test-layout-scaled.html`

**How to use:**
1. Open `test-layout-scaled.html` in Chrome (just double-click it)
2. You'll see the ENTIRE 3328x1024 layout scaled down to fit your monitor
3. You should see all three sections:
   - Left panel (red gradient)
   - Center panel (your game area)
   - Right panel (blue gradient)

**What you're seeing:** A miniature version - like looking at a photo of the actual display

**This is perfect for:** Checking that the layout looks right before the event

---

### Option 2: FULLSCREEN TEST (For Final Verification)

**File:** `fullscreen-wrapper.html`

**How to use:**
1. Open `fullscreen-wrapper.html` in Chrome
2. Press **F11** to enter fullscreen
3. You'll only see the LEFT portion on your monitor, but that's OK!
4. Use arrow keys or mouse to scroll right and see other sections

**What you're seeing:** Full size (3328x1024), but only part of it fits on your 1920px monitor

**This is perfect for:** Making sure everything works at full size

---

### Option 3: CHROME DEVTOOLS (Advanced - For Pixel-Perfect Check)

**How to use:**
1. Open `fullscreen-wrapper.html`
2. Press **F12** (DevTools)
3. Click the device toolbar icon (or press Ctrl+Shift+M)
4. Set: **3328 x 1024**
5. Zoom out your DevTools view (Ctrl + Mouse Wheel)
6. You'll see the entire layout in the DevTools viewport

**This is perfect for:** Checking exact pixel measurements

---

## What to Look For

When testing with **test-layout-scaled.html**, you should see:

```
┌─────────────┬──────────────────┬─────────────┐
│             │                  │             │
│   RED       │    GAME AREA     │    BLUE     │
│ GRADIENT    │   (your games)   │  GRADIENT   │
│             │                  │             │
│  768px      │     1792px       │   768px     │
│             │                  │             │
└─────────────┴──────────────────┴─────────────┘
```

### ✓ Checklist:
- [ ] Can you see all three panels at once?
- [ ] Left panel has red/pink gradient?
- [ ] Center panel shows "GAME AREA" text?
- [ ] Right panel has blue gradient?
- [ ] Golden divider lines between sections?
- [ ] No errors in browser console (F12)?

If YES to all → **You're ready for the event!** ✓

---

## At Your Actual Event

### Equipment Needed:
- Display/projector that supports **3328 x 1024** resolution
- Computer with Chrome browser
- The file: `fullscreen-wrapper.html`

### Launch Steps:
1. Connect your computer to the 3328x1024 display
2. Set Windows display resolution to 3328x1024
3. Open `fullscreen-wrapper.html` in Chrome
4. Press **F11** for fullscreen
5. Your tournament starts!

### Pro Tip - Kiosk Mode:
Create `launch.bat` file:
```batch
@echo off
start chrome.exe --kiosk --window-size=3328,1024 "file:///%CD%/fullscreen-wrapper.html"
```

Double-click this to auto-launch in fullscreen kiosk mode!

---

## Common Questions

### Q: Why does my test look small/zoomed out?
**A:** That's correct! `test-layout-scaled.html` scales down the 3328px layout to fit your monitor so you can see everything at once.

### Q: Can I test at 100% size on my 1920px monitor?
**A:** No, 3328px won't fit on 1920px. Use the scaled test or accept that you'll only see part of it.

### Q: Will it look blurry at the event?
**A:** No! At the event on a 3328x1024 display, everything will be crystal clear at 100% size.

### Q: Do I need to change my game files?
**A:** No! Your games stay 1792x1024 and work perfectly. The wrapper just adds decorative sides.

### Q: What if my event display is 1920x1080 instead?
**A:** Then you need to modify the wrapper. Let me know and I'll adjust it for 1920x1080.

---

## Quick Reference

| File | Purpose | When to Use |
|------|---------|-------------|
| `test-layout-scaled.html` | See entire layout on regular monitor | Testing before event |
| `fullscreen-wrapper.html` | Actual event display | At the event only |
| `index.html` | Your game (unchanged) | Don't open directly |

---

## Troubleshooting

### Issue: "I only see the top-left corner"
- **Cause:** You're testing at full 3328px size on a smaller monitor
- **Fix:** Use `test-layout-scaled.html` instead

### Issue: "Everything looks tiny"
- **Cause:** Using the scaled test - this is correct!
- **Not a problem:** It will be full size at the event

### Issue: "The layout has scrollbars"
- **Cause:** Browser zoom is not 100%
- **Fix:** Press Ctrl+0 to reset zoom

### Issue: "Colors look different than expected"
- **Fix:** Edit `fullscreen-wrapper.html` lines 30-50 to adjust gradients

---

## Summary

**For Testing Now (on your Dell monitor):**
→ Use `test-layout-scaled.html` ✓

**For Event (on 3328x1024 display):**
→ Use `fullscreen-wrapper.html` + F11 ✓

**Your game files:**
→ No changes needed! ✓

You're all set! 🎮
