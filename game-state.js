// PHYSICAL: TECH Tournament - State Management
// Handles all tournament state via localStorage and WebSocket sync

const STORAGE_KEY = 'physicalTechTournament';

// WebSocket connection for multi-device sync
let ws = null;
let wsReconnectTimeout = null;

function initWebSocket() {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}`;

    try {
        ws = new WebSocket(wsUrl);

        ws.onopen = () => {
            console.log('✅ Connected to tournament server');
        };

        ws.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);
                if (message.type === 'state' && message.data) {
                    // Update local state from server
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(message.data));
                    window.dispatchEvent(new CustomEvent('tournamentStateChanged', { detail: message.data }));
                }
            } catch (e) {
                console.error('Error processing WebSocket message:', e);
            }
        };

        ws.onclose = () => {
            console.log('❌ Disconnected from tournament server. Reconnecting...');
            // Attempt to reconnect after 3 seconds
            if (wsReconnectTimeout) clearTimeout(wsReconnectTimeout);
            wsReconnectTimeout = setTimeout(initWebSocket, 3000);
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    } catch (e) {
        console.error('Failed to initialize WebSocket:', e);
        // Retry connection
        if (wsReconnectTimeout) clearTimeout(wsReconnectTimeout);
        wsReconnectTimeout = setTimeout(initWebSocket, 3000);
    }
}

// Initialize WebSocket connection
if (typeof window !== 'undefined') {
    initWebSocket();
}

// Default state structure
function getDefaultState() {
    return {
        tournamentStarted: false,
        currentGame: 0, // 0 = not started, 1-4 = current game
        currentScreen: 'start', // start, hub, game-intro, matchup, selection, preview, playing, results, celebration

        // Track which games are unlocked/completed
        games: {
            1: { unlocked: false, completed: false, currentMatch: 0 },
            2: { unlocked: false, completed: false, currentMatch: 0 },
            3: { unlocked: false, completed: false, currentMatch: 0 },
            4: { unlocked: false, completed: false, currentMatch: 0 }
        },

        // Track which players have participated (players can now play multiple times)
        playedPlayers: [], // array of player IDs (kept for backwards compatibility, not enforced)

        // Match brackets for each game
        matchups: {
            1: [], // [{red: combinedTeamId, blue: combinedTeamId}, ...]
            2: [],
            3: [],
            4: []
        },

        // Match results
        results: {
            1: [], // [{red: combinedTeamId, blue: combinedTeamId, redPlayers: [], bluePlayers: [], winner: 'red'|'blue'}, ...]
            2: [],
            3: [],
            4: []
        },

        // Tournament progression
        bracket: {
            game1Winners: [], // 4 combined team IDs
            game2Winners: [], // 2 combined team IDs
            game3Winner: null, // 1 combined team ID
            finalist: null, // combined team that won game 3
            champions: null // original team ID (winner of game 4)
        },

        // Current match being set up
        currentMatchSetup: {
            game: null,
            matchIndex: null,
            redTeam: null,
            blueTeam: null,
            redPlayers: [],
            bluePlayers: [],
            selectionPhase: null // 'red' or 'blue'
        }
    };
}

// Get current state from localStorage
function getState() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            return JSON.parse(saved);
        }
    } catch (e) {
        console.error('Failed to load state:', e);
    }
    return getDefaultState();
}

// Save state to localStorage
function saveState(state) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        // Dispatch event for other windows/tabs to sync
        window.dispatchEvent(new CustomEvent('tournamentStateChanged', { detail: state }));

        // Sync to WebSocket server for multi-device support
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({
                type: 'state-update',
                data: state
            }));
        }
    } catch (e) {
        console.error('Failed to save state:', e);
    }
}

// Update state with partial changes
function updateState(changes) {
    const state = getState();
    const newState = deepMerge(state, changes);
    saveState(newState);
    return newState;
}

// Deep merge helper
function deepMerge(target, source) {
    const output = { ...target };
    for (const key in source) {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
            output[key] = deepMerge(target[key] || {}, source[key]);
        } else {
            output[key] = source[key];
        }
    }
    return output;
}

// Reset tournament
function resetTournament() {
    const defaultState = getDefaultState();
    saveState(defaultState);
    return defaultState;
}

// Start tournament
function startTournament() {
    return updateState({
        tournamentStarted: true,
        currentScreen: 'hub',
        currentGame: 1,
        games: {
            1: { unlocked: true, completed: false, currentMatch: 0 },
            2: { unlocked: false, completed: false, currentMatch: 0 },
            3: { unlocked: false, completed: false, currentMatch: 0 },
            4: { unlocked: false, completed: false, currentMatch: 0 }
        }
    });
}

// Check if a player has already participated (always returns false - players can play multiple times)
function hasPlayerPlayed(playerId) {
    return false;
}

// Get available players for a combined team (returns all members - players can play multiple times)
function getAvailablePlayers(combinedTeamId) {
    const combinedTeam = COMBINED_TEAMS[combinedTeamId];
    return combinedTeam.members;
}

// Mark players as played (no-op - players can play multiple times, kept for backwards compatibility)
function markPlayersAsPlayed(playerIds) {
    const state = getState();
    return state;
}

// Set matchups for a game (after shuffle)
function setMatchups(gameNumber, matchups) {
    const state = getState();
    const newMatchups = { ...state.matchups };
    newMatchups[gameNumber] = matchups;
    return updateState({ matchups: newMatchups });
}

// Generate random matchups for a game
function generateMatchups(gameNumber) {
    const state = getState();
    let availableTeams = [];

    if (gameNumber === 1) {
        // All 8 combined teams
        availableTeams = [1, 2, 3, 4, 5, 6, 7, 8];
    } else if (gameNumber === 2) {
        // Winners from game 1
        availableTeams = [...state.bracket.game1Winners];
    } else if (gameNumber === 3) {
        // Winners from game 2
        availableTeams = [...state.bracket.game2Winners];
    } else if (gameNumber === 4) {
        // Final: split the game 3 winner into original teams
        // This is handled differently - returns original team IDs
        const finalist = state.bracket.game3Winner;
        if (finalist) {
            const combinedTeam = COMBINED_TEAMS[finalist];
            return [{ red: combinedTeam.originalTeams[0], blue: combinedTeam.originalTeams[1], isOriginalTeams: true }];
        }
        return [];
    }

    // Shuffle teams
    const shuffled = shuffleArray([...availableTeams]);

    // Create matchups
    const matchups = [];
    for (let i = 0; i < shuffled.length; i += 2) {
        matchups.push({ red: shuffled[i], blue: shuffled[i + 1] });
    }

    return matchups;
}

// Shuffle array helper
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Start setting up a match
function startMatchSetup(gameNumber, matchIndex) {
    const state = getState();
    const matchup = state.matchups[gameNumber][matchIndex];

    return updateState({
        currentScreen: 'selection',
        currentMatchSetup: {
            game: gameNumber,
            matchIndex: matchIndex,
            redTeam: matchup.red,
            blueTeam: matchup.blue,
            redPlayers: [],
            bluePlayers: [],
            selectionPhase: 'red',
            isOriginalTeams: matchup.isOriginalTeams || false
        }
    });
}

// Select a player for current match
function selectPlayer(playerId) {
    const state = getState();
    const setup = state.currentMatchSetup;
    const gameConfig = GAME_CONFIG[setup.game];
    const requiredPlayers = gameConfig.playersPerTeam;

    if (setup.selectionPhase === 'red') {
        if (setup.redPlayers.includes(playerId)) {
            // Deselect
            const newRedPlayers = setup.redPlayers.filter(id => id !== playerId);
            return updateState({
                currentMatchSetup: { ...setup, redPlayers: newRedPlayers }
            });
        } else if (setup.redPlayers.length < requiredPlayers) {
            // Select
            const newRedPlayers = [...setup.redPlayers, playerId];
            return updateState({
                currentMatchSetup: { ...setup, redPlayers: newRedPlayers }
            });
        }
    } else if (setup.selectionPhase === 'blue') {
        if (setup.bluePlayers.includes(playerId)) {
            // Deselect
            const newBluePlayers = setup.bluePlayers.filter(id => id !== playerId);
            return updateState({
                currentMatchSetup: { ...setup, bluePlayers: newBluePlayers }
            });
        } else if (setup.bluePlayers.length < requiredPlayers) {
            // Select
            const newBluePlayers = [...setup.bluePlayers, playerId];
            return updateState({
                currentMatchSetup: { ...setup, bluePlayers: newBluePlayers }
            });
        }
    }

    return state;
}

// Confirm red team selection, move to blue
function confirmRedSelection() {
    const state = getState();
    return updateState({
        currentMatchSetup: { ...state.currentMatchSetup, selectionPhase: 'blue' }
    });
}

// Confirm blue team selection, ready for match
function confirmBlueSelection() {
    const state = getState();
    return updateState({
        currentScreen: 'preview',
        currentMatchSetup: { ...state.currentMatchSetup, selectionPhase: 'ready' }
    });
}

// Record match result
function recordMatchResult(winner) {
    const state = getState();
    const setup = state.currentMatchSetup;
    const gameNumber = setup.game;

    // Create result record
    const result = {
        red: setup.redTeam,
        blue: setup.blueTeam,
        redPlayers: [...setup.redPlayers],
        bluePlayers: [...setup.bluePlayers],
        winner: winner,
        winnerTeam: winner === 'red' ? setup.redTeam : setup.blueTeam,
        isOriginalTeams: setup.isOriginalTeams
    };

    // Add to results - Check if this match already exists (re-play or correction)
    const newResults = { ...state.results };
    const existingIndex = newResults[gameNumber].findIndex(r => 
        (r.red === result.red && r.blue === result.blue) || 
        (r.red === result.blue && r.blue === result.red)
    );

    if (existingIndex !== -1) {
        // Update existing result
        newResults[gameNumber][existingIndex] = result;
    } else {
        // Add new result
        newResults[gameNumber] = [...newResults[gameNumber], result];
    }

    // Mark players as played (no longer enforced - players can play multiple times)
    const allPlayers = [...setup.redPlayers, ...setup.bluePlayers];
    const newPlayedPlayers = state.playedPlayers; // Keep existing list without adding new players

    // Update bracket
    const newBracket = { ...state.bracket };
    const winnerTeam = winner === 'red' ? setup.redTeam : setup.blueTeam;

    if (gameNumber === 1) {
        if (!newBracket.game1Winners.includes(winnerTeam)) {
             newBracket.game1Winners = [...newBracket.game1Winners, winnerTeam];
        }
    } else if (gameNumber === 2) {
        if (!newBracket.game2Winners.includes(winnerTeam)) {
            newBracket.game2Winners = [...newBracket.game2Winners, winnerTeam];
        }
    } else if (gameNumber === 3) {
        newBracket.game3Winner = winnerTeam;
        newBracket.finalist = winnerTeam;
    } else if (gameNumber === 4) {
        newBracket.champions = winnerTeam; // This is an original team ID
    }

    // Check if game is complete
    const matchesRequired = GAME_CONFIG[gameNumber].matches;
    const matchesCompleted = newResults[gameNumber].length;
    const gameCompleted = matchesCompleted >= matchesRequired;

    // Update game state
    const newGames = { ...state.games };
    newGames[gameNumber].currentMatch = matchesCompleted;
    newGames[gameNumber].completed = gameCompleted;

    // Unlock next game if current is complete
    if (gameCompleted && gameNumber < 4) {
        newGames[gameNumber + 1].unlocked = true;
    }

    // Determine next screen
    let nextScreen = 'hub';
    if (gameNumber === 4 && gameCompleted) {
        nextScreen = 'celebration';
    }

    return updateState({
        results: newResults,
        playedPlayers: newPlayedPlayers,
        bracket: newBracket,
        games: newGames,
        currentScreen: nextScreen,
        currentMatchSetup: getDefaultState().currentMatchSetup
    });
}

// Get teams still in tournament for a game
function getActiveTeams(gameNumber) {
    const state = getState();

    if (gameNumber === 1) {
        return [1, 2, 3, 4, 5, 6, 7, 8];
    } else if (gameNumber === 2) {
        return state.bracket.game1Winners;
    } else if (gameNumber === 3) {
        return state.bracket.game2Winners;
    } else if (gameNumber === 4) {
        const finalist = state.bracket.game3Winner;
        if (finalist) {
            return COMBINED_TEAMS[finalist].originalTeams;
        }
    }
    return [];
}

// Listen for state changes from other tabs
window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) {
        window.dispatchEvent(new CustomEvent('tournamentStateChanged', {
            detail: JSON.parse(e.newValue)
        }));
    }
});

// Export functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getState, saveState, updateState, resetTournament, startTournament,
        hasPlayerPlayed, getAvailablePlayers, markPlayersAsPlayed,
        setMatchups, generateMatchups, shuffleArray,
        startMatchSetup, selectPlayer, confirmRedSelection, confirmBlueSelection,
        recordMatchResult, getActiveTeams
    };
}