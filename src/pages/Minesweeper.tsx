import { useState, useEffect } from "react";
import { MinesweeperBoard } from "@/components/minesweeper/MinesweeperBoard";
import { MinesweeperHeader } from "@/components/minesweeper/MinesweeperHeader";
import { MinesweeperWindow } from "@/components/minesweeper/MinesweeperWindow";

const Minesweeper = () => {
  const [gameState, setGameState] = useState<"idle" | "playing" | "won" | "lost">("idle");
  const [time, setTime] = useState(0);
  const [flagCount, setFlagCount] = useState(0);
  const [difficulty, setDifficulty] = useState<"beginner" | "intermediate" | "expert">("beginner");
  
  const difficultySettings = {
    beginner: { rows: 9, cols: 9, mines: 10 },
    intermediate: { rows: 16, cols: 16, mines: 40 },
    expert: { rows: 16, cols: 30, mines: 99 },
  };
  
  const { rows, cols, mines } = difficultySettings[difficulty];
  
  // Reset timer when game state changes
  useEffect(() => {
    if (gameState === "playing") {
      const timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
      
      return () => clearInterval(timer);
    }
    
    if (gameState === "idle") {
      setTime(0);
      setFlagCount(0);
    }
  }, [gameState]);
  
  const handleReset = () => {
    setGameState("idle");
    setTime(0);
    setFlagCount(0);
  };

  const handleChangeDifficulty = (newDifficulty: "beginner" | "intermediate" | "expert") => {
    setDifficulty(newDifficulty);
    handleReset();
  };
  
  return (
    <div className="container mx-auto min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-fit">
        <MinesweeperWindow 
          title="Minesweeper" 
          onChangeDifficulty={handleChangeDifficulty}
          difficulty={difficulty}
        >
          <MinesweeperHeader 
            mines={mines} 
            flagCount={flagCount} 
            time={time} 
            gameState={gameState} 
            onReset={handleReset} 
          />
          <MinesweeperBoard 
            rows={rows} 
            cols={cols} 
            mines={mines} 
            gameState={gameState}
            setGameState={setGameState}
            setFlagCount={setFlagCount}
          />
        </MinesweeperWindow>
      </div>
    </div>
  );
};

export default Minesweeper;