import * as THREE from 'three';
import type { SceneObjects } from '../types/cube';

export const initializeScene = (container: HTMLElement, initialColor: string): SceneObjects => {
  // Scene setup
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0f0f23);

  // Camera setup
  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  // Renderer setup
  const renderer = new THREE.WebGLRenderer({ 
    antialias: true,
    alpha: true 
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);

  // Cube geometry and material
  const geometry = new THREE.BoxGeometry(2, 2, 2);
  const material = new THREE.MeshPhongMaterial({ 
    color: new THREE.Color(initialColor),
    shininess: 100,
    specular: 0x222222
  });
  
  const cube = new THREE.Mesh(geometry, material);
  cube.castShadow = true;
  cube.receiveShadow = true;
  scene.add(cube);

  // Wireframe overlay for better visual definition
  const wireframeGeometry = new THREE.EdgesGeometry(geometry);
  const wireframeMaterial = new THREE.LineBasicMaterial({ 
    color: 0xffffff, 
    opacity: 0.3, 
    transparent: true 
  });
  const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
  cube.add(wireframe);

  // Lighting setup
  const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  scene.add(directionalLight);

  const pointLight1 = new THREE.PointLight(0x3B82F6, 0.5, 10);
  pointLight1.position.set(-3, 2, 3);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0x8B5CF6, 0.5, 10);
  pointLight2.position.set(3, -2, -3);
  scene.add(pointLight2);

  // Add subtle particles for atmosphere
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 50;
  const posArray = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 20;
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    color: 0x888888,
    transparent: true,
    opacity: 0.3
  });

  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);

  return {
    scene,
    camera,
    renderer,
    cube,
  };
};