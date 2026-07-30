import React, { useState } from 'react';
import { X, Upload, Music, Check, FolderPlus, Sparkles } from 'lucide-react';
import { Song, SongLanguage } from '../types';
import { saveSongOffline } from '../services/db';

interface UploadModalProps {
  onClose: () => void;
  onSongAdded: (newSong: Song) => void;
}

export function UploadModal({ onClose, onSongAdded }: UploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [language, setLanguage] = useState<SongLanguage>('Hindi');
  const [genre, setGenre] = useState('Personal Upload');
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      // Auto fill title from filename
      const cleanName = selectedFile.name.replace(/\.[^/.]+$/, '');
      if (!title) {
        setTitle(cleanName);
      }
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) return;

    setIsSaving(true);
    try {
      // Create Object URL for audio blob
      const audioBlobUrl = URL.createObjectURL(file);

      const newSong: Song = {
        id: `custom-${Date.now()}`,
        title: title.trim(),
        artist: artist.trim() || 'Local Artist',
        language: language,
        genre: genre.trim() || 'Custom',
        duration: 200, // estimated or auto-calculated on play
        coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
        audioUrl: audioBlobUrl,
        addedAt: Date.now()
      };

      // Save directly into IndexedDB offline storage
      await saveSongOffline(newSong);

      setSuccess(true);
      setTimeout(() => {
        onSongAdded(newSong);
        onClose();
      }, 1000);

    } catch (err) {
      console.error('Failed to import local song:', err);
      alert('Failed to save song locally. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
            <Upload className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Import MP3 to Adha Music</h3>
            <p className="text-xs text-slate-400">Add local audio files from your phone or PC to play offline.</p>
          </div>
        </div>

        {success ? (
          <div className="py-8 text-center space-y-2">
            <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full mx-auto flex items-center justify-center">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white">Song Added to Offline Library!</h4>
            <p className="text-xs text-slate-400">You can now play this song offline anytime.</p>
          </div>
        ) : (
          <form onSubmit={handleUploadSubmit} className="space-y-4">
            
            {/* File Input Box */}
            <div className="border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-2xl p-6 text-center cursor-pointer transition bg-slate-950/50 relative">
              <input 
                type="file" 
                accept="audio/*" 
                onChange={handleFileChange} 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                required 
              />
              <Music className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
              {file ? (
                <div>
                  <p className="text-sm font-bold text-indigo-300 truncate">{file.name}</p>
                  <p className="text-[11px] text-slate-400">{(file.size / (1024 * 1024)).toFixed(2)} MB • Audio Selected</p>
                </div>
              ) : (
                <div>
                  <p className="text-xs font-semibold text-slate-200">Tap to select MP3 / WAV audio file</p>
                  <p className="text-[11px] text-slate-500">Supports .mp3, .wav, .m4a, .ogg</p>
                </div>
              )}
            </div>

            {/* Title */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Song Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Tum Hi Ho / Resham Firiri"
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Artist */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Artist Name</label>
              <input
                type="text"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                placeholder="e.g. Arijit Singh / Bipul Chettri"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Language Selection */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Category / Language Tag</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as SongLanguage)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Hindi">🇮🇳 Hindi Song</option>
                <option value="Nepali">🇳🇵 Nepali Song</option>
                <option value="Instrumental">🎵 Instrumental</option>
                <option value="Custom">📁 Custom Local Track</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isSaving || !file || !title}
              className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs rounded-xl shadow-lg transition disabled:opacity-50 cursor-pointer"
            >
              {isSaving ? 'Saving Offline...' : 'Save & Add to Offline Player'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
