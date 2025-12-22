# 🔊 Audio Integration Guide - PHYSICAL: TECH Tournament

## Overview
Your tournament now has a comprehensive audio system! This guide will help you add background music and sound effects.

## Audio System Features
- **Background music** with fade in/out for different screens
- **Sound effects** for UI interactions and game events
- **Volume controls** for music and SFX separately
- **Mute toggle** for quick silence
- **Fallback system** - Uses procedural audio if files aren't found
- **Custom audio support** - Easy to add your own audio files

---

## 📁 Audio File Structure

Place your audio files in the following locations:

```
assets/audio/
├── Background Music
│   ├── bg-hub.mp3              (Main menu/hub screen - upbeat, energetic)
│   ├── bg-game-flow.mp3        (Team selection & matchups - focused, anticipatory)
│   ├── bg-celebration.mp3      (Victory screen - triumphant, celebratory)
│   └── bg-gameplay.mp3         (During games - intense, driving rhythm)
│
└── Sound Effects
    ├── sfx-button-click.mp3    (UI button clicks)
    ├── sfx-card-reveal.mp3     (Game card reveals)
    ├── sfx-chain-break.mp3     (Chain breaking animation)
    ├── sfx-shuffle.mp3         (Team shuffle sound)
    ├── sfx-player-select.mp3   (Selecting a player)
    ├── sfx-match-start.mp3     (Match begins)
    ├── sfx-victory.mp3         (Team victory)
    ├── sfx-defeat.mp3          (Team loss)
    ├── sfx-countdown.mp3       (3-2-1 countdown beeps)
    └── sfx-fanfare.mp3         (Special moments/reveals)
```

### Supported Formats
- **MP3** - Best compatibility, recommended
- **WAV** - High quality, larger file size
- **OGG** - Good quality, smaller size
- **M4A** - Good quality, Apple devices

---

## 🎵 Free Audio Resources

### Background Music (Royalty-Free)

**1. Pixabay Music**
- URL: https://pixabay.com/music/
- License: Free for commercial use
- Recommended searches: "arcade", "retro", "8-bit", "game", "energetic"

**2. FreePD (Public Domain Music)**
- URL: https://freepd.com/
- License: Public domain
- Categories: Electronic, Techno, Upbeat

**3. Incompetech**
- URL: https://incompetech.com/music/royalty-free/music.html
- License: Free with attribution
- Good for: Background music, varied styles

**4. Free Music Archive**
- URL: https://freemusicarchive.org/
- License: Various Creative Commons licenses
- Filter by: "Video Game", "Electronic"

**5. Chosic**
- URL: https://www.chosic.com/free-music/retro/
- License: Free for commercial use
- Great for: Retro/arcade style music

### Recommended Tracks by Screen

**Hub Screen** (energetic, welcoming):
- Search: "8-bit menu music", "arcade lobby", "retro game intro"
- Vibe: Upbeat, looping, 120-140 BPM

**Game Flow** (focused, anticipatory):
- Search: "tension music", "preparation", "pre-battle"
- Vibe: Building energy, moderate tempo

**Celebration** (triumphant):
- Search: "victory music", "champion theme", "triumph"
- Vibe: Epic, fanfare-like, celebratory

**Gameplay** (intense):
- Search: "action game music", "battle theme", "competition"
- Vibe: Fast-paced, driving rhythm, 140-160 BPM

---

### Sound Effects (Royalty-Free)

**1. Freesound**
- URL: https://freesound.org/
- License: Various Creative Commons (check each sound)
- BEST for sound effects
- Requires free account

**2. Pixabay Sound Effects**
- URL: https://pixabay.com/sound-effects/
- License: Free for commercial use
- No account required

**3. Zapsplat**
- URL: https://www.zapsplat.com/
- License: Free with attribution
- Large library

**4. Mixkit Sound Effects**
- URL: https://mixkit.co/free-sound-effects/
- License: Free for commercial use
- High quality

### Recommended Sound Effect Searches

| Sound Needed | Search Terms | Alternative Keywords |
|--------------|--------------|---------------------|
| Button Click | "button click", "UI click", "menu select" | "blip", "pop", "confirm" |
| Card Reveal | "whoosh", "reveal", "magic reveal" | "swish", "appear", "shimmer" |
| Chain Break | "chain break", "metal break", "shatter" | "crash", "impact metal" |
| Shuffle | "shuffle cards", "shuffle", "rustle" | "cards", "paper shuffle" |
| Player Select | "positive beep", "select", "confirm" | "chirp", "ding", "pickup" |
| Match Start | "horn", "buzzer", "start signal" | "whistle", "game start" |
| Victory | "victory", "level complete", "win" | "success", "achievement", "tada" |
| Defeat | "lose", "fail", "error" | "negative", "wrong", "buzzer" |
| Countdown | "countdown beep", "timer beep" | "beep", "pip", "count" |
| Fanfare | "fanfare", "trumpet", "celebration" | "announcement", "ta-da" |

---

## 🎮 Using the Audio System

### Basic Integration (Already Done!)

The audio manager is automatically integrated into:
- `index.html` - Hub screen with background music
- `game-flow.html` - Team selection with transitions
- `celebration.html` - Victory music and effects

### Playing Background Music

```javascript
// Play background music (automatically fades in)
audioManager.playBackgroundMusic('hub');

// Available music keys:
// 'hub' - Main menu
// 'gameFlow' - Team selection screens
// 'celebration' - Victory screen
// 'gameplay' - During games
```

