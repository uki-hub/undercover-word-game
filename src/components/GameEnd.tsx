import { useGame } from "../context/GameContext";
import { usePeer } from "../context/PeerContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, User } from "lucide-react";
import { useSound } from "@/context/SoundContext";
import { useEffect } from "react";
import { MrWhiteGuess } from "./shared/MrWhiteGuess";
import { pickRandom } from "@/lib/utils";
import { GameEngine } from "@/lib/gameEngine";

export const GameEnd = () => {
  const { gameState, resetGame, setGameState } = useGame();
  const { peer, isHost } = usePeer();
  const { playSound } = useSound();

  const currentPlayer = gameState.players.find(p => p.id === peer?.id);

  useEffect(() => {
    // Use GameEngine to calculate scores
    const updatedPlayers = GameEngine.calculateScores(gameState.players, gameState.winner || "");

    setGameState({ ...gameState, players: updatedPlayers });

    switch (gameState.winner) {
      case "civilian":
        playSound(pickRandom(["/sounds/penduduk-menang (1).mp3", "/sounds/penduduk-menang (2).mp3", "/sounds/penduduk-menang (3).mp3"]));
        break;
      case "fool":
        // Play a special sound for fool winning if you have one, otherwise use default
        playSound(pickRandom(["/sounds/penduduk-menang (1).mp3", "/sounds/penduduk-menang (2).mp3", "/sounds/penduduk-menang (3).mp3"]));
        break;
      case "infiltrators":
      case "undercover":
      case "mrwhite":
        playSound(pickRandom(["/sounds/musuh-menang (1).mp3", "/sounds/musuh-menang (2).mp3", "/sounds/musuh-menang (3).mp3"]));
        break;
    }
  }, []);

  const getWinnerPlayers = () => {
    if (gameState.winner === "infiltrators") {
      return gameState.players.filter(p => p.role === "undercover" || p.role === "mrwhite");
    }
    if (gameState.winner === "fool") {
      return gameState.players.filter(p => p.role === "fool");
    }
    return gameState.players.filter(p => p.role === gameState.winner);
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-6 animate--in">
      <div className="text-center space-y-4">
        {gameState.winner === currentPlayer?.role ? (
          <Trophy className="w-16 h-16 text-yellow-400 mx-auto" />
        ) : (
          <User className="w-16 h-16 text-red-400 mx-auto" />
        )}
        <h1 className="text-4xl font-bold text-white text-center">Game Over!</h1>
      </div>

      <MrWhiteGuess />

      <Card className="p-6 glass-morphism">
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white">
              {gameState.winner === "civilian" && "Penduduk Desa Menang!!!"}
              {gameState.winner === "undercover" && "Undercover Menang!!!"}
              {gameState.winner === "mrwhite" && "Mr. White Menang!!!"}
              {gameState.winner === "infiltrators" && "Infiltrators Menang!!!"}
              {gameState.winner === "fool" && "🎭 Fool Menang!!! 🃏"}
            </h2>
            {gameState.winner === "fool" && (
              <p className="text-yellow-300 mt-2">Kalian semua kena tipu!</p>
            )}
          </div>

          <div className="space-y-3">
            {getWinnerPlayers().map((player) => (
              <div
                key={player.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-white/5"
              >
                {player.isEliminated ? (
                  <User className="w-5 h-5 text-gray-500" />
                ) : (
                  <User className="w-5 h-5 text-primary" />
                )}
                <div>
                  <p className="text-lg block max-w-[250px] truncate text-white">{player.name}</p>
                  <p className="text-sm text-white/70">
                    {player.originalRole === "traitor" 
                      ? `${GameEngine.getRoleDisplayName(player.originalRole)} → ${GameEngine.getRoleDisplayName(player.role)}`
                      : GameEngine.getRoleDisplayName(player.role)
                    }{player.word && ` - ${player.word}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {isHost && (
        <Button
          onClick={resetGame}
          size="lg"
          className="w-full bg-primary hover:bg-primary/90 text-lg font-medium transition-colors duration-200"
        >
          Start New Round
        </Button>
      )}
    </div>
  );
};
