import React from 'react';
import { useSolarSystemContext } from '../../context/SolarSystemContext';
import { Gauge } from 'lucide-react';

const planetNames = [
  'Mercury', 'Venus', 'Earth', 'Mars', 
  'Jupiter', 'Saturn', 'Uranus', 'Neptune'
];

const planetColors = [
  '#8C7853', '#FFC649', '#6B93D6', '#CD5C5C',
  '#D8CA9D', '#FAD5A5', '#4FD0E7', '#4B70DD'
];

const PlanetSpeedControls: React.FC = () => {
  const { planetSpeeds, setPlanetSpeed } = useSolarSystemContext();

  return (
    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-white/10 backdrop-blur-sm p-6 shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Gauge className="w-6 h-6 text-blue-400" />
        <h2 className="text-xl font-semibold text-white">Orbital Speed Controls</h2>
      </div>
      
      <div className="space-y-4">
        {planetNames.map((name, index) => (
          <div key={name} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: planetColors[index] }}
                ></div>
                <label className="text-white font-medium text-sm">{name}</label>
              </div>
              <span className="text-blue-400 font-mono text-xs bg-blue-400/10 px-2 py-1 rounded">
                {planetSpeeds[index].toFixed(1)}x
              </span>
            </div>
            
            <div className="relative">
              <input
                type="range"
                min="0"
                max="5"
                step="0.1"
                value={planetSpeeds[index]}
                onChange={(e) => setPlanetSpeed(index, parseFloat(e.target.value))}
                className="w-full h-2 bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg appearance-none cursor-pointer slider-thumb"
                style={{
                  background: `linear-gradient(to right, ${planetColors[index]}40 0%, ${planetColors[index]}40 ${(planetSpeeds[index] / 5) * 100}%, #374151 ${(planetSpeeds[index] / 5) * 100}%, #374151 100%)`
                }}
              />
            </div>
          </div>
        ))}
        
        <div className="flex justify-between text-xs text-gray-400 mt-4 pt-4 border-t border-white/10">
          <span>Stopped</span>
          <span>Normal</span>
          <span>5x Speed</span>
        </div>
      </div>
    </div>
  );
};

export default PlanetSpeedControls;