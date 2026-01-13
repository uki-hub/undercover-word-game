interface MrWhiteMessageProps {
  isCurrentPlayer: boolean;
}

export const MrWhiteMessage = ({ isCurrentPlayer }: MrWhiteMessageProps) => {
  return (
    <>
      <p className="text-lg mb-2 text-white">
        {isCurrentPlayer ? "Kamu" : "Dia"} adalah seorang{" "}
        <span className="font-bold text-primary">Mr. White</span>
      </p>
    </>
  );
};
