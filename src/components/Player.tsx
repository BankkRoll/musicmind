// src/components/Player.tsx
import { useEffect, useRef } from 'react';

interface PlayerProps {
  audioUrl: string;
}

const Player: React.FC<PlayerProps> = ({ audioUrl }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.src = audioUrl;
  }, [audioUrl]);

  const handlePlay = () => {
    if (!audioRef.current) return;
    audioRef.current.play();
  };

  const handlePause = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
  };

  return (
    <div>
      <audio ref={audioRef} />
      <button onClick={handlePlay}>Play</button>
      <button onClick={handlePause}>Pause</button>
    </div>
  );
};

export default Player;
