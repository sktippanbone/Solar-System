import React from 'react';
import PlanetSpeedControls from './controls/PlanetSpeedControls';
import PlayPauseControl from './controls/PlayPauseControl';
import ThemeToggle from './controls/ThemeToggle';
import CameraControls from './controls/CameraControls';
import ResetControl from './controls/ResetControl';
import { Settings } from 'lucide-react';

const ControlPanel: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-white/10 backdrop-blur-sm p-6 shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <Settings className="w-6 h-6 text-yellow-400" />
          <h2 className="text-xl font-semibold text-white">Mission Control</h2>
        </div>
        
        <div className="space-y-6">
          <PlayPauseControl />
          <ThemeToggle />
          <CameraControls />
          <ResetControl />
        </div>
      </div>
      
      <PlanetSpeedControls />
      
      {/* Info Panel */}
      <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-2xl border border-yellow-400/20 backdrop-blur-sm p-6">
        <h3 className="text-lg font-semibold text-white mb-3">Features</h3>
        <ul className="space-y-2 text-sm text-gray-300">
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
            Real-time orbital speed control
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
            Interactive 3D camera movement
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
            Planet hover tooltips
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
            Dynamic lighting system
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
            Background star field
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ControlPanel;