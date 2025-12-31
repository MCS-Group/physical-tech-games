// PHYSICAL: TECH Tournament - Player Data
// Simplified for 9 players using shijka_px sprites

const PLAYERS = {
    1: { id: 1, name: "Buyandelger Sh", team: 1, sprite: "../shijka_px/Buyandelger_Sh-removebg-preview.png" },
    2: { id: 2, name: "Buyanjargal", team: 1, sprite: "../shijka_px/Buyanjargal-removebg-preview.png" },
    3: { id: 3, name: "Buyndelger T", team: 1, sprite: "../shijka_px/Buyndelger_T-removebg-preview.png" },
    4: { id: 4, name: "Mend-Amar", team: 1, sprite: "../shijka_px/Mend-Amar-removebg-preview.png" },
    5: { id: 5, name: "Sainbayar", team: 1, sprite: "../shijka_px/Sainbayar-removebg-preview.png" },
    6: { id: 6, name: "Shiijirbum", team: 1, sprite: "../shijka_px/Shiijirbum-removebg-preview.png" },
    7: { id: 7, name: "Shinesaran", team: 1, sprite: "../shijka_px/Shinesaran-removebg-preview.png" },
    8: { id: 8, name: "Telmen", team: 1, sprite: "../shijka_px/Telmen-removebg-preview.png" },
    9: { id: 9, name: "Tengis", team: 1, sprite: "../shijka_px/Tengis-removebg-preview.png" }
};
// Simplified teams - all teams have the same 9 members
const TEAMS = {
    1: { id: 1, name: "Ширээ 1", company: "Shijka", members: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
    2: { id: 2, name: "Ширээ 2", company: "Shijka", members: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
    3: { id: 3, name: "Ширээ 3", company: "Shijka", members: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
    4: { id: 4, name: "Ширээ 4", company: "Shijka", members: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
    5: { id: 5, name: "Ширээ 5", company: "Shijka", members: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
    6: { id: 6, name: "Ширээ 6", company: "Shijka", members: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
    7: { id: 7, name: "Ширээ 7", company: "Shijka", members: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
    8: { id: 8, name: "Ширээ 8", company: "Shijka", members: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
    9: { id: 9, name: "Ширээ 9", company: "Shijka", members: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
    10: { id: 10, name: "Ширээ 10", company: "Shijka", members: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
    11: { id: 11, name: "Ширээ 11", company: "Shijka", members: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
    12: { id: 12, name: "Ширээ 12", company: "Shijka", members: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
    13: { id: 13, name: "Ширээ 13", company: "Shijka", members: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
    14: { id: 14, name: "Ширээ 14", company: "Shijka", members: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
    15: { id: 15, name: "Ширээ 15", company: "Shijka", members: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
    16: { id: 16, name: "Ширээ 16", company: "Shijka", members: [1, 2, 3, 4, 5, 6, 7, 8, 9] }
};

// Combined teams for tournament - simplified to use all 9 members
const COMBINED_TEAMS = {
    1: { id: 1, name: "Ширээ 1&2", originalTeams: [1, 2], members: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
    2: { id: 2, name: "Ширээ 10&9", originalTeams: [10, 9], members: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
    3: { id: 3, name: "Ширээ 5&4", originalTeams: [5, 4], members: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
    4: { id: 4, name: "Ширээ 7&8", originalTeams: [7, 8], members: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
    5: { id: 5, name: "Ширээ 12&11", originalTeams: [12, 11], members: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
    6: { id: 6, name: "Ширээ 6&3", originalTeams: [6, 3], members: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
    7: { id: 7, name: "Ширээ 16&15", originalTeams: [16, 15], members: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
    8: { id: 8, name: "Ширээ 14&13", originalTeams: [14, 13], members: [1, 2, 3, 4, 5, 6, 7, 8, 9] }
};

// Game configuration (unchanged)
const GAME_CONFIG = {
    1: {
        name: "Game 1: Wall Pushing Match",
        playersPerTeam: 3,
        matches: 4,
        icon: "🏋️",
        color: "#ff6b35",
        screenshot: "assets/screenshots/game1-wall.png",
        description: "Push with all your might! Teams press against a digital wall. The team that pushes hardest wins. Strength and teamwork are key!",
        controls: {
            red: [
                { player: 1, keys: ['Q', 'A'] },
                { player: 2, keys: ['W', 'S'] },
                { player: 3, keys: ['E', 'D'] }
            ],
            blue: [
                { player: 1, keys: ['U', 'J'] },
                { player: 2, keys: ['I', 'K'] },
                { player: 3, keys: ['O', 'L'] }
            ]
        }
    },
    2: {
        name: "Game 2 : Hanging Endurance",
        playersPerTeam: 4,
        matches: 2,
        icon: "💪",
        color: "#4ecdc4",
        screenshot: "assets/screenshots/game2-hanging.png",
        description: "Hang on tight! Players grip the bar as long as they can. Last one hanging wins. Pure endurance and willpower!",
        rounds: 3,
        controls: {
            red: [
                { player: 1, keys: ['W'] },
                { player: 2, keys: ['A'] },
                { player: 3, keys: ['S'] },
                { player: 4, keys: ['D'] }
            ],
            blue: [
                { player: 1, keys: ['I'] },
                { player: 2, keys: ['J'] },
                { player: 3, keys: ['K'] },
                { player: 4, keys: ['L'] }
            ]
        }
    },
    3: {
        name: "Game 3 : Iron ball Drag",
        playersPerTeam: 3,
        matches: 1,
        icon: "⚔️",
        color: "#ffe66d",
        screenshot: "assets/screenshots/game3-iron.png",
        description: "One warrior. One iron ball. Drag it across the finish line. The fastest time claims victory. Ultimate test of strength!",
        controls: {
            red: [
                { player: 1, keys: ['Q', 'A'] },
                { player: 2, keys: ['W', 'S'] },
                { player: 3, keys: ['E', 'D'] }
            ],
            blue: [
                { player: 1, keys: ['U', 'J'] },
                { player: 2, keys: ['I', 'K'] },
                { player: 3, keys: ['O', 'L'] }
            ]
        }
    },
    4: {
        name: "Game 4 : Castle Conquest",
        playersPerTeam: 4,
        matches: 1,
        icon: "🏰",
        color: "#ff2d55",
        isFinal: true,
        screenshot: "assets/screenshots/game4-castle.png",
        description: "The final battle! Attack enemy castles while defending yours. Friends become enemies. Only one team survives!",
        controls: {
            red: [
                { player: 1, keys: ['W'], direction: 'up' },
                { player: 2, keys: ['A'], direction: 'left' },
                { player: 3, keys: ['S'], direction: 'down' },
                { player: 4, keys: ['D'], direction: 'right' }
            ],
            blue: [
                { player: 1, keys: ['I'], direction: 'up' },
                { player: 2, keys: ['J'], direction: 'left' },
                { player: 3, keys: ['K'], direction: 'down' },
                { player: 4, keys: ['L'], direction: 'right' }
            ]
        },
        unlockKeys: {
            red: ['W', 'A', 'S', 'D'],
            blue: ['I', 'J', 'K', 'L']
        }
    }
};
// Helper functions5 
function getPlayer(id) {
    return PLAYERS[id];
}

function getTeam(id) {
    return TEAMS[id];
}
function getCombinedTeam(id) {
    return COMBINED_TEAMS[id];
}

function getTeamMembers(teamId) {
    return TEAMS[teamId].members.map(id => PLAYERS[id]);
}

function getCombinedTeamMembers(combinedTeamId) {
    return COMBINED_TEAMS[combinedTeamId].members.map(id => PLAYERS[id]);
}

function getPlayerSpritePath(playerId) {
    const player = PLAYERS[playerId];
    return player ? player.sprite : 'no-picture';
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PLAYERS, TEAMS, COMBINED_TEAMS, GAME_CONFIG, getPlayer, getTeam, getCombinedTeam, getTeamMembers, getCombinedTeamMembers, getPlayerSpritePath };
}
