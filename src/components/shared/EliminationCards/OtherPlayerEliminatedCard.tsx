import { Card } from "@/components/ui/card";
import { PlayerRole } from "@/types/game";
import { MrWhiteGuess } from "../MrWhiteGuess";
import { MrWhiteMessage } from "./RoleMessages/MrWhiteMessage";
import { CivilianMessage } from "./RoleMessages/CivilianMessage";
import { UndercoverMessage } from "./RoleMessages/UndercoverMessage";
import { FoolMessage } from "./RoleMessages/FoolMessage";
import { TraitorMessage } from "./RoleMessages/TraitorMessage";
import { StandardTips } from "./RoleMessages/StandardTips";

interface OtherPlayerEliminatedCardProps {
  playerName: string;
  role: PlayerRole;
  originalRole?: PlayerRole;
  word?: string;
  showWord: boolean;
}

export const OtherPlayerEliminatedCard = ({
  playerName,
  role,
  originalRole,
  word,
  showWord
}: OtherPlayerEliminatedCardProps) => {
  const getRoleMessage = () => {
    switch (role) {
      case "mrwhite":
        return <MrWhiteMessage isCurrentPlayer={false} />;
      case "civilian":
        return <CivilianMessage isCurrentPlayer={false} />;
      case "undercover":
        // Check if this is a transformed traitor
        if (originalRole === "traitor") {
          return <TraitorMessage isCurrentPlayer={false} hasTransformed={true} />;
        }
        return <UndercoverMessage isCurrentPlayer={false} />;
      case "fool":
        return <FoolMessage isCurrentPlayer={false} playerName={playerName} />;
      case "traitor":
        return <TraitorMessage isCurrentPlayer={false} hasTransformed={false} />;
      default:
        return null;
    }
  };

  return (
    <Card className="p-6 text-center glass-morphism">
      <h3 className="text-xl font-bold mb-4 text-white">
        {playerName} telah di Gantung Mati!
      </h3>

      {getRoleMessage()}

      {role !== "mrwhite" && showWord && word && (
        <p className="text-white/80 mt-2">
          Kata: {word}
        </p>
      )}

      {role !== "fool" && (
        <div className="mt-4">
          <h2 className="font-bold">Tips:</h2>
          <p className="text-sm text-white/70">Yang barusan mati boleh kasih Wasiat/Wejangan untuk penduduk yang masih HIDUP</p>
          <p className="text-sm text-white/70">Setelah itu DIEM!!! gaboleh ngomong</p>
        </div>
      )}

      <MrWhiteGuess />
    </Card>
  );
};
<StandardTips />