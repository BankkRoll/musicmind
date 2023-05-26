// src/pages/index.tsx
import { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface Song {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const Home = () => {
  const [data, setData] = useState<Song[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);

  useEffect(() => {
    // Fetch data from a placeholder API
    axios.get<Song[]>('https://jsonplaceholder.typicode.com/photos?_limit=6')
      .then(response => {
        setData(response.data);
      })
  }, []);

  useEffect(() => {
    setFilteredSongs(
      data.slice(3, 6).filter((song) =>
        song.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, data]);


  return (
    <div className="min-h-screen p-6 bg-gray-800 text-white space-y-8">

        {/* Slideshow Section */}
        <div className="w-full h-64 overflow-hidden rounded-lg shadow-lg mb-4">
            <Carousel showThumbs={false} infiniteLoop useKeyboardArrows autoPlay>
                {data.slice(0,3).map((img, index) => (
                    <div key={index}>
                        <img src={img.url} alt={img.title} />
                    </div>
                ))}
            </Carousel>
        </div>

        {/* Grid Layout for Trending Playlist and Explore Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
            {/* Trending Playlist Section */}
            <div className="col-span-2 bg-gray-700 p-6 rounded-lg shadow-lg space-y-4">
                <h2 className="font-bold text-2xl mb-2 text-white">Trending Playlists</h2>
                {/* Mock Playlist */}
                {data.slice(0, 3).map((playlist, index) => (
                    <div key={index} className="flex items-center space-x-4">
                        <img src={playlist.thumbnailUrl} alt={playlist.title} className="w-16 h-16 rounded-lg" />
                        <div>
                            <h3 className="font-semibold text-lg">{playlist.title}</h3>
                            <p className="text-gray-300">AI generated playlist</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Explore Section */}
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg space-y-4">
                <h2 className="font-bold text-2xl mb-2 text-white">Explore Now</h2>
                {/* Search Bar */}
                <div className="relative">
                    <input
                        type="text"
                        className="w-full pl-10 pr-4 py-2 rounded-lg shadow-md text-black"
                        placeholder="Search songs..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-gray-300">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
                {/* Sample songs */}
                {filteredSongs.map((song, index) => (
                    <div key={index} className="flex items-center space-x-4">
                        <img src={song.thumbnailUrl} alt={song.title} className="w-12 h-12 rounded-lg" />
                        <div>
                            <h3 className="font-semibold text-lg">{song.title}</h3>
                            <p className="text-gray-300">AI generated song</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Other Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.slice(3).map((item, index) => (
            <div key={index} className="bg-gray-700 p-6 rounded-lg shadow-lg">
                <h2 className="font-bold text-2xl mb-2 text-white">{item.title}</h2>
                {/* Content for other sections */}
                <img src={item.thumbnailUrl} alt={item.title} className="rounded-lg mt-2"/>
                <p className="text-gray-300 mt-2">This is some additional text related to the image above.</p>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Home;