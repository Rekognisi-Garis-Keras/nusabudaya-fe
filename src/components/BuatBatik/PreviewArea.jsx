import React from "react";
import { X, Send, Image, Sparkles } from "lucide-react";

const PreviewArea = ({
  imagePreview,
  onRemoveImage,
  isLoading,
  prompt,
  setPrompt,
  onSubmit,
}) => {
  return (
    <div className="animate-in fade-in zoom-in duration-300 space-y-6">
      <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden border border-[#5B5B5B] group">
        <img
          src={imagePreview}
          alt="Preview"
          className="w-full h-full object-contain"
        />

        <button
          onClick={onRemoveImage}
          disabled={isLoading}
          className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-red-500/80 text-white rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0"
          title="Hapus gambar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-stretch">
        <div className="flex-1 relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <Sparkles className="w-5 h-5 text-[#c8a668]" />
          </div>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Deskripsikan motif batik yang ingin kamu buat..."
            disabled={isLoading}
            className="w-full bg-[#1a2832] border border-[#5B5B5B] text-white pl-12 pr-4 py-4 rounded-lg focus:outline-none focus:border-[#c8a668] focus:ring-1 focus:ring-[#c8a668] transition-all placeholder:text-gray-500"
          />
        </div>

        <button
          onClick={onSubmit}
          disabled={isLoading || !prompt.trim()}
          className="bg-[#c8a668] hover:bg-[#d4b876] disabled:bg-[#c8a668]/50 disabled:cursor-not-allowed text-[#0D1922] font-bold py-3 px-8 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-95 min-w-[140px]"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-[#0D1922] border-t-transparent rounded-full animate-spin" />
              <span>Memproses...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Generate Motif</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PreviewArea;
