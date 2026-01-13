# Role-Based Game Engine Architecture

## Overview
The game has been redesigned with a role-based type system and centralized game engine for better maintainability and type safety.

## Type System (`src/types/game.ts`)

### Team Types
Roles are grouped by teams:
- **"civilian"**: Civilian role (majority team)
- **"undercover"**: Undercover role (enemy team)
- **"solo"**: Mr. White and Fool (independent roles with unique win conditions)
- **"spectator"**: Non-playing observers

### Role Interfaces
Each role now has its own interface extending `RoleBase`:

- **CivilianRole**: Gets majority word, wins by eliminating enemies, 2 points, team: "civilian"
- **UndercoverRole**: Gets undercover word, wins by outnumbering civilians, 10 points, team: "undercover"
- **MrWhiteRole**: No word, wins by guessing civilian word when eliminated, 6 points, team: "solo"
- **FoolRole**: No word, wins if voted out, 15 points, auto-eliminates after N deaths, team: "solo"
- **TraitorRole**: Civilian word initially, transforms to undercover after N rounds, 12 points, team: "civilian" → "undercover"

### Role Configuration Factory
```typescript
RoleConfig.civilian()    // Returns CivilianRole config
RoleConfig.undercover()  // Returns UndercoverRole config
RoleConfig.mrwhite()     // Returns MrWhiteRole config
RoleConfig.fool(playerCount) // Returns FoolRole config with dynamic threshold
RoleConfig.traitor(playerCount) // Returns TraitorRole config with dynamic threshold
```

### Player Type
Each player now has:
- `role?: PlayerRole` - Role identifier string
- `roleConfig?: Role` - Full role configuration with behavior

## Game Engine (`src/lib/gameEngine.ts`)

Centralized game logic handler with static methods:

### Core Methods

#### `assignRoleConfigs(players, playerCount): Player[]`
Assigns role configurations to players based on their role string.

#### `assignWords(players, majorityWord, undercoverWord): Player[]`
Assigns words to players based on their role configuration:
- Civilians get majority word
- Undercover gets undercover word
- Traitor gets majority word (or undercover word if transformed)
- Mr. White and Fool get empty word

#### `checkWinCondition(players): string | null`
Checks all win conditions:
- **Fool**: Wins immediately when voted out (not auto-eliminated)
- **Civilian**: All enemies eliminated (undercover + Mr. White = 0) AND no solo roles left
- **Enemy**: Enemies >= civilians AND no solo roles left (undercover/Mr. White/infiltrators win)
- **Key Rule**: Game continues as long as ANY solo role is alive (they can change the outcome)

Solo roles keep the game running because:
- Fool can still win by getting voted out
- Mr. White can still win by guessing the word when eliminated
- Their presence creates uncertainty and additional gameplay

#### `calculateScores(players, winner): Player[]`
Calculates and assigns scores based on role's `scoreOnWin` property.
- Solo roles (Mr. White, Fool) only score when their specific win condition is met
- Team roles (civilian, undercover) score when their team wins
- Special case: Mr. White can score with "infiltrators" win

#### `checkAutoElimination(players, deathCount): Player[]`
Handles Fool's auto-elimination mechanic after N deaths.

### Utility Methods

#### `getRoleDisplayName(role): string`
Returns localized role name for UI.

#### `getRoleColor(role): string`
Returns CSS color class for role.

#### `canGuessWord(player): boolean`
Checks if player (Mr. White) can guess word.

## Benefits

### 1. **Type Safety**
- Each role has defined properties and behavior
- TypeScript ensures correct usage throughout codebase

### 2. **Single Source of Truth**
- Role behaviors defined once in RoleConfig
- Game logic centralized in GameEngine
- Easy to modify role properties (scores, mechanics)

### 3. **Maintainability**
- Adding new roles: Create role interface + add to RoleConfig
- Modifying mechanics: Update GameEngine methods
- All game logic in one place instead of scattered

### 4. **Testability**
- GameEngine methods are pure functions
- Easy to unit test each behavior
- No need to mock React context

### 5. **Scalability**
- Easy to add new roles with unique mechanics
- Role-specific methods can be added to GameEngine
- Clear separation of concerns

## Usage Examples

### Assigning Roles
```typescript
// In GameContext
const playersWithConfigs = GameEngine.assignRoleConfigs(playersWithRoles, playerCount);
```

### Assigning Words
```typescript
const updatedPlayers = GameEngine.assignWords(players, majorityWord, undercoverWord);
```

### Checking Win Conditions
```typescript
const winner = GameEngine.checkWinCondition(players);
if (winner) {
  // Game ends
}
```

### Auto-Elimination
```typescript
const updatedPlayers = GameEngine.checkAutoElimination(players, deathCount);
```

### Traitor Transformation
```typescript
// In GameContext, at the start of each round (except first)
const playersAfterTransformation = GameEngine.checkTraitorTransformation(
  players,
  currentRound,
  majorityWord,
  undercoverWord
);
```

## Future Enhancements

### Easy to Add:
1. **New Roles**: Create interface, add to RoleConfig, update GameEngine
2. **Role Abilities**: Add ability methods to GameEngine
3. **Dynamic Score Multipliers**: Modify calculateScores
4. **Custom Win Conditions**: Extend checkWinCondition
5. **Role-Specific Events**: Add event handlers to GameEngine

### Example: Adding "Detective" Role
```typescript
export interface DetectiveRole extends RoleBase {
  type: "detective";
  team: "civilian";
  getsWord: true;
  winCondition: "eliminateEnemies";
  scoreOnWin: 5;
  wordType: "majority";
  canInvestigate: true; // Special ability
  investigationsLeft: number;
}

// Add to RoleConfig
detective: (): DetectiveRole => ({
  type: "detective",
  team: "civilian",
  getsWord: true,
  winCondition: "eliminateEnemies",
  scoreOnWin: 5,
  wordType: "majority",
  canInvestigate: true,
  investigationsLeft: 2
})

// Add to GameEngine
static canInvestigate(player: Player): boolean {
  return player.roleConfig?.type === "detective" && 
         player.roleConfig.canInvestigate === true &&
         player.roleConfig.investigationsLeft > 0;
}
```

## Migration Notes

### What Changed:
1. `checkGameEnd` → `GameEngine.checkWinCondition`
2. Manual role checks → Role configuration properties
3. Hardcoded scores → `roleConfig.scoreOnWin`
4. Inline word assignment → `GameEngine.assignWords`
5. Manual fool threshold → `roleConfig.autoEliminationThreshold`

### Backwards Compatible:
- Player still has `role` string for compatibility
- All existing role checks still work
- UI components minimally affected
