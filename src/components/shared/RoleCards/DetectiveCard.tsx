import { Card } from "@/components/ui/card";
import { useState } from "react";

interface DetectiveCardProps {
  word: string;
  scanResult?: {
    player1Name: string;
    player2Name: string;
    result: "=" | "≠";
  };
}

export const DetectiveCard = ({ word, scanResult }: DetectiveCardProps) => {
  const [hideWord, setHideWord] = useState(false);
  const [hideTips, setHideTips] = useState(false);

  return (
    <Card className="p-6 text-center glass-morphism border-blue-500/50">
      <div className="">
        <p className="text-lg text-white">
          Kamu Adalah <span className="font-bold text-blue-400">Detective</span>
        </p>

        {scanResult && (
          <div className="mt-4 p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
            <p className="text-sm text-blue-200 font-semibold">Hasil Scan</p>
            <p className="text-white/70 text-base mt-2 font-semibold">
              {scanResult.player1Name} dan {scanResult.player2Name}
              <br />
              <span className="text-lg font-bold text-blue-400 mt-2">
                Memiliki Kata
                {scanResult.result === "=" ? " Sama (=)" : " Berbeda (≠)"}
              </span>
            </p>
          </div>
        )}

        <div className="mt-4 p-4 bg-blue-900/30 rounded-lg border border-blue-500/20">
          <p className="text-sm text-blue-200 font-semibold mb-2">Kata Rahasia:</p>
          <p className="text-lg text-white font-bold">
            {hideWord ? "*****" : word}
            <span
              onClick={() => setHideWord(!hideWord)}
              className="ml-2 cursor-pointer text-xs text-blue-300 hover:text-blue-200"
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
              <p className="text-sm font-semibold text-blue-300">Strategi Detective:</p>
              <p className="text-sm mt-1">Gunakan skill Scan lu yang bener kids!</p>
              <p className="text-sm mt-2">
                Jika 2 pemain punya kata berbeda, salah satu mereka mungkin Undercover atau Solo
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
