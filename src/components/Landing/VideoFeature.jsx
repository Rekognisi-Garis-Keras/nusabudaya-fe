import React from "react";

const VideoFeature = ({ children, title, change }) => {
  return (
    <div
      className={`w-full flex ${
        change ? "md:justify-end" : "md:justify-start"
      } justify-center`}
    >
      {/* MacOS Window Container */}
      <div className="w-[80%] rounded-lg overflow-hidden shadow-2xl bg-[#1C1C1C] border border-white/10 relative">
        {/* 1. Title Bar (Header) */}
        <div className="h-6 bg-[#2A2A2A] flex items-center px-4 justify-between border-b border-black/50">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57] border border-[#E0443E]"></div>{" "}
            <div className="w-3 h-3 rounded-full bg-[#FEBC2E] border border-[#D89E24]"></div>{" "}
            <div className="w-3 h-3 rounded-full bg-[#28C840] border border-[#1AAB29]"></div>{" "}
          </div>

          {/* Title (Optional - biar mirip mpv) */}
          <div className="text-gray-400 text-xs font-mono font-medium absolute left-1/2 -translate-x-1/2">
            {`${title.toLowerCase()}.mp4`}
          </div>
        </div>

        {/* 2. Video Content */}
        <div className="relative bg-black">{children}</div>
      </div>
    </div>
  );
};

export default VideoFeature;
