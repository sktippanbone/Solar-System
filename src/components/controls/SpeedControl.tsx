import React from 'react';
import { useCubeContext } from '../../context/CubeContext';
import { Gauge } from 'lucide-react';

const SpeedControl: React.FC = () => {
  const { speed, setSpeed } = useCubeContext();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Gauge className="w-5 h-5 text-blue-400" />
          <label className="text-white font-medium">Rotation Speed</label>
        </div>
        <span className="text-blue-400 font-mono text-sm bg-blue-400/10 px-2 py-1 rounded">
          {speed.toFixed(1)}x
        </span>
      </div>
      
      <div className="relative">
        <input
          type="range"
          min="0.1"
          max="5"
          step="0.1"
          value={speed}
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
          className="w-full h-2 bg-gradient-to-r from-slate-700 to-slate-600 rounded-lg appearance-none cursor-pointer slider-thumb"
        />
        
        {/* Speed markers */}
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>Slow</span>
          <span>Medium</span>
          <span>Fast</span>
        </div>
      </div>
    </div>
  );
};

export default SpeedControl;