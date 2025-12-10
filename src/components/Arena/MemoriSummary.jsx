import { ArrowLeft, Award, Clock, Crown, Trophy, Zap } from "lucide-react";
import Link from "next/link";
import React from "react";

const MemoriSummary = ({
  isComplete,
  performance,
  accuracy,
  xpEarned,
  formatTime,
  timeUsed,
  moves,
  matchedCards,
  cardPairs,
}) => {
  return (
    <main className="min-h-screen w-full bg-[#0D1922] flex flex-col items-center overflow-y-auto">
      {/* Summary Content */}
      <div className="w-full max-w-[800px] min-h-full p-5 md:p-8 mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="mb-4">
            {isComplete ? (
              <Trophy className="w-20 h-20 md:w-24 md:h-24 mx-auto text-[#c8a668] animate-bounce" />
            ) : (
              <Clock className="w-20 h-20 md:w-24 md:h-24 mx-auto text-gray-400" />
            )}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
            {isComplete ? "Selamat! 🎉" : "Waktu Habis!"}
          </h1>
          <p className="text-lg md:text-xl text-[#c7c7c7]">
            {isComplete
              ? "Kamu berhasil menyelesaikan permainan!"
              : "Jangan menyerah, coba lagi!"}
          </p>
        </div>

        {/* Performance Rating */}
        <div className="bg-[#1a2832] rounded-xl p-6 mb-6 border border-[#5B5B5B]">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Award className={`w-8 h-8 ${performance.color}`} />
            <h2
              className={`text-2xl md:text-3xl font-bold ${performance.color}`}
            >
              {performance.text}
            </h2>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {/* XP Earned */}
          <div className="bg-[#1a2832] rounded-xl p-5 border border-[#5B5B5B] flex flex-col items-center">
            <Zap className="w-8 h-8 text-[#c8a668] mb-2" />
            <span className="text-sm text-[#c7c7c7] mb-1">Total XP</span>
            <span className="text-2xl md:text-3xl font-bold text-[#c8a668]">
              {xpEarned}
            </span>
          </div>

          {/* Time Used */}
          <div className="bg-[#1a2832] rounded-xl p-5 border border-[#5B5B5B] flex flex-col items-center">
            <Clock className="w-8 h-8 text-blue-400 mb-2" />
            <span className="text-sm text-[#c7c7c7] mb-1">Waktu</span>
            <span className="text-2xl md:text-3xl font-bold text-white">
              {formatTime(timeUsed)}
            </span>
          </div>

          {/* Moves */}
          <div className="bg-[#1a2832] rounded-xl p-5 border border-[#5B5B5B] flex flex-col items-center">
            <svg
              className="w-8 h-8 text-purple-400 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
              />
            </svg>
            <span className="text-sm text-[#c7c7c7] mb-1">Gerakan</span>
            <span className="text-2xl md:text-3xl font-bold text-white">
              {moves}
            </span>
          </div>

          {/* Accuracy */}
          <div className="bg-[#1a2832] rounded-xl p-5 border border-[#5B5B5B] flex flex-col items-center">
            <Trophy className="w-8 h-8 text-green-400 mb-2" />
            <span className="text-sm text-[#c7c7c7] mb-1">Akurasi</span>
            <span className="text-2xl md:text-3xl font-bold text-white">
              {accuracy}%
            </span>
          </div>
        </div>

        {/* Match Details */}
        <div className="bg-[#1a2832] rounded-xl p-6 mb-8 border border-[#5B5B5B]">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <svg
              className="w-6 h-6 text-[#c8a668]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
            Detail Permainan
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[#c7c7c7]">Kartu yang Cocok:</span>
              <span className="text-white font-semibold">
                {matchedCards.length / 2} / {cardPairs.length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#c7c7c7]">Status:</span>
              <span
                className={`font-semibold ${
                  isComplete ? "text-green-400" : "text-red-400"
                }`}
              >
                {isComplete ? "Selesai ✓" : "Belum Selesai ✗"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#c7c7c7]">Gerakan Optimal:</span>
              <span className="text-white font-semibold">
                {cardPairs.length}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/arena"
            className="flex-1 bg-[#1a2832] text-white py-4 rounded-lg border border-[#5B5B5B] hover:bg-[#0D1922] transition font-semibold text-center flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Kembali ke Arena
          </Link>
          <Link
            href="/leaderboard"
            className="flex-1 bg-[#c8a668] text-[#0D1922] py-4 rounded-lg hover:bg-[#d4b876] transition font-semibold text-center flex items-center justify-center gap-2"
          >
            <Crown className="w-5 h-5" />
            Lihat Leaderboard
          </Link>
        </div>
      </div>
    </main>
  );
};

export default MemoriSummary;
