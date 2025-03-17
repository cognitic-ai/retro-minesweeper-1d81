import React from "react";

interface Cell {
  row: number;
  col: number;
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacentMines: number;
}

interface MinesweeperCellProps {
  cell: Cell;
  onReveal: () => void;
  onFlag: () => void;
}

export const MinesweeperCell: React.FC<MinesweeperCellProps> = ({
  cell,
  onReveal,
  onFlag,
}) => {
  // Number colors for adjacent mines (Windows 95 Minesweeper colors)
  const getNumberColor = (num: number): string => {
    switch (num) {
      case 1: return "text-blue-600";
      case 2: return "text-green-700";
      case 3: return "text-red-600";
      case 4: return "text-blue-900";
      case 5: return "text-red-900";
      case 6: return "text-teal-600";
      case 7: return "text-black";
      case 8: return "text-gray-600";
      default: return "";
    }
  };

  // Cell content based on state
  const getCellContent = () => {
    if (!cell.isRevealed) {
      return cell.isFlagged ? "🚩" : "";
    }
    
    if (cell.isMine) {
      return "💣";
    }
    
    if (cell.adjacentMines === 0) {
      return "";
    }
    
    return (
      <span className={getNumberColor(cell.adjacentMines)}>
        {cell.adjacentMines}
      </span>
    );
  };

  // Handle right-click for flagging
  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onFlag();
  };

  return (
    <button
      onClick={onReveal}
      onContextMenu={handleRightClick}
      className={`w-6 h-6 flex items-center justify-center text-sm font-bold select-none ${
        cell.isRevealed
          ? "bg-[#c0c0c0] border border-[#848484]"
          : "bg-[#c0c0c0] border-t-[#fff] border-l-[#fff] border-r-[#848484] border-b-[#848484] border-2 hover:border hover:border-[#666] active:border active:border-[#848484]"
      }`}
    >
      {getCellContent()}
    </button>
  );
};