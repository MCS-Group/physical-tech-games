/**
 * PHYSICAL: TECH Tournament - Audio Manager
 * Centralized audio system for background music and sound effects
 */

class AudioManager {
    constructor() {
        this.bgMusic = null;
        this.bgMusicVolume = 0.2;
        this.sfxVolume = 0.6;
        this.isMuted = false;
        this.audioContext = null;

        // Audio file paths - customize these paths as needed
        this.audioFiles = {
            bgMusic: {
                hub: 'assets/audio/bg-hub.mp3',
                gameFlow: 'assets/audio/bg-game-flow.mp3',
                celebration: 'assets/audio/bg-celebration.mp3',
                gameplay: 'assets/audio/bg-gameplay.mp3' // Background for all games (Pixel Pop)
            },
            sfx: {
                buttonClick: 'assets/audio/sfx-button-click.mp3',
                cardReveal: 'assets/audio/sfx-card-reveal.mp3',
                chainBreak: 'assets/audio/sfx-chain-break.mp3',
                shuffle: 'assets/audio/sfx-shuffle.mp3',
                playerSelect: 'assets/audio/sfx-player-select.mp3',
                matchStart: 'assets/audio/sfx-match-start.mp3',
                victory: 'assets/audio/sfx-victory.mp3',
                defeat: 'assets/audio/sfx-defeat.mp3',
                fanfare: 'assets/audio/sfx-fanfare.mp3'
            },
            countdown: 'assets/audio/sfx-countdown.mp3', // "3 2 1 go" beep for all games
            gameIntros: {
                1: 'assets/audio/game-intro-1.mp3', // "GAME 1. WALL PUSHING MATCH. IN THIS GAME..."
                2: 'assets/audio/game-intro-2.mp3', // "GAME 2. HANGING ENDURANCE. IN THIS GAME..."
                3: 'assets/audio/game-intro-3.mp3', // "GAME 3. IRON BALL TUG. IN THIS GAME..."
                4: 'assets/audio/game-intro-4.mp3'  // "GAME 4. CASTLE CONQUEST. IN THIS GAME..."
            },
            victoryAnnouncements: {
                // Combined teams for games 1-3 (e.g., "Team 1&2 won!")
                combined: {
                    1: 'assets/audio/victory-team-1-2.mp3',
                    2: 'assets/audio/victory-team-3-4.mp3',
                    3: 'assets/audio/victory-team-5-6.mp3',
                    4: 'assets/audio/victory-team-7-8.mp3',
                    5: 'assets/audio/victory-team-9-10.mp3',
                    6: 'assets/audio/victory-team-11-12.mp3',
                    7: 'assets/audio/victory-team-13-14.mp3',
                    8: 'assets/audio/victory-team-15-16.mp3'
                },
                // Original teams for game 4 (e.g., "Team 1 won!")
                original: {
                    1: 'assets/audio/victory-team-1.mp3',
                    2: 'assets/audio/victory-team-2.mp3',
                    3: 'assets/audio/victory-team-3.mp3',
                    4: 'assets/audio/victory-team-4.mp3',
                    5: 'assets/audio/victory-team-5.mp3',
                    6: 'assets/audio/victory-team-6.mp3',
                    7: 'assets/audio/victory-team-7.mp3',
                    8: 'assets/audio/victory-team-8.mp3',
                    9: 'assets/audio/victory-team-9.mp3',
                    10: 'assets/audio/victory-team-10.mp3',
                    11: 'assets/audio/victory-team-11.mp3',
                    12: 'assets/audio/victory-team-12.mp3',
                    13: 'assets/audio/victory-team-13.mp3',
                    14: 'assets/audio/victory-team-14.mp3',
                    15: 'assets/audio/victory-team-15.mp3',
                    16: 'assets/audio/victory-team-16.mp3'
                }
            },
            championshipAnnouncements: {
                // "PHYSICAL : TECH's champions are Team X!"
                1: 'assets/audio/championship-team-1.mp3',
                2: 'assets/audio/championship-team-2.mp3',
                3: 'assets/audio/championship-team-3.mp3',
                4: 'assets/audio/championship-team-4.mp3',
                5: 'assets/audio/championship-team-5.mp3',
                6: 'assets/audio/championship-team-6.mp3',
                7: 'assets/audio/championship-team-7.mp3',
                8: 'assets/audio/championship-team-8.mp3',
                9: 'assets/audio/championship-team-9.mp3',
                10: 'assets/audio/championship-team-10.mp3',
                11: 'assets/audio/championship-team-11.mp3',
                12: 'assets/audio/championship-team-12.mp3',
                13: 'assets/audio/championship-team-13.mp3',
                14: 'assets/audio/championship-team-14.mp3',
                15: 'assets/audio/championship-team-15.mp3',
                16: 'assets/audio/championship-team-16.mp3'
            }
        };

        // Preloaded audio elements for quick playback
        this.preloadedSfx = {};

        // Initialize on user interaction (required by browsers)
        this.initialized = false;
    }

