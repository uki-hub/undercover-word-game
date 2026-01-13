import { Card } from "@/components/ui/card";
import { useState } from "react";

interface FoolCardProps {
  deathsToTrigger: number;
  currentDeathCount: number;
}

export const FoolCard = ({ deathsToTrigger, currentDeathCount }: FoolCardProps) => {
  const [hideTips, setHideTips] = useState(false);
  const remainingDeaths = deathsToTrigger - currentDeathCount;

  return (
    <Card className="p-6 text-center glass-morphism border-yellow-500/50">
      <div className="">
        <p className="text-lg text-white">
          Kamu Adalah <span className="font-bold text-yellow-400">Fool</span>
        </p>

        <div className="mt-4 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
          <p className="text-sm text-yellow-200 font-semibold">Auto Mati Counter</p>
          <p className="text-2xl font-bold text-yellow-400 mt-2">{remainingDeaths} pemain</p>
          <p className="text-xs text-yellow-200 mt-1">sisa sebelum kamu bunuh diri</p>
        </div>

        <h2
          onClick={() => setHideTips(!hideTips)}
          className="mt-4 cursor-pointer underline hover:font-semibold"
        >
          {hideTips ? "Show Tips" : "Hide Tips"}
        </h2>
        {hideTips ? (
          <></>
        ) : (
          <div className="animate-fade-in">
            <div className="text-white/70">
              <p className="text-sm">Sebagai Fool, tujuan lu itu buat di Vote</p>
              <p className="text-sm mt-2">Jika Lu berhasil di Vote, LU MENANG!!!</p>
            </div>
            <br />
            <p className="text-sm text-white/70">
              <span className="font-semibold text-yellow-300">Strategi:</span>
              <br />
              Buat deskripsi yang mencurigakan atau tidak cocok dengan kata sebenarnya
              <br />
              Bertingkah aneh agar player lain merasa ada villager tolol!!!
              <br />
              Tapi hati-hati, jangan terlalu aneh kalau lu mau dieliminasi harus membaur kids!
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};
