import React, { useState } from 'react';
import { Song } from '../types';
import { SongCard } from './SongCard';
import { LayoutGrid, List, Shuffle, Music, WifiOff, Download, Sparkles, Heart } from 'lucide-react';

interface SongListProps {
  songs: Song[];
  currentSong: Song | null;
  isPlaying: boolean;
  offlineSongIds: Set<string>;
  downloadProgresses: Record<string, number>;
  favoriteIds: Set<string>;
  onPlaySong: (song: Song) => void;
  onShufflePlay: () => void;
  onDownloadSong: (song: Song) => void;
  onDeleteOfflineSong: (songId: string) => void;
  onToggleFavorite: (songId: string) => void;
  activeFilterName: string;
  isOnline: boolean;
  onOpenUpload: () => void;
}

export function SongList({
  songs,
  currentSong,
  isPlaying,
  offlineSongIds,
  downloadProgresses,
  favoriteIds,
  onPlaySong,
  onShufflePlay,
  onDownloadSong,
  onDeleteOfflineSong,
  onToggleFavorite,
  activeFilterName,
  isOnline,
  onOpenUpload,
}: SongListProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="space-y-6">
      {/* Header bar for list section */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/50 border border-slate-800/80 p-4 rounded-2xl">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>{activeFilterName}</span>
            <span className="text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2.5 py-0.5 rounded-full font-semibold">
              {songs.length} {songs.length === 1 ? 'Track' : 'Tracks'}
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {activeFilterName.includes('Downloaded')
              ? 'These tracks are stored locally on your device and play without internet connection.'
              : 'Listen online or tap download to keep songs on your phone for offline playback.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Shuffle Play button */}
          {songs.length > 0 && (
            <button
              onClick={onShufflePlay}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-600/25 transition active:scale-95 cursor-pointer"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Shuffle Play</span>
            </button>
          )}

          {/* View mode toggle */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition ${
                viewMode === 'grid' 
                  ? 'bg-indigo-600 text-white' 
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition ${
                viewMode === 'list' 
                  ? 'bg-indigo-600 text-white' 
                  : 'text-slate-400 hover:text-white'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Empty State when no songs match filter */}
      {songs.length === 0 && (
        <div className="text-center py-16 px-4 bg-slate-900/30 border border-dashed border-slate-800 rounded-3xl">
          <div className="w-16 h-16 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mx-auto flex items-center justify-center mb-4">
            {!isOnline ? (
              <WifiOff className="w-8 h-8 text-amber-400" />
            ) : activeFilterName.includes('Downloaded') ? (
              <Download className="w-8 h-8 text-indigo-400" />
            ) : (
              <Music className="w-8 h-8 text-slate-500" />
            )}
          </div>

          <h3 className="text-lg font-bold text-white mb-1">
            {!isOnline && offlineSongIds.size === 0
              ? 'No Offline Songs Saved Yet'
              : 'No Songs Found'}
          </h3>

          <p className="text-xs text-slate-400 max-w-md mx-auto mb-6">
            {!isOnline && offlineSongIds.size === 0
              ? 'You are currently offline. Connect to the internet once to download Hindi or Nepali songs, or upload local MP3 files to your phone storage.'
              : activeFilterName.includes('Downloaded')
              ? 'Tap the "Save Offline" button on any Hindi or Nepali song to keep it in your phone memory for offline listening!'
              : 'Try clearing your search terms or selecting a different category filter.'}
          </p>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={onOpenUpload}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition"
            >
              Upload Local MP3 File
            </button>
          </div>
        </div>
      )}

      {/* Songs Display Grid / List */}
      {songs.length > 0 && (
        <div className={
          viewMode === 'grid'
            ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4'
            : 'space-y-2'
        }>
          {songs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              isPlaying={isPlaying}
              isCurrentSong={currentSong?.id === song.id}
              isDownloaded={offlineSongIds.has(song.id)}
              downloadProgress={downloadProgresses[song.id] ?? null}
              isFavorite={favoriteIds.has(song.id)}
              onPlay={onPlaySong}
              onDownload={onDownloadSong}
              onDeleteOffline={onDeleteOfflineSong}
              onToggleFavorite={onToggleFavorite}
              viewMode={viewMode}
            />
          ))}
        </div>
      )}
    </div>
  );
}
