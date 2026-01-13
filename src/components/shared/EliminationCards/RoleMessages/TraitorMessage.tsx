interface TraitorMessageProps {
  isCurrentPlayer: boolean;
  hasTransformed?: boolean;
}

export const TraitorMessage = ({ isCurrentPlayer, hasTransformed = false }: TraitorMessageProps) => {
  if (isCurrentPlayer) {
    if (hasTransformed) {
      return (
        <>
          <p className="text-purple-400 font-semibold mt-2">Kamu adalah Traitor!</p>
          <p className="text-white/70 text-sm mt-2">Civilian berhasil menangkap Lu</p>
        </>
      );
    }

    return (
      <>
        <p className="text-lg mb-2 text-white">
          {isCurrentPlayer ? "Kamu" : "Dia"} adalah seorang <span className="font-bold text-primary">Penduduk</span>
        </p>
      </>
    );
  }

  if (hasTransformed) {
    return (
      <>
        <p className="text-purple-400 font-semibold mt-2">Dia adalah Traitor!</p>
        <p className="text-white/70 text-sm mt-2">
          Dia sudah mengkhianati tim Civilian dan bermain sebagai Undercover!
        </p>
      </>
    );
  }

  return (
    <>
      <p className="text-lg mb-2 text-white">
        {isCurrentPlayer ? "Kamu" : "Dia"} adalah seorang <span className="font-bold text-primary">Penduduk</span>
      </p>
    </>
  );
};
