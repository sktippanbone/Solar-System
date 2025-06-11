import React from 'react';
import SolarSystemViewer from './components/SolarSystemViewer';
import Header from './components/Header';
import ControlPanel from './components/ControlPanel';
import { SolarSystemProvider } from './context/SolarSystemContext';

function App() {
  return (
    <SolarSystemProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.02%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
        
        <div className="relative z-10">
          <Header />
          
          <main className="container mx-auto px-4 py-8">
            <div className="grid lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {/* 3D Solar System Viewer */}
              <div className="lg:col-span-3">
                <SolarSystemViewer />
              </div>
              
              {/* Control Panel */}
              <div className="lg:col-span-1">
                <ControlPanel />
              </div>
            </div>
          </main>
        </div>
      </div>
    </SolarSystemProvider>
  );
}

export default App;