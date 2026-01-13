interface FoolMessageProps {
  isCurrentPlayer: boolean;
  playerName?: string;
}

export const FoolMessage = ({ isCurrentPlayer, playerName }: FoolMessageProps) => {
  if (isCurrentPlayer) {
    return (
      <>
        <p className="text-lg mb-2 text-white">
          Kamu adalah seorang{" "}
          <span className="font-bold text-yellow-400">Fool</span>
        </p>
        <div className="mt-4 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
          <h2 className="font-bold text-yellow-300">🎉 KAMU MENANG! 🎉</h2>
          <p className="text-sm text-yellow-200 mt-2">
            Sebagai Fool, kamu berhasil membuat orang lain curiga dan memilihmu!
          </p>
          <p className="text-sm text-yellow-200 mt-1">
            Congratulations, kamu master manipulator! 🃏
          </p>
        </div>
      </>
    );
  }

  return (
    <div className="mt-4 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
      <p className="text-lg text-yellow-300 font-bold">
        🎭 Plot Twist! 🎭
      </p>
      <p className="text-md text-yellow-200 mt-2">
        {playerName} adalah <span className="font-bold text-yellow-400">Fool</span> dan menang!
      </p>
      <p className="text-sm text-yellow-200/80 mt-1">
        Kalian semua kena tipu! 🃏
      </p>
    </div>
  );
};
