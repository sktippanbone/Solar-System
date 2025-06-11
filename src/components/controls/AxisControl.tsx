import React from 'react';
import { useCubeContext } from '../../context/CubeContext';
import { RotateCcw } from 'lucide-react';

const AxisControl: React.FC = () => {
  const { rotationAxis, setRotationAxis } = useCubeContext();

  const handleAxisToggle = (axis: 'x' | 'y' | 'z') => {
    setRotationAxis(prev => ({
      ...prev,
      [axis]: !prev[axis]
    }));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <RotateCcw className="w-5 h-5 text-purple-400" />
        <label className="text-white font-medium">Rotation Axes</label>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        {(['x', 'y', 'z'] as const).map((axis) => (
          <button
            key={axis}
            onClick={() => handleAxisToggle(axis)}
            className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 ${
              rotationAxis[axis]
                ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/25'
                : 'bg-slate-700/50 text-gray-300 hover:bg-slate-600/50 border border-white/10'
            }`}
          >
            {axis.toUpperCase()}-Axis
          </button>
        ))}
      </div>
      
      <p className="text-xs text-gray-400">
        Toggle individual rotation axes on/off
      </p>
    </div>
  );
};

export default AxisControl;