import React from 'react';
import { Globe, Zap } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="backdrop-blur-sm bg-black/20 border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Globe className="w-8 h-8 text-yellow-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">3D Solar System</h1>
              <p className="text-sm text-gray-300">Interactive Three.js Simulation</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full border border-white/10">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-white font-medium">Real-time Control</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;