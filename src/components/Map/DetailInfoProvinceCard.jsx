import { Calendar, Music } from "lucide-react";
import React from "react";

const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;

  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11
    ? `https://www.youtube.com/embed/${match[2]}`
    : null;
};

export default function DetailInfoProvinceCard({ data, label }) {
  const embedUrl = data.video_url ? getYouTubeEmbedUrl(data.video_url) : null;

  const hasMedia = !!(data.image_url || embedUrl);

  return (
    <div
      className={`flex flex-col gap-4 ${
        hasMedia ? "md:flex-row md:gap-8" : ""
      }`}
    >
      {hasMedia && (
        <div className="w-full md:w-1/2 mx-auto shrink-0">
          <div className="aspect-video rounded-lg overflow-hidden border border-white/10 relative bg-black shadow-lg">
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title={data.name}
                className="w-full h-full"
                allowFullScreen
              ></iframe>
            ) : (
              <img
                src={data.image_url}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                alt={data.name}
              />
            )}
          </div>
        </div>
      )}

      <div
        className={`space-y-4 flex flex-col ${
          hasMedia ? "md:w-1/2" : "w-full"
        }`}
      >
        <div
          className={`
            bg-linear-to-r from-(--color-secondary)/30 to-transparent px-4 py-2 border-l-4 border-(--color-secondary)
            ${!hasMedia ? "text-left" : ""} 
        `}
        >
          <h3 className="text-[#f2ecd5] text-2xl md:text-4xl serif mb-1 font-bold">
            {data.name}
          </h3>
          <span className="uppercase text-xs tracking-widest text-white/60 font-semibold">
            {label}
          </span>
        </div>

        {data.event_date && (
          <div className="flex items-center gap-2 text-yellow-400 bg-yellow-400/10 p-2 rounded-md w-fit">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium">
              Waktu: {data.event_date}
            </span>
          </div>
        )}

        {data.cara_main && (
          <div className="flex items-center gap-2 text-blue-300 bg-blue-400/10 p-2 rounded-md w-fit">
            <Music className="w-4 h-4" />
            <span className="text-sm font-medium">
              Cara Main: {data.cara_main}
            </span>
          </div>
        )}

        {data.description && (
          <p className="text-[#c7c7c7] text-sm md:text-base leading-relaxed text-justify px-1">
            {data.description}
          </p>
        )}
      </div>
    </div>
  );
}
