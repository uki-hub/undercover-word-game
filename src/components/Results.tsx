import { useGame } from "../context/GameContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { usePeer } from "@/context/PeerContext";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { useSound } from "@/context/SoundContext";
import { MrWhiteGuess } from "./shared/MrWhiteGuess";
import { PlayerList } from "./shared/PlayerList";
import { pickRandom } from "@/lib/utils";

export const Results = () => {
  const { gameState, setGameState, submitMrWhiteGuess, eliminatePlayer, checkGameEnd } = useGame();
  const { peer, isHost, sendToHost } = usePeer();
  const { playSound } = useSound();
  const [guess, setGuess] = useState("");
  const [tieBreakerPlayers, setTieBreakerPlayers] = useState<string[]>([]);
  const [showEliminatedCard, setShowEliminatedCard] = useState(false);

  const currentPlayer = gameState.players.find(p => p.id === peer?.id);
  const eliminatedPlayer = gameState.players
    .find(p => p.id === gameState.lastEliminatedId);

  const playEliminationSound = () => {
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
      case "civilian":
        playSound(pickRandom(["/sounds/penduduk-mati (1).mp3", "/sounds/penduduk-mati (2).mp3", "/sounds/penduduk-mati (3).mp3", "/sounds/penduduk-mati (4).mp3"]));
        break;
    }
  };

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
  }, [gameState.lastEliminatedId, gameState.votingResults]);

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

  const handleContinue = () => {
    eliminatePlayer(eliminatedPlayer?.id);
    setGameState((prev) => {
      const gameWinner = checkGameEnd(prev.players);

      return {
        ...prev,
        phase: gameWinner ? "gameEnd" : "discussion",
        winner: gameWinner || undefined,
        votingResults: {},
      };
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-center mb-4 text-white">Hasil Voting</h2>

      {showEliminatedCard && eliminatedPlayer && (
        <Card className="p-6 text-center glass-morphism">
          <h3 className="text-xl font-bold mb-4 text-white">
            {currentPlayerGotEliminated ? "Penduduk desa mengantung dirimu" : `${eliminatedPlayer.name} telah di Gantung Mati!`}
          </h3>
          <p className="text-lg mb-2 text-white">
            {currentPlayerGotEliminated ? "Kamu" : "Dia"} adalah seorang{" "}
            <span className="font-bold text-primary">
              {eliminatedPlayer.role === "mrwhite"
                ? "Mr. White"
                : eliminatedPlayer.role == "civilian" ? "Penduduk" : "Undercover"}
            </span>
          </p>
          {eliminatedPlayer.role !== "mrwhite" && currentPlayer?.isEliminated && !currentPlayerGotEliminated && (
            <p className="text-white/80">
              Tebakan Kata Mr.White: {eliminatedPlayer.word}
            </p>
          )}
          <div className="">
            <h2 className="font-bold">Tips:</h2>
            <p className="text-sm text-white/70">Yang barusan mati boleh kasih Wasiat/Wejangan untuk penduduk yang masih HIDUP</p>
            <p className="text-sm text-white/70">Setelah itu DIEM!!! gaboleh ngomong</p>
          </div>

          {isMrWhiteGuessing && currentPlayerGotEliminated && (
            <div className="mt-4 space-y-4">
              <p className="text-white/80">Tebak kata rahasia nya!!!</p>
              <div className="flex gap-2">
                <Input
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  placeholder="Tebak kata nya..."
                  className="flex-1"
                />
                <Button
                  onClick={handleGuessSubmit}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          <MrWhiteGuess />
        </Card>
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