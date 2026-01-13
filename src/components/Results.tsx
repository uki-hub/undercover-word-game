import { useGame } from "../context/GameContext";
import { Button } from "@/components/ui/button";
import { usePeer } from "@/context/PeerContext";
import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { useSound } from "@/context/SoundContext";
import { PlayerList } from "./shared/PlayerList";
import { CurrentPlayerEliminatedCard } from "./shared/EliminationCards/CurrentPlayerEliminatedCard";
import { OtherPlayerEliminatedCard } from "./shared/EliminationCards/OtherPlayerEliminatedCard";
import { pickRandom } from "@/lib/utils";
import { GameEngine } from "@/lib/gameEngine";

export const Results = () => {
  const { gameState, setGameState, submitMrWhiteGuess } = useGame();
  const { peer, isHost, sendToHost } = usePeer();
  const { playSound } = useSound();
  const [guess, setGuess] = useState("");
  const [tieBreakerPlayers, setTieBreakerPlayers] = useState<string[]>([]);
  const [showEliminatedCard, setShowEliminatedCard] = useState(false);

  const currentPlayer = gameState.players.find(p => p.id === peer?.id);
  const eliminatedPlayer = gameState.players
    .find(p => p.id === gameState.lastEliminatedId);

  const playEliminationSound = useCallback(() => {
    if (gameState.mrWhiteGuess) {
      return playSound("/sounds/mrwhite-wrong-guess.mp3");
    }

    switch (eliminatedPlayer?.role) {
      case "mrwhite":
        playSound("/sounds/mrwhite-eliminated.mp3");
        break;
      case "undercover":
        playSound("/sounds/undercover-eliminated.mp3");
        break;
      case "traitor":
        // Traitor uses undercover sound since they're on the infiltrator side
        playSound("/sounds/undercover-eliminated.mp3");
        break;
      case "civilian":
        playSound(pickRandom(["/sounds/penduduk-mati (1).mp3", "/sounds/penduduk-mati (2).mp3", "/sounds/penduduk-mati (3).mp3", "/sounds/penduduk-mati (4).mp3"]));
        break;
    }
  }, [gameState.mrWhiteGuess, eliminatedPlayer?.role, playSound]);

  useEffect(() => {
    if (gameState.lastEliminatedId && gameState.votingResults) {
      // Count votes for each player to determine if there was a tie
      const voteCount: Record<string, number> = {};
      Object.values(gameState.votingResults).forEach(targetId => {
        voteCount[targetId] = (voteCount[targetId] || 0) + 1;
      });

      const maxVotes = Math.max(...Object.values(voteCount));
      const mostVotedPlayers = Object.entries(voteCount)
        .filter(([_, votes]) => votes === maxVotes)
        .map(([id]) => id);

      setTieBreakerPlayers(mostVotedPlayers);

      if (mostVotedPlayers.length > 1) {
        setTimeout(() => {
          setShowEliminatedCard(true);
          playEliminationSound();
        }, 7000);
      } else {
        setShowEliminatedCard(true);
        playEliminationSound();
      }
    }
  }, [gameState.lastEliminatedId, gameState.votingResults, playEliminationSound]);

  const currentPlayerGotEliminated = eliminatedPlayer?.id === currentPlayer?.id;
  const isMrWhiteGuessing = eliminatedPlayer?.role === "mrwhite" && !gameState.mrWhiteGuess;
  const canContinue = isHost && !isMrWhiteGuessing;

  // Sort players by speaking order (and filter out eliminated players)
  const activePlayers = gameState.speakingOrder
    .map(id => gameState.players.find(p => p.id === id));

  const handleGuessSubmit = () => {
    if (!guess.trim()) {
      toast.error("Please enter a guess");
      return;
    }

    if (isHost) {
      submitMrWhiteGuess(guess.trim());
    } else {
      // Send guess to host
      sendToHost({
        type: "MR_WHITE_GUESS",
        guess: guess.trim()
      });
    }
  };

  const handleGuessChange = (value: string) => {
    setGuess(value);
  };

  const handleContinue = () => {
    setGameState((prev) => {
      // First eliminate the player
      let updatedPlayers = prev.players.map(p =>
        p.id === eliminatedPlayer?.id ? { ...p, isEliminated: true, eliminationReason: "voted" as const } : { ...p }
      );

      // Track death for Fool auto-elimination
      const newDeathCount = (prev.deathCount || 0) + 1;
      
      // Use GameEngine to check and handle auto-elimination
      updatedPlayers = GameEngine.checkAutoElimination(updatedPlayers, newDeathCount);

      // Now check game end with updated players
      const gameWinner = GameEngine.checkWinCondition(updatedPlayers);

      return {
        ...prev,
        players: updatedPlayers,
        deathCount: newDeathCount,
        phase: gameWinner ? "gameEnd" : "discussion",
        winner: gameWinner || undefined,
        votingResults: {},
        currentPlayerIndex: 0,
      };
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-center mb-4 text-white">Hasil Voting</h2>

      {showEliminatedCard && eliminatedPlayer && (
        currentPlayerGotEliminated ? (
          <CurrentPlayerEliminatedCard
            playerName={eliminatedPlayer.name}
            role={eliminatedPlayer.role}
            originalRole={eliminatedPlayer.originalRole}
            isMrWhiteGuessing={isMrWhiteGuessing}
            guess={guess}
            onGuessChange={handleGuessChange}
            onGuessSubmit={handleGuessSubmit}
          />
        ) : (
          <OtherPlayerEliminatedCard
            playerName={eliminatedPlayer.name}
            role={eliminatedPlayer.role}
            originalRole={eliminatedPlayer.originalRole}
            word={eliminatedPlayer.word}
            showWord={eliminatedPlayer.role !== "mrwhite" && currentPlayer?.isEliminated}
          />
        )
      )}

      <PlayerList
        players={activePlayers}
        votingResults={gameState.votingResults}
        currentPlayerId={peer?.id}
        tieBreakerPlayers={
          gameState.mrWhiteGuess == null // prevent playing tiebreaker animation again after mrWhite guess
            ? tieBreakerPlayers : []
        }
        lastEliminatedId={gameState.lastEliminatedId}
      />

      <Button
        onClick={handleContinue}
        className="w-full"
        disabled={!canContinue}
        variant={canContinue ? "default" : "secondary"}
      >
        Continue Game
      </Button>
    </div>
  );
};