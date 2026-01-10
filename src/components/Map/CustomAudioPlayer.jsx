import { Play, Pause, Volume2, VolumeX, RotateCcw } from "lucide-react";

import React, { useEffect, useRef, useState } from "react";

const CustomAudioPlayer = ({ audioUrl }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Update current time
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      if (!isDragging) {
        setCurrentTime(audio.currentTime);
      }
    };

    const updateDuration = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [isDragging]);

  // Play/Pause toggle
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Reset audio
  const handleReset = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = 0;
    setCurrentTime(0);
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    }
  };

  // Handle progress bar change
  const handleProgressChange = (e) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newVolume = parseFloat(e.target.value);
    audio.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  // Toggle mute
  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume || 0.5;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  // Format time (seconds to mm:ss)
  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full bg-[#0D1922] p-4 rounded-xl border border-[#c8a668]/30 shadow-lg">
      {/* Hidden audio element */}
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-[#c8a668] animate-pulse" />
        <span className="text-white/70 text-sm font-medium">Audio Player</span>
      </div>

      {/* Main Controls */}
      <div className="flex items-center gap-3 mb-4">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="w-12 h-12 rounded-full bg-[#c8a668] hover:bg-[#d4b876] flex items-center justify-center transition-all active:scale-95 shadow-lg shadow-[#c8a668]/20"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 fill-white stroke-white" />
          ) : (
            <Play className="w-5 h-5 fill-white stroke-white ml-0.5" />
          )}
        </button>

        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="w-10 h-10 rounded-full bg-[#1a2832] hover:bg-[#243442] border border-[#5B5B5B] flex items-center justify-center transition-all active:scale-95"
          aria-label="Reset"
        >
          <RotateCcw className="w-4 h-4 stroke-white" />
        </button>

        {/* Time Display */}
        <div className="flex-1 flex items-center gap-2 text-sm text-white/70 font-mono">
          <span>{formatTime(currentTime)}</span>
          <span className="text-white/40">/</span>
          <span>{formatTime(duration)}</span>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="w-8 h-8 rounded-lg bg-[#1a2832] hover:bg-[#243442] border border-[#5B5B5B] flex items-center justify-center transition-all"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 stroke-white" />
            ) : (
              <Volume2 className="w-4 h-4 stroke-white" />
            )}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-20 h-1.5 rounded-lg appearance-none cursor-pointer bg-[#1a2832]
              [&::-webkit-slider-thumb]:appearance-none 
              [&::-webkit-slider-thumb]:w-3 
              [&::-webkit-slider-thumb]:h-3 
              [&::-webkit-slider-thumb]:rounded-full 
              [&::-webkit-slider-thumb]:bg-[#c8a668]
              [&::-webkit-slider-thumb]:cursor-pointer
              [&::-webkit-slider-thumb]:shadow-md
              [&::-moz-range-thumb]:w-3 
              [&::-moz-range-thumb]:h-3 
              [&::-moz-range-thumb]:rounded-full 
              [&::-moz-range-thumb]:bg-[#c8a668]
              [&::-moz-range-thumb]:border-0
              [&::-moz-range-thumb]:cursor-pointer"
            aria-label="Volume"
          />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <input
          type="range"
          min="0"
          max={duration || 0}
          step="0.1"
          value={currentTime}
          onChange={handleProgressChange}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-[#1a2832]
            [&::-webkit-slider-thumb]:appearance-none 
            [&::-webkit-slider-thumb]:w-4 
            [&::-webkit-slider-thumb]:h-4 
            [&::-webkit-slider-thumb]:rounded-full 
            [&::-webkit-slider-thumb]:bg-[#c8a668]
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:shadow-lg
            [&::-webkit-slider-thumb]:shadow-[#c8a668]/20
            [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:hover:scale-110
            [&::-moz-range-thumb]:w-4 
            [&::-moz-range-thumb]:h-4 
            [&::-moz-range-thumb]:rounded-full 
            [&::-moz-range-thumb]:bg-[#c8a668]
            [&::-moz-range-thumb]:border-0
            [&::-moz-range-thumb]:cursor-pointer
            [&::-moz-range-thumb]:transition-transform
            [&::-moz-range-thumb]:hover:scale-110"
          style={{
            background: `linear-gradient(to right, #c8a668 0%, #c8a668 ${
              (currentTime / duration) * 100
            }%, #1a2832 ${(currentTime / duration) * 100}%, #1a2832 100%)`,
          }}
          aria-label="Progress"
        />
      </div>

      {/* Visual Indicator */}
      {/* {isPlaying && (
        <div className="flex items-center gap-1 mt-3 justify-center">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-1 bg-[#c8a668] rounded-full"
              style={{
                height: "12px",
                animation: `wave 1s ease-in-out ${i * 0.1}s infinite`,
              }}
            />
          ))}
        </div>
      )} */}

      <style>{`
        @keyframes wave {
          0%, 100% { height: 8px; }
          50% { height: 20px; }
        }
      `}</style>
    </div>
  );
};

export default CustomAudioPlayer;