### Playing Sound Effects

```javascript
// Play a sound effect from file (if available)
audioManager.playSoundEffect('buttonClick');

// Play with custom volume (0-1)
audioManager.playSoundEffect('victory', 0.8);

// Available SFX keys:
// 'buttonClick', 'cardReveal', 'chainBreak', 'shuffle',
// 'playerSelect', 'matchStart', 'victory', 'defeat',
// 'countdown', 'fanfare'
```

### Using Procedural Sounds (Fallback)

```javascript
// Play procedural sound if audio file isn't found
audioManager.playProceduralSound('buttonClick');

// Custom procedural sound
audioManager.playProceduralSound('custom', 440, 0.3); // freq, duration
```

### Volume Controls

```javascript
// Set background music volume (0-1)
audioManager.setBgMusicVolume(0.5);

// Set sound effects volume (0-1)
audioManager.setSfxVolume(0.7);

// Toggle mute
audioManager.toggleMute();
```

### Using Custom Audio Files

If you want to use your own audio files with different names:

```javascript
// Update a background music path
audioManager.updateAudioPath('bgMusic', 'hub', 'assets/audio/my-custom-menu-music.mp3');

// Update a sound effect path
audioManager.updateAudioPath('sfx', 'victory', 'assets/audio/my-victory-sound.wav');
```

---

## 🎯 Quick Start Guide

### Option 1: Use Your Existing Audio File

You already have: `Pixel Pop – Classic Game Opening Sound [uEGrWATLb0U].mp3`

Let's rename and use it:

```bash
# Rename your existing file (run in terminal)
cd assets/audio
mv "Pixel Pop – Classic Game Opening Sound [uEGrWATLb0U].mp3" "bg-hub.mp3"
```

Now the hub screen will play this music automatically!

### Option 2: Download Free Audio (Recommended Workflow)

1. **Get Background Music:**
   - Visit: https://pixabay.com/music/search/arcade/
   - Download 3-4 tracks you like
   - Rename them to: `bg-hub.mp3`, `bg-game-flow.mp3`, `bg-celebration.mp3`, `bg-gameplay.mp3`
   - Place in `assets/audio/`

2. **Get Sound Effects:**
   - Visit: https://pixabay.com/sound-effects/search/game/
   - Download sounds for: click, whoosh, victory, etc.
   - Rename them according to the structure above
   - Place in `assets/audio/`

3. **Test:**
   - Open `index.html` in your browser
   - Click anywhere to initialize audio (browser requirement)
   - Music should start playing automatically
   - UI interactions should trigger sounds

### Option 3: Let Procedural Audio Handle It

If you don't add any audio files, the system automatically falls back to procedural sounds (the beeps you already have). This works immediately with no additional setup!

---

## 🎨 Audio Control UI

Volume controls have been added to each screen:

- **🔊 Volume Icon** - Click to toggle mute
- **Music Slider** - Adjust background music volume
- **SFX Slider** - Adjust sound effects volume

Controls are positioned in the bottom-right corner and auto-hide after inactivity.

---

## 🔧 Advanced Customization

### Add More Sound Effects

1. Edit `audio-manager.js`
2. Find the `audioFiles.sfx` section (around line 14)
3. Add your new sound:

```javascript
sfx: {
    // ... existing sounds ...
    myCustomSound: 'assets/audio/sfx-my-custom.mp3'
}
```

4. Use it in your code:

```javascript
audioManager.playSoundEffect('myCustomSound');
```

### Add More Background Music

Same process but in `audioFiles.bgMusic` section.

### Sound Sequences

Play multiple sounds with delays:

```javascript
audioManager.playSoundSequence([
    { sfxKey: 'countdown', delay: 0 },
    { sfxKey: 'countdown', delay: 1000 },
    { sfxKey: 'countdown', delay: 2000 },
    { sfxKey: 'matchStart', delay: 3000 }
]);
```

---

## 📊 Recommended Audio Specifications

### Background Music
- **Format:** MP3
- **Bitrate:** 128-192 kbps (good quality, reasonable file size)
- **Length:** 1-3 minutes (will loop)
- **File Size:** 2-5 MB per track
- **Style:** Instrumental (no vocals)

### Sound Effects
- **Format:** MP3 or WAV
- **Duration:** 0.1-2 seconds
- **File Size:** < 100 KB each
- **Volume:** Normalized, not clipping

---

## 🐛 Troubleshooting

### "Audio not playing"
- **Cause:** Browsers require user interaction before playing audio
- **Solution:** Click anywhere on the page first, then audio will work

### "File not found errors in console"
- **Cause:** Audio files haven't been added yet
- **Solution:** System automatically falls back to procedural sounds. Add files when ready.

### "Audio is too loud/quiet"
- **Solution:** Use the volume sliders in the bottom-right corner

### "Audio cuts out during gameplay"
- **Cause:** Background music might be stopping
- **Solution:** Check that `audioManager.playBackgroundMusic()` is being called with correct key

---

## 🎉 Next Steps

1. ✅ Audio system is installed
2. ⬜ Download or add your audio files (optional)
3. ⬜ Test each screen to hear the audio
4. ⬜ Adjust volumes to your preference
5. ⬜ Customize audio paths if needed

**Enjoy your tournament with immersive audio!** 🎮🔊
