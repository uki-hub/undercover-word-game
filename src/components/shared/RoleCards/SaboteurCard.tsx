import { Card } from "@/components/ui/card";
import { useState } from "react";

interface SaboteurCardProps {
  word: string;
  hasSilencedTarget: boolean;
  silencedPlayerName?: string;
}

export const SaboteurCard = ({ word, hasSilencedTarget, silencedPlayerName }: SaboteurCardProps) => {
  const [hideWord, setHideWord] = useState(false);
  const [hideTips, setHideTips] = useState(false);

  return (
    <Card className="p-6 text-center glass-morphism border-orange-500/50">
      <div className="">
        <p className="text-lg text-white">
          Kamu Adalah <span className="font-bold text-orange-400">Sabotase</span>
        </p>

        {hasSilencedTarget && silencedPlayerName && (
          <div className="mt-4 p-4 bg-orange-500/10 rounded-lg border border-orange-500/30">
            <p className="text-sm text-orange-200 font-semibold">Target Tersebisu</p>
            <p className="text-white/70 text-base mt-2 font-semibold">
              <span className="text-lg font-bold text-orange-400">
                {silencedPlayerName}
              </span>
              <br />
              <span className="text-sm mt-2">Tidak bisa submit deskripsi</span>
            </p>
          </div>
        )}

        <div className="mt-4 p-4 bg-orange-900/30 rounded-lg border border-orange-500/20">
          <p className="text-sm text-orange-200 font-semibold mb-2">Kata Rahasia:</p>
          <p className="text-lg text-white font-bold">
            {hideWord ? "*****" : word}
            <span
              onClick={() => setHideWord(!hideWord)}
              className="ml-2 cursor-pointer text-xs text-orange-300 hover:text-orange-200"
            >
              {hideWord ? "👁️" : "👁️‍🗨️"}
            </span>
          </p>
        </div>

        <h2 onClick={() => setHideTips(!hideTips)} className="mt-4 cursor-pointer underline hover:font-semibold">
          {hideTips ? "Show Tips" : "Hide Tips"}
        </h2>
        {!hideTips && (
          <div className="animate-fade-in">
            <div className="text-white/70 mt-3">
              <p className="text-sm font-semibold text-orange-300">Strategi Sabotase:</p>
              <p className="text-sm mt-1">Silence orang yang penting/jago</p>
              <p className="text-sm mt-2">
                Dengan player yang di-Silence, tim undercover lu bisa lebih aman dari diskusi
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
