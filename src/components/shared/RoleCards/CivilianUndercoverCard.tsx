import { Card } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface CivilianUndercoverCardProps {
  word: string;
}

export const CivilianUndercoverCard = ({ word }: CivilianUndercoverCardProps) => {
  const [hideWord, setHideWord] = useState(false);
  const [hideTips, setHideTips] = useState(false);

  return (
    <Card className="p-6 text-center glass-morphism">
      <div className="">
        <div className="w-full">
          <p className="text-lg text-white">
            Kata kamu adalah:{" "}
            <span className="font-bold text-primary">{hideWord ? "*****" : word}</span>
            <div onClick={() => setHideWord(!hideWord)} className="inline ml-2.5">
              {hideWord ? (
                <Eye className="inline stroke-gray-200 size-[20px] cursor-pointer" />
              ) : (
                <EyeOff className="inline stroke-gray-200 size-[20px] cursor-pointer" />
              )}
            </div>
          </p>
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
              <p className="text-sm">Di inget dan dipahami baik2 kids kata yang didapat</p>
              <p className="text-sm">Jangan jadi villager tolol</p>
            </div>
            <br />
            <p className="text-sm text-white/70">
              Jelaskan ciri2 kata itu tanpa terlalu detail
              <br />
              Pinter-pinter, bisa jadi ada penyusup/lawan yang menyamar dari kata yang kita berikan
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};
