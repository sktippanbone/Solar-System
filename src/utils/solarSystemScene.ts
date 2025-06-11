import * as THREE from 'three';
import type { SolarSystemObjects, PlanetData } from '../types/solarSystem';

// Planet data: [name, color, size, distance, orbitSpeed]
const planetData = [
  ['Mercury', '#8C7853', 0.4, 8, 4.0],
  ['Venus', '#FFC649', 0.7, 11, 1.6],
  ['Earth', '#6B93D6', 0.8, 15, 1.0],
  ['Mars', '#CD5C5C', 0.6, 20, 0.5],
  ['Jupiter', '#D8CA9D', 2.5, 30, 0.08],
  ['Saturn', '#FAD5A5', 2.2, 40, 0.03],
  ['Uranus', '#4FD0E7', 1.5, 50, 0.01],
  ['Neptune', '#4B70DD', 1.4, 60, 0.006]
] as const;

export const initializeSolarSystem = (container: HTMLElement, isDarkMode: boolean): SolarSystemObjects => {
  // Scene setup
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(isDarkMode ? 0x000011 : 0x001122);

  // Camera setup
  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 30, 80);
  camera.lookAt(0, 0, 0);

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

  // Clock for animation timing
  const clock = new THREE.Clock();

  // Create background stars
  createStarField(scene, isDarkMode);

  // Create the Sun
  const sunGeometry = new THREE.SphereGeometry(3, 32, 32);
  const sunMaterial = new THREE.MeshBasicMaterial({ 
    color: 0xFFD700,
    emissive: 0xFFD700,
    emissiveIntensity: 0.3
  });
  const sun = new THREE.Mesh(sunGeometry, sunMaterial);
  sun.castShadow = false;
  sun.receiveShadow = false;
  scene.add(sun);

  // Create planets
  const planets: PlanetData[] = [];
  
  planetData.forEach(([name, color, size, distance, orbitSpeed], index) => {
    const geometry = new THREE.SphereGeometry(size, 16, 16);
    const material = new THREE.MeshPhongMaterial({ 
      color: color,
      shininess: 30,
      specular: 0x222222
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = distance;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);

    // Create orbit line
    createOrbitLine(scene, distance, isDarkMode);

    planets.push({
      mesh,
      distance,
      orbitSpeed,
      angle: Math.random() * Math.PI * 2, // Random starting position
      name,
      color,
      size
    });
  });

  // Lighting setup
  const ambientLight = new THREE.AmbientLight(0x404040, isDarkMode ? 0.3 : 0.6);
  scene.add(ambientLight);

  // Sun light (point light)
  const sunLight = new THREE.PointLight(0xFFFFFF, 2, 200);
  sunLight.position.set(0, 0, 0);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.width = 2048;
  sunLight.shadow.mapSize.height = 2048;
  sunLight.shadow.camera.near = 0.5;
  sunLight.shadow.camera.far = 200;
  scene.add(sunLight);

  // Additional directional light for better visibility
  const directionalLight = new THREE.DirectionalLight(0xFFFFFF, isDarkMode ? 0.5 : 0.8);
  directionalLight.position.set(10, 10, 5);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  // Add camera controls (mouse interaction)
  addCameraControls(camera, renderer.domElement);

  return {
    scene,
    camera,
    renderer,
    sun,
    planets,
    clock
  };
};

const createStarField = (scene: THREE.Scene, isDarkMode: boolean) => {
  const starsGeometry = new THREE.BufferGeometry();
  const starCount = 1000;
  const positions = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 400;     // x
    positions[i + 1] = (Math.random() - 0.5) * 400; // y
    positions[i + 2] = (Math.random() - 0.5) * 400; // z
  }

  starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const starsMaterial = new THREE.PointsMaterial({
    color: isDarkMode ? 0xFFFFFF : 0xCCCCCC,
    size: isDarkMode ? 2 : 1,
    transparent: true,
    opacity: isDarkMode ? 0.8 : 0.6
  });

  const stars = new THREE.Points(starsGeometry, starsMaterial);
  scene.add(stars);
};

const createOrbitLine = (scene: THREE.Scene, radius: number, isDarkMode: boolean) => {
  const points = [];
  const segments = 64;
  
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    points.push(new THREE.Vector3(
      Math.cos(angle) * radius,
      0,
      Math.sin(angle) * radius
    ));
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ 
    color: isDarkMode ? 0x333333 : 0x666666,
    transparent: true,
    opacity: 0.3
  });
  
  const orbitLine = new THREE.Line(geometry, material);
  scene.add(orbitLine);
};

const addCameraControls = (camera: THREE.PerspectiveCamera, domElement: HTMLElement) => {
  let isMouseDown = false;
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  const onMouseDown = (event: MouseEvent) => {
    isMouseDown = true;
    mouseX = event.clientX;
    mouseY = event.clientY;
  };

  const onMouseUp = () => {
    isMouseDown = false;
  };

  const onMouseMove = (event: MouseEvent) => {
    if (!isMouseDown) return;

    const deltaX = event.clientX - mouseX;
    const deltaY = event.clientY - mouseY;

    targetX += deltaX * 0.01;
    targetY += deltaY * 0.01;

    mouseX = event.clientX;
    mouseY = event.clientY;
  };

  const onWheel = (event: WheelEvent) => {
    const distance = camera.position.length();
    const newDistance = Math.max(20, Math.min(200, distance + event.deltaY * 0.1));
    
    camera.position.normalize().multiplyScalar(newDistance);
  };

  // Smooth camera animation
  const updateCamera = () => {
    currentX += (targetX - currentX) * 0.05;
    currentY += (targetY - currentY) * 0.05;

    const distance = camera.position.length();
    camera.position.x = Math.cos(currentX) * Math.cos(currentY) * distance;
    camera.position.y = Math.sin(currentY) * distance;
    camera.position.z = Math.sin(currentX) * Math.cos(currentY) * distance;
    
    camera.lookAt(0, 0, 0);
    
    requestAnimationFrame(updateCamera);
  };

  domElement.addEventListener('mousedown', onMouseDown);
  domElement.addEventListener('mouseup', onMouseUp);
  domElement.addEventListener('mousemove', onMouseMove);
  domElement.addEventListener('wheel', onWheel);

  updateCamera();
};