import { Card } from "@/components/ui/card";
import { useState } from "react";

interface TraitorCardProps {
  word: string;
  transformationRound: number;
  currentRound: number;
}

export const TraitorCard = ({ word, transformationRound, currentRound }: TraitorCardProps) => {
  const [hideWord, setHideWord] = useState(false);
  const [hideTips, setHideTips] = useState(false);
  
  const isTransformed = currentRound >= transformationRound;
  const roundsUntilTransformation = transformationRound - currentRound;

  return (
    <Card className="p-6 text-center glass-morphism border-purple-500/50">
      <div className="">
        <p className="text-lg text-white">
          Kamu Adalah <span className="font-bold text-purple-400">Traitor</span>
        </p>

        <div className="mt-4 p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
          <p className="text-sm text-purple-200 font-semibold">
            {isTransformed ? "Lu menghianati teman2 lu!" : "Status Traitor"}
          </p>
          {!isTransformed && (
            <p className="text-2xl font-bold text-purple-400 mt-2">
              {roundsUntilTransformation} Round Lagi
            </p>
          )}
          {!isTransformed && (
            <p className="text-xs text-purple-200 mt-1">
              sebelum lu menjadi Undercover
            </p>
          )}
          {isTransformed && (
            <p className="text-xs text-purple-200 mt-1">
              Sekarang lu adalah UNDERCOVER!!!
            </p>
          )}
        </div>

        <div className="mt-4 p-4 bg-purple-900/30 rounded-lg border border-purple-500/20">
          <p className="text-sm text-purple-200 font-semibold mb-2">Kata Rahasia:</p>
          <p className="text-lg text-white font-bold">
            {hideWord ? "*****" : word}
            <span 
              onClick={() => setHideWord(!hideWord)}
              className="ml-2 cursor-pointer text-xs text-purple-300 hover:text-purple-200"
            >
              {hideWord ? "👁️" : "👁️‍🗨️"}
            </span>
          </p>
        </div>

        <h2
          onClick={() => setHideTips(!hideTips)}
          className="mt-4 cursor-pointer underline hover:font-semibold"
        >
          {hideTips ? "Show Tips" : "Hide Tips"}
        </h2>
        {!hideTips && (
          <div className="animate-fade-in">
            <div className="text-white/70 mt-3">
              <p className="text-sm font-semibold text-purple-300">Strategi Ketika Masih Civilian:</p>
              <p className="text-sm mt-1">
                Main kyk Civilian seperti biasa. Bantu tim Civilian untuk mencari Undercover
              </p>
              <p className="text-sm mt-2">
                Jelaskan ciri-ciri kata dengan JUJUR dan natural seperti Civilian biasa
              </p>
            </div>
            <br />
            <div className="text-white/70">
              <p className="text-sm font-semibold text-purple-300">Strategi Setelah Jadi Undercover:</p>
              <p className="text-sm mt-1">
                Ubah strategi dan mulai mencurigakan/nyamarkan diri dari Civilian
              </p>
              <p className="text-sm mt-2">
                Koordinasi dengan undercover lain untuk mengalahkan Civilian
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
