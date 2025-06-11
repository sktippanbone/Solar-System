import React from 'react';
import { useSolarSystemContext } from '../../context/SolarSystemContext';
import { Play, Pause } from 'lucide-react';

const PlayPauseControl: React.FC = () => {
  const { isPlaying, setIsPlaying } = useSolarSystemContext();

  return (
    <div className="space-y-3">
      <label className="text-white font-medium">Animation Control</label>
      
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
          isPlaying
            ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg shadow-red-500/25'
            : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg shadow-green-500/25'
        }`}
      >
        {isPlaying ? (
          <>
            <Pause className="w-5 h-5" />
            Pause Simulation
          </>
        ) : (
          <>
            <Play className="w-5 h-5" />
            Start Simulation
          </>
        )}
      </button>
    </div>
  );
};

export default PlayPauseControl;