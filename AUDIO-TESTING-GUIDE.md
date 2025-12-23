# 🔊 Audio Testing Guide

## ✅ Your Audio Files (Confirmed Present)

```
D:\Dev\projects\physical-tech-games\assets\audio\
├── bg-celebration.mp3 ✅
├── bg-gameplay.mp3 ✅
├── sfx-countdown.mp3 ✅
└── sfx-victory.mp3 ✅
```

---

## 🎮 What I Just Implemented

### ✅ **Victory Sound (sfx-victory.mp3)**

Added to all 4 games to play when a match ends:

**Game 1 - Wall Push:**
- Line 1313: Plays when match ends in tournament mode

**Game 2 - Hanging Endurance:**
- Line 1887: Plays when match ends

**Game 3 - Iron Ball Tug:**
- Line 927: Plays when game ends

**Game 4 - Castle Conquest:**
- Line 1946: Plays when castle is conquered

### ✅ **Championship Music (bg-celebration.mp3)**

Already implemented in `celebration.html`:
- Line 481: Plays automatically when championship screen loads
- Loops continuously during celebration

---

## 🧪 How to Test

### **Test 1: Victory Sound**

1. **Open** `responsive-wrapper.html` in Chrome
2. **Start tournament** (click START TOURNAMENT)
3. **Play any game** (select Game 1 for quick testing)
4. **Complete a match** (wait for timer to end or win condition)
5. **Listen for:** `sfx-victory.mp3` should play when winner is announced

**Expected behavior:**
- Sound plays ONCE when match ends
- Plays before the "CONTINUE" button appears

---

### **Test 2: Championship Music**

1. **Complete the tournament** through all 4 games OR
2. **Direct test:** Open `celebration.html` directly
3. **Listen for:** `bg-celebration.mp3` should start playing automatically
4. **Check:** Music should loop continuously

**Expected behavior:**
- Music starts immediately when page loads
- Loops seamlessly
- Volume controlled by music slider in top-right

---

## 🔍 Troubleshooting

### **Issue: "I don't hear any audio"**

#### **Check 1: Browser Console**
1. Press **F12** to open DevTools
2. Go to **Console** tab
3. Look for messages like:
   ```
   🔊 Audio Manager Initialized
   Background music file not found: assets/audio/bg-celebration.mp3
   ```

#### **Check 2: Browser Autoplay Policy**
Chrome blocks autoplay until user interacts with page.

**Fix:**
- Click anywhere on the page first
- Audio should start after click

#### **Check 3: Volume Settings**
1. Check **audio icon** in top-right corner
2. Click icon to toggle mute/unmute
3. Adjust **Music** and **SFX** sliders
4. Try setting both to 100%

#### **Check 4: File Paths**
Open browser console (F12) and check for errors:
```
404 (Not Found) - assets/audio/sfx-victory.mp3
```

If you see this, the file path is wrong.

**Current paths expected:**
```
assets/audio/sfx-victory.mp3
assets/audio/bg-celebration.mp3
```

---

### **Issue: "Victory sound plays but championship music doesn't"**

**Reason:** You need to actually win the tournament to reach celebration.html

**Quick test:**
1. Open `celebration.html` directly in Chrome
2. Music should play immediately

If it doesn't:
- Check browser console (F12) for errors
- Try clicking on the page (autoplay policy)
- Check audio controls (top-right corner)

---

### **Issue: "I hear procedural beeps instead of my MP3"**

This means the audio file failed to load, so the fallback sound played.

**Reasons:**
1. **File name mismatch**
   - Check exact spelling: `sfx-victory.mp3` (NOT `victory.mp3` or `sfx-victory.wav`)
   - Case-sensitive on some systems

2. **Wrong location**
   - Must be in: `D:\Dev\projects\physical-tech-games\assets\audio\`
   - NOT in: `D:\Dev\projects\physical-tech-games\audio\`

3. **Corrupt file**
   - Try playing the MP3 in Windows Media Player
   - Re-export from your audio editor

4. **Browser cache**
   - Hard refresh: **Ctrl + Shift + R**
   - Or clear browser cache

---

## 🎯 Quick Debug Test

Copy this into browser console (F12) while on any game page:

```javascript
// Test victory sound
console.log('Testing victory sound...');
audioManager.playSoundEffect('victory');

// Wait 3 seconds, then test celebration music
setTimeout(() => {
    console.log('Testing celebration music...');
    audioManager.playBackgroundMusic('celebration');
}, 3000);
```

**What should happen:**
1. Victory sound plays immediately
2. After 3 seconds, celebration music starts

**If you hear beeps instead:**
- MP3 files are not loading correctly
- Check file paths and names

**If you hear nothing:**
- Volume is muted or too low
- Browser blocked autoplay (click page first)
- Audio files are corrupt

---

## 📊 Expected Audio Flow

### **During Tournament:**

```
START TOURNAMENT
    ↓
[GAME 1 MATCH]
    ↓
🔊 sfx-victory.mp3 plays ← Match ends
    ↓
[GAME 2 MATCH]
    ↓
🔊 sfx-victory.mp3 plays ← Match ends
    ↓
[GAME 3 MATCH]
    ↓
🔊 sfx-victory.mp3 plays ← Match ends
    ↓
[GAME 4 FINAL]
    ↓
🔊 sfx-victory.mp3 plays ← Final match ends
    ↓
[CELEBRATION SCREEN]
    ↓
🎵 bg-celebration.mp3 loops ← Championship!
```

---

## 🔧 Advanced Debugging

### **Check Audio Manager State:**

```javascript
// In console (F12)
console.log('Audio initialized:', audioManager.initialized);
console.log('Is muted:', audioManager.isMuted);
console.log('Music volume:', audioManager.bgMusicVolume);
console.log('SFX volume:', audioManager.sfxVolume);
console.log('Current music:', audioManager.bgMusic);
```

### **Manually Trigger Sounds:**

```javascript
// Test each sound individually
audioManager.initialize(); // Initialize first

// Test victory
audioManager.playSoundEffect('victory');

// Test celebration music
audioManager.playBackgroundMusic('celebration');

// Test countdown
audioManager.playCountdown();
```

---

## ✅ Verification Checklist

Before your event, verify:

- [ ] `sfx-victory.mp3` plays when ANY game match ends
- [ ] `bg-celebration.mp3` plays on championship screen
- [ ] Music loops continuously on celebration screen
- [ ] Volume controls work (audio icon + sliders)
- [ ] No console errors (F12)
- [ ] Audio plays after clicking page (autoplay policy)

---

## 🎵 Current Audio Files Status

| File | Location | Used For | Status |
|------|----------|----------|--------|
| `bg-gameplay.mp3` | assets/audio/ | Game background music | ✅ Working |
| `sfx-countdown.mp3` | assets/audio/ | "3-2-1-GO" countdown | ✅ Working |
| `sfx-victory.mp3` | assets/audio/ | Match victory | ✅ **JUST ADDED** |
| `bg-celebration.mp3` | assets/audio/ | Championship screen | ✅ **JUST ADDED** |

---

## 🚀 Next Steps

**Your audio files WILL work if:**
1. Files are in correct location ✅ (verified)
2. File names are exact ✅ (verified)
3. You click the page before audio plays (browser policy)
4. Volume is not muted or at 0%

**If still not working:**
1. Open console (F12)
2. Copy any error messages
3. Try the debug tests above
4. Check that files play in media player (not corrupt)

Your tournament is ready! 🎮🏆🔊
