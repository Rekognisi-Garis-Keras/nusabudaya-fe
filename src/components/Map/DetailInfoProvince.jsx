import { formatDate } from "@/utils/date";
import { ChevronLeft } from "lucide-react";
import React from "react";
import DetailInfoProvinceCard from "./DetailInfoProvinceCard";

const DetailInfoProvince = ({ detail, province, openInfo }) => {
  const title = detail.name || detail.title;

  const cultureSections = [
    { label: "Rumah Tradisional", list: province.traditionalHouses },
    { label: "Senjata Tradisional", list: province.traditionalWeapons },
    { label: "Tradisi", list: province.traditions }, //bikin dia jadi info
    { label: "Kuliner Khas", list: province.culinaries },
    { label: "Destinasi Wisata", list: province.tourismSpots },
    { label: "Lagu Daerah", list: province.regionalSongs }, // 👈 Tambahin ini
    { label: "Alat Musik Daerah", list: province.musicalInstruments },
    { label: "Tarian Daerah", list: province.traditionalDances }, //bikin dia jadi iframe
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-9999 backdrop-blur-sm"
        onClick={() => openInfo(false)}
      ></div>

      {/* Modal Container - Full screen on mobile, centered on desktop */}
      <div className="fixed inset-0 z-10000 flex items-center justify-center p-0 md:p-4">
        <div className="bg-[#0D1922] w-full h-full md:h-[95vh] md:max-w-5xl md:rounded-lg border-0 md:border md:border-(--color-secondary) overflow-hidden flex flex-col">
          {/* Header - Sticky */}
          <div className="sticky top-0 z-10 bg-[#0D1922] border-b border-(--color-secondary) p-4 md:p-5">
            <div className="flex items-center gap-3">
              <button
                onClick={() => openInfo(false)}
                className="p-2 md:p-3 rounded-full border border-(--color-secondary) h-9 w-9 md:h-10 md:w-10 flex items-center justify-center hover:bg-(--color-secondary) transition-colors shrink-0"
                aria-label="Close"
              >
                <ChevronLeft className="stroke-white w-5 h-5" />
              </button>
              <h2 className="text-base md:text-xl font-semibold text-white truncate">
                {title} - {province.name}
              </h2>
              ;
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto overscroll-contain">
            <div className="p-4 md:p-6 space-y-6 md:space-y-8">
              {/* Province Title */}
              <h1 className="text-2xl md:text-3xl text-white font-bold">
                Provinsi {province.name}
              </h1>

              {/* Info Grid */}
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                {/* Province Emblem */}
                <div className="w-full sm:w-64 lg:w-72 mx-auto lg:mx-0 shrink-0">
                  <div className="aspect-square bg-white/5 rounded-lg p-4 flex items-center justify-center">
                    <img
                      src={province.icon_url}
                      alt={`${province.name} emblem`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg md:text-xl mb-4 text-white">
                    Informasi Detail
                  </h3>
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4 py-2 border-b border-white/10">
                      <span className="font-medium text-white/80 text-sm md:text-base">
                        Ibu Kota:
                      </span>
                      <span className="text-white font-medium text-sm md:text-base">
                        {province.capital_city}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4 py-2 border-b border-white/10">
                      <span className="font-medium text-white/80 text-sm md:text-base">
                        Luas Wilayah:
                      </span>
                      <span className="text-white font-medium text-sm md:text-base">
                        {province.area_km2} km²
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4 py-2 border-b border-white/10">
                      <span className="font-medium text-white/80 text-sm md:text-base">
                        Berdiri sejak:
                      </span>
                      <span className="text-white font-medium text-sm md:text-base">
                        {formatDate(province.anniversary_date)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-(--color-secondary) opacity-30"></div>

              {/* Culture Section */}
              <div className="flex flex-col gap-10">
                {cultureSections.map((section, idx) => {
                  // Ambil data index ke-0
                  const singleItem = section.list?.[0];

                  // Kalau datanya ada, baru render Card-nya
                  if (singleItem) {
                    return (
                      <DetailInfoProvinceCard
                        key={idx}
                        data={singleItem}
                        label={section.label}
                      />
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailInfoProvince;
