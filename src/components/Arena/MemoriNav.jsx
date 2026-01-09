import Link from "next/link";
import React from "react";

const MemoriNav = ({ xpEarned, province }) => {
  return (
    <nav className="w-full h-20 bg-[#1a2832] px-4 md:px-10 flex items-center">
      <div className="w-full md:w-[80%] mx-auto flex flex-row items-center justify-between gap-2 md:gap-0">
        <div className="flex flex-col justify-start">
          <span className="text-[#c8a668] text-xs uppercase tracking-wider">
            Kuis Budaya
          </span>
          <span className="text-xl md:text-2xl text-white font-medium">
            {province?.name}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-medium text-[#c7c7c7] text-sm md:text-lg">
              Total XP:{" "}
            </span>
            <span className="text-[#c8a668] font-bold text-sm md:text-lg">
              {xpEarned}
            </span>
          </div>
          <Link
            href="/arena"
            className="text-red-500 py-1.5 px-3 md:px-4 rounded-lg border border-red-500 bg-red-500/30 hover:bg-red-500/50 transition text-sm md:text-base"
          >
            Keluar
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default MemoriNav;
