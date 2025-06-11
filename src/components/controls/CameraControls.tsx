import React from 'react';
import { Camera, RotateCcw } from 'lucide-react';

const CameraControls: React.FC = () => {
  return (
    <div className="space-y-3">
      <label className="text-white font-medium">Camera Controls</label>
      
      <div className="grid grid-cols-2 gap-2">
        <button className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105">
          <Camera className="w-4 h-4" />
          Zoom
        </button>
        <button className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105">
          <RotateCcw className="w-4 h-4" />
          Rotate
        </button>
      </div>
      
      <p className="text-xs text-gray-400">
        Use mouse to orbit camera around the solar system
      </p>
    </div>
  );
};

export default CameraControls;