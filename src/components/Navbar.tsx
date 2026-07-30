import React from 'react';
import { 
  Music2, 
  Search, 
  Wifi, 
  WifiOff, 
  Download, 
  Heart, 
  Plus, 
  Globe, 
  Smartphone,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { SongLanguage } from '../types';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  isOnline: boolean;
  offlineCount: number;
  favoritesCount: number;
  onOpenUpload: () => void;
  onOpenVercelGuide: () => void;
  onOpenLyriaStudio: () => void;
}

export function Navbar({
  searchQuery,
  setSearchQuery,
  activeFilter,
  setActiveFilter,
  isOnline,
  offlineCount,
  favoritesCount,
  onOpenUpload,
  onOpenVercelGuide,
  onOpenLyriaStudio,
}: NavbarProps) {

  const filters = [
    { id: 'all', label: 'All Songs' },
    { id: 'Lyria 3', label: 'Lyria 3 AI Tracks', badge: '✨' },
    { id: 'Hindi', label: 'Hindi Songs', badge: '🇮🇳' },
    { id: 'Nepali', label: 'Nepali Songs', badge: '🇳🇵' },
    { id: 'offline', label: 'Downloaded Offline', count: offlineCount },
    { id: 'favorites', label: 'Favorites', count: favoritesCount },
    { id: 'Custom', label: 'My Uploads' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 px-4 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col gap-3">
        {/* Top Header Row */}
        <div className="flex items-center justify-between gap-3">
          {/* Brand Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Music2 className="w-5 h-5 text-indigo-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold tracking-tight text-white font-['Outfit']">
                  Adha<span className="text-indigo-400">.Music</span>
                </h1>
                {/* Network Status Badge */}
                <div 
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                    isOnline 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/30 animate-bounce'
                  }`}
                  title={isOnline ? 'Online - Full Music Library' : 'Offline Mode - Playing Downloaded Songs'}
                >
                  {isOnline ? (
                    <>
                      <Wifi className="w-3 h-3 text-emerald-400" />
                      <span>Online</span>
                    </>
                  ) : (
                    <>
                      <WifiOff className="w-3 h-3 text-amber-400" />
                      <span>Offline Mode</span>
                    </>
                  )}
                </div>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                Hindi & Nepali Music • Offline Playback
              </p>
            </div>
          </div>

          {/* Quick Actions Desktop/Mobile */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenLyriaStudio}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-purple-600/20 transition active:scale-95 cursor-pointer"
              title="Generate custom AI music tracks using Google Lyria 3"
            >
              <Sparkles className="w-3.5 h-3.5 text-pink-200 animate-spin" />
              <span>Lyria 3 Studio</span>
            </button>

            <button
              onClick={onOpenUpload}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs font-semibold transition active:scale-95 cursor-pointer"
              title="Add local MP3 files to your phone library"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Upload Song</span>
            </button>

            <button
              onClick={onOpenVercelGuide}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/60 rounded-xl text-xs font-semibold transition active:scale-95 cursor-pointer"
              title="How to deploy Adha Music to Vercel"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Deploy to Vercel</span>
            </button>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Hindi, Nepali songs, artists..."
              className="w-full bg-slate-900/90 border border-slate-800 focus:border-indigo-500/80 text-slate-100 placeholder:text-slate-500 text-xs sm:text-sm pl-10 pr-4 py-2 rounded-xl focus:outline-none transition-all shadow-inner"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Navigation Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {filters.map((filter) => {
              const isActive = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/25 ring-1 ring-indigo-400/30'
                      : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  {filter.badge && <span>{filter.badge}</span>}
                  <span>{filter.label}</span>
                  {typeof filter.count === 'number' && (
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {filter.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
