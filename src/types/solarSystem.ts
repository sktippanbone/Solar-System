import * as THREE from 'three';

export interface PlanetData {
  mesh: THREE.Mesh;
  distance: number;
  orbitSpeed: number;
  angle: number;
  name: string;
  color: string;
  size: number;
}

export interface SolarSystemObjects {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  sun: THREE.Mesh;
  planets: PlanetData[];
  clock: THREE.Clock;
  controls?: any;
}

export interface SolarSystemSettings {
  planetSpeeds: number[];
  isPlaying: boolean;
  isDarkMode: boolean;
}