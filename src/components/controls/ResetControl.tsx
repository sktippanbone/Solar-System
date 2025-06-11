import React from 'react';
import { useSolarSystemContext } from '../../context/SolarSystemContext';
import { RotateCcw } from 'lucide-react';

const ResetControl: React.FC = () => {
  const { resetSolarSystem } = useSolarSystemContext();

  return (
    <div className="space-y-3">
      <button
        onClick={resetSolarSystem}
        className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 border border-white/10"
      >
        <RotateCcw className="w-5 h-5" />
        Reset Simulation
      </button>
      
      <p className="text-xs text-gray-400 text-center">
        Resets all planet speeds and positions to default values
      </p>
    </div>
  );
};

export default ResetControl;