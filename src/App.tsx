import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Song, RepeatMode } from './types';
import { INITIAL_SONGS } from './data/songs';
import { 
  getAllOfflineSongs, 
  saveSongOffline, 
  deleteOfflineSong, 
  isSongOffline,
  getFavorites,
  toggleFavorite,
  getOfflineSongAudioUrl
} from './services/db';

// Components
import { PWAInstallBanner } from './components/PWAInstallBanner';
import { Navbar } from './components/Navbar';
import { SongList } from './components/SongList';
import { PlayerBar } from './components/PlayerBar';
import { FullPlayerModal } from './components/FullPlayerModal';
import { UploadModal } from './components/UploadModal';
import { VercelGuideModal } from './components/VercelGuideModal';
import { LyriaStudioModal } from './components/LyriaStudioModal';

export default function App() {
  // Audio state
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentBlobUrlRef = useRef<string | null>(null);
  
  // Library State
  const [songs, setSongs] = useState<Song[]>(INITIAL_SONGS);
  const [offlineSongIds, setOfflineSongIds] = useState<Set<string>>(new Set());
  const [downloadProgresses, setDownloadProgresses] = useState<Record<string, number>>({});
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Playback State
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>('off');
  const [queue, setQueue] = useState<Song[]>(INITIAL_SONGS);
  const [queueIndex, setQueueIndex] = useState(0);

  // Modals
  const [showFullPlayer, setShowFullPlayer] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showVercelGuide, setShowVercelGuide] = useState(false);
  const [showLyriaStudio, setShowLyriaStudio] = useState(false);

  // 1. Initialize Audio Element & Listeners
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration || 0);
    const handleEnded = () => handleSongEnded();
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    // Online/Offline Network status listeners
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Register PWA Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch((err) => {
        console.log('SW registration note:', err);
      });
    }

    // Load initial storage data
    loadOfflineLibrary();
    loadFavoritesData();

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if (currentBlobUrlRef.current) {
        URL.revokeObjectURL(currentBlobUrlRef.current);
      }
    };
  }, []);

  // 2. Load Offline Library & Favorites from IndexedDB
  const loadOfflineLibrary = async () => {
    try {
      const offlineRecords = await getAllOfflineSongs();
      const offlineIds = new Set<string>();
      const offlineSongsList: Song[] = [];

      offlineRecords.forEach((rec) => {
        offlineIds.add(rec.song.id);
        offlineSongsList.push(rec.song);
      });

      setOfflineSongIds(offlineIds);

      // Merge custom/user songs into main song list if not present
      setSongs((prev) => {
        const existingIds = new Set(prev.map((s) => s.id));
        const newSongs = offlineSongsList.filter((s) => !existingIds.has(s.id));
        return [...prev, ...newSongs];
      });
    } catch (e) {
      console.error('Error loading offline library:', e);
    }
  };

  const loadFavoritesData = async () => {
    try {
      const favKeys = await getFavorites();
      setFavoriteIds(new Set(favKeys));
    } catch (e) {
      console.error('Error loading favorites:', e);
    }
  };

  // 3. Playback Controls & MediaSession integration
  const playSong = async (song: Song, newQueue?: Song[], index?: number) => {
    if (!audioRef.current) return;

    try {
      // Determine actual audio URL (check if stored offline in IndexedDB first)
      let playUrl = song.audioUrl;
      const offlineUrl = await getOfflineSongAudioUrl(song.id);
      if (offlineUrl) {
        playUrl = offlineUrl;
      }

      // Revoke previous blob URL to prevent memory leak
      if (currentBlobUrlRef.current && currentBlobUrlRef.current !== playUrl) {
        URL.revokeObjectURL(currentBlobUrlRef.current);
      }
      currentBlobUrlRef.current = playUrl.startsWith('blob:') ? playUrl : null;

      audioRef.current.src = playUrl;
      audioRef.current.volume = isMuted ? 0 : volume;
      await audioRef.current.play();

      setCurrentSong(song);
      setIsPlaying(true);

      if (newQueue) {
        setQueue(newQueue);
        setQueueIndex(index ?? 0);
      } else {
        const idx = queue.findIndex((s) => s.id === song.id);
        if (idx !== -1) setQueueIndex(idx);
      }

      // Lockscreen & System Notification Controls (MediaSession API)
      if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: song.title,
          artist: song.artist,
          album: song.album || 'Adha Music',
          artwork: [
            { src: song.coverUrl, sizes: '512x512', type: 'image/jpeg' }
          ]
        });

        navigator.mediaSession.setActionHandler('play', () => audioRef.current?.play());
        navigator.mediaSession.setActionHandler('pause', () => audioRef.current?.pause());
        navigator.mediaSession.setActionHandler('previoustrack', () => handleSkipPrevious());
        navigator.mediaSession.setActionHandler('nexttrack', () => handleSkipNext());
      }

    } catch (err) {
      console.error('Playback error:', err);
    }
  };

  const togglePlayPause = () => {
    if (!audioRef.current || !currentSong) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const handleSongEnded = () => {
    if (repeatMode === 'one' && currentSong) {
      playSong(currentSong);
    } else {
      handleSkipNext();
    }
  };

  const handleSkipNext = () => {
    if (queue.length === 0) return;

    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * queue.length);
      playSong(queue[randomIndex], queue, randomIndex);
    } else {
      const nextIndex = (queueIndex + 1) % queue.length;
      playSong(queue[nextIndex], queue, nextIndex);
    }
  };

  const handleSkipPrevious = () => {
    if (queue.length === 0) return;

    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * queue.length);
      playSong(queue[randomIndex], queue, randomIndex);
    } else {
      const prevIndex = queueIndex === 0 ? queue.length - 1 : queueIndex - 1;
      playSong(queue[prevIndex], queue, prevIndex);
    }
  };

  const handleSeek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (vol: number) => {
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : vol;
    }
  };

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    if (audioRef.current) {
      audioRef.current.volume = nextMute ? 0 : volume;
    }
  };

  // 4. Download & Offline Management
  const handleDownloadSong = async (song: Song) => {
    setDownloadProgresses((prev) => ({ ...prev, [song.id]: 10 }));

    try {
      await saveSongOffline(song, (percent) => {
        setDownloadProgresses((prev) => ({ ...prev, [song.id]: percent }));
      });

      setOfflineSongIds((prev) => new Set(prev).add(song.id));
    } catch (e) {
      console.error('Failed to download song:', e);
      alert('Could not download song for offline playback. Please check internet connection.');
    } finally {
      setDownloadProgresses((prev) => {
        const copy = { ...prev };
        delete copy[song.id];
        return copy;
      });
    }
  };

  const handleDeleteOfflineSong = async (songId: string) => {
    try {
      await deleteOfflineSong(songId);
      setOfflineSongIds((prev) => {
        const copy = new Set(prev);
        copy.delete(songId);
        return copy;
      });
    } catch (e) {
      console.error('Failed to delete offline song:', e);
    }
  };

  // 5. Toggle Favorites
  const handleToggleFavorite = async (songId: string) => {
    try {
      const isFavNow = await toggleFavorite(songId);
      setFavoriteIds((prev) => {
        const copy = new Set(prev);
        if (isFavNow) copy.add(songId);
        else copy.delete(songId);
        return copy;
      });
    } catch (e) {
      console.error('Error toggling favorite:', e);
    }
  };

  // 6. User Custom Song Added
  const handleCustomSongAdded = (newSong: Song) => {
    setSongs((prev) => {
      const newList = [newSong, ...prev];
      queueMicrotask(() => playSong(newSong, newList, 0));
      return newList;
    });
    setOfflineSongIds((prev) => new Set(prev).add(newSong.id));
  };

  // 7. Filtered Songs calculation
  const filteredSongs = useMemo(() => {
    return songs.filter((song) => {
      // Search query filter
      const matchesSearch = 
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.genre.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      // Category filter
      if (activeFilter === 'Lyria 3') return song.language === 'Lyria 3' || song.id.startsWith('lyria-');
      if (activeFilter === 'Hindi') return song.language === 'Hindi';
      if (activeFilter === 'Nepali') return song.language === 'Nepali';
      if (activeFilter === 'offline') return offlineSongIds.has(song.id);
      if (activeFilter === 'favorites') return favoriteIds.has(song.id);
      if (activeFilter === 'Custom') return song.language === 'Custom' || song.id.startsWith('custom-');

      return true;
    });
  }, [songs, searchQuery, activeFilter, offlineSongIds, favoriteIds]);

  const activeFilterName = useMemo(() => {
    if (activeFilter === 'Lyria 3') return '✨ Google Lyria 3 AI Tracks';
    if (activeFilter === 'Hindi') return '🇮🇳 Hindi Songs';
    if (activeFilter === 'Nepali') return '🇳🇵 Nepali Songs';
    if (activeFilter === 'offline') return 'Downloaded Offline Tracks';
    if (activeFilter === 'favorites') return 'Your Favorite Songs';
    if (activeFilter === 'Custom') return 'User Uploaded Songs';
    return 'All Songs';
  }, [activeFilter]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans pb-28">
      
      {/* Top Banner for PWA Installation */}
      <PWAInstallBanner />

      {/* Main App Navbar */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        isOnline={isOnline}
        offlineCount={offlineSongIds.size}
        favoritesCount={favoriteIds.size}
        onOpenUpload={() => setShowUploadModal(true)}
        onOpenVercelGuide={() => setShowVercelGuide(true)}
        onOpenLyriaStudio={() => setShowLyriaStudio(true)}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        <SongList
          songs={filteredSongs}
          currentSong={currentSong}
          isPlaying={isPlaying}
          offlineSongIds={offlineSongIds}
          downloadProgresses={downloadProgresses}
          favoriteIds={favoriteIds}
          onPlaySong={(song) => {
            const idx = filteredSongs.findIndex((s) => s.id === song.id);
            playSong(song, filteredSongs, idx >= 0 ? idx : 0);
          }}
          onShufflePlay={() => {
            if (filteredSongs.length > 0) {
              const randomIndex = Math.floor(Math.random() * filteredSongs.length);
              setIsShuffle(true);
              playSong(filteredSongs[randomIndex], filteredSongs, randomIndex);
            }
          }}
          onDownloadSong={handleDownloadSong}
          onDeleteOfflineSong={handleDeleteOfflineSong}
          onToggleFavorite={handleToggleFavorite}
          activeFilterName={activeFilterName}
          isOnline={isOnline}
          onOpenUpload={() => setShowUploadModal(true)}
        />
      </main>

      {/* Persistent Bottom Player Bar */}
      <PlayerBar
        currentSong={currentSong}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        volume={volume}
        isMuted={isMuted}
        isShuffle={isShuffle}
        repeatMode={repeatMode}
        isDownloaded={currentSong ? offlineSongIds.has(currentSong.id) : false}
        isFavorite={currentSong ? favoriteIds.has(currentSong.id) : false}
        onPlayPause={togglePlayPause}
        onSkipNext={handleSkipNext}
        onSkipPrevious={handleSkipPrevious}
        onToggleShuffle={() => setIsShuffle((prev) => !prev)}
        onToggleRepeat={() => {
          setRepeatMode((prev) => {
            if (prev === 'off') return 'all';
            if (prev === 'all') return 'one';
            return 'off';
          });
        }}
        onSeek={handleSeek}
        onVolumeChange={handleVolumeChange}
        onToggleMute={toggleMute}
        onToggleFavorite={handleToggleFavorite}
        onOpenFullPlayer={() => setShowFullPlayer(true)}
      />

      {/* Fullscreen Mobile Player Modal */}
      {showFullPlayer && currentSong && (
        <FullPlayerModal
          currentSong={currentSong}
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration}
          volume={volume}
          isShuffle={isShuffle}
          repeatMode={repeatMode}
          isDownloaded={offlineSongIds.has(currentSong.id)}
          isFavorite={favoriteIds.has(currentSong.id)}
          queue={queue}
          queueIndex={queueIndex}
          onClose={() => setShowFullPlayer(false)}
          onPlayPause={togglePlayPause}
          onSkipNext={handleSkipNext}
          onSkipPrevious={handleSkipPrevious}
          onToggleShuffle={() => setIsShuffle((prev) => !prev)}
          onToggleRepeat={() => {
            setRepeatMode((prev) => {
              if (prev === 'off') return 'all';
              if (prev === 'all') return 'one';
              return 'off';
            });
          }}
          onSeek={handleSeek}
          onToggleFavorite={handleToggleFavorite}
          onDownload={handleDownloadSong}
          onPlayFromQueue={(idx) => playSong(queue[idx], queue, idx)}
        />
      )}

      {/* Upload Local MP3 Modal */}
      {showUploadModal && (
        <UploadModal
          onClose={() => setShowUploadModal(false)}
          onSongAdded={handleCustomSongAdded}
        />
      )}

      {/* Vercel Deployment Modal */}
      {showVercelGuide && (
        <VercelGuideModal onClose={() => setShowVercelGuide(false)} />
      )}

      {/* Lyria 3 AI Studio Modal */}
      {showLyriaStudio && (
        <LyriaStudioModal
          onClose={() => setShowLyriaStudio(false)}
          onSongGenerated={handleCustomSongAdded}
        />
      )}

    </div>
  );
}
