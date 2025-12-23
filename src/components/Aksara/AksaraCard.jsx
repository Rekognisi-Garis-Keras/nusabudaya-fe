// components/AksaraCard.jsx
"use client"; // Wajib karena pake hooks & event listener

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";

const AksaraCard = ({ item }) => {
  const cardRef = useRef(null);

  const handleEnter = () => {
    gsap.to(cardRef.current, {
      scale: 1.03,
      duration: 0.2,
      ease: "power3.out",
      y: -5,
    });
  };

  const handleLeave = () => {
    gsap.to(cardRef.current, {
      scale: 1,
      duration: 0.2,
      ease: "power3.out",
      y: 0,
    });
  };

  return (
    <Link href={item.path} className="block">
      <div
        ref={cardRef}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="w-full col-span-1 border border-[#5b5b5b] flex flex-col justify-center items-center rounded-lg overflow-hidden cursor-pointer will-change-transform hover:border-(--color-secondary)"
      >
        {/* Preview Area (Putih) */}
        <div className="w-full h-40 bg-[#0d1922] border-b border-[#5b5b5b] flex items-center justify-center p-4 relative">
          <img src={`/aksara/${item.image}`} alt="" className="w-25" />
        </div>

        {/* Label Area */}
        <div className="h-12 flex items-center justify-center w-full bg-(--color-primary) group-hover:bg-[#0d1a22] transition-colors">
          <p className="text-white font-medium capitalize tracking-wide">
            {`Aksara ${item.labelAksara}`}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default AksaraCard;
