import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React from "react";
import { X } from "lucide-react"; // Optional: Buat tombol close kalau mau

const DetailProvince = ({ province, onClose }) => {
  const openClipPath = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
  const closedClipPath = "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)";
  useGSAP(() => {
    gsap.fromTo(
      ".panel",
      { clipPath: closedClipPath },
      {
        clipPath: openClipPath,
        duration: 1.2,
        ease: "power3.inOut",
      }
    );
  }, [province]); // Trigger ulang animasi kalau province berubah

  const handleCloseClick = () => {
    gsap.to(".panel", {
      clipPath: closedClipPath,
      duration: 0.8, // Durasi tutup lebih cepet dikit biar snappy
      ease: "power3.inOut",
      onComplete: () => {
        // 🔥 PENTING: Panggil onClose dari parent SETELAH animasi selesai
        onClose();
      },
    });
  };

  if (!province) return null;

  return (
    <div className="panel w-[400px] h-screen fixed z-9999 top-0 left-64 bg-white/90 backdrop-blur-md shadow-2xl border-r border-gray-200 overflow-y-auto p-8 text-slate-800">
      {/* ✨ TOMBOL CLOSE (X) */}
      <button
        onClick={handleCloseClick}
        className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-red-100 hover:text-red-600 rounded-full transition-colors duration-200 group"
      >
        <X size={20} className="text-gray-600 group-hover:text-red-600" />
      </button>

      {/* --- HEADER --- */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-purple-700 mb-1">
          {province.capital} {/* Atau nama provinsi kalau dipassing */}
        </h2>
        <p className="text-sm italic text-gray-500">"{province.motto}"</p>
      </div>

      {/* --- INFO UTAMA --- */}
      <div className="space-y-4 mb-8">
        <div className="flex justify-between border-b pb-2 border-gray-300">
          <span className="font-semibold text-gray-600">Ibu Kota</span>
          <span>{province.capital}</span>
        </div>
        <div className="flex justify-between border-b pb-2 border-gray-300">
          <span className="font-semibold text-gray-600">Luas Wilayah</span>
          <span>{province.area}</span>
        </div>
        <div className="flex justify-between border-b pb-2 border-gray-300">
          <span className="font-semibold text-gray-600">Populasi</span>
          <span>{province.population} Jiwa</span>
        </div>
      </div>

      {/* --- BUDAYA (Grid Layout) --- */}
      <div className="mb-8">
        <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
          🎭 Budaya
        </h3>
        <ul className="space-y-2 text-sm">
          <li>
            🏠 <b>Rumah:</b> {province.traditionalHouse}
          </li>
          <li>
            💃 <b>Tari:</b> {province.traditionalDance}
          </li>
          <li>
            👕 <b>Pakaian:</b> {province.traditionalClothing}
          </li>
        </ul>
      </div>

      {/* --- MAKANAN KHAS (Pake Map Disini) --- */}
      <div className="mb-8">
        <h3 className="font-bold text-lg mb-3">🍽️ Kuliner Khas</h3>
        <div className="flex flex-wrap gap-2">
          {province.signature_foods?.map((food, idx) => (
            <span
              key={idx}
              className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-semibold"
            >
              {food}
            </span>
          ))}
        </div>
      </div>

      {/* --- WISATA (Pake Map Lagi) --- */}
      <div>
        <h3 className="font-bold text-lg mb-3">b Wisata Populer</h3>
        <ul className="list-disc pl-5 space-y-1">
          {province.famousPlaces?.map((place, idx) => (
            <li key={idx} className="text-gray-700">
              {place}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DetailProvince;
