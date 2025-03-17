import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
const Index = () => {
  return (
    <div className="container mx-auto min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Windows 95 Games Collection</h1>
      <div className="flex flex-col gap-4 items-center">
        <Link to="/minesweeper">
          <Button 
            className="w-64 py-6 text-lg bg-[#c0c0c0] text-black hover:bg-[#d0d0d0] border-t-[#fff] border-l-[#fff] border-r-[#848484] border-b-[#848484] border-2"
          >
            Play Minesweeper
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;