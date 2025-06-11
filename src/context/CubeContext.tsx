import React, { createContext, useContext, useState, ReactNode } from 'react';

interface RotationAxis {
  x: boolean;
  y: boolean;
  z: boolean;
}

interface CubeContextType {
  speed: number;
  setSpeed: (speed: number) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  rotationAxis: RotationAxis;
  setRotationAxis: (axis: RotationAxis) => void;
  cubeColor: string;
  setCubeColor: (color: string) => void;
  resetTrigger: number;
  resetCube: () => void;
}

const CubeContext = createContext<CubeContextType | undefined>(undefined);

export const useCubeContext = () => {
  const context = useContext(CubeContext);
  if (!context) {
    throw new Error('useCubeContext must be used within a CubeProvider');
  }
  return context;
};

interface CubeProviderProps {
  children: ReactNode;
}

export const CubeProvider: React.FC<CubeProviderProps> = ({ children }) => {
  const [speed, setSpeed] = useState(1.0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [rotationAxis, setRotationAxis] = useState<RotationAxis>({
    x: true,
    y: true,
    z: false
  });
  const [cubeColor, setCubeColor] = useState('#3B82F6');
  const [resetTrigger, setResetTrigger] = useState(0);

  const resetCube = () => {
    setSpeed(1.0);
    setIsPlaying(true);
    setRotationAxis({ x: true, y: true, z: false });
    setCubeColor('#3B82F6');
    setResetTrigger(prev => prev + 1);
  };

  const value: CubeContextType = {
    speed,
    setSpeed,
    isPlaying,
    setIsPlaying,
    rotationAxis,
    setRotationAxis,
    cubeColor,
    setCubeColor,
    resetTrigger,
    resetCube,
  };

  return (
    <CubeContext.Provider value={value}>
      {children}
    </CubeContext.Provider>
  );
};