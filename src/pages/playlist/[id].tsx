// src/pages/playlist/[id].tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

interface Song {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface PlaylistData {
  name: string;
  songs: Song[];
}

const Playlist = () => {
  const router = useRouter();
  const { id } = router.query;
  const [playlistData, setPlaylistData] = useState<PlaylistData | null>(null);

  useEffect(() => {
    if (id) {
      // Fetch playlist data from the API based on the ID
      axios
        .get<Song[]>(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`)
        .then(response => {
          setPlaylistData({
            name: `Playlist ${id}`,
            songs: response.data,
          });
        })
        .catch(error => {
          console.log(error);
          setPlaylistData(null);
        });
    }
  }, [id]);

return (
  <div className="p-6">
    {playlistData ? (
      <div>
        <motion.h1
          className="text-3xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {playlistData.name}
        </motion.h1>
        <div className="overflow-x-auto">
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {playlistData.songs.map((song, index) => (
              <motion.li
                key={index}
                className="flex items-center space-x-4 bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.img
                  src={song.thumbnailUrl}
                  alt={song.title}
                  className="w-16 h-16 rounded-lg"
                  whileHover={{ scale: 1.1 }}
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                >
                  <motion.h3
                    className="font-semibold text-lg text-white"
                    whileHover={{ scale: 1.05 }}
                  >
                    {song.title}
                  </motion.h3>
                  <motion.p
                    className="text-gray-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    AI generated song
                  </motion.p>
                </motion.div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    ) : (
      <motion.div
        className="flex items-center justify-center h-64"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.p
          className="text-2xl text-gray-400"
          whileHover={{ scale: 1.05 }}
        >
          Loading...
        </motion.p>
      </motion.div>
    )}
  </div>
);

};

export default Playlist;
