import React from "react";

interface MinesweeperHeaderProps {
  mines: number;
  flagCount: number;
  time: number;
  gameState: "idle" | "playing" | "won" | "lost";
  onReset: () => void;
}

export const MinesweeperHeader: React.FC<MinesweeperHeaderProps> = ({
  mines,
  flagCount,
  time,
  gameState,
  onReset,
}) => {
  // Clamp the display to 3 digits (0-999)
  const remainingMines = Math.max(0, Math.min(mines - flagCount, 999));
  const displayTime = Math.min(time, 999);

  // Get the appropriate smiley face based on game state
  const getFaceIcon = () => {
    switch (gameState) {
      case "idle":
        return "🙂";
      case "playing":
        return "🙂";
      case "won":
        return "😎";
      case "lost":
        return "😵";
      default:
        return "🙂";
    }
  };

  // Convert number to 3-digit display
  const formatDisplay = (num: number): string => {
    return num.toString().padStart(3, "0");
  };

  return (
    <div className="p-2 border-t-[#848484] border-l-[#848484] border-r-[#fff] border-b-[#fff] border-2 mb-2 flex justify-between items-center">
      {/* Mine counter */}
      <div className="bg-black text-[#FF0000] font-bold px-1 py-0.5 border-2 border-t-[#555] border-l-[#555] border-r-[#fff] border-b-[#fff] font-mono">
        {formatDisplay(remainingMines)}
      </div>

      {/* Reset button */}
      <button
        onClick={onReset}
        className="w-10 h-10 border-t-[#fff] border-l-[#fff] border-r-[#848484] border-b-[#848484] bg-[#c0c0c0] border-2 flex items-center justify-center text-xl hover:border-[#666] active:border-t-[#848484] active:border-l-[#848484] active:border-r-[#fff] active:border-b-[#fff]"
      >
        {getFaceIcon()}
      </button>

      {/* Timer */}
      <div className="bg-black text-[#FF0000] font-bold px-1 py-0.5 border-2 border-t-[#555] border-l-[#555] border-r-[#fff] border-b-[#fff] font-mono">
        {formatDisplay(displayTime)}
      </div>
    </div>
  );
};