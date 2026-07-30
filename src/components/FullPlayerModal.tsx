import React, { useState } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Shuffle, 
  Repeat, 
  Repeat1, 
  Heart, 
  Download, 
  Check, 
  FileText, 
  ListMusic, 
  Music,
  Share2
} from 'lucide-react';
import { Song, RepeatMode } from '../types';

interface FullPlayerModalProps {
  currentSong: Song;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isShuffle: boolean;
  repeatMode: RepeatMode;
  isDownloaded: boolean;
  isFavorite: boolean;
  queue: Song[];
  queueIndex: number;
  onClose: () => void;
  onPlayPause: () => void;
  onSkipNext: () => void;
  onSkipPrevious: () => void;
  onToggleShuffle: () => void;
  onToggleRepeat: () => void;
  onSeek: (time: number) => void;
  onToggleFavorite: (id: string) => void;
  onDownload: (song: Song) => void;
  onPlayFromQueue: (index: number) => void;
}

export function FullPlayerModal({
  currentSong,
  isPlaying,
  currentTime,
  duration,
  isShuffle,
  repeatMode,
  isDownloaded,
  isFavorite,
  queue,
  queueIndex,
  onClose,
  onPlayPause,
  onSkipNext,
  onSkipPrevious,
  onToggleShuffle,
  onToggleRepeat,
  onSeek,
  onToggleFavorite,
  onDownload,
  onPlayFromQueue,
}: FullPlayerModalProps) {
  const [activeTab, setActiveTab] = useState<'player' | 'lyrics' | 'queue'>('player');

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-2xl flex flex-col p-4 sm:p-6 overflow-hidden animate-in fade-in duration-300">
      
      {/* Modal Top Header */}
      <div className="flex items-center justify-between gap-4 max-w-xl mx-auto w-full mb-4">
        <button
          onClick={onClose}
          className="p-2 text-slate-400 hover:text-white bg-slate-900/80 hover:bg-slate-800 rounded-full border border-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-full border border-slate-800">
          <button
            onClick={() => setActiveTab('player')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
              activeTab === 'player'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Player
          </button>
          <button
            onClick={() => setActiveTab('lyrics')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
              activeTab === 'lyrics'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Lyrics
          </button>
          <button
            onClick={() => setActiveTab('queue')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
              activeTab === 'queue'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Queue ({queue.length})
          </button>
        </div>

        <button
          onClick={() => onToggleFavorite(currentSong.id)}
          className={`p-2 rounded-full border transition ${
            isFavorite
              ? 'bg-pink-500/20 text-pink-500 border-pink-500/30'
              : 'bg-slate-900/80 text-slate-400 border-slate-800'
          }`}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-pink-500' : ''}`} />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-xl mx-auto w-full overflow-y-auto py-2">
        
        {/* Tab 1: PLAYER VIEW */}
        {activeTab === 'player' && (
          <div className="w-full flex flex-col items-center gap-6 my-auto">
            {/* Album Artwork */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden shadow-2xl shadow-indigo-950/60 border border-slate-800/80 group">
              <img 
                src={currentSong.coverUrl} 
                alt={currentSong.title}
                className={`w-full h-full object-cover transition duration-700 ${isPlaying ? 'scale-105' : 'scale-100'}`}
              />

              {/* Offline Badge */}
              {isDownloaded && (
                <div className="absolute top-4 right-4 bg-emerald-950/90 backdrop-blur-md text-emerald-300 border border-emerald-500/40 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
                  <Check className="w-3.5 h-3.5" />
                  <span>Saved Offline</span>
                </div>
              )}
            </div>

            {/* Song Details */}
            <div className="text-center space-y-1.5 w-full">
              <div className="flex items-center justify-center gap-2">
                <h2 className="text-2xl font-extrabold text-white tracking-tight">
                  {currentSong.title}
                </h2>
              </div>
              <p className="text-sm text-slate-400 font-medium">
                {currentSong.artist} • <span className="text-indigo-400">{currentSong.genre}</span>
              </p>
              
              <div className="pt-2 flex justify-center gap-2">
                {currentSong.language === 'Hindi' && (
                  <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold rounded-full">
                    🇮🇳 Hindi Track
                  </span>
                )}
                {currentSong.language === 'Nepali' && (
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold rounded-full">
                    🇳🇵 Nepali Track
                  </span>
                )}
              </div>
            </div>

            {/* Scrub Progress Bar */}
            <div className="w-full space-y-2 px-2">
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime || 0}
                onChange={(e) => onSeek(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400"
              />
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Main Playback Buttons */}
            <div className="flex items-center justify-between w-full max-w-xs pt-2">
              <button
                onClick={onToggleShuffle}
                className={`p-3 rounded-2xl transition cursor-pointer ${
                  isShuffle 
                    ? 'bg-indigo-600/30 text-indigo-400 border border-indigo-500/40 shadow-lg' 
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Shuffle"
              >
                <Shuffle className="w-5 h-5" />
              </button>

              <button
                onClick={onSkipPrevious}
                className="p-3 text-slate-200 hover:text-white hover:bg-slate-900 rounded-2xl transition cursor-pointer active:scale-90"
              >
                <SkipBack className="w-7 h-7" />
              </button>

              <button
                onClick={onPlayPause}
                className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white flex items-center justify-center shadow-xl shadow-indigo-600/40 transform transition active:scale-90 cursor-pointer"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 fill-white" />
                ) : (
                  <Play className="w-8 h-8 fill-white ml-1" />
                )}
              </button>

              <button
                onClick={onSkipNext}
                className="p-3 text-slate-200 hover:text-white hover:bg-slate-900 rounded-2xl transition cursor-pointer active:scale-90"
              >
                <SkipForward className="w-7 h-7" />
              </button>

              <button
                onClick={onToggleRepeat}
                className={`p-3 rounded-2xl transition cursor-pointer ${
                  repeatMode !== 'off' 
                    ? 'bg-indigo-600/30 text-indigo-400 border border-indigo-500/40 shadow-lg' 
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Repeat"
              >
                {repeatMode === 'one' ? (
                  <Repeat1 className="w-5 h-5" />
                ) : (
                  <Repeat className="w-5 h-5" />
                )}
              </button>
            </div>

            {!isDownloaded && (
              <button
                onClick={() => onDownload(currentSong)}
                className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 rounded-2xl text-xs font-bold transition shadow-lg mt-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Save Offline to Device Storage</span>
              </button>
            )}
          </div>
        )}

        {/* Tab 2: LYRICS VIEW */}
        {activeTab === 'lyrics' && (
          <div className="w-full bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4 max-h-[60vh] overflow-y-auto text-center">
            <h3 className="text-lg font-bold text-white flex items-center justify-center gap-2">
              <FileText className="w-5 h-5 text-indigo-400" />
              <span>Song Lyrics</span>
            </h3>
            {currentSong.lyrics ? (
              <pre className="font-sans text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                {currentSong.lyrics}
              </pre>
            ) : (
              <p className="text-slate-500 text-sm italic py-8">
                No lyrics available for this track yet. Enjoy the music!
              </p>
            )}
          </div>
        )}

        {/* Tab 3: QUEUE VIEW */}
        {activeTab === 'queue' && (
          <div className="w-full space-y-2 max-h-[60vh] overflow-y-auto">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
              Up Next ({queue.length} songs)
            </h3>
            {queue.map((song, idx) => {
              const isCurrent = idx === queueIndex;
              return (
                <div
                  key={`${song.id}-${idx}`}
                  onClick={() => onPlayFromQueue(idx)}
                  className={`flex items-center justify-between p-3 rounded-2xl border transition cursor-pointer ${
                    isCurrent
                      ? 'bg-indigo-950/60 border-indigo-500/50 text-indigo-300'
                      : 'bg-slate-900/40 hover:bg-slate-900 border-slate-800 text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img src={song.coverUrl} alt={song.title} className="w-10 h-10 rounded-xl object-cover" />
                    <div>
                      <h4 className="text-xs font-bold">{song.title}</h4>
                      <p className="text-[11px] text-slate-400">{song.artist}</p>
                    </div>
                  </div>
                  {isCurrent && (
                    <span className="text-xs font-semibold bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full">
                      Playing
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
