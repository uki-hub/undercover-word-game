export type PlayerRole = "civilian" | "undercover" | "mrwhite" | "fool" | "traitor" | "detective" | "saboteur" | "spectator";

export type RoleDistribution = {
  undercovers: number;
  mrWhites: number;
  fool: number;
  traitor: number;
  detective: number;
  saboteur: number;
};

// Role-based type system
export type Team = "civilian" | "undercover" | "solo" | "spectator";

export interface RoleBase {
  type: PlayerRole;
  team: Team;
  getsWord: boolean; // Does this role receive a word?
  winCondition: "eliminateEnemies" | "votedOut" | "outnumberCivilians" | "guessCivilianWord";
  scoreOnWin: number;
  maxActionUsageCount?: number; // How many times can this role use their action (0 = no action)
}

export interface CivilianRole extends RoleBase {
  type: "civilian";
  team: "civilian";
  getsWord: true;
  winCondition: "eliminateEnemies";
  scoreOnWin: 2;
  wordType: "majority"; // Gets the majority word
}

export interface UndercoverRole extends RoleBase {
  type: "undercover";
  team: "undercover";
  getsWord: true;
  winCondition: "outnumberCivilians";
  scoreOnWin: 10;
  wordType: "undercover"; // Gets the undercover word
}

export interface MrWhiteRole extends RoleBase {
  type: "mrwhite";
  team: "solo";
  getsWord: false; // Mr. White doesn't get a word
  winCondition: "guessCivilianWord";
  scoreOnWin: 6;
  canGuessWord: true; // Can guess the word when eliminated
}

export interface FoolRole extends RoleBase {
  type: "fool";
  team: "solo";
  getsWord: false; // Fool doesn't get a word (or gets empty)
  winCondition: "votedOut";
  scoreOnWin: 15;
  autoEliminationThreshold: number; // Auto-eliminate after N deaths
}

export interface TraitorRole extends RoleBase {
  type: "traitor";
  team: "civilian"; // Starts as civilian
  getsWord: true; // Gets civilian word initially
  winCondition: "eliminateEnemies"; // Same as civilian until transformation
  scoreOnWin: 12; // Bonus for staying hidden
  transformationThreshold: number; // Transform to undercover after N rounds
  currentTeam: "civilian" | "undercover"; // Tracks current team state
  currentWordType: "majority" | "undercover"; // Tracks current word type
}

export interface DetectiveRole extends RoleBase {
  type: "detective";
  team: "civilian";
  getsWord: true;
  winCondition: "eliminateEnemies";
  scoreOnWin: 5; // Bonus for gathering information
  wordType: "majority"; // Gets the majority word
  maxActionUsageCount: 99; // Can scan once per game
}

export interface SaboteurRole extends RoleBase {
  type: "saboteur";
  team: "undercover";
  getsWord: true;
  winCondition: "outnumberCivilians";
  scoreOnWin: 8; // Bonus for disruption
  wordType: "undercover"; // Gets the undercover word
  maxActionUsageCount: 1; // Can silence once per game
}

export type Role = CivilianRole | UndercoverRole | MrWhiteRole | FoolRole | TraitorRole | DetectiveRole | SaboteurRole;

// Role configuration factory
export const RoleConfig = {
  civilian: (): CivilianRole => ({
    type: "civilian",
    team: "civilian",
    getsWord: true,
    winCondition: "eliminateEnemies",
    scoreOnWin: 2,
    wordType: "majority"
  }),
  
  undercover: (): UndercoverRole => ({
    type: "undercover",
    team: "undercover",
    getsWord: true,
    winCondition: "outnumberCivilians",
    scoreOnWin: 10,
    wordType: "undercover"
  }),
  
  mrwhite: (): MrWhiteRole => ({
    type: "mrwhite",
    team: "solo",
    getsWord: false,
    winCondition: "guessCivilianWord",
    scoreOnWin: 6,
    canGuessWord: true
  }),
  
  fool: (playerCount: number): FoolRole => ({
    type: "fool",
    team: "solo",
    getsWord: false,
    winCondition: "votedOut",
    scoreOnWin: 15,
    autoEliminationThreshold: playerCount <= 6 ? 2 : 3
  }),
  
  traitor: (playerCount: number): TraitorRole => ({
    type: "traitor",
    team: "civilian",
    getsWord: true,
    winCondition: "eliminateEnemies",
    scoreOnWin: 12,
    transformationThreshold: playerCount <= 6 ? 2 : 3,
    currentTeam: "civilian",
    currentWordType: "majority"
  }),

  detective: (): DetectiveRole => ({
    type: "detective",
    team: "civilian",
    getsWord: true,
    winCondition: "eliminateEnemies",
    scoreOnWin: 5,
    wordType: "majority",
    maxActionUsageCount: 99
  }),

  saboteur: (): SaboteurRole => ({
    type: "saboteur",
    team: "undercover",
    getsWord: true,
    winCondition: "outnumberCivilians",
    scoreOnWin: 8,
    wordType: "undercover",
    maxActionUsageCount: 1
  })
};

export type Player = {
  id: string;
  name: string;
  word?: string;
  role?: PlayerRole;
  roleConfig?: Role; // Role configuration with behavior
  isEliminated?: boolean;
  score?: number;
  submittedDescriptions?: string[];
  deathsToTrigger?: number;
  eliminationReason?: "voted" | "auto"; // Track if eliminated by vote or auto-elimination
  traitorTransformationRound?: number; // Track when traitor transforms to undercover
  originalRole?: PlayerRole; // Track original role before transformation (for traitor scoring)
  actionUseCounter?: number; // Track how many times this player has used their action
};

export type GamePhase = "setup" | "action" | "wordReveal" | "discussion" | "voting" | "results" | "gameEnd";

export type ScanResult = {
  detectiveId: string;
  player1Id: string;
  player2Id: string;
  result: "=" | "≠";
  round: number;
};

export type GameState = {
  players: Player[];
  phase: GamePhase;
  currentRound: number;
  majorityWord: string;
  undercoverWord: string;
  votingResults?: Record<string, string>;
  speakingOrder?: string[];
  lastEliminatedId?: string;
  winner?: string;
  mrWhiteGuess?: string;
  roleDistribution: RoleDistribution;
  currentPlayerIndex: number;
  deathCount?: number;
  actionResults?: Record<string, ScanResult>; // Store results from action phase (detective scans)
  silencedPlayers?: string[]; // Players who are silenced by saboteur
};