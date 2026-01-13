import { useGame } from "@/context/GameContext";
import { usePeer } from "@/context/PeerContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";
import { Player } from "@/types/game";

interface DetectiveActionScreenProps {
  currentPlayer: Player;
}

export const DetectiveActionScreen = ({ currentPlayer }: DetectiveActionScreenProps) => {
  const { gameState, submitDetectiveScan } = useGame();
  const { isHost, sendToHost } = usePeer();
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);

  const alivePlayers = gameState.players.filter(p => !p.isEliminated && p.id !== currentPlayer.id);

  const handlePlayerSelect = (playerId: string) => {
    setSelectedPlayers(prev => {
      if (prev.includes(playerId)) {
        return prev.filter(id => id !== playerId);
      }
      if (prev.length >= 2) {
        return [prev[1], playerId];
      }
      return [...prev, playerId];
    });
  };

  const handleScan = () => {
    if (selectedPlayers.length !== 2) {
      toast.error("Select exactly 2 players to scan");
      return;
    }

    if (isHost) {
      submitDetectiveScan(currentPlayer.id, selectedPlayers[0], selectedPlayers[1]);
    } else {
      sendToHost({
        type: "DETECTIVE_SCAN",
        detectiveId: currentPlayer.id,
        player1Id: selectedPlayers[0],
        player2Id: selectedPlayers[1]
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-center mb-4 text-white">Detective Scan</h2>
      
      <Card className="p-6 glass-morphism border-blue-500/50">
        <p className="text-blue-400 font-semibold text-center mb-4">
          Pilih 2 pemain untuk di-Scan
        </p>
        <p className="text-white/70 text-sm text-center mb-4">
          Lu bakal tau apakah mereka mempunyai kata yang sama atau berbeda
        </p>
      </Card>

      <div className="space-y-2">
        <p className="text-white font-semibold">Pemain Tersedia:</p>
        <div className="space-y-2">
          {alivePlayers.map(player => (
            <button
              key={player.id}
              onClick={() => handlePlayerSelect(player.id)}
              className={`w-full p-3 rounded-lg text-left transition-all ${
                selectedPlayers.includes(player.id)
                  ? "bg-blue-500/50 border border-blue-400"
                  : "bg-white/5 border border-white/10 hover:bg-white/10"
              }`}
            >
              <p className="text-white font-medium">{player.name}</p>
              {selectedPlayers.includes(player.id) && (
                <p className="text-blue-300 text-sm">✓ Dipilih</p>
              )}
            </button>
          ))}
        </div>
      </div>

      <Button
        onClick={handleScan}
        disabled={selectedPlayers.length !== 2}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
      >
        Scan
      </Button>
    </div>
  );
};
