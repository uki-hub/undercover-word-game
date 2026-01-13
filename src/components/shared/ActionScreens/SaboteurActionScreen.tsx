import { useGame } from "@/context/GameContext";
import { usePeer } from "@/context/PeerContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";
import { Player } from "@/types/game";

interface SaboteurActionScreenProps {
  currentPlayer: Player;
}

export const SaboteurActionScreen = ({ currentPlayer }: SaboteurActionScreenProps) => {
  const { gameState, submitSaboteurSilence } = useGame();
  const { isHost, sendToHost } = usePeer();
  const [selectedPlayer, setSelectedPlayer] = useState<string>("");

  const alivePlayers = gameState.players.filter(p => !p.isEliminated && p.id !== currentPlayer.id);

  const handleSilence = () => {
    if (!selectedPlayer) {
      toast.error("Pilih player untuk di-silence");
      return;
    }

    if (isHost) {
      submitSaboteurSilence(currentPlayer.id, selectedPlayer);
    } else {
      sendToHost({
        type: "SABOTEUR_SILENCE",
        saboteurId: currentPlayer.id,
        targetId: selectedPlayer
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-center mb-4 text-white">Sabotase Silence</h2>
      
      <Card className="p-6 glass-morphism border-red-500/50">
        <p className="text-red-400 font-semibold text-center mb-4">
          Pilih 1 pemain untuk di-Silence
        </p>
        <p className="text-white/70 text-sm text-center mb-4">
          Pemain yang di-Silence tidak bisa kasih kata ciri-ciri di round ini
        </p>
      </Card>

      <div className="space-y-2">
        <p className="text-white font-semibold">Pemain Tersedia:</p>
        <div className="space-y-2">
          {alivePlayers.map(player => (
            <button
              key={player.id}
              onClick={() => setSelectedPlayer(player.id)}
              className={`w-full p-3 rounded-lg text-left transition-all ${
                selectedPlayer === player.id
                  ? "bg-red-500/50 border border-red-400"
                  : "bg-white/5 border border-white/10 hover:bg-white/10"
              }`}
            >
              <p className="text-white font-medium">{player.name}</p>
              {selectedPlayer === player.id && (
                <p className="text-red-300 text-sm">✓ Dipilih</p>
              )}
            </button>
          ))}
        </div>
      </div>

      <Button
        onClick={handleSilence}
        disabled={!selectedPlayer}
        className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50"
      >
        Silence
      </Button>
    </div>
  );
};
