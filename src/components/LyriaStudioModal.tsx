import React, { useState } from 'react';
import { Sparkles, X, Music, Play, Loader2, Disc, Wand2, Download, CheckCircle2 } from 'lucide-react';
import { Song } from '../types';

interface LyriaStudioModalProps {
  onClose: () => void;
  onSongGenerated: (song: Song) => void;
}

export function LyriaStudioModal({ onClose, onSongGenerated }: LyriaStudioModalProps) {
  const [prompt, setPrompt] = useState('');
  const [modelType, setModelType] = useState<'clip' | 'pro'>('clip');
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [generatedSong, setGeneratedSong] = useState<Song | null>(null);

  const samplePrompts = [
    'Himalayan ambient acoustic guitar with morning flute breeze',
    'Kathmandu lo-fi chill hop with soft rain beats and rhodes piano',
    'Bollywood cyber electronic fusion with energetic tabla and synth bass',
    'Deep 432Hz meditation soundscape for relaxation and sleep',
    'Peaceful mountain sunset fingerpicked acoustic acoustic melody'
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setErrorMsg('Please enter a music description or prompt.');
      return;
    }

    setIsGenerating(true);
    setErrorMsg(null);
    setGeneratedSong(null);

    try {
      const res = await fetch('/api/generate-music', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, modelType }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate Lyria 3 track.');
      }

      // Convert Base64 into playable Blob URL
      const binary = atob(data.audioBase64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: data.mimeType || 'audio/wav' });
      const audioBlobUrl = URL.createObjectURL(blob);

      const newSong: Song = {
        id: `lyria-gen-${Date.now()}`,
        title: prompt.slice(0, 30) + (prompt.length > 30 ? '...' : ''),
        artist: 'Lyria 3 AI Studio',
        album: modelType === 'pro' ? 'Lyria 3 Pro Stream' : 'Lyria 3 Clip Stream',
        language: 'Lyria 3',
        genre: 'AI Generated',
        duration: modelType === 'pro' ? 180 : 30,
        coverUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80',
        audioUrl: audioBlobUrl,
        isPopular: true,
        lyrics: data.lyrics || `[Generated with Google Lyria 3 (${modelType === 'pro' ? 'lyria-3-pro-preview' : 'lyria-3-clip-preview'})]\nPrompt: ${prompt}`
      };

      setGeneratedSong(newSong);
    } catch (err: any) {
      console.error('Lyria 3 Generation Error:', err);
      setErrorMsg(err.message || 'Error communicating with Lyria 3 music generator.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddAndPlay = () => {
    if (generatedSong) {
      onSongGenerated(generatedSong);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-indigo-500/30 rounded-3xl p-6 shadow-2xl shadow-indigo-950/50 overflow-hidden">
        
        {/* Glow Header Effect */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded-full transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="flex items-center gap-3 mb-5">
          <div className="p-3 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-lg shadow-indigo-500/25">
            <Sparkles className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              Lyria 3 AI Music Studio
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-gradient-to-r from-pink-500 to-purple-500 text-white uppercase tracking-wider">
                Google Lyria 3
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Generate custom 30s clips or full tracks using Google Lyria 3 model
            </p>
          </div>
        </div>

        {/* Model Selection */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Select Lyria 3 Model
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setModelType('clip')}
              className={`p-3 rounded-2xl border text-left transition cursor-pointer ${
                modelType === 'clip'
                  ? 'bg-indigo-600/20 border-indigo-500 text-white ring-1 ring-indigo-500/50'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="text-xs font-bold flex items-center gap-1.5">
                <Disc className="w-3.5 h-3.5 text-indigo-400" />
                lyria-3-clip-preview
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">30-second audio clip generation</p>
            </button>

            <button
              type="button"
              onClick={() => setModelType('pro')}
              className={`p-3 rounded-2xl border text-left transition cursor-pointer ${
                modelType === 'pro'
                  ? 'bg-purple-600/20 border-purple-500 text-white ring-1 ring-purple-500/50'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="text-xs font-bold flex items-center gap-1.5">
                <Wand2 className="w-3.5 h-3.5 text-purple-400" />
                lyria-3-pro-preview
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">Full-length high quality music track</p>
            </button>
          </div>
        </div>

        {/* Text Prompt Input */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Describe the music style or atmosphere
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Atmospheric Himalayan synthwave with acoustic guitar and serene flute..."
            rows={3}
            className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 text-slate-100 placeholder:text-slate-600 text-xs p-3 rounded-2xl focus:outline-none transition shadow-inner"
          />
        </div>

        {/* Quick Sample Prompts */}
        <div className="mb-5">
          <p className="text-[11px] font-medium text-slate-400 mb-2">Inspiration Ideas:</p>
          <div className="flex flex-wrap gap-1.5">
            {samplePrompts.map((sp, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setPrompt(sp)}
                className="px-2.5 py-1 bg-slate-800/80 hover:bg-slate-800 text-[10px] text-slate-300 hover:text-white border border-slate-700/60 rounded-xl transition cursor-pointer"
              >
                + {sp}
              </button>
            ))}
          </div>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-rose-300 text-xs">
            {errorMsg}
          </div>
        )}

        {/* Generated Result Preview */}
        {generatedSong && (
          <div className="mb-5 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl animate-fade-in">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4" />
                Lyria 3 Track Generated Successfully!
              </div>
            </div>

            <div className="flex items-center gap-3 bg-slate-950/80 p-3 rounded-xl border border-slate-800 mb-3">
              <img
                src={generatedSong.coverUrl}
                alt={generatedSong.title}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-white truncate">{generatedSong.title}</h4>
                <p className="text-[11px] text-slate-400 truncate">{generatedSong.artist} • {generatedSong.album}</p>
              </div>
            </div>

            <audio controls src={generatedSong.audioUrl} className="w-full h-8 mb-3" />

            <button
              onClick={handleAddAndPlay}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              Add to Playlist & Play Now
            </button>
          </div>
        )}

        {/* Main Action Button */}
        {!generatedSong && (
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/25 transition active:scale-98 disabled:opacity-50 cursor-pointer"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating audio stream with Lyria 3...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate Track with Google Lyria 3
              </>
            )}
          </button>
        )}

      </div>
    </div>
  );
}
