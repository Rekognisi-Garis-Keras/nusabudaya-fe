import Link from "next/link";
import React from "react";

const MemoriNav = ({ xpEarned }) => {
  return (
    <nav className="w-full h-25 bg-[#1a2832] px-10">
      <div className="w-[80%] h-full mx-auto flex items-center justify-between">
        <div className="flex flex-col justify-start">
          <span className="text-[#c8a668] text-xs uppercase tracking-wider">
            Kartu Memori
          </span>
          <span className="text-2xl text-white font-medium">Jawa Barat</span>
        </div>
        <div>
          <span className="font-medium text-[#c7c7c7] text-lg">
            Total XP:{" "}
            <span className="text-[#c8a668] font-bold">{xpEarned}</span>
          </span>
        </div>
        <Link
          href="/arena"
          className="text-red-500 py-1.5 px-4 rounded-lg border border-red-500 bg-red-500/30 hover:bg-red-500/50 transition"
        >
          Quit Game
        </Link>
      </div>
    </nav>
  );
};

export default MemoriNav;
