import { CheckCircle, XCircle, X, RotateCcw } from "lucide-react";
import React from "react";

const ResultModal = ({
  isOpen,
  onClose,
  isSuccess,
  score,
  aksaraName,
  onRetry,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-9999 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="fixed inset-0 z-10000 flex items-center justify-center p-4">
        <div className="bg-[#0D1922] w-full max-w-md rounded-xl border border-(--color-secondary)/50 overflow-hidden animate-in zoom-in duration-300">
          {/* Header */}
          <div
            className={`p-6 border-b ${
              isSuccess
                ? "bg-green-500/5 border-green-500/30"
                : "bg-red-500/5 border-red-500/30"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                {isSuccess ? (
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle className="w-7 h-7 text-green-400" />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                    <XCircle className="w-7 h-7 text-red-400" />
                  </div>
                )}
                <div>
                  <h2
                    className={`text-xl font-bold ${
                      isSuccess ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {isSuccess ? "Benar!" : "Coba Lagi!"}
                  </h2>
                  <p className="text-sm text-[#c7c7c7] mt-1 capitalize">
                    Aksara {aksaraName}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-[#c7c7c7]" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Score Display */}
            <div className="bg-[#1a2832] rounded-lg p-4 border border-[#5B5B5B]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#c7c7c7] text-sm">Skor Kemiripan</span>
                <span
                  className={`text-2xl font-bold ${
                    isSuccess ? "text-(--color-secondary)" : "text-red-400"
                  }`}
                >
                  {score}%
                </span>
              </div>
              <div className="w-full h-2 bg-[#0D1922] rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    isSuccess ? "bg-(--color-secondary)" : "bg-red-500"
                  }`}
                  style={{ width: `${score}%` }}
                ></div>
              </div>
            </div>

            {/* Message */}
            <div className="text-center py-2">
              <p className="text-[#c7c7c7] text-sm leading-relaxed">
                {isSuccess
                  ? "Kamu berhasil menulis aksara dengan baik! Pertahankan dan terus latih kemampuanmu."
                  : "Jangan menyerah! Coba perhatikan lagi bentuk aksara dan ulangi latihanmu."}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={onRetry}
                className="flex-1 bg-[#1a2832] hover:bg-[#243442] text-white font-semibold py-3 px-4 rounded-lg border border-[#5B5B5B] transition-all duration-200 flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Ulangi
              </button>
              <button
                onClick={onClose}
                className={`flex-1 font-semibold py-3 px-4 rounded-lg transition-all duration-200 ${
                  isSuccess
                    ? "bg-(--color-secondary) hover:bg-[#d4b876] text-white"
                    : "bg-(--color-secondary) hover:bg-[#d4b876] text-white"
                }`}
              >
                {isSuccess ? "Lanjutkan" : "Mengerti"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultModal;
