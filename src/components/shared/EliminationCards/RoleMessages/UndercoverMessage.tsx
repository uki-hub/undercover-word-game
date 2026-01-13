interface UndercoverMessageProps {
  isCurrentPlayer: boolean;
}

export const UndercoverMessage = ({ isCurrentPlayer }: UndercoverMessageProps) => {
  return (
    <>
      <p className="text-lg mb-2 text-white">
        {isCurrentPlayer ? "Kamu" : "Dia"} adalah seorang{" "}
        <span className="font-bold text-red-400">Undercover</span>
      </p>
    </>
  );
};
