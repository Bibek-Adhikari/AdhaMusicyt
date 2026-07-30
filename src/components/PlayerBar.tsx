import React from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Shuffle, 
  Repeat, 
  Repeat1, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  FileText, 
  Download, 
  Check, 
  Heart,
  Music2
} from 'lucide-react';
import { Song, RepeatMode } from '../types';

interface PlayerBarProps {
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isShuffle: boolean;
  repeatMode: RepeatMode;
  isDownloaded: boolean;
  isFavorite: boolean;
  onPlayPause: () => void;
  onSkipNext: () => void;
  onSkipPrevious: () => void;
  onToggleShuffle: () => void;
  onToggleRepeat: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (vol: number) => void;
  onToggleMute: () => void;
  onToggleFavorite: (id: string) => void;
  onOpenFullPlayer: () => void;
}

export function PlayerBar({
  currentSong,
  isPlaying,
  currentTime,
  duration,
  volume,
  isMuted,
  isShuffle,
  repeatMode,
  isDownloaded,
  isFavorite,
  onPlayPause,
  onSkipNext,
  onSkipPrevious,
  onToggleShuffle,
  onToggleRepeat,
  onSeek,
  onVolumeChange,
  onToggleMute,
  onToggleFavorite,
  onOpenFullPlayer,
}: PlayerBarProps) {
  if (!currentSong) {
    return null;
  }

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 border-t border-slate-800/90 backdrop-blur-xl px-3 sm:px-6 py-2.5 shadow-2xl transition-all">
      <div className="max-w-7xl mx-auto flex flex-col gap-1.5">
        
        {/* Top Seek Progress Scrubber Bar */}
        <div className="flex items-center gap-2 text-[11px] font-medium text-slate-400">
          <span className="w-8 text-right font-mono text-slate-400">{formatTime(currentTime)}</span>
          
          <div className="relative flex-1 group py-1 cursor-pointer">
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime || 0}
              onChange={(e) => onSeek(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400 focus:outline-none"
            />
          </div>

          <span className="w-8 font-mono text-slate-400">{formatTime(duration)}</span>
        </div>

        {/* Player Main Controls Row */}
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Song Info Section (Left) */}
          <div 
            className="flex items-center gap-3 min-w-0 flex-1 sm:w-1/4 cursor-pointer group"
            onClick={onOpenFullPlayer}
          >
            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-800 shrink-0 shadow-lg border border-slate-700/50">
              <img 
                src={currentSong.coverUrl} 
                alt={currentSong.title}
                className="w-full h-full object-cover group-hover:scale-105 transition"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                <Maximize2 className="w-4 h-4 text-white" />
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <h4 className="text-xs sm:text-sm font-bold text-white truncate group-hover:text-indigo-300 transition">
                  {currentSong.title}
                </h4>
                {isDownloaded && (
                  <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded border border-emerald-500/30 shrink-0" title="Offline Ready">
                    Offline
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 truncate mt-0.5">
                {currentSong.artist}
              </p>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(currentSong.id);
              }}
              className={`p-1.5 rounded-lg transition ${
                isFavorite ? 'text-pink-500' : 'text-slate-500 hover:text-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-pink-500' : ''}`} />
            </button>
          </div>

          {/* Central Playback Controls (Middle) */}
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            {/* Shuffle Button */}
            <button
              onClick={onToggleShuffle}
              className={`p-2 rounded-xl transition cursor-pointer relative ${
                isShuffle 
                  ? 'bg-indigo-600/30 text-indigo-400 border border-indigo-500/40 shadow-sm shadow-indigo-500/20' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
              title={isShuffle ? 'Shuffle Mode Active' : 'Enable Shuffle'}
            >
              <Shuffle className="w-4 h-4" />
              {isShuffle && (
                <span className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-indigo-400" />
              )}
            </button>

            {/* Skip Previous */}
            <button
              onClick={onSkipPrevious}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-900 rounded-xl transition cursor-pointer active:scale-95"
              title="Previous Track"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={onPlayPause}
              className="w-11 h-11 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white flex items-center justify-center shadow-lg shadow-indigo-600/40 transform transition active:scale-95 cursor-pointer"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-white" />
              ) : (
                <Play className="w-5 h-5 fill-white ml-0.5" />
              )}
            </button>

            {/* Skip Next */}
            <button
              onClick={onSkipNext}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-900 rounded-xl transition cursor-pointer active:scale-95"
              title="Next Track"
            >
              <SkipForward className="w-5 h-5" />
            </button>

            {/* Repeat Button */}
            <button
              onClick={onToggleRepeat}
              className={`p-2 rounded-xl transition cursor-pointer relative ${
                repeatMode !== 'off'
                  ? 'bg-indigo-600/30 text-indigo-400 border border-indigo-500/40 shadow-sm shadow-indigo-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
              title={`Repeat: ${repeatMode.toUpperCase()}`}
            >
              {repeatMode === 'one' ? (
                <Repeat1 className="w-4 h-4" />
              ) : (
                <Repeat className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Volume & Full Player Option (Right) */}
          <div className="hidden md:flex items-center justify-end gap-3 w-1/4">
            <div className="flex items-center gap-2">
              <button
                onClick={onToggleMute}
                className="text-slate-400 hover:text-white transition"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-red-400" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>

              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={isMuted ? 0 : volume}
                onChange={(e) => onVolumeChange(Number(e.target.value))}
                className="w-20 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            <button
              onClick={onOpenFullPlayer}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-900 rounded-xl transition cursor-pointer"
              title="Expand Full Screen Player & Lyrics"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
