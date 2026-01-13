import { Player, RoleConfig, Role } from "@/types/game";

/**
 * Game Engine - Handles role-based game logic
 */

export class GameEngine {
  /**
   * Assign role configuration to players
   */
  static assignRoleConfigs(players: Player[], playerCount: number): Player[] {
    return players.map(player => {
      if (!player.role) return player;

      let roleConfig: Role | undefined;

      switch (player.role) {
        case "civilian":
          roleConfig = RoleConfig.civilian();
          break;
        case "undercover":
          roleConfig = RoleConfig.undercover();
          break;
        case "mrwhite":
          roleConfig = RoleConfig.mrwhite();
          break;
        case "fool":
          roleConfig = RoleConfig.fool(playerCount);
          break;
        case "traitor":
          roleConfig = RoleConfig.traitor(playerCount);
          break;
      }

      return {
        ...player,
        roleConfig,
        deathsToTrigger: roleConfig?.type === "fool" ? roleConfig.autoEliminationThreshold : undefined,
        traitorTransformationRound: roleConfig?.type === "traitor" ? roleConfig.transformationThreshold : undefined
      };
    });
  }

  /**
   * Assign words to players based on their role configuration
   */
  static assignWords(
    players: Player[],
    majorityWord: string,
    undercoverWord: string
  ): Player[] {
    return players.map(player => {
      if (!player.roleConfig) return { ...player, word: "" };

      let word = "";

      if (player.roleConfig.getsWord) {
        if (player.roleConfig.type === "civilian") {
          word = majorityWord;
        } else if (player.roleConfig.type === "undercover") {
          word = undercoverWord;
        } else if (player.roleConfig.type === "traitor") {
          // Traitor gets civilian word, or undercover word if already transformed
          if (player.roleConfig.currentWordType === "undercover") {
            word = undercoverWord;
          } else {
            word = majorityWord;
          }
        }
      }

      return { ...player, word };
    });
  }

  /**
   * Check win conditions based on role configurations
   */
  static checkWinCondition(players: Player[]): string | null {
    const alivePlayers = players.filter(p => !p.isEliminated);
    
    // Group players by team
    const teamGroups = {
      civilian: alivePlayers.filter(p => p.roleConfig?.team === "civilian"),
      undercover: alivePlayers.filter(p => p.roleConfig?.team === "undercover"),
      solo: alivePlayers.filter(p => p.roleConfig?.team === "solo") // Solo roles (Mr. White, Fool)
    };

    // Check Fool win condition: voted out
    const foolPlayer = players.find(p => p.roleConfig?.type === "fool");
    if (foolPlayer?.isEliminated && foolPlayer.eliminationReason === "voted") {
      return "fool";
    }

    // Separate solo roles by type
    const soloMrWhite = teamGroups.solo.filter(p => p.roleConfig?.type === "mrwhite");
    const soloFool = teamGroups.solo.filter(p => p.roleConfig?.type === "fool");
    
    // Enemies are: undercover + Mr. White (Fool is not counted as enemy)
    const enemiesAlive = teamGroups.undercover.length + soloMrWhite.length;
    
    // Check if all enemies eliminated (Civilian win)
    // But game continues if solo roles (Fool) are still alive
    if (enemiesAlive === 0 && soloFool.length === 0) {
      if (teamGroups.civilian.length === 0) return null; // No winner
      return "civilian";
    }

    // Check if enemies outnumber or equal civilians (Enemy win)
    // But game continues if ANY solo roles are still alive (they can change the outcome)
    if (teamGroups.civilian.length <= enemiesAlive && teamGroups.solo.length === 0) {
      if (teamGroups.undercover.length > 0 && soloMrWhite.length > 0) {
        return "infiltrators";
      }
      if (teamGroups.undercover.length > 0) {
        return "undercover";
      }
      return "mrwhite";
    }

    return null;
  }

