import { useGame } from "../context/GameContext";
import { usePeer } from "../context/PeerContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect } from "react";
import { PlayerList } from "./shared/PlayerList";
import { useSound } from "@/context/SoundContext";
import { DetectiveActionScreen } from "./shared/ActionScreens/DetectiveActionScreen";
import { SaboteurActionScreen } from "./shared/ActionScreens/SaboteurActionScreen";

export const ActionScreen = () => {
  const { gameState, setPhase } = useGame();
  const { peer, isHost } = usePeer();
  const { playSound } = useSound();

  useEffect(() => {
    playSound("/sounds/new-page.mp3");
  }, [playSound]);

  const currentPlayer = gameState.players.find(p => p.id === peer?.id);

  const handleSkip = () => {
    setPhase("wordReveal");
  };

  if (!peer) {
    return <div className="text-white text-center">Connecting to game network...</div>;
  }

  if (!currentPlayer) {
    return <div className="text-white text-center">Waiting for game data...</div>;
  }

  // Check if player has used all their actions
  const hasUsedAllActions = 
    currentPlayer.roleConfig?.maxActionUsageCount && 
    (currentPlayer.actionUseCounter || 0) >= currentPlayer.roleConfig.maxActionUsageCount;

  // If player has actions but used them all
  if (hasUsedAllActions && (currentPlayer.role === "detective" || currentPlayer.role === "saboteur")) {
    return (
      <div className="max-w-md mx-auto p-6 space-y-6 animate-fade-in">
        <h2 className="text-2xl font-bold text-center mb-4 text-white">Action Phase</h2>
        <Card className="p-6 glass-morphism">
          <p className="text-white text-center">
            Kamu sudah menggunakan semua skill mu
          </p>
        </Card>
        {isHost && (
          <Button
            onClick={handleSkip}
            className="w-full bg-primary hover:bg-primary/90"
          >
            Lanjut ke Word Reveal
          </Button>
        )}
      </div>
    );
  }

  // Route to specific action screen based on role
  switch (currentPlayer.role) {
    case "detective":
      return <DetectiveActionScreen currentPlayer={currentPlayer} />;
    
    case "saboteur":
      return <SaboteurActionScreen currentPlayer={currentPlayer} />;
    
    default:
      // Non-action role waiting screen
      return (
        <div className="max-w-md mx-auto p-6 space-y-6 animate-fade-in">
          <h2 className="text-2xl font-bold text-center mb-4 text-white">Action Phase</h2>
          
          <Card className="p-6 glass-morphism">
            <p className="text-white/70 text-center">
              Menunggu Player Active Jalan...
            </p>
          </Card>

          <PlayerList
            players={gameState.players.filter(p => !p.isEliminated)}
            currentPlayerId={peer.id}
          />

          {isHost && (
            <Button
              onClick={handleSkip}
              className="w-full bg-primary hover:bg-primary/90 mt-4"
            >
              Skip Action Phase
            </Button>
          )}
        </div>
      );
  }
};
