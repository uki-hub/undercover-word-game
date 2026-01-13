import { Card } from "@/components/ui/card";
import { useState } from "react";

export const MrWhiteCard = () => {
  const [hideTips, setHideTips] = useState(false);

  return (
    <Card className="p-6 text-center glass-morphism border-primary/50">
      <div className="">
        <p className="text-lg text-white">
          Kamu Adalah <span className="font-bold text-primary">Mr.White</span>
        </p>

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
              <p className="text-sm">Di inget dan dipahami baik2 kids kata yang didapat</p>
              <p className="text-sm">Jangan jadi villager tolol</p>
            </div>
            <br />
            <p className="text-sm text-white/70">
              Dengerin baik-baik dan coba nyamain diri sama yang lain dari ciri2 kata pemain lain
              <br />
              Cari tahu kata rahasianya dari deskripsi yang orang lain berikan.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};
