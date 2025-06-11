import React, { useRef, useEffect } from 'react';
import { useSolarSystemContext } from '../context/SolarSystemContext';
import { initializeSolarSystem } from '../utils/solarSystemScene';
import type { SolarSystemObjects } from '../types/solarSystem';
import * as THREE from 'three';


const SolarSystemViewer: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<SolarSystemObjects | null>(null);
  const animationRef = useRef<number | null>(null);
  
  const { 
    planetSpeeds, 
    isPlaying, 
    isDarkMode,
    resetTrigger,
    hoveredPlanet,
    setHoveredPlanet
  } = useSolarSystemContext();

  useEffect(() => {
    if (!mountRef.current) return;

    // Initialize Three.js scene
    const solarSystemObjects = initializeSolarSystem(mountRef.current, isDarkMode);
    sceneRef.current = solarSystemObjects;

    // Animation loop
    const animate = () => {
      if (!sceneRef.current) return;
      
      const { planets, renderer, scene, camera, clock } = sceneRef.current;
      const deltaTime = clock.getDelta();
      
      if (isPlaying) {
        // Update planet rotations and orbits
        planets.forEach((planetData, index) => {
          const speed = planetSpeeds[index];
          const baseSpeed = planetData.orbitSpeed;
          
          // Rotate planet around its axis
          planetData.mesh.rotation.y += deltaTime * speed * 2;
          
          // Orbit around the sun
          planetData.angle += deltaTime * baseSpeed * speed;
          planetData.mesh.position.x = Math.cos(planetData.angle) * planetData.distance;
          planetData.mesh.position.z = Math.sin(planetData.angle) * planetData.distance;
        });
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

    // Mouse interaction for planet hover
    const handleMouseMove = (event: MouseEvent) => {
      if (!sceneRef.current || !mountRef.current) return;
      
      const { camera, planets } = sceneRef.current;
      const rect = mountRef.current.getBoundingClientRect();
      
      const mouse = {
        x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
        y: -((event.clientY - rect.top) / rect.height) * 2 + 1
      };
      
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(mouse.x, mouse.y), camera);
      
      const planetMeshes = planets.map(p => p.mesh);
      const intersects = raycaster.intersectObjects(planetMeshes);
      
      if (intersects.length > 0) {
        const intersectedPlanet = intersects[0].object;
        const planetIndex = planetMeshes.findIndex(mesh => mesh === intersectedPlanet);
        if (planetIndex !== -1) {
          setHoveredPlanet(planetIndex);
          mountRef.current.style.cursor = 'pointer';
        }
      } else {
        setHoveredPlanet(null);
        mountRef.current.style.cursor = 'default';
      }
    };

    window.addEventListener('resize', handleResize);
    mountRef.current.addEventListener('mousemove', handleMouseMove);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (sceneRef.current) {
        const { renderer } = sceneRef.current;
        renderer.dispose();
      }
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeEventListener('mousemove', handleMouseMove);
      }
    };
  // Add all referenced context values to the dependency array
  }, [isDarkMode, isPlaying, planetSpeeds, setHoveredPlanet]);

  // Reset animation when reset trigger changes
  useEffect(() => {
    if (sceneRef.current && resetTrigger > 0) {
      const { planets } = sceneRef.current;
      planets.forEach((planetData) => {
        planetData.angle = Math.random() * Math.PI * 2; // Random starting positions
      });
    }
  }, [resetTrigger]);

  return (
    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-white/10 backdrop-blur-sm overflow-hidden shadow-2xl">
      <div className="p-6 border-b border-white/10">
        <h2 className="text-xl font-semibold text-white mb-2">Solar System Simulation</h2>
        <p className="text-gray-300 text-sm">
          Interactive 3D model with real-time orbital controls
        </p>
      </div>
      
      <div className="relative">
        <div 
          ref={mountRef} 
          className="w-full h-96 md:h-[500px] lg:h-[600px] bg-gradient-to-b from-gray-800/30 to-black/30"
          style={{ minHeight: '400px' }}
        />
        
        {/* Status indicator */}
        <div className="absolute top-4 right-4 px-3 py-2 bg-black/30 backdrop-blur-sm rounded-lg border border-white/10">
          <div className="flex items-center gap-2 text-sm text-white">
            <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
            <span>{isPlaying ? 'Animating' : 'Paused'}</span>
          </div>
        </div>

        {/* Planet tooltip */}
        {hoveredPlanet !== null && (
          <div className="absolute top-4 left-4 px-3 py-2 bg-black/70 backdrop-blur-sm rounded-lg border border-white/20">
            <div className="text-sm text-white font-medium">
              {['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'][hoveredPlanet]}
            </div>
          </div>
        )}
        
        {/* Loading overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/20 backdrop-blur-sm opacity-0 transition-opacity duration-300 pointer-events-none">
          <div className="flex items-center gap-3 text-white">
            <div className="w-6 h-6 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
            <span>Loading Solar System...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarSystemViewer;