import React from 'react';
import { useSolarSystemContext } from '../../context/SolarSystemContext';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const { isDarkMode, setIsDarkMode } = useSolarSystemContext();

  return (
    <div className="space-y-3">
      <label className="text-white font-medium">Theme</label>
      
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`w-full flex items-center justify-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
          isDarkMode
            ? 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white border border-white/10'
            : 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg shadow-yellow-500/25'
        }`}
      >
        {isDarkMode ? (
          <>
            <Sun className="w-5 h-5" />
            Light Mode
          </>
        ) : (
          <>
            <Moon className="w-5 h-5" />
            Dark Mode
          </>
        )}
      </button>
    </div>
  );
};

export default ThemeToggle;