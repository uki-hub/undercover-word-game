import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { PlayerRole } from "@/types/game";
import { MrWhiteGuess } from "../MrWhiteGuess";
import { MrWhiteMessage } from "./RoleMessages/MrWhiteMessage";
import { CivilianMessage } from "./RoleMessages/CivilianMessage";
import { UndercoverMessage } from "./RoleMessages/UndercoverMessage";
import { FoolMessage } from "./RoleMessages/FoolMessage";
import { TraitorMessage } from "./RoleMessages/TraitorMessage";
import { StandardTips } from "./RoleMessages/StandardTips";

interface CurrentPlayerEliminatedCardProps {
  playerName: string;
  role: PlayerRole;
  originalRole?: PlayerRole;
  isMrWhiteGuessing: boolean;
  guess: string;
  onGuessChange: (value: string) => void;
  onGuessSubmit: () => void;
}

export const CurrentPlayerEliminatedCard = ({
  playerName,
  role,
  originalRole,
  isMrWhiteGuessing,
  guess,
  onGuessChange,
  onGuessSubmit
}: CurrentPlayerEliminatedCardProps) => {
  const getRoleMessage = () => {
    switch (role) {
      case "mrwhite":
        return <MrWhiteMessage isCurrentPlayer={true} />;
      case "civilian":
        return <CivilianMessage isCurrentPlayer={true} />;
      case "undercover":
        // Check if this is a transformed traitor
        if (originalRole === "traitor") {
          return <TraitorMessage isCurrentPlayer={true} hasTransformed={true} />;
        }
        return <UndercoverMessage isCurrentPlayer={true} />;
      case "fool":
        return <FoolMessage isCurrentPlayer={true} playerName={playerName} />;
      case "traitor":
        return <TraitorMessage isCurrentPlayer={true} hasTransformed={false} />;
      default:
        return null;
    }
  };

  return (
    <Card className="p-6 text-center glass-morphism">
      <h3 className="text-xl font-bold mb-4 text-white">
        Penduduk desa mengantung dirimu
      </h3>

      {getRoleMessage()}

      {role !== "fool" && <StandardTips />}

      {isMrWhiteGuessing && (
        <div className="mt-4 space-y-4">
          <p className="text-white/80">Tebak kata rahasia nya!!!</p>
          <div className="flex gap-2">
            <Input
              value={guess}
              onChange={(e) => onGuessChange(e.target.value)}
              placeholder="Tebak kata nya..."
              className="flex-1"
            />
            <Button
              onClick={onGuessSubmit}
              className="bg-primary hover:bg-primary/90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      <MrWhiteGuess />
    </Card>
  );
};
