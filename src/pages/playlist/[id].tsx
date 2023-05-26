// src/pages/playlist/[id].tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface PlaylistData {
  id: string;
  name: string;
  songs: string[];
}

// Fetch playlist data from an API (this is a placeholder)
const fetchPlaylistData = async (id: string): Promise<PlaylistData> => {
  return {
    id,
    name: 'Playlist ' + id,
    songs: ['Song 1', 'Song 2', 'Song 3'],
  };
};

const Playlist = () => {
  const router = useRouter();
  const { id } = router.query;
  const [playlistData, setPlaylistData] = useState<PlaylistData | null>(null);

  useEffect(() => {
    if (id && typeof id === 'string') {
      fetchPlaylistData(id).then(data => setPlaylistData(data));
    }
  }, [id]);

  return (
    <div className="p-6">
      {playlistData ? (
        <div>
          <h1 className="text-3xl font-bold mb-4">{playlistData.name}</h1>
          <ul>
            {playlistData.songs.map((song, index) => (
              <li key={index}>{song}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Playlist;

