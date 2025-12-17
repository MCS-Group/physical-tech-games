# PHYSICAL: TECH Tournament - Implementation Plan

## Overview
A local HTML-based tournament system for a company party featuring 144 employees competing in 4 physical games using oversized USB keyboards.

---

## Tournament Structure

```
144 People → 16 Teams (9 each) → 8 Combined Teams (18 each)
                    ↓
              GAME 1: Wall Push (8→4 teams, 6 players each)
                    ↓
              GAME 2: Hanging Endurance (4→2 teams, 2 players each)
                    ↓
              GAME 3: Iron Ball Tug (2→1 team, 3 players each)
                    ↓
              GAME 4: Castle Conquest FINALE (9 vs 9)
                    ↓
              9 CHAMPIONS with celebration!
```

### Player Participation Rule
- **Once a player participates in a game, they CANNOT play in subsequent games**
- Game 1: 6 players → 12 remaining
- Game 2: 2 players → 10 remaining
- Game 3: 3 players → 7 remaining... wait, this doesn't add up!

### Corrected Player Math (per combined team of 18):
| Game | Players Needed | Remaining After |
|------|---------------|-----------------|
| Game 1 | 6 | 12 |
| Game 2 | 2 | 10 |
| Game 3 | 1 | 9 |
| Game 4 | 9 | 0 (FINALE) |

---

## File Structure

```
physical-tech-games/
├── index.html                    ← NEW: Main hub/start screen
├── game-flow.html                ← NEW: Unified game flow controller
├── celebration.html              ← NEW: Final victory screen
├── players.csv                   ← Player data (144 employees)
├── players.js                    ← NEW: Player data as JS module
├── game-state.js                 ← NEW: Shared state management
├── assets/
│   └── sprites/                  ← Player pixel art (144 images)
│       ├── batbold.png
│       ├── dolgorsuren.png
│       └── ... (144 files)
├── physical-tech-wall-push-v2.html      ← Game 1 (modify)
├── physical-tech-hanging-endurance.html ← Game 2 (modify)
├── iron-ball-tug.html                   ← Game 3 (modify)
├── castle-conquest-v3-3d.html           ← Game 4 (modify)
├── scoreboard.html                      ← Admin scoreboard
├── scoreboard-display.html              ← NEW: Projection view
└── PLAN.md                              ← This file
```

---

## Screen Flow

### 1. Start Screen (`index.html`)
```
┌────────────────────────────────────────┐
│                                        │
│         PHYSICAL: TECH                 │
│         Tournament 2024                │
│                                        │
│        [ START TOURNAMENT ]            │
│                                        │
└────────────────────────────────────────┘
```

### 2. Game Hub (after clicking START)
```
┌────────────────────────────────────────┐
│  PHYSICAL: TECH - TOURNAMENT HUB       │
├────────────────────────────────────────┤
│                                        │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  │
│  │GAME 1│ │GAME 2│ │GAME 3│ │GAME 4│  │
│  │ 🔓   │ │ 🔒   │ │ 🔒   │ │ 🔒   │  │
│  │WALL  │ │HANG  │ │TUG   │ │MAZE  │  │
│  │PUSH  │ │      │ │      │ │      │  │
│  └──────┘ └──────┘ └──────┘ └──────┘  │
│                                        │
│         [ VIEW SCOREBOARD ]            │
└────────────────────────────────────────┘
```

### 3. Game Intro Screen (per game)
```
┌────────────────────────────────────────┐
│                                        │
│         🏋️ GAME 1: WALL PUSH           │
│                                        │
│    "Push the blocks to your side!"    │
│                                        │
│    Players per team: 6                 │
│    Matches: 4                          │
│                                        │
│           [ START GAME ]               │
│                                        │
└────────────────────────────────────────┘
```

