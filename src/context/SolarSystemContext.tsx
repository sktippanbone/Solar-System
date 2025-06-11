import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SolarSystemContextType {
  planetSpeeds: number[];
  setPlanetSpeed: (index: number, speed: number) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
  resetTrigger: number;
  resetSolarSystem: () => void;
  hoveredPlanet: number | null;
  setHoveredPlanet: (planet: number | null) => void;
}

const SolarSystemContext = createContext<SolarSystemContextType | undefined>(undefined);

export const useSolarSystemContext = () => {
  const context = useContext(SolarSystemContext);
  if (!context) {
    throw new Error('useSolarSystemContext must be used within a SolarSystemProvider');
  }
  return context;
};

interface SolarSystemProviderProps {
  children: ReactNode;
}

export const SolarSystemProvider: React.FC<SolarSystemProviderProps> = ({ children }) => {
  // Default speeds for each planet (Mercury to Neptune)
  const [planetSpeeds, setPlanetSpeeds] = useState<number[]>([1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [hoveredPlanet, setHoveredPlanet] = useState<number | null>(null);

  const setPlanetSpeed = (index: number, speed: number) => {
    setPlanetSpeeds(prev => {
      const newSpeeds = [...prev];
      newSpeeds[index] = speed;
      return newSpeeds;
    });
  };

  const resetSolarSystem = () => {
    setPlanetSpeeds([1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0]);
    setIsPlaying(true);
    setResetTrigger(prev => prev + 1);
    setHoveredPlanet(null);
  };

  const value: SolarSystemContextType = {
    planetSpeeds,
    setPlanetSpeed,
    isPlaying,
    setIsPlaying,
    isDarkMode,
    setIsDarkMode,
    resetTrigger,
    resetSolarSystem,
    hoveredPlanet,
    setHoveredPlanet,
  };

  return (
    <SolarSystemContext.Provider value={value}>
      {children}
    </SolarSystemContext.Provider>
  );
};