import React from 'react';
import { Play, Pause, Download, Check, Heart, Music, Trash2, Loader2, Sparkles } from 'lucide-react';
import { Song } from '../types';

interface SongCardProps {
  key?: React.Key;
  song: Song;
  isPlaying: boolean;
  isCurrentSong: boolean;
  isDownloaded: boolean;
  downloadProgress: number | null; // 0-100 or null
  isFavorite: boolean;
  onPlay: (song: Song) => void;
  onDownload: (song: Song) => void;
  onDeleteOffline: (songId: string) => void;
  onToggleFavorite: (songId: string) => void;
  viewMode?: 'grid' | 'list';
}

export function SongCard({
  song,
  isPlaying,
  isCurrentSong,
  isDownloaded,
  downloadProgress,
  isFavorite,
  onPlay,
  onDownload,
  onDeleteOffline,
  onToggleFavorite,
  viewMode = 'grid',
}: SongCardProps) {
  const isDownloading = downloadProgress !== null && downloadProgress >= 0 && downloadProgress < 100;

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (viewMode === 'list') {
    return (
      <div 
        className={`group flex items-center justify-between gap-3 p-2.5 sm:p-3 rounded-2xl border transition-all cursor-pointer ${
          isCurrentSong 
            ? 'bg-indigo-950/40 border-indigo-500/40 shadow-lg shadow-indigo-950/30' 
            : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800/80 hover:border-slate-700'
        }`}
        onClick={() => onPlay(song)}
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {/* Cover thumbnail */}
          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-800 shrink-0 shadow-md">
            <img 
              src={song.coverUrl} 
              alt={song.title}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              loading="lazy"
            />
            {isCurrentSong ? (
              <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] flex items-center justify-center text-indigo-400">
                {isPlaying ? (
                  <div className="flex items-end gap-0.5 h-4">
                    <span className="w-1 bg-indigo-400 animate-[bounce_0.6s_infinite] h-full" />
                    <span className="w-1 bg-indigo-400 animate-[bounce_0.8s_infinite] h-2/3" />
                    <span className="w-1 bg-indigo-400 animate-[bounce_0.5s_infinite] h-5/6" />
                  </div>
                ) : (
                  <Play className="w-5 h-5 fill-indigo-400 text-indigo-400 ml-0.5" />
                )}
              </div>
            ) : (
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                <Play className="w-5 h-5 text-white fill-white ml-0.5" />
              </div>
            )}
          </div>

          {/* Details */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h4 className={`text-sm font-bold truncate ${isCurrentSong ? 'text-indigo-300' : 'text-slate-100'}`}>
                {song.title}
              </h4>
              {song.language === 'Hindi' && (
                <span className="px-1.5 py-0.2 bg-amber-500/20 text-amber-300 text-[10px] font-semibold rounded border border-amber-500/30 shrink-0">
                  Hindi
                </span>
              )}
              {song.language === 'Nepali' && (
                <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold rounded border border-emerald-500/30 shrink-0">
                  Nepali
                </span>
              )}
              {song.language === 'Lyria 3' && (
                <span className="px-1.5 py-0.2 bg-purple-500/20 text-purple-300 text-[10px] font-semibold rounded border border-purple-500/30 shrink-0 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-pink-400" />
                  Lyria 3 AI
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 truncate mt-0.5">
              {song.artist} • <span className="text-slate-500">{song.genre}</span>
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
          <span className="text-xs text-slate-500 hidden sm:inline mr-1">
            {formatDuration(song.duration)}
          </span>

          {/* Favorite button */}
          <button
            onClick={() => onToggleFavorite(song.id)}
            className={`p-2 rounded-xl transition cursor-pointer ${
              isFavorite 
                ? 'text-pink-500 bg-pink-500/10 hover:bg-pink-500/20' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-pink-500' : ''}`} />
          </button>

          {/* Download button */}
          {isDownloaded ? (
            <div className="flex items-center gap-1">
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 rounded-xl text-[11px] font-semibold">
                <Check className="w-3 h-3" />
                <span className="hidden sm:inline">Offline</span>
              </span>
              <button
                onClick={() => onDeleteOffline(song.id)}
                className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition"
                title="Remove offline copy from device storage"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : isDownloading ? (
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs font-medium">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>{downloadProgress}%</span>
            </div>
          ) : (
            <button
              onClick={() => onDownload(song)}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-800 hover:bg-indigo-600/30 text-slate-300 hover:text-indigo-200 border border-slate-700/80 hover:border-indigo-500/40 rounded-xl text-xs font-semibold transition active:scale-95 cursor-pointer"
              title="Download song to device storage for offline playback"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Download</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  // Grid Card View
  return (
    <div 
      className={`group relative flex flex-col p-3 rounded-2xl border transition-all duration-300 cursor-pointer ${
        isCurrentSong
          ? 'bg-gradient-to-b from-indigo-950/60 to-slate-900 border-indigo-500/50 shadow-xl shadow-indigo-950/40'
          : 'bg-slate-900/70 hover:bg-slate-900 border-slate-800/80 hover:border-slate-700 hover:shadow-xl hover:shadow-black/40'
      }`}
      onClick={() => onPlay(song)}
    >
      {/* Cover Artwork Container */}
      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-800 mb-3 shadow-md">
        <img 
          src={song.coverUrl} 
          alt={song.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          loading="lazy"
        />

        {/* Language Badge */}
        <div className="absolute top-2 left-2 flex gap-1">
          {song.language === 'Hindi' && (
            <span className="px-2 py-0.5 bg-black/60 backdrop-blur-md text-amber-300 border border-amber-400/30 text-[10px] font-bold rounded-full shadow">
              🇮🇳 Hindi
            </span>
          )}
          {song.language === 'Nepali' && (
            <span className="px-2 py-0.5 bg-black/60 backdrop-blur-md text-emerald-300 border border-emerald-400/30 text-[10px] font-bold rounded-full shadow">
              🇳🇵 Nepali
            </span>
          )}
          {song.language === 'Lyria 3' && (
            <span className="px-2 py-0.5 bg-black/60 backdrop-blur-md text-purple-300 border border-purple-400/30 text-[10px] font-bold rounded-full shadow flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-pink-400" />
              Lyria 3 AI
            </span>
          )}
        </div>

        {/* Favorite Icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(song.id);
          }}
          className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-md transition shadow ${
            isFavorite 
              ? 'bg-pink-500/20 text-pink-500 border border-pink-500/30' 
              : 'bg-black/40 text-white/70 hover:text-white hover:bg-black/60'
          }`}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-pink-500' : ''}`} />
        </button>

        {/* Download Badge/Overlay */}
        {isDownloaded && (
          <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-emerald-950/80 backdrop-blur-md text-emerald-300 border border-emerald-500/40 text-[10px] font-bold rounded-full flex items-center gap-1 shadow">
            <Check className="w-3 h-3" />
            <span>Offline</span>
          </div>
        )}

        {/* Play Overlay Button */}
        <div className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center transition duration-300 ${
          isCurrentSong ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}>
          <div className="w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shadow-lg shadow-indigo-600/40 transform transition group-hover:scale-105">
            {isCurrentSong && isPlaying ? (
              <Pause className="w-6 h-6 fill-white" />
            ) : (
              <Play className="w-6 h-6 fill-white ml-0.5" />
            )}
          </div>
        </div>
      </div>

      {/* Title & Artist */}
      <div className="flex-1 min-w-0 mb-3">
        <h3 className={`font-bold text-sm truncate ${isCurrentSong ? 'text-indigo-300' : 'text-slate-100'}`}>
          {song.title}
        </h3>
        <p className="text-xs text-slate-400 truncate mt-0.5">
          {song.artist}
        </p>
      </div>

      {/* Footer / Action row */}
      <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/80" onClick={(e) => e.stopPropagation()}>
        <span className="text-[11px] text-slate-500 font-medium">
          {formatDuration(song.duration)}
        </span>

        {/* Download action button */}
        {isDownloaded ? (
          <button
            onClick={() => onDeleteOffline(song.id)}
            className="text-[11px] text-slate-500 hover:text-red-400 flex items-center gap-1 transition"
            title="Remove from offline storage"
          >
            <Trash2 className="w-3 h-3" />
            <span>Remove</span>
          </button>
        ) : isDownloading ? (
          <div className="flex items-center gap-1 text-[11px] text-indigo-400 font-semibold">
            <Loader2 className="w-3 h-3 animate-spin" />
            <span>{downloadProgress}%</span>
          </div>
        ) : (
          <button
            onClick={() => onDownload(song)}
            className="flex items-center gap-1 px-2.5 py-1 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 rounded-lg text-xs font-semibold transition active:scale-95 cursor-pointer"
            title="Download for offline playback"
          >
            <Download className="w-3 h-3" />
            <span>Save Offline</span>
          </button>
        )}
      </div>
    </div>
  );
}
