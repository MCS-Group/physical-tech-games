# PHYSICAL: TECH Tournament Scoreboard

## Overview

A tournament scoreboard application for a "Physical: Asia" inspired competition featuring 16 teams competing across 4 elimination rounds.

---

## Tournament Structure

### Initial Setup
- **Total Participants**: 144 people
- **Original Teams**: 16 teams × 9 members each
- **Pre-Tournament Merge**: Teams are combined into pairs BEFORE Game 1 begins
- **Combined Teams**: 8 teams × 18 members each (2 original teams merged)

### Team Pairing (Pre-Game 1)
| Combined Team | Original Teams | Total Members |
|---------------|----------------|---------------|
| C1 | Team 1 + Team 2 | 18 |
| C2 | Team 3 + Team 4 | 18 |
| C3 | Team 5 + Team 6 | 18 |
| C4 | Team 7 + Team 8 | 18 |
| C5 | Team 9 + Team 10 | 18 |
| C6 | Team 11 + Team 12 | 18 |
| C7 | Team 13 + Team 14 | 18 |
| C8 | Team 15 + Team 16 | 18 |

---

## Game Rounds

### Game 1: Wall Push
- **Competing Teams**: 8 combined teams
- **Number of Battles**: 4 matches
- **Result**: 8 teams → 4 winning teams
- **Elimination**: 4 teams eliminated (72 people)

### Game 2
- **Competing Teams**: 4 remaining teams
- **Number of Battles**: 2 matches
- **Result**: 4 teams → 2 winning teams
- **Elimination**: 2 teams eliminated (36 people)

### Game 3
- **Competing Teams**: 2 remaining teams
- **Number of Battles**: 1 match
- **Result**: 2 teams → 1 winning team
- **Elimination**: 1 team eliminated (18 people)

### Game 4: Final (9 vs 9)
- **Format**: The final 2 teams split into 9 vs 9 individual competition
- **Number of Battles**: 1 match
- **Competing Members**: 9 members from each finalist team
- **Result**: 1 winning team of 9 people crowned CHAMPIONS

---

## Tournament Flow Summary

```
ROUND          TEAMS    BATTLES    SURVIVORS    ELIMINATED
─────────────────────────────────────────────────────────────
Pre-Game       16 → 8   (merge)    144          0
Game 1         8 → 4    4          72           72
Game 2         4 → 2    2          36           36
Game 3         2 → 1    1          18           18
Game 4         9 vs 9   1          9            9
─────────────────────────────────────────────────────────────
TOTAL                   8 battles  9 CHAMPIONS  135
```

---

## Scoreboard Features

### Visual Elements
- **Team Cards**: Display all 8 combined teams with member emojis
- **Status Indicators**: ACTIVE (green) / ELIMINATED (red)
- **Scoreboard Table**: Shows results for all 4 games
- **Cell States**:
  - ⚪ Empty: Team hasn't played this game yet
  - ✅ Green: Team won this game
  - ❌ Red: Team lost this game
  - — Gray: Team not eligible (eliminated in previous round)

### Control Panel
- **Match Control**: Select Team A vs Team B for current match
- **Winner Buttons**: Declare Team A or Team B as winner
- **Match Counter**: Shows current match progress (e.g., "Match 2 of 4")

### Quick Actions
- **Next Round**: Advance to next game (requires all matches complete)
- **Edit Team Names**: Customize combined team names
- **Export Results**: Download tournament results as text file
- **Reset Tournament**: Clear all progress and start fresh

### Additional Features
- **Tournament Bracket**: Visual bracket showing progression
- **Match History**: Log of all completed matches with timestamps
- **Auto-Save**: Tournament state saved to browser localStorage
- **Champion Celebration**: Confetti animation and sound for final winner

---

## Operator Instructions

### Running a Match

1. **Select the current Game** (1-4) from the round tabs
2. **Choose Team A** from the dropdown (or click team card)
3. **Choose Team B** from the dropdown (or click team card)
4. **Play the physical game** on a separate device/setup
5. **Click winner button** ("Team A Wins" or "Team B Wins")
6. **Repeat** for all matches in the current round
7. **Click "Next Round"** to advance

### Round Completion Requirements

| Round | Required Matches |
|-------|------------------|
| Game 1 | 4 matches |
| Game 2 | 2 matches |
| Game 3 | 1 match |
| Game 4 | 1 match |

### Tips
- Cannot advance to next round until all matches are complete
- Cannot select eliminated teams
- Team cards show real-time status updates
- Use "Edit Team Names" to customize for your event
- Export results before resetting for record keeping

---

## Technical Notes

- **Single HTML File**: No server required, runs entirely in browser
- **Local Storage**: State persists across browser sessions
- **Responsive Design**: Works on laptop, tablet, and large displays
- **Fonts Used**: Black Ops One, Orbitron, Press Start 2P (Google Fonts)
- **Color Scheme**: Dark theme with red/blue team colors, gold accents

---

*Tournament Scoreboard v1.0*
