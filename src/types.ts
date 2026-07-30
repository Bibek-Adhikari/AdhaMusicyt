export type SongLanguage = 'Hindi' | 'Nepali' | 'Instrumental' | 'Custom' | 'Lyria 3';

export interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  language: SongLanguage;
  duration: number; // in seconds
  coverUrl: string;
  audioUrl: string; // online or blob URL
  genre: string;
  isPopular?: boolean;
  lyrics?: string;
  addedAt?: number;
}

export interface OfflineSongRecord {
  id: string;
  song: Song;
  audioBlob: Blob;
  downloadedAt: number;
}

export type RepeatMode = 'off' | 'all' | 'one';

export interface PlaybackState {
  isPlaying: boolean;
  currentSong: Song | null;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isShuffle: boolean;
  repeatMode: RepeatMode;
  queue: Song[];
  queueIndex: number;
}
