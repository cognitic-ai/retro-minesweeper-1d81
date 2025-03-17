import React, { useState, useEffect } from "react";
import { MinesweeperCell } from "./MinesweeperCell";

interface Cell {
  row: number;
  col: number;
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacentMines: number;
}

interface MinesweeperBoardProps {
  rows: number;
  cols: number;
  mines: number;
  gameState: "idle" | "playing" | "won" | "lost";
  setGameState: React.Dispatch<React.SetStateAction<"idle" | "playing" | "won" | "lost">>;
  setFlagCount: React.Dispatch<React.SetStateAction<number>>;
}

export const MinesweeperBoard: React.FC<MinesweeperBoardProps> = ({
  rows,
  cols,
  mines,
  gameState,
  setGameState,
  setFlagCount,
}) => {
  const [board, setBoard] = useState<Cell[][]>([]);
  const [firstClick, setFirstClick] = useState(true);

  // Initialize the board
  useEffect(() => {
    initializeBoard();
  }, [rows, cols, mines, gameState === "idle"]);

  // Create a new game board
  const initializeBoard = () => {
    const newBoard: Cell[][] = [];
    
    // Create empty board
    for (let i = 0; i < rows; i++) {
      newBoard[i] = [];
      for (let j = 0; j < cols; j++) {
        newBoard[i][j] = {
          row: i,
          col: j,
          isMine: false,
          isRevealed: false,
          isFlagged: false,
          adjacentMines: 0,
        };
      }
    }
    
    setBoard(newBoard);
    setFirstClick(true);
    setFlagCount(0);
  };
  
  // Place mines on the board, avoiding the first clicked cell
  const placeMines = (firstClickRow: number, firstClickCol: number) => {
    const newBoard = [...board];
    let minesPlaced = 0;
    
    // Place mines randomly but avoid the first clicked cell
    while (minesPlaced < mines) {
      const randomRow = Math.floor(Math.random() * rows);
      const randomCol = Math.floor(Math.random() * cols);
      
      // Skip if already a mine or if it's the first clicked cell
      if (newBoard[randomRow][randomCol].isMine || 
          (randomRow === firstClickRow && randomCol === firstClickCol)) {
        continue;
      }
      
      newBoard[randomRow][randomCol].isMine = true;
      minesPlaced++;
    }
    
    // Calculate adjacent mines count for each cell
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (!newBoard[i][j].isMine) {
          let count = 0;
          
          // Check all 8 adjacent cells
          for (let di = -1; di <= 1; di++) {
            for (let dj = -1; dj <= 1; dj++) {
              if (di === 0 && dj === 0) continue;
              
              const ni = i + di;
              const nj = j + dj;
              
              if (ni >= 0 && ni < rows && nj >= 0 && nj < cols && newBoard[ni][nj].isMine) {
                count++;
              }
            }
          }
          
          newBoard[i][j].adjacentMines = count;
        }
      }
    }
    
    setBoard(newBoard);
  };
  
  // Handle cell reveal
  const handleCellReveal = (rowIndex: number, colIndex: number) => {
    // Do nothing if the game is over or cell is flagged
    if (gameState === "won" || gameState === "lost" || board[rowIndex][colIndex].isFlagged) {
      return;
    }
    
    // If it's the first click, start the game and place mines
    if (firstClick) {
      setFirstClick(false);
      setGameState("playing");
      placeMines(rowIndex, colIndex);
    }
    
    const newBoard = [...board];
    
    // If the cell is already revealed, do nothing
    if (newBoard[rowIndex][colIndex].isRevealed) {
      return;
    }
    
    // Reveal the cell
    newBoard[rowIndex][colIndex].isRevealed = true;
    
    // If it's a mine, game over
    if (newBoard[rowIndex][colIndex].isMine) {
      revealAllMines(newBoard);
      setGameState("lost");
      return;
    }
    
    // If it's an empty cell (no adjacent mines), reveal adjacent cells
    if (newBoard[rowIndex][colIndex].adjacentMines === 0) {
      revealAdjacentCells(rowIndex, colIndex, newBoard);
    }
    
    // Check if the player has won
    checkWinCondition(newBoard);
    
    setBoard(newBoard);
  };
  
  // Reveal all adjacent cells recursively for empty cells
  const revealAdjacentCells = (rowIndex: number, colIndex: number, boardCopy: Cell[][]) => {
    for (let di = -1; di <= 1; di++) {
      for (let dj = -1; dj <= 1; dj++) {
        if (di === 0 && dj === 0) continue;
        
        const ni = rowIndex + di;
        const nj = colIndex + dj;
        
        if (ni >= 0 && ni < rows && nj >= 0 && nj < cols && 
            !boardCopy[ni][nj].isRevealed && !boardCopy[ni][nj].isFlagged) {
          boardCopy[ni][nj].isRevealed = true;
          
          if (boardCopy[ni][nj].adjacentMines === 0) {
            revealAdjacentCells(ni, nj, boardCopy);
          }
        }
      }
    }
  };
  
  // Handle right-click for flagging cells
  const handleCellFlag = (rowIndex: number, colIndex: number) => {
    // Do nothing if the game is over or cell is revealed
    if (gameState === "won" || gameState === "lost" || board[rowIndex][colIndex].isRevealed) {
      return;
    }
    
    if (gameState === "idle") {
      setGameState("playing");
    }
    
    const newBoard = [...board];
    const cell = newBoard[rowIndex][colIndex];
    
    cell.isFlagged = !cell.isFlagged;
    
    // Update flag count
    setFlagCount((prev) => cell.isFlagged ? prev + 1 : prev - 1);
    
    setBoard(newBoard);
  };
  
  // Reveal all mines when the game is lost
  const revealAllMines = (boardCopy: Cell[][]) => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (boardCopy[i][j].isMine) {
          boardCopy[i][j].isRevealed = true;
        }
      }
    }
  };
  
  // Check if the player has won
  const checkWinCondition = (boardCopy: Cell[][]) => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        // If there's a non-mine cell that's not revealed, the game is not won yet
        if (!boardCopy[i][j].isMine && !boardCopy[i][j].isRevealed) {
          return;
        }
      }
    }
    
    // Flag all mines and set game state to won
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (boardCopy[i][j].isMine) {
          boardCopy[i][j].isFlagged = true;
        }
      }
    }
    
    setFlagCount(mines);
    setGameState("won");
  };
  
  return (
    <div 
      className="border-t-[#848484] border-l-[#848484] border-r-[#fff] border-b-[#fff] border-2 bg-[#c0c0c0]"
      style={{ 
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
      }}
    >
      {board.map((row, rowIndex) => (
        row.map((cell, colIndex) => (
          <MinesweeperCell
            key={`${rowIndex}-${colIndex}`}
            cell={cell}
            onReveal={() => handleCellReveal(rowIndex, colIndex)}
            onFlag={() => handleCellFlag(rowIndex, colIndex)}
          />
        ))
      ))}
    </div>
  );
};