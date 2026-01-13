interface CivilianMessageProps {
  isCurrentPlayer: boolean;
}

export const CivilianMessage = ({ isCurrentPlayer }: CivilianMessageProps) => {
  return (
    <>
      <p className="text-lg mb-2 text-white">
        {isCurrentPlayer ? "Kamu" : "Dia"} adalah seorang{" "}
        <span className="font-bold text-primary">Penduduk</span>
      </p>
    </>
  );
};
