import React from 'react';
import { useCubeContext } from '../../context/CubeContext';
import { Palette } from 'lucide-react';

const ColorControl: React.FC = () => {
  const { cubeColor, setCubeColor } = useCubeContext();

  const presetColors = [
    '#3B82F6', // Blue
    '#8B5CF6', // Purple
    '#EF4444', // Red
    '#10B981', // Green
    '#F59E0B', // Yellow
    '#EC4899', // Pink
    '#06B6D4', // Cyan
    '#F97316', // Orange
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Palette className="w-5 h-5 text-green-400" />
        <label className="text-white font-medium">Cube Color</label>
      </div>
      
      {/* Color picker */}
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={cubeColor}
          onChange={(e) => setCubeColor(e.target.value)}
          className="w-12 h-12 rounded-lg border-2 border-white/20 cursor-pointer bg-transparent"
        />
        <span className="text-gray-300 font-mono text-sm bg-slate-700/50 px-3 py-2 rounded border border-white/10">
          {cubeColor.toUpperCase()}
        </span>
      </div>
      
      {/* Preset colors */}
      <div className="grid grid-cols-4 gap-2">
        {presetColors.map((color) => (
          <button
            key={color}
            onClick={() => setCubeColor(color)}
            className={`w-full h-10 rounded-lg border-2 transition-all duration-200 transform hover:scale-110 ${
              cubeColor === color ? 'border-white' : 'border-white/20'
            }`}
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorControl;