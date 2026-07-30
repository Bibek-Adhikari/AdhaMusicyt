import { Song, OfflineSongRecord } from '../types';

const DB_NAME = 'AdhaMusicDB';
const DB_VERSION = 1;
const STORE_SONGS = 'offline_songs';
const STORE_FAVORITES = 'favorites';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_SONGS)) {
        db.createObjectStore(STORE_SONGS, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORE_FAVORITES)) {
        db.createObjectStore(STORE_FAVORITES, { keyPath: 'id' });
      }
    };
  });
}

/**
 * Downloads a song audio file and stores it in IndexedDB for offline playback
 */
export async function saveSongOffline(
  song: Song,
  onProgress?: (percent: number) => void
): Promise<void> {
  // Fetch audio file stream or blob
  let blob: Blob;

  if (song.audioUrl.startsWith('blob:')) {
    // Already a local blob URL
    const response = await fetch(song.audioUrl);
    blob = await response.blob();
  } else {
    // Online URL - fetch with progress
    const response = await fetch(song.audioUrl);
    if (!response.ok) {
      throw new Error(`Failed to download audio file: ${response.statusText}`);
    }

    const contentLength = response.headers.get('content-length');
    const totalBytes = contentLength ? parseInt(contentLength, 10) : 0;

    if (!response.body || totalBytes === 0) {
      blob = await response.blob();
      if (onProgress) onProgress(100);
    } else {
      const reader = response.body.getReader();
      let receivedBytes = 0;
      const chunks: Uint8Array[] = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        if (value) {
          chunks.push(value);
          receivedBytes += value.length;
          if (totalBytes && onProgress) {
            onProgress(Math.min(99, Math.round((receivedBytes / totalBytes) * 100)));
          }
        }
      }

      blob = new Blob(chunks, { type: 'audio/mpeg' });
      if (onProgress) onProgress(100);
    }
  }

  const record: OfflineSongRecord = {
    id: song.id,
    song: { ...song },
    audioBlob: blob,
    downloadedAt: Date.now()
  };

  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_SONGS, 'readwrite');
    const store = tx.objectStore(STORE_SONGS);
    const req = store.put(record);

    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

/**
 * Retrieves all offline downloaded songs with Blob URLs for offline listening
 */
export async function getAllOfflineSongs(): Promise<{ song: Song; blobUrl: string }[]> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_SONGS, 'readonly');
      const store = tx.objectStore(STORE_SONGS);
      const req = store.getAll();

      req.onsuccess = () => {
        const records: OfflineSongRecord[] = req.result || [];
        const result = records.map((rec) => {
          return {
            song: { ...rec.song },
            blobUrl: ''
          };
        });
        resolve(result);
      };
      req.onerror = () => reject(req.error);
    });
  } catch (e) {
    console.error('Failed to get offline songs:', e);
    return [];
  }
}

/**
 * Get offline Blob URL for a specific song ID
 */
export async function getOfflineSongAudioUrl(songId: string): Promise<string | null> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_SONGS, 'readonly');
      const store = tx.objectStore(STORE_SONGS);
      const req = store.get(songId);

      req.onsuccess = () => {
        const record: OfflineSongRecord | undefined = req.result;
        if (record && record.audioBlob) {
          resolve(URL.createObjectURL(record.audioBlob));
        } else {
          resolve(null);
        }
      };
      req.onerror = () => reject(req.error);
    });
  } catch {
    return null;
  }
}

/**
 * Delete a downloaded song from storage
 */
export async function deleteOfflineSong(songId: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_SONGS, 'readwrite');
    const store = tx.objectStore(STORE_SONGS);
    const req = store.delete(songId);

    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

/**
 * Check if a song is downloaded offline
 */
export async function isSongOffline(songId: string): Promise<boolean> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_SONGS, 'readonly');
      const store = tx.objectStore(STORE_SONGS);
      const req = store.get(songId);

      req.onsuccess = () => resolve(!!req.result);
      req.onerror = () => resolve(false);
    });
  } catch {
    return false;
  }
}

/**
 * Save / toggle favorite songs in local storage
 */
export async function getFavorites(): Promise<string[]> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_FAVORITES, 'readonly');
      const store = tx.objectStore(STORE_FAVORITES);
      const req = store.getAllKeys();

      req.onsuccess = () => resolve((req.result as string[]) || []);
      req.onerror = () => resolve([]);
    });
  } catch {
    return [];
  }
}

export async function toggleFavorite(songId: string): Promise<boolean> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_FAVORITES, 'readwrite');
    const store = tx.objectStore(STORE_FAVORITES);
    const checkReq = store.get(songId);

    checkReq.onsuccess = () => {
      if (checkReq.result) {
        // Remove
        const delReq = store.delete(songId);
        delReq.onsuccess = () => resolve(false);
        delReq.onerror = () => reject(delReq.error);
      } else {
        // Add
        const addReq = store.put({ id: songId, addedAt: Date.now() });
        addReq.onsuccess = () => resolve(true);
        addReq.onerror = () => reject(addReq.error);
      }
    };
    checkReq.onerror = () => reject(checkReq.error);
  });
}