    /**
     * Initialize audio context (must be called after user interaction)
     */
    initialize() {
        if (this.initialized) return;

        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.initialized = true;
        console.log('🔊 Audio Manager Initialized');
    }

    /**
     * Play background music with looping
     * @param {string} musicKey - Key from audioFiles.bgMusic
     * @param {boolean} fadeIn - Whether to fade in the music
     */
    playBackgroundMusic(musicKey, fadeIn = true) {
        this.initialize();

        // Stop current music if playing
        if (this.bgMusic) {
            this.stopBackgroundMusic(true);
        }

        const musicPath = this.audioFiles.bgMusic[musicKey];
        if (!musicPath) {
            console.warn(`Background music key "${musicKey}" not found`);
            return;
        }

        this.bgMusic = new Audio(musicPath);
        this.bgMusic.loop = true;
        this.bgMusic.volume = fadeIn ? 0 : this.bgMusicVolume;

        // Handle file not found gracefully
        this.bgMusic.addEventListener('error', (e) => {
            console.warn(`Background music file not found: ${musicPath}. Using silence.`);
            this.bgMusic = null;
        });

        this.bgMusic.play().catch(err => {
            console.warn('Could not play background music:', err);
        });

        // Fade in effect
        if (fadeIn && this.bgMusic) {
            let currentVolume = 0;
            const fadeInterval = setInterval(() => {
                if (!this.bgMusic || currentVolume >= this.bgMusicVolume) {
                    clearInterval(fadeInterval);
                    return;
                }
                currentVolume += 0.02;
                this.bgMusic.volume = Math.min(currentVolume, this.bgMusicVolume);
            }, 50);
        }
    }

    /**
     * Stop background music
     * @param {boolean} fadeOut - Whether to fade out the music
     */
    stopBackgroundMusic(fadeOut = true) {
        if (!this.bgMusic) return;

        if (fadeOut) {
            let currentVolume = this.bgMusic.volume;
            const fadeInterval = setInterval(() => {
                currentVolume -= 0.02;
                if (currentVolume <= 0 || !this.bgMusic) {
                    clearInterval(fadeInterval);
                    if (this.bgMusic) {
                        this.bgMusic.pause();
                        this.bgMusic = null;
                    }
                    return;
                }
                this.bgMusic.volume = Math.max(currentVolume, 0);
            }, 50);
        } else {
            this.bgMusic.pause();
            this.bgMusic = null;
        }
    }

    /**
     * Play a sound effect from file
     * @param {string} sfxKey - Key from audioFiles.sfx
     * @param {number} volume - Volume override (0-1)
     */
    playSoundEffect(sfxKey, volume = null) {
        this.initialize();

        if (this.isMuted) return;

        const sfxPath = this.audioFiles.sfx[sfxKey];
        if (!sfxPath) {
            console.warn(`Sound effect key "${sfxKey}" not found`);
            return;
        }

        // Create or reuse preloaded audio
        if (!this.preloadedSfx[sfxKey]) {
            this.preloadedSfx[sfxKey] = new Audio(sfxPath);
            this.preloadedSfx[sfxKey].addEventListener('error', () => {
                console.warn(`Sound effect file not found: ${sfxPath}. Using procedural sound.`);
                // Fallback to procedural sound
                this.playProceduralSound(sfxKey);
            });
        }

        const sfx = this.preloadedSfx[sfxKey].cloneNode();
        sfx.volume = volume !== null ? volume : this.sfxVolume;
        sfx.play().catch(err => {
            // Fallback to procedural sound if file fails
            this.playProceduralSound(sfxKey);
        });
    }

