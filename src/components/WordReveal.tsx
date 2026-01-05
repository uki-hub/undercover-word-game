import { useGame } from "../context/GameContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePeer } from "../context/PeerContext";
import { PlayerList } from "./shared/PlayerList";
import { useEffect, useState } from "react";
import { useSound } from "@/context/SoundContext";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

export const WordReveal = () => {
  const { gameState, setPhase, submitDescription, rerollWords, secondRound, editKata } = useGame();
  const { peer, isHost, sendToHost } = usePeer();
  const { playSound } = useSound();

  const [hideWord, setHideWord] = useState(false);
  const [hideTips, setHideTips] = useState(false);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (gameState.currentRound === 1) {
      playSound("/sounds/word-reveal.mp3");
    } else {
      playSound("/sounds/new-page.mp3");
    }
  }, []);

  const currentPlayer = gameState.players.find(p => p.id === peer?.id);

  const handleSecondRound = () => {
    secondRound();
  };

  const handleEditKata = () => {
    editKata()
  }

  const handleStartVoting = () => {
    setPhase("voting");
  };

  const handleSubmitDescription = () => {
    if (!description.trim()) return;

    if (description.trim().toLowerCase() === currentPlayer.word.toLowerCase()) {
      toast.error("Ciri2 dari kata rahasia nya kids, bukan kata itu sendiri");
      return;
    }

    if (isHost) {
      submitDescription(currentPlayer.id, description.trim());
    } else {
      sendToHost({
        type: "SUBMIT_DESCRIPTION",
        playerId: currentPlayer.id,
        description: description.trim()
      });
    }
    setDescription("");
  };

  if (!peer) {
    return <div className="text-white text-center">Connecting to game network...</div>;
  }

  if (!currentPlayer) {
    return (
      <div className="text-white text-center">
        <p>Waiting for game data...</p>
        <p className="text-sm opacity-70">Your ID: {peer.id}</p>
      </div>
    );
  }

  // Convert speaking order IDs to player objects
  const speakingOrderPlayers = gameState.speakingOrder
    ? gameState.speakingOrder
      .map(id => gameState.players.find(p => p.id === id))
      .filter((p): p is NonNullable<typeof p> => p !== undefined && !p.isEliminated)
    : [];

  const gameCurrentPlayerIndex = gameState.currentPlayerIndex;
  const gameCurrentPlayerId = gameState.speakingOrder[gameCurrentPlayerIndex];
  const isMyTurn = gameCurrentPlayerId == currentPlayer.id;

  return (
    <div className="max-w-md md:max-w-2xl mx-auto p-3 space-y-4 animate-fade-in">
      <h2 className="text-2xl font-bold text-center mb-4 text-white">{currentPlayer.isEliminated ? "Kamu di Gantung" : "Diskusi"}</h2>
      <Card className="p-6 text-center glass-morphism">
        <div className="">
          {currentPlayer.role === "mrwhite" ? (
            <p className="text-lg text-white">Kamu Adalah <span className="font-bold text-primary">Mr.White</span></p>
          ) : (
            <div className="w-full">
              <p className="text-lg text-white">
                Kata kamu {currentPlayer.isEliminated ? "adalah" : "adalah"}: <span className="font-bold text-primary">{hideWord ? "*****" : currentPlayer.word}</span>
                <div
                  onClick={() => setHideWord(!hideWord)}
                  className="inline ml-2.5">
                  {hideWord ? <Eye className="inline stroke-gray-200 size-[20px] cursor-pointer" /> : <EyeOff className="inline stroke-gray-200 size-[20px] cursor-pointer" />}
                </div>
              </p>
            </div>

          )}

          <h2 onClick={() => setHideTips(!hideTips)} className="mt-4 cursor-pointer underline hover:font-semibold">{hideTips ? "Show Tips" : "Hide Tips"}</h2>
          {
            hideTips ? <></> : <div className="animate-fade-in">
              <div className="text-white/70">
                <p className="text-sm">Di inget dan dipahami baik2 kids kata yang didapat</p>
                <p className="text-sm">Jangan jadi villager tolol</p>
              </div>
              <br />
              <p className="text-sm text-white/70">
                {currentPlayer.role === "mrwhite"
                  ? (
                    <>
                      Dengerin baik-baik dan coba nyamain diri sama yang lain dari ciri2 kata pemain lain
                      <br />
                      Cari tahu kata rahasianya dari deskripsi yang orang lain berikan.
                    </>
                  )
                  : (
                    <>
                      Jelaskan ciri2 kata itu tanpa terlalu detail
                      <br />
                      Pinter-pinter, bisa jadi ada penyusup/lawan yang menyamar dari kata yang kita berikan
                    </>
                  )}
              </p>
            </div>
          }

        </div>
      </Card>

      <div className="mt-8 space-y-4">
        <h3 className="text-xl font-semibold text-white text-center">{isMyTurn ? "Jalan Woi!!!, Jelasin Kata2 Lu" : "Urutan Jalan"}</h3>

        {isMyTurn && (
          <div className="relative flex h-10 w-full min-w-[200px]">
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSubmitDescription();
                }
              }}
              placeholder="Ciri2 Kata Lu..."
              className="peer h-full w-full rounded-[7px] border px-3 py-2.5 pr-20 text-sm font-normal outline-none transition-all"
            />
            {description.trim() && (
              <button
                onClick={handleSubmitDescription}

                type="button"
                className="!absolute right-1 top-1 z-10 select-none rounded bg-primary hover:bg-primary/90 py-2 px-4 text-center align-middle text-xs font-bold uppercase text-white shadow-md shadow-primary/20 transition-all focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                data-ripple-light="true"
              >
                SUBMIT
              </button>
            )}
          </div>
        )}

        <PlayerList
          players={speakingOrderPlayers}
          currentPlayerId={peer.id}
          speakingOrder={true}
        />
      </div>

      {isHost && (
        <div className="flex flex-col md:flex-row gap-2">
          {/* Primary / Main action */}
          <Button
            onClick={handleSecondRound}
            size="lg"
            className="w-full bg-primary/30 text-secondary-foreground text-lg font-semibold
               hover:bg-primary/50
               transition-colors duration-200 border border-primary"
          >
            Jalan lagi
          </Button>

          {/* Edit kata */}
          {
            gameState.currentPlayerIndex > 0 ?
              <Button
                onClick={handleEditKata}
                size="lg"
                className="w-full bg-primary/30 text-secondary-foreground text-lg font-semibold
                hover:bg-primary/50
                transition-colors duration-200 border border-primary"
              >
                Edit kata
              </Button>
              : null
          }

          {/* Secondary action */}
          <Button
            onClick={handleStartVoting}
            size="lg"
            className="w-full bg-primary text-white text-lg font-semibold
               hover:bg-primary/90 active:scale-[0.98]
               transition-all duration-200 shadow-md"

          >
            Voting
          </Button>

          {/* Tertiary / Utility action */}
          {gameState.currentRound === 1 && (
            <Button
              onClick={() => {
                rerollWords();
                toast.success("Rerolled word-pair!");
              }}
              variant="outline"
              size="lg"
              className="w-full border border-primary text-primary text-lg font-semibold
                 hover:bg-primary/10 hover:border-solid
                 transition-all duration-200"
            >
              Ganti kata
            </Button>
          )}
        </div>

      )}
    </div>
  );
};