  /**
   * Calculate scores for winners
   */
  static calculateScores(players: Player[], winner: string): Player[] {
    return players.map(player => {
      const currentScore = player.score || 0;
      let pointsToAdd = 0;

      if (!player.roleConfig) return player;

      // Solo roles (Mr. White, Fool) each have their own win condition
      // They don't win when their "team" wins, but when their specific condition is met
      if (player.roleConfig.team === "solo") {
        // Fool only wins if winner is "fool"
        if (player.roleConfig.type === "fool" && winner === "fool") {
          pointsToAdd = player.roleConfig.scoreOnWin;
        }
        // Mr. White wins if winner is "mrwhite" (guessed correctly)
        else if (player.roleConfig.type === "mrwhite" && winner === "mrwhite") {
          pointsToAdd = player.roleConfig.scoreOnWin;
        }
        // Mr. White also wins with infiltrators
        else if (player.roleConfig.type === "mrwhite" && winner === "infiltrators") {
          pointsToAdd = player.roleConfig.scoreOnWin;
        }
      }
      // Single team winner (civilian or undercover)
      else if (winner === player.roleConfig.team) {
        // Check if this is a transformed traitor (originalRole = "traitor")
        if (player.originalRole === "traitor") {
          pointsToAdd = 12; // Traitor's special 12-point bonus
        } else {
          pointsToAdd = player.roleConfig.scoreOnWin;
        }
      }
      // Infiltrators (undercover team wins alongside Mr. White)
      else if (winner === "infiltrators" && player.roleConfig.team === "undercover") {
        // Check if this is a transformed traitor
        if (player.originalRole === "traitor") {
          pointsToAdd = 12; // Traitor's special 12-point bonus
        } else {
          pointsToAdd = player.roleConfig.scoreOnWin;
        }
      }

      return {
        ...player,
        score: currentScore + pointsToAdd
      };
    });
  }

  /**
   * Check if a player should be auto-eliminated (Fool mechanic)
   * Only auto-eliminates if not already eliminated by voting
   */
  static checkAutoElimination(players: Player[], deathCount: number): Player[] {
    const foolPlayer = players.find(
      p => p.roleConfig?.type === "fool" && !p.isEliminated
    );

    if (!foolPlayer || foolPlayer.roleConfig?.type !== "fool") {
      return players;
    }

    const threshold = foolPlayer.roleConfig.autoEliminationThreshold;
    
    // Only auto-eliminate if death count reaches threshold
    // Don't auto-eliminate if they were voted out (eliminationReason === "voted")
    if (deathCount >= threshold) {
      return players.map(p =>
        p.id === foolPlayer.id && p.eliminationReason !== "voted"
          ? { ...p, isEliminated: true, eliminationReason: "auto" as const }
          : p
      );
    }

    return players;
  }

  /**
   * Get role display name for UI
   */
  static getRoleDisplayName(role?: string): string {
    switch (role) {
      case "civilian": return "Penduduk";
      case "undercover": return "Undercover";
      case "mrwhite": return "Mr. White";
      case "fool": return "Fool";
      case "traitor": return "Traitor";
      default: return "Unknown";
    }
  }

  /**
   * Get role color for UI
   */
  static getRoleColor(role?: string): string {
    switch (role) {
      case "mrwhite": return "text-primary";
      case "fool": return "text-yellow-400";
      case "undercover": return "text-red-400";
      case "traitor": return "text-purple-400";
      default: return "text-primary";
    }
  }

  /**
   * Check and transform Traitor to Undercover based on round count
   */
  static checkTraitorTransformation(players: Player[], currentRound: number, majorityWord: string, undercoverWord: string): Player[] {
    return players.map(player => {
      if (player.roleConfig?.type !== "traitor" || player.isEliminated) {
        return player;
      }

      const traitorConfig = player.roleConfig;
      
      // Check if we've reached the transformation threshold
      if (currentRound >= traitorConfig.transformationThreshold) {
        // Transform traitor to undercover
        const newRoleConfig = RoleConfig.undercover();
        
        return {
          ...player,
          role: "undercover",
          roleConfig: newRoleConfig,
          word: undercoverWord, // Update word to undercover word
          originalRole: "traitor" // Preserve original role for scoring
        };
      }

      return player;
    });
  }

  /**
   * Check if role can guess word (Mr. White mechanic)
   */
  static canGuessWord(player: Player): boolean {
    return player.roleConfig?.type === "mrwhite" && 
           player.roleConfig.canGuessWord === true;
  }
}
