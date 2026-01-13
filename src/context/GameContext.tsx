import React, { createContext, useContext, useState } from "react";
import { GameState, Player, GamePhase, PlayerRole, RoleDistribution } from "../types/game";
import { toast } from "sonner";
import { calculateDefaultDistribution } from "../config/roleDistribution";
import { useTranslation } from "react-i18next";
import { shuffle } from "@/lib/utils";
import { GameEngine } from "@/lib/gameEngine";

interface GameContextType {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  addPlayer: (name: string, id: string) => void;
  removePlayer: (id: string) => void;
  startGame: () => void;
  setPhase: (phase: GamePhase) => void;
  submitVote: (voterId: string, targetId: string) => void;
  submitMrWhiteGuess: (guess: string) => void;
  submitDescription: (playerId: string, description: string) => void;
  resetGame: () => void;
  updateRoleDistribution: (distribution: RoleDistribution) => void;
  checkGameEnd: (players: Player[]) => string | null;
  eliminatePlayer: (eliminatedId: string) => void;
  rerollWords: () => void;
  secondRound: () => void;
  editKata: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();

  const [gameState, setGameState] = useState<GameState>({
    players: [],
    phase: "setup",
    currentRound: 0,
    majorityWord: "",
    undercoverWord: "",
    mrWhiteGuess: undefined,
    roleDistribution: calculateDefaultDistribution(4),
    currentPlayerIndex: 0,
  });

  const addPlayer = (name: string, id: string) => {
    setGameState((prev) => {
      if (prev.players.length >= 10) {
        toast.error("Maximum 10 players allowed!");
        return prev;
      }

      const score = 0;
      let role = undefined;
      let isEliminated = undefined;
      if (prev.phase !== "setup") {
        role = "spectator";
        isEliminated = true;
      }

      const newPlayers = [...prev.players, { id, name, role, isEliminated, score }];
      return {
        ...prev,
        players: newPlayers,
        roleDistribution: calculateDefaultDistribution(newPlayers.length),
      };
    });
  };

  const removePlayer = (id: string) => {
    setGameState((prev) => {
      const player = prev.players.find(p => p.id === id);
      if (!player) return prev;

      const newPlayers = prev.players.filter(p => p.id !== id);
      const newSpeakingOrder = prev.speakingOrder?.filter(s => s !== id);

      if (prev.phase !== "setup") {
        const gameEnd = checkGameEnd(newPlayers);
        if (gameEnd) {
          return {
            ...prev,
            phase: "gameEnd",
            winner: gameEnd,
            players: newPlayers,
            speakingOrder: newSpeakingOrder,
          };
        }
      }

      return {
        ...prev,
        players: newPlayers,
        speakingOrder: newSpeakingOrder,
      };
    });
  };

  const generateSpeakingOrder = (players: Player[]) => {
    const activePlayers = players.filter(p => !p.isEliminated);

    return shuffle(activePlayers).map(player => player.id);
  };

  // const generateSpeakingOrder = (players: Player[]) => {
  //   const activePlayers = players.filter(p => !p.isEliminated);
  //   const nonWhitePlayers = activePlayers.filter(p => p.role !== "mrwhite");

  //   // Ensure the first player is not a Mr. White
  //   const firstPlayer = nonWhitePlayers[Math.floor(Math.random() * nonWhitePlayers.length)];

  //   const remainingPlayers = activePlayers.filter(p => p.id !== firstPlayer.id);
  //   const shuffledRemaining = shuffle(remainingPlayers);

  //   return [firstPlayer, ...shuffledRemaining].map(player => player.id);
  // };

  const checkGameEnd = (players: Player[]) => {
    return GameEngine.checkWinCondition(players);
  };

  const generateAndAssignWords = (players: Player[]) => {
    const wordPairs = t("wordPairs", { returnObjects: true }) as [string, string][];
    const randomPair = wordPairs[Math.floor(Math.random() * wordPairs.length)];
    const [majorityWord, undercoverWord] = randomPair;

    // Use GameEngine to assign words based on role configuration
    const updatedPlayers = GameEngine.assignWords(players, majorityWord, undercoverWord).map(p => ({
      ...p,
      submittedDescriptions: undefined,
    }));

    return {
      players: updatedPlayers,
      majorityWord,
      undercoverWord,
    };
  };

  const rerollWords = () => {
    setGameState(prev => {
      if (prev.currentRound !== 1) return prev;

      const { players, majorityWord, undercoverWord } = generateAndAssignWords(prev.players);
      return {
        ...prev,
        players,
        majorityWord,
        undercoverWord,
      };
    });
  };

  const startGame = () => {
    setGameState((prev) => {
      if (prev.currentRound === 0) {
        if (prev.players.length < 4) {
          toast.error("Minimum 4 players required!");
          return prev;
        }

        const shuffledPlayers = shuffle(prev.players);
        const { undercovers, mrWhites, fool, traitor } = prev.roleDistribution;

        const playersWithRoles = shuffledPlayers.map((player, index) => {
          let role: PlayerRole = "civilian";
          
          if (index < fool) {
            role = "fool";
          } else if (index < fool + mrWhites) {
            role = "mrwhite";
          } else if (index < fool + mrWhites + undercovers) {
            role = "undercover";
          } else if (index < fool + mrWhites + undercovers + traitor) {
            role = "traitor";
          }

          return {
            ...player,
            role,
            isEliminated: false,
          };
        });

        // Assign role configurations using GameEngine
        const playersWithConfigs = GameEngine.assignRoleConfigs(playersWithRoles, prev.players.length);
        
        const { players, majorityWord, undercoverWord } = generateAndAssignWords(playersWithConfigs);
        const speakingOrder = generateSpeakingOrder(players);

        return {
          ...prev,
          players,
          speakingOrder,
          phase: "wordReveal",
          majorityWord,
          undercoverWord,
          currentRound: 1,
          mrWhiteGuess: undefined,
          deathCount: 0,
        };
      } else {
        // Check and handle Traitor transformation
        const playersAfterTransformation = GameEngine.checkTraitorTransformation(
          prev.players,
          prev.currentRound,
          prev.majorityWord,
          prev.undercoverWord
        );

        return {
          ...prev,
          players: playersAfterTransformation,
          speakingOrder: generateSpeakingOrder(playersAfterTransformation),
          phase: "wordReveal",
          votingResults: {},
          currentRound: prev.currentRound + 1,
          mrWhiteGuess: undefined,
        };
      }
    });
  };

