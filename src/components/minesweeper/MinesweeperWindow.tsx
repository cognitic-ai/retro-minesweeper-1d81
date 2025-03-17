import React, { ReactNode } from "react";
import { Menu, MenuItem, MenuButton, SubMenu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";

interface MinesweeperWindowProps {
  children: ReactNode;
  title: string;
  difficulty: "beginner" | "intermediate" | "expert";
  onChangeDifficulty: (difficulty: "beginner" | "intermediate" | "expert") => void;
}

export const MinesweeperWindow: React.FC<MinesweeperWindowProps> = ({ 
  children, 
  title,
  difficulty,
  onChangeDifficulty
}) => {
  return (
    <div className="flex flex-col border-4 shadow-md w-full max-w-fit select-none">
      {/* Window border - using Windows 95 style colors */}
      <div className="border-t-[#fff] border-l-[#fff] border-r-[#848484] border-b-[#848484] border-2">
        {/* Title bar */}
        <div className="bg-[#000080] text-white flex items-center justify-between px-1 py-0.5">
          <div className="text-sm font-bold">{title}</div>
          <div className="flex items-center gap-1">
            <button className="w-5 h-5 flex items-center justify-center bg-[#c0c0c0] border-t-[#fff] border-l-[#fff] border-r-[#848484] border-b-[#848484] border text-black text-xs">
              _
            </button>
            <button className="w-5 h-5 flex items-center justify-center bg-[#c0c0c0] border-t-[#fff] border-l-[#fff] border-r-[#848484] border-b-[#848484] border text-black text-xs">
              □
            </button>
            <button className="w-5 h-5 flex items-center justify-center bg-[#c0c0c0] border-t-[#fff] border-l-[#fff] border-r-[#848484] border-b-[#848484] border text-black text-xs">
              ×
            </button>
          </div>
        </div>
        
        {/* Menu bar */}
        <div className="bg-[#c0c0c0] text-black border-b border-b-[#848484] flex">
          <Menu 
            menuButton={
              <MenuButton className="px-2 py-0.5 text-sm hover:bg-[#000080] hover:text-white focus:bg-[#000080] focus:text-white">
                Game
              </MenuButton>
            }
            transition
            menuClassName="bg-[#c0c0c0] border-t-[#848484] border-l-[#848484] border-r-[#fff] border-b-[#fff] border-2"
          >
            <MenuItem onClick={() => onChangeDifficulty("beginner")} className="text-sm px-4 py-1 hover:bg-[#000080] hover:text-white">
              {difficulty === "beginner" ? "✓ Beginner" : "Beginner"}
            </MenuItem>
            <MenuItem onClick={() => onChangeDifficulty("intermediate")} className="text-sm px-4 py-1 hover:bg-[#000080] hover:text-white">
              {difficulty === "intermediate" ? "✓ Intermediate" : "Intermediate"}
            </MenuItem>
            <MenuItem onClick={() => onChangeDifficulty("expert")} className="text-sm px-4 py-1 hover:bg-[#000080] hover:text-white">
              {difficulty === "expert" ? "✓ Expert" : "Expert"}
            </MenuItem>
          </Menu>
          <Menu 
            menuButton={
              <MenuButton className="px-2 py-0.5 text-sm hover:bg-[#000080] hover:text-white focus:bg-[#000080] focus:text-white">
                Help
              </MenuButton>
            }
            transition
            menuClassName="bg-[#c0c0c0] border-t-[#848484] border-l-[#848484] border-r-[#fff] border-b-[#fff] border-2"
          >
            <MenuItem className="text-sm px-4 py-1 hover:bg-[#000080] hover:text-white">
              About
            </MenuItem>
          </Menu>
        </div>
        
        {/* Game content */}
        <div className="bg-[#c0c0c0] p-3">
          {children}
        </div>
      </div>
    </div>
  );
};