    /**
     * Play procedural sound using Web Audio API (fallback or intentional)
     * @param {string} type - Type of sound to generate
     * @param {number} frequency - Frequency in Hz
     * @param {number} duration - Duration in seconds
     */
    playProceduralSound(type, frequency = null, duration = 0.2) {
        this.initialize();

        if (this.isMuted) return;

        // Predefined procedural sounds
        const presets = {
            buttonClick: { freq: 800, type: 'sine', duration: 0.1 },
            cardReveal: { freq: 600, type: 'sine', duration: 0.3 },
            chainBreak: { freq: 200, type: 'square', duration: 0.2 },
            shuffle: { freq: 400, type: 'triangle', duration: 0.15 },
            playerSelect: { freq: 900, type: 'sine', duration: 0.1 },
            matchStart: { freq: 500, type: 'square', duration: 0.5 },
            victory: { freq: 800, type: 'sine', duration: 0.6 },
            defeat: { freq: 200, type: 'sawtooth', duration: 0.4 },
            countdown: { freq: 700, type: 'square', duration: 0.1 },
            fanfare: { freq: 1000, type: 'sine', duration: 0.8 }
        };

        const preset = presets[type] || { freq: frequency || 440, type: 'sine', duration };

        try {
            const ctx = this.audioContext || new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.frequency.value = preset.freq;
            osc.type = preset.type;

            const volume = this.sfxVolume * 0.5; // Slightly quieter for procedural sounds
            gain.gain.setValueAtTime(volume, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + preset.duration);

            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + preset.duration);
        } catch (err) {
            console.warn('Could not play procedural sound:', err);
        }
    }

    /**
     * Set background music volume
     * @param {number} volume - Volume (0-1)
     */
    setBgMusicVolume(volume) {
        this.bgMusicVolume = Math.max(0, Math.min(1, volume));
        if (this.bgMusic) {
            this.bgMusic.volume = this.bgMusicVolume;
        }
    }

    /**
     * Set sound effects volume
     * @param {number} volume - Volume (0-1)
     */
    setSfxVolume(volume) {
        this.sfxVolume = Math.max(0, Math.min(1, volume));
    }

    /**
     * Toggle mute
     */
    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.bgMusic) {
            this.bgMusic.muted = this.isMuted;
        }
        return this.isMuted;
    }

    /**
     * Preload sound effects for better performance
     * @param {Array<string>} sfxKeys - Array of sound effect keys to preload
     */
    preloadSounds(sfxKeys) {
        sfxKeys.forEach(key => {
            const sfxPath = this.audioFiles.sfx[key];
            if (sfxPath && !this.preloadedSfx[key]) {
                this.preloadedSfx[key] = new Audio(sfxPath);
                this.preloadedSfx[key].addEventListener('error', () => {
                    console.warn(`Could not preload: ${sfxPath}`);
                });
            }
        });
    }

    /**
     * Play a sequence of sounds with delays
     * @param {Array<{sfxKey: string, delay: number}>} sequence
     */
    playSoundSequence(sequence) {
        sequence.forEach(({sfxKey, delay}) => {
            setTimeout(() => {
                this.playSoundEffect(sfxKey);
            }, delay);
        });
    }

    /**
     * Update audio file path (for custom audio files)
     * @param {string} category - 'bgMusic' or 'sfx'
     * @param {string} key - The sound key
     * @param {string} path - Path to audio file
     */
    updateAudioPath(category, key, path) {
        if (this.audioFiles[category] && this.audioFiles[category][key] !== undefined) {
            this.audioFiles[category][key] = path;
            // Clear preloaded version if it exists
            if (category === 'sfx' && this.preloadedSfx[key]) {
                delete this.preloadedSfx[key];
            }
            console.log(`Updated ${category}.${key} to: ${path}`);
        }
    }

    /**
     * Play countdown audio ("3 2 1 go")
     * @param {Function} onComplete - Callback when countdown finishes
     * @returns {Promise} - Resolves when audio finishes or errors
     */
    playCountdown(onComplete = null) {
        this.initialize();

        return new Promise((resolve, reject) => {
            const countdownPath = this.audioFiles.countdown;
            if (!countdownPath) {
                console.warn('Countdown audio not configured');
                reject('Countdown audio not configured');
                return;
            }

            const audio = new Audio(countdownPath);
            audio.volume = this.sfxVolume * 1.5; // Louder for countdown (max 1.0)

            audio.addEventListener('ended', () => {
                if (onComplete) onComplete();
                resolve();
            });

            audio.addEventListener('error', (e) => {
                console.warn(`Countdown audio file not found: ${countdownPath}. Skipping.`);
                if (onComplete) onComplete();
                reject(e);
            });

            audio.play().catch(err => {
                console.warn('Could not play countdown audio:', err);
                if (onComplete) onComplete();
                reject(err);
            });
        });
    }

    /**
     * Play game introduction voice-over
     * @param {number} gameNumber - Game number (1-4)
     * @param {boolean} fadeInMusic - Whether to fade in background music after intro
     * @returns {Promise} - Resolves when intro finishes
     */
    playGameIntro(gameNumber, fadeInMusic = true) {
        this.initialize();

        return new Promise((resolve, reject) => {
            const introPath = this.audioFiles.gameIntros[gameNumber];
            if (!introPath) {
                console.warn(`Game intro ${gameNumber} not configured`);
                reject(`Game intro ${gameNumber} not configured`);
                return;
            }

            // Fade out current music if playing
            if (this.bgMusic && fadeInMusic) {
                this.fadeOutMusic(1000); // 1 second fade out
            }

            const audio = new Audio(introPath);
            audio.volume = this.sfxVolume;

            audio.addEventListener('ended', () => {
                // Fade in gameplay music after intro
                if (fadeInMusic) {
                    setTimeout(() => {
                        this.playBackgroundMusic('gameplay', true);
                    }, 500);
                }
                resolve();
            });

            audio.addEventListener('error', (e) => {
                console.warn(`Game intro file not found: ${introPath}. Starting music anyway.`);
                if (fadeInMusic) {
                    this.playBackgroundMusic('gameplay', true);
                }
                reject(e);
            });

            // Small delay before playing intro
            setTimeout(() => {
                audio.play().catch(err => {
                    console.warn('Could not play game intro:', err);
                    if (fadeInMusic) {
                        this.playBackgroundMusic('gameplay', true);
                    }
                    reject(err);
                });
            }, 500);
        });
    }

    /**
     * Play victory announcement for a team
     * @param {number} teamId - Team ID
     * @param {boolean} isOriginalTeam - True for original teams (game 4), false for combined teams (games 1-3)
     * @param {boolean} fadeOutMusic - Whether to fade out background music first
     * @returns {Promise} - Resolves when announcement finishes
     */
    playVictoryAnnouncement(teamId, isOriginalTeam = false, fadeOutMusic = true) {
        this.initialize();

        return new Promise((resolve, reject) => {
            const teamType = isOriginalTeam ? 'original' : 'combined';
            const announcementPath = this.audioFiles.victoryAnnouncements[teamType][teamId];

            if (!announcementPath) {
                console.warn(`Victory announcement for team ${teamId} (${teamType}) not configured`);
                reject(`Victory announcement not configured`);
                return;
            }

            // Fade out music if requested
            if (this.bgMusic && fadeOutMusic) {
                this.fadeOutMusic(1500); // 1.5 second fade out
            }

            const audio = new Audio(announcementPath);
            audio.volume = this.sfxVolume * 1.2; // Slightly louder for announcements

            audio.addEventListener('ended', () => {
                resolve();
            });

            audio.addEventListener('error', (e) => {
                console.warn(`Victory announcement file not found: ${announcementPath}. Using fallback.`);
                // Fallback to procedural fanfare
                this.playSoundEffect('fanfare');
                setTimeout(resolve, 2000);
                reject(e);
            });

            // Small delay before announcement
            setTimeout(() => {
                audio.play().catch(err => {
                    console.warn('Could not play victory announcement:', err);
                    this.playSoundEffect('fanfare');
                    setTimeout(resolve, 2000);
                    reject(err);
                });
            }, 800);
        });
    }

    /**
     * Play championship announcement for the winning team
     * @param {number} teamId - Original team ID (1-16)
     * @param {boolean} fadeOutMusic - Whether to fade out background music first
     * @returns {Promise} - Resolves when announcement finishes
     */
    playChampionshipAnnouncement(teamId, fadeOutMusic = true) {
        this.initialize();

        return new Promise((resolve, reject) => {
            const announcementPath = this.audioFiles.championshipAnnouncements[teamId];

            if (!announcementPath) {
                console.warn(`Championship announcement for team ${teamId} not configured`);
                reject(`Championship announcement not configured`);
                return;
            }

            // Fade out music if requested
            if (this.bgMusic && fadeOutMusic) {
                this.fadeOutMusic(2000); // 2 second fade out
            }

            const audio = new Audio(announcementPath);
            audio.volume = this.sfxVolume * 1.3; // Louder for championship announcement

            audio.addEventListener('ended', () => {
                // Fade in celebration music after announcement
                setTimeout(() => {
                    this.playBackgroundMusic('celebration', true);
                }, 1000);
                resolve();
            });

            audio.addEventListener('error', (e) => {
                console.warn(`Championship announcement file not found: ${announcementPath}. Using fallback.`);
                // Fallback to procedural fanfare
                this.playSoundEffect('fanfare');
                setTimeout(() => {
                    this.playBackgroundMusic('celebration', true);
                    resolve();
                }, 3000);
                reject(e);
            });

            // Delay before championship announcement
            setTimeout(() => {
                audio.play().catch(err => {
                    console.warn('Could not play championship announcement:', err);
                    this.playSoundEffect('fanfare');
                    setTimeout(() => {
                        this.playBackgroundMusic('celebration', true);
                        resolve();
                    }, 3000);
                    reject(err);
                });
            }, 1500);
        });
    }

    /**
     * Fade out current background music
     * @param {number} duration - Fade duration in milliseconds
     * @returns {Promise} - Resolves when fade completes
     */
    fadeOutMusic(duration = 1000) {
        return new Promise((resolve) => {
            if (!this.bgMusic) {
                resolve();
                return;
            }

            const startVolume = this.bgMusic.volume;
            const fadeStep = startVolume / (duration / 50);
            let currentVolume = startVolume;

            const fadeInterval = setInterval(() => {
                currentVolume -= fadeStep;

                if (currentVolume <= 0 || !this.bgMusic) {
                    clearInterval(fadeInterval);
                    if (this.bgMusic) {
                        this.bgMusic.pause();
                        this.bgMusic = null;
                    }
                    resolve();
                    return;
                }

                if (this.bgMusic) {
                    this.bgMusic.volume = Math.max(currentVolume, 0);
                }
            }, 50);
        });
    }

    /**
     * Fade in current background music
     * @param {number} duration - Fade duration in milliseconds
     * @param {number} targetVolume - Target volume (default: bgMusicVolume)
     * @returns {Promise} - Resolves when fade completes
     */
    fadeInMusic(duration = 1000, targetVolume = null) {
        return new Promise((resolve) => {
            if (!this.bgMusic) {
                resolve();
                return;
            }

            const target = targetVolume !== null ? targetVolume : this.bgMusicVolume;
            this.bgMusic.volume = 0;
            const fadeStep = target / (duration / 50);
            let currentVolume = 0;

            const fadeInterval = setInterval(() => {
                currentVolume += fadeStep;

                if (currentVolume >= target || !this.bgMusic) {
                    clearInterval(fadeInterval);
                    if (this.bgMusic) {
                        this.bgMusic.volume = target;
                    }
                    resolve();
                    return;
                }

                if (this.bgMusic) {
                    this.bgMusic.volume = Math.min(currentVolume, target);
                }
            }, 50);
        });
    }

    /**
     * Crossfade from current music to new music
     * @param {string} newMusicKey - Key for new background music
     * @param {number} fadeDuration - Crossfade duration in milliseconds
     */
    async crossfadeMusic(newMusicKey, fadeDuration = 2000) {
        // Fade out current music
        await this.fadeOutMusic(fadeDuration);

        // Start new music with fade in
        this.playBackgroundMusic(newMusicKey, true);
    }
}

// Create global audio manager instance
const audioManager = new AudioManager();

// Export for ES6 modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = audioManager;
}