  const setPhase = (phase: GamePhase) => {
    setGameState((prev) => ({ ...prev, phase }));
  };

  const submitDescription = (playerId: string, submittedDescription: string) => {
    setGameState((prev) => {
      const currentPlayerIndex = prev.speakingOrder?.findIndex(e => e == playerId);

      const updatedPlayers = prev.players.map(p =>
        p.id === playerId ? { ...p, submittedDescriptions: [...p?.submittedDescriptions ?? [], submittedDescription] } : p
      );

      return {
        ...prev,
        players: updatedPlayers,
        currentPlayerIndex: currentPlayerIndex + 1,
      };
    });
  };

  const submitVote = (voterId: string, targetId: string) => {
    setGameState((prev) => {
      const newVotingResults = { ...(prev.votingResults || {}), [voterId]: targetId };
      const activePlayers = prev.players.filter(p => !p.isEliminated);
      const allVoted = activePlayers.every(p => p.id in newVotingResults);

      if (allVoted) {
        // Elimination logic
        const voteCount: Record<string, number> = {};
        Object.values(newVotingResults).forEach(id => {
          voteCount[id] = (voteCount[id] || 0) + 1;
        });

        // Find the highest vote count
        const maxVotes = Math.max(...Object.values(voteCount));

        // Get all players with the highest votes
        const mostVotedPlayers = Object.entries(voteCount)
          .filter(([_, votes]) => votes === maxVotes)
          .map(([id]) => id);

        // Randomly select one of the most voted players
        const eliminatedId = mostVotedPlayers[Math.floor(Math.random() * mostVotedPlayers.length)];

        return {
          ...prev,
          votingResults: newVotingResults,
          phase: "results",
          lastEliminatedId: eliminatedId,
          currentPlayerIndex: 0
        };
      }

      return {
        ...prev,
        votingResults: newVotingResults
      };
    });
  };

  const eliminatePlayer = (eliminatedId: string) => {
    setGameState((prev) => {
      let updatedPlayers = prev.players.map(p =>
        p.id === eliminatedId ? { ...p, isEliminated: true, eliminationReason: "voted" as const } : { ...p }
      );

      // Track death for Fool auto-elimination
      const newDeathCount = (prev.deathCount || 0) + 1;
      
      // Use GameEngine to check and handle auto-elimination
      updatedPlayers = GameEngine.checkAutoElimination(updatedPlayers, newDeathCount);

      return {
        ...prev,
        players: updatedPlayers,
        phase: "results",
        lastEliminatedId: eliminatedId,
        deathCount: newDeathCount,
      };
    });
  };

  const submitMrWhiteGuess = (guess: string) => {
    setGameState((prev) => {
      if (guess.toLowerCase() === prev.majorityWord.toLowerCase()) {
        return {
          ...prev,
          phase: "gameEnd",
          winner: "mrwhite",
          mrWhiteGuess: guess
        };
      } else {
        const gameWinner = checkGameEnd(prev.players);
        return {
          ...prev,
          phase: gameWinner ? "gameEnd" : "results",
          winner: gameWinner || undefined,
          mrWhiteGuess: guess
        };
      }
    });
  };

  const resetGame = () => {
    setGameState((prev) => {
      const players = prev.players.map(p => ({ ...p, isEliminated: false, submittedDescriptions: undefined, role: undefined, roleConfig: undefined, deathsToTrigger: undefined, eliminationReason: undefined }));
      return {
        players: players,
        phase: "setup",
        currentRound: 0,
        majorityWord: "",
        undercoverWord: "",
        mrWhiteGuess: undefined,
        roleDistribution: prev.roleDistribution,
        currentPlayerIndex: 0,
        deathCount: 0,
        votingResults: {},
      };
    });
  };

  const updateRoleDistribution = (distribution: RoleDistribution) => {
    setGameState(prev => ({
      ...prev,
      roleDistribution: distribution
    }));
  };

  const secondRound = () => {
    setGameState((prev) => ({ ...prev, phase: "discussion", currentPlayerIndex: 0 }));
  }

  const editKata = () => {
    setGameState((prev) => {
      // debugger;
      const lastPlayerIndex = prev.currentPlayerIndex - 1;
      const lastPlayerId = prev.speakingOrder[lastPlayerIndex];

      const updatedPlayers = [...prev.players]
      const updatedPlayerIndex = updatedPlayers.findIndex(e => e.id == lastPlayerId);
      updatedPlayers[updatedPlayerIndex]?.submittedDescriptions?.pop()

      return { ...prev, currentPlayerIndex: lastPlayerIndex, players: updatedPlayers };
    });
  }

  return (
    <GameContext.Provider
      value={{
        gameState,
        setGameState,
        addPlayer,
        removePlayer,
        startGame,
        setPhase,
        submitVote,
        submitMrWhiteGuess,
        submitDescription,
        resetGame,
        updateRoleDistribution,
        checkGameEnd,
        eliminatePlayer,
        rerollWords,
        secondRound,
        editKata
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};