### 4. Team Matchup Screen (with shuffle)
```
┌────────────────────────────────────────┐
│        ⚔️ GAME 1 MATCHUPS              │
├────────────────────────────────────────┤
│                                        │
│   MATCH 1: C1 vs C2                    │
│   MATCH 2: C3 vs C4                    │
│   MATCH 3: C5 vs C6                    │
│   MATCH 4: C7 vs C8                    │
│                                        │
│   [ 🎲 SHUFFLE ]    [ ✓ CONFIRM ]      │
│                                        │
└────────────────────────────────────────┘
```

### 5. Player Selection Screen (Arcade Style!)
```
┌────────────────────────────────────────────────────────┐
│  🔴 SELECT RED TEAM FIGHTERS (C1: Team 1 + Team 2)     │
│                "Choose 6 warriors!"                     │
├────────────────────────────────────────────────────────┤
│  TEAM 1                          TEAM 2                │
│  ┌─────┐┌─────┐┌─────┐          ┌─────┐┌─────┐┌─────┐ │
│  │[IMG]││[IMG]││[IMG]│          │[IMG]││░░░░░││[IMG]│ │
│  │김철수││이영희││박민수│          │최유리││LOCKED││정호진│ │
│  │  ✓  ││     ││  ✓  │          │     ││     ││  ✓  │ │
│  └─────┘└─────┘└─────┘          └─────┘└─────┘└─────┘ │
│  ┌─────┐┌─────┐┌─────┐          ┌─────┐┌─────┐┌─────┐ │
│  │[IMG]││[IMG]││[IMG]│          │[IMG]││[IMG]││[IMG]│ │
│  │...  ││...  ││...  │          │...  ││...  ││...  │ │
│  └─────┘└─────┘└─────┘          └─────┘└─────┘└─────┘ │
│                                                        │
│  Selected: 3/6                  [ READY → ]            │
└────────────────────────────────────────────────────────┘
```

### 6. Match Preview Screen
```
┌────────────────────────────────────────────────────────┐
│                  ⚔️ MATCH 1 READY!                     │
├────────────────────────────────────────────────────────┤
│                                                        │
│   🔴 TEAM RED (C1)          🔵 TEAM BLUE (C2)         │
│                                                        │
│   [sprite] [sprite]    VS    [sprite] [sprite]        │
│   [sprite] [sprite]          [sprite] [sprite]        │
│   [sprite] [sprite]          [sprite] [sprite]        │
│                                                        │
│              [ ▶ BEGIN MATCH ]                        │
│                                                        │
└────────────────────────────────────────────────────────┘
```

### 7. Actual Game
- Opens the respective game HTML
- Player sprites displayed in game
- Winner recorded, return to flow

### 8. Post-Match / Next Match
- Show winner announcement
- Continue to next match or next game

### 9. Final Celebration Screen
```
┌────────────────────────────────────────────────────────┐
│                                                        │
│              🏆 CHAMPIONS! 🏆                          │
│                                                        │
│              [Team Name]                               │
│                                                        │
│   [sprite] [sprite] [sprite] [sprite] [sprite]        │
│       [sprite] [sprite] [sprite] [sprite]             │
│                                                        │
│              🎊 CONFETTI ANIMATION 🎊                  │
│                                                        │
└────────────────────────────────────────────────────────┘
```

---

## Data Structures

### players.js
```javascript
const PLAYERS = {
  1: { id: 1, name: "B.Batbold", team: 1, department: "ML", company: "TechCorp", sprite: "batbold.png" },
  2: { id: 2, name: "D.Dolgorsuren", team: 1, department: "Eng", company: "TechCorp", sprite: "dolgorsuren.png" },
  // ... 144 players
};

const TEAMS = {
  1: { id: 1, name: "Team 1", members: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
  2: { id: 2, name: "Team 2", members: [10, 11, 12, 13, 14, 15, 16, 17, 18] },
  // ... 16 teams
};

const COMBINED_TEAMS = {
  1: { id: 1, name: "C1", originalTeams: [1, 2], members: [1-18] },
  // ... 8 combined teams
};
```

### game-state.js (localStorage)
```javascript
const gameState = {
  tournamentStarted: false,
  currentGame: 1,
  gamesCompleted: [false, false, false, false],

  // Track which players have participated
  playedPlayers: {
    game1: [], // player IDs who played in game 1
    game2: [],
    game3: [],
    game4: []
  },

  // Match results
  matches: {
    game1: [
      { red: "C1", blue: "C2", redPlayers: [1,2,3,4,5,6], bluePlayers: [...], winner: "C1" },
      // ... 4 matches
    ],
    game2: [...], // 2 matches
    game3: [...], // 1 match
    game4: [...], // 1 final match
  },

  // Tournament bracket progression
  bracket: {
    game1Winners: [], // 4 combined team IDs
    game2Winners: [], // 2 combined team IDs
    game3Winner: null, // 1 combined team ID
    champions: null,   // 1 original team ID (9 players)
  }
};
```

---

## Implementation Checklist

### Phase 1: Core Infrastructure
- [ ] Create `players.js` from CSV data
- [ ] Create `game-state.js` for state management
- [ ] Create `index.html` (start screen + hub)

### Phase 2: Game Flow
- [ ] Create game intro screen component
- [ ] Create team matchup screen with shuffle
- [ ] Create player selection screen (arcade style)
- [ ] Create match preview screen
- [ ] Create post-match result screen

### Phase 3: Modify Existing Games
- [ ] Modify `physical-tech-wall-push-v2.html` to accept player data
- [ ] Modify `physical-tech-hanging-endurance.html` to accept player data
- [ ] Modify `iron-ball-tug.html` to accept player data
- [ ] Modify `castle-conquest-v3-3d.html` to accept player data

### Phase 4: Display & Celebration
- [ ] Create `scoreboard-display.html` (projection view)
- [ ] Create `celebration.html` (final victory screen)
- [ ] Add confetti and victory animations

### Phase 5: Polish
- [ ] Add sound effects for selection
- [ ] Add transition animations between screens
- [ ] Test full tournament flow
- [ ] Handle edge cases (refresh, back button, etc.)

---

## Key Implementation Notes

### Passing Player Data to Games
Use URL parameters + localStorage:
```javascript
// When launching game
localStorage.setItem('currentMatch', JSON.stringify({
  game: 1,
  matchNumber: 1,
  redTeam: { id: 'C1', players: [1,2,3,4,5,6] },
  blueTeam: { id: 'C2', players: [10,11,12,13,14,15,16] }
}));
window.location.href = 'physical-tech-wall-push-v2.html';

// In game, read and display sprites
const match = JSON.parse(localStorage.getItem('currentMatch'));
```

### Locking Players
```javascript
function isPlayerLocked(playerId) {
  const state = getGameState();
  return Object.values(state.playedPlayers).flat().includes(playerId);
}

function getAvailablePlayers(combinedTeamId) {
  const allMembers = COMBINED_TEAMS[combinedTeamId].members;
  return allMembers.filter(id => !isPlayerLocked(id));
}
```

### Sprite Display
```html
<!-- In games, replace emoji with -->
<img src="assets/sprites/batbold.png" class="player-sprite" alt="B.Batbold">
```

---

## Questions to Resolve
1. ✅ Player data format - CSV created
2. ⏳ Sprite images - User to provide
3. ❓ Team names - Use default or let admin edit?
4. ❓ Sound effects - Include arcade sounds?

---

## Timeline
1. **Phase 1**: Core infrastructure (index.html, state management)
2. **Phase 2**: Game flow screens (selection, matchup, preview)
3. **Phase 3**: Modify games to show sprites
4. **Phase 4**: Celebration + scoreboard display
5. **Phase 5**: Testing + polish

---

*Last Updated: December 2025*
