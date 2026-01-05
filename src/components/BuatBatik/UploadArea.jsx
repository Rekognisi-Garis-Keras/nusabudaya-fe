import React from "react";
import { Upload, Send, Info } from "lucide-react";

const UploadArea = ({ inputRef }) => {
  return (
    <>
      <div
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-[#5B5B5B] hover:border-[#c8a668] rounded-xl bg-[#1a2832]/50 h-64 md:h-80 flex flex-col items-center justify-center cursor-pointer group transition-all"
      >
        <div className="w-16 h-16 bg-[#c8a668]/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <Upload className="w-8 h-8 text-[#c8a668]" />
        </div>
        <h3 className="text-white font-semibold text-lg mb-2">
          Upload Referensi Gambar
        </h3>
        <p className="text-[#c7c7c7] text-sm max-w-xs text-center">
          Klik di sini untuk mengunggah file JPG atau PNG
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mt-5 items-stretch">
        <div className="flex-1 relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <Info className="w-5 h-5 text-[#c7c7c7]" />
          </div>
          <input
            type="text"
            placeholder="Upload referensi batik terlebih dahulu..."
            disabled={true}
            className="w-full bg-[#1a2832] border border-[#5B5B5B] text-white pl-12 pr-4 py-4 rounded-lg focus:outline-none focus:border-[#c8a668] focus:ring-1 focus:ring-[#c8a668] transition-all placeholder:text-gray-500"
          />
        </div>

        <button
          disabled={true}
          className="bg-[#c8a668] hover:bg-[#d4b876] disabled:bg-[#c8a668]/50 disabled:cursor-not-allowed text-[#0D1922] font-bold py-3 px-8 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-95 min-w-[140px]"
        >
          <Send className="w-5 h-5" />
          <span>Generate Motif</span>
        </button>
      </div>
    </>
  );
};
export default UploadArea;
