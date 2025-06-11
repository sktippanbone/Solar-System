import * as THREE from 'three';

export interface SceneObjects {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  cube: THREE.Mesh;
}

export interface CubeSettings {
  speed: number;
  isPlaying: boolean;
  rotationAxis: {
    x: boolean;
    y: boolean;
    z: boolean;
  };
  cubeColor: string;
}