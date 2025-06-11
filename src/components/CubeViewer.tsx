import React, { useRef, useEffect } from 'react';
import { useCubeContext } from '../context/CubeContext';
import { initializeScene } from '../utils/threeScene';
import type { SceneObjects } from '../types/cube';

const CubeViewer: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<SceneObjects | null>(null);
  const animationRef = useRef<number | null>(null);
  
  const { 
    speed, 
    isPlaying, 
    rotationAxis, 
    cubeColor,
    resetTrigger 
  } = useCubeContext();

  useEffect(() => {
    if (!mountRef.current) return;

    // Initialize Three.js scene
    const sceneObjects = initializeScene(mountRef.current, cubeColor);
    sceneRef.current = sceneObjects;

    // Animation loop
    const animate = () => {
      if (!sceneRef.current) return;
      
      const { cube, renderer, scene, camera } = sceneRef.current;
      
      if (isPlaying) {
        const rotationSpeed = speed * 0.01;
        
        if (rotationAxis.x) cube.rotation.x += rotationSpeed;
        if (rotationAxis.y) cube.rotation.y += rotationSpeed;
        if (rotationAxis.z) cube.rotation.z += rotationSpeed;
      }
      
      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!sceneRef.current || !mountRef.current) return;
      
      const { camera, renderer } = sceneRef.current;
      const { clientWidth, clientHeight } = mountRef.current;
      
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (sceneRef.current) {
        const { renderer } = sceneRef.current;
        renderer.dispose();
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Update cube color
  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.cube.material.color.setHex(parseInt(cubeColor.replace('#', ''), 16));
    }
  }, [cubeColor]);

  // Reset cube rotation
  useEffect(() => {
    if (sceneRef.current && resetTrigger > 0) {
      const { cube } = sceneRef.current;
      cube.rotation.set(0, 0, 0);
    }
  }, [resetTrigger]);

  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-white/10 backdrop-blur-sm overflow-hidden shadow-2xl">
      <div className="p-6 border-b border-white/10">
        <h2 className="text-xl font-semibold text-white mb-2">3D Cube Visualization</h2>
        <p className="text-gray-300 text-sm">
          Interactive rotating cube with real-time controls
        </p>
      </div>
      
      <div className="relative">
        <div 
          ref={mountRef} 
          className="w-full h-96 md:h-[500px] lg:h-[600px] bg-gradient-to-b from-slate-800/30 to-slate-900/30"
          style={{ minHeight: '400px' }}
        />
        
        {/* Loading overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/20 backdrop-blur-sm opacity-0 transition-opacity duration-300 pointer-events-none">
          <div className="flex items-center gap-3 text-white">
            <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            <span>Loading 3D Scene...</span>
          </div>
        </div>
        
        {/* Speed indicator */}
        <div className="absolute top-4 right-4 px-3 py-2 bg-black/30 backdrop-blur-sm rounded-lg border border-white/10">
          <div className="flex items-center gap-2 text-sm text-white">
            <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
            <span>{isPlaying ? `Speed: ${speed.toFixed(1)}x` : 'Paused'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CubeViewer;