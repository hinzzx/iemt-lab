'use client';

import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { ChevronRight, ChevronLeft, Zap, Battery, Gauge, Shield, Wifi, Check, ArrowRight, Sparkles, Play, Pause, Eye } from 'lucide-react';

// ============================================
// CACHED MODEL - Load once, clone for each instance
// ============================================
let cachedATVModel: THREE.Group | null = null;
let modelLoadingPromise: Promise<THREE.Group> | null = null;

async function loadATVModel(): Promise<THREE.Group> {
  // Return cached model if already loaded
  if (cachedATVModel) {
    return cachedATVModel.clone();
  }

  // If already loading, wait for that promise
  if (modelLoadingPromise) {
    const model = await modelLoadingPromise;
    return model.clone();
  }

  // Start loading
  modelLoadingPromise = new Promise((resolve, reject) => {
    const loader = new OBJLoader();
    loader.load(
      '/models/ATV.obj',
      (object) => {
        // Center the model
        const box = new THREE.Box3().setFromObject(object);
        const center = box.getCenter(new THREE.Vector3());
        object.position.sub(center);

        // Calculate scale to normalize size (target ~2 units wide)
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const targetSize = 2.5;
        const scale = targetSize / maxDim;
        object.scale.setScalar(scale);

        // Position on ground
        const scaledBox = new THREE.Box3().setFromObject(object);
        object.position.y = -scaledBox.min.y;

        // Enable shadows on all meshes
        object.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        cachedATVModel = object;
        resolve(object.clone());
      },
      (progress) => {
        console.log('Loading ATV model:', Math.round((progress.loaded / progress.total) * 100) + '%');
      },
      (error) => {
        console.error('Error loading ATV model:', error);
        reject(error);
      }
    );
  });

  return modelLoadingPromise;
}

// Apply color and materials to loaded model
function applyATVMaterials(
  model: THREE.Group,
  bodyColor: THREE.Color,
  metalness: number
): void {
  // Create body material with user-selected color
  const bodyMaterial = new THREE.MeshPhysicalMaterial({
    color: bodyColor,
    roughness: 0.15,
    metalness: metalness,
    clearcoat: 0.9,
    clearcoatRoughness: 0.1,
    envMapIntensity: 1.2,
  });

  // Materials for different parts (detected by mesh name or applied uniformly)
  const chromeMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    roughness: 0.05,
    metalness: 1.0,
    envMapIntensity: 1.5,
  });

  const rubberMaterial = new THREE.MeshStandardMaterial({
    color: 0x0a0a0a,
    roughness: 0.95,
    metalness: 0.0,
  });

  const plasticMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x1a1a1a,
    roughness: 0.4,
    metalness: 0.0,
    clearcoat: 0.3,
  });

  const seatMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x151515,
    roughness: 0.7,
    metalness: 0.0,
    sheen: 0.3,
    sheenRoughness: 0.8,
    sheenColor: new THREE.Color(0x222222),
  });

  // Apply materials based on mesh names (common naming conventions)
  model.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      const name = child.name.toLowerCase();

      // Try to identify parts by name
      if (name.includes('body') || name.includes('fender') || name.includes('panel') || name.includes('hood') || name.includes('plastic')) {
        child.material = bodyMaterial;
      } else if (name.includes('tire') || name.includes('tyre') || name.includes('wheel') && name.includes('rubber')) {
        child.material = rubberMaterial;
      } else if (name.includes('rim') || name.includes('chrome') || name.includes('metal') || name.includes('exhaust')) {
        child.material = chromeMaterial;
      } else if (name.includes('seat') || name.includes('saddle')) {
        child.material = seatMaterial;
      } else if (name.includes('glass') || name.includes('light') || name.includes('lens')) {
        child.material = new THREE.MeshPhysicalMaterial({
          color: 0xffffee,
          emissive: 0xffffcc,
          emissiveIntensity: 0.5,
          transparent: true,
          opacity: 0.9,
          roughness: 0.1,
        });
      } else {
        // Default: apply body color to unidentified parts
        child.material = bodyMaterial;
      }
    }
  });
}

// ============================================
// ENVIRONMENT MAP GENERATOR
// Creates a procedural HDR-like environment for realistic reflections
// ============================================
function createStudioEnvironment(renderer: THREE.WebGLRenderer): THREE.Texture {
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();

  // Create a scene for the environment
  const envScene = new THREE.Scene();

  // Create gradient background sphere (inside-out sphere for environment)
  const envGeometry = new THREE.SphereGeometry(50, 64, 32);

  // Custom shader for studio-like gradient environment
  const envMaterial = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    uniforms: {
      topColor: { value: new THREE.Color(0xffffff) },      // Bright top (sky/ceiling lights)
      horizonColor: { value: new THREE.Color(0xe8e8e8) },  // Neutral horizon
      bottomColor: { value: new THREE.Color(0xaaaaaa) },   // Darker ground bounce
      groundColor: { value: new THREE.Color(0x888888) },   // Ground reflection
    },
    vertexShader: `
      varying vec3 vWorldPosition;
      void main() {
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPosition.xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 topColor;
      uniform vec3 horizonColor;
      uniform vec3 bottomColor;
      uniform vec3 groundColor;
      varying vec3 vWorldPosition;

      void main() {
        float h = normalize(vWorldPosition).y;

        vec3 color;
        if (h > 0.0) {
          // Sky gradient - top to horizon
          float t = pow(h, 0.4);
          color = mix(horizonColor, topColor, t);

          // Add subtle bright spots (simulating soft studio lights)
          float lightSpot1 = smoothstep(0.7, 1.0, h) * 0.3;
          color += vec3(lightSpot1);
        } else {
          // Ground gradient - horizon to bottom
          float t = pow(-h, 0.6);
          color = mix(horizonColor, bottomColor, t);

          // Darker ground area
          float groundFade = smoothstep(-0.3, -0.8, h);
          color = mix(color, groundColor, groundFade);
        }

        gl_FragColor = vec4(color, 1.0);
      }
    `
  });

  const envMesh = new THREE.Mesh(envGeometry, envMaterial);
  envScene.add(envMesh);

  // Add some bright spots to simulate area lights in the environment
  const addLightSpot = (position: THREE.Vector3, intensity: number, size: number) => {
    const spotGeom = new THREE.SphereGeometry(size, 16, 16);
    const spotMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(intensity, intensity, intensity * 0.95)
    });
    const spot = new THREE.Mesh(spotGeom, spotMat);
    spot.position.copy(position);
    envScene.add(spot);
  };

  // Key light simulation (upper right)
  addLightSpot(new THREE.Vector3(15, 25, 10), 2.5, 8);
  // Fill light simulation (upper left)
  addLightSpot(new THREE.Vector3(-12, 18, -8), 1.5, 6);
  // Rim light simulation (behind)
  addLightSpot(new THREE.Vector3(0, 20, -20), 1.8, 5);

  // Generate the environment map
  const envMap = pmremGenerator.fromScene(envScene, 0.04).texture;

  // Cleanup
  pmremGenerator.dispose();
  envGeometry.dispose();
  envMaterial.dispose();

  return envMap;
}

// Global environment map reference (cached per session)
let cachedEnvMap: THREE.Texture | null = null;

// TypeScript Interfaces
interface ATVModel {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  power: string;
  topSpeed: string;
  style: 'sport' | 'utility' | 'adventure' | 'youth';
}

interface VehicleColor {
  id: string;
  name: string;
  hex: string;
  metalness: number;
}

interface BatteryOption {
  id: string;
  name: string;
  capacity: string;
  range: string;
  price: number;
  chargeTime: string;
  size: number;
}

interface Addon {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: React.ComponentType<{ size?: number; color?: string }>;
}

// Design System Colors
const colors = {
  primary: {
    50: '#e6f4ff',
    100: '#b3dfff',
    200: '#80caff',
    300: '#4db5ff',
    400: '#1aa0ff',
    500: '#0088e6',
    600: '#006bb4',
    700: '#004e82',
  },
  secondary: {
    50: '#fff4e6',
    100: '#ffe0b3',
    200: '#ffcc80',
    300: '#ffb84d',
    400: '#ffa41a',
    500: '#f08c00',
    600: '#b86e00',
  },
  neutral: {
    0: '#ffffff',
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
    950: '#0a0a0b',
  },
  success: { 500: '#10b981' },
};

// Vehicle color options
const vehicleColors: VehicleColor[] = [
  { id: 'blue', name: 'Volt Blue', hex: '#0088e6', metalness: 0.7 },
  { id: 'orange', name: 'Performance Orange', hex: '#f08c00', metalness: 0.6 },
  { id: 'green', name: 'Electric Green', hex: '#10b981', metalness: 0.6 },
  { id: 'red', name: 'Racing Red', hex: '#dc2626', metalness: 0.7 },
  { id: 'black', name: 'Stealth Black', hex: '#1a1a1a', metalness: 0.9 },
  { id: 'white', name: 'Arctic White', hex: '#f0f0f0', metalness: 0.3 },
];

const atvModels: ATVModel[] = [
  { id: 'sport-500', name: 'Sport 500', category: 'Sport', basePrice: 8500, power: '45 kW', topSpeed: '120 km/h', style: 'sport' },
  { id: 'utility-750', name: 'Utility 750', category: 'Utility', basePrice: 12000, power: '55 kW', topSpeed: '90 km/h', style: 'utility' },
  { id: 'adventure-600', name: 'Adventure 600', category: 'Adventure', basePrice: 10500, power: '50 kW', topSpeed: '110 km/h', style: 'adventure' },
  { id: 'youth-250', name: 'Youth 250', category: 'Youth', basePrice: 4500, power: '15 kW', topSpeed: '45 km/h', style: 'youth' },
];

const batteryOptions: BatteryOption[] = [
  { id: 'standard', name: 'Standard Range', capacity: '10 kWh', range: '80 km', price: 0, chargeTime: '4 hours', size: 1 },
  { id: 'extended', name: 'Extended Range', capacity: '15 kWh', range: '120 km', price: 2500, chargeTime: '5 hours', size: 1.25 },
  { id: 'performance', name: 'Performance Max', capacity: '20 kWh', range: '160 km', price: 4500, chargeTime: '6 hours', size: 1.5 },
];

const addons: Addon[] = [
  { id: 'fast-charger', name: 'Fast Charger', description: 'Reduce charge time by 50%', price: 800, icon: Zap },
  { id: 'battery-monitor', name: 'Smart Battery Monitor', description: 'Real-time battery analytics app', price: 350, icon: Gauge },
  { id: 'extended-warranty', name: 'Extended Warranty', description: '5-year coverage on all components', price: 1200, icon: Shield },
  { id: 'connectivity', name: 'GPS & Connectivity Pack', description: 'Track location & remote diagnostics', price: 550, icon: Wifi },
];

// ============================================
// MATERIAL CACHE - Hyper-realistic PBR materials
// Using MeshPhysicalMaterial for metal surfaces
// ============================================
const materialCache = {
  // Frame - dark powder-coated metal
  frame: new THREE.MeshPhysicalMaterial({
    color: 0x1a1a1a,
    roughness: 0.35,
    metalness: 0.85,
    envMapIntensity: 0.8,
  }),

  // Chrome - highly reflective polished metal
  chrome: new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    roughness: 0.05,          // Very smooth
    metalness: 1.0,           // Fully metallic
    envMapIntensity: 1.5,     // Strong reflections
    reflectivity: 1.0,
  }),

  // Rubber - matte black tire material
  rubber: new THREE.MeshStandardMaterial({
    color: 0x0a0a0a,
    roughness: 0.95,          // Very rough/matte
    metalness: 0.0,           // Non-metallic
  }),

  // Plastic - semi-gloss black plastic
  plastic: new THREE.MeshPhysicalMaterial({
    color: 0x1a1a1a,
    roughness: 0.4,
    metalness: 0.0,
    clearcoat: 0.3,           // Slight gloss
    clearcoatRoughness: 0.4,
  }),

  // Seat - leather/vinyl texture simulation
  seat: new THREE.MeshPhysicalMaterial({
    color: 0x151515,
    roughness: 0.7,           // Slightly textured leather
    metalness: 0.0,
    sheen: 0.3,               // Subtle sheen for leather look
    sheenRoughness: 0.8,
    sheenColor: new THREE.Color(0x222222),
  }),

  // Headlight lens - bright emissive glass
  light: new THREE.MeshPhysicalMaterial({
    color: 0xffffee,
    emissive: 0xffffcc,
    emissiveIntensity: 1.0,
    transparent: true,
    opacity: 0.95,
    roughness: 0.1,
    metalness: 0.0,
    transmission: 0.3,        // Slight glass-like transmission
    thickness: 0.5,
  }),

  // Tail light - red emissive
  tailLight: new THREE.MeshPhysicalMaterial({
    color: 0xff0000,
    emissive: 0xff0000,
    emissiveIntensity: 0.6,
    roughness: 0.2,
    metalness: 0.0,
    transmission: 0.2,
    thickness: 0.3,
  }),

  // Battery pack - industrial orange metal
  battery: new THREE.MeshPhysicalMaterial({
    color: colors.secondary[500],
    roughness: 0.3,
    metalness: 0.7,
    emissive: new THREE.Color(colors.secondary[500]),
    emissiveIntensity: 0.1,
    clearcoat: 0.4,
    clearcoatRoughness: 0.3,
  }),

  // Suspension spring - powder-coated orange
  spring: new THREE.MeshPhysicalMaterial({
    color: 0xff6600,
    metalness: 0.9,
    roughness: 0.25,
    envMapIntensity: 1.0,
  }),

  // Seat stitching
  stitch: new THREE.MeshStandardMaterial({
    color: 0x333333,
    roughness: 0.9,
    metalness: 0.0,
  }),

  // Digital screen - backlit display
  screen: new THREE.MeshPhysicalMaterial({
    color: 0x001122,
    emissive: 0x0066aa,
    emissiveIntensity: 0.8,
    roughness: 0.05,          // Glossy screen
    metalness: 0.0,
  }),
};

// NOTE: Old procedural createDetailedATV function (~750 lines) removed.
// Now using loadATVModel() to load real 3D model from /models/ATV.obj
// See applyATVMaterials() for color customization logic.
// 3D Viewer Component Props
interface ATV3DViewerProps {
  model: ATVModel | null;
  color: string;
  battery: BatteryOption | null;
  isRotating: boolean;
  setIsRotating: (value: boolean) => void;
  onLoadingChange: (loading: boolean) => void;
}

// 3D Viewer Component
function ATV3DViewer({ model, color, battery, isRotating, setIsRotating, onLoadingChange }: ATV3DViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const atvRef = useRef<THREE.Group | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const frameRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, isDragging: false, lastX: 0 });
  const isLoadingModelRef = useRef(false);
  const isRotatingRef = useRef(isRotating); // Track isRotating in a ref for animation loop
  const [sceneReady, setSceneReady] = useState(false); // Track if scene is fully initialized

  // Keep the ref in sync with the prop
  useEffect(() => {
    isRotatingRef.current = isRotating;
  }, [isRotating]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene - clean studio environment
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);  // Neutral studio gray
    scene.fog = new THREE.Fog(0xf0f0f0, 12, 25);   // Pushed back fog for depth
    sceneRef.current = scene;

    // Camera - optimized FOV for vehicle visualization
    // 35-40° FOV reduces perspective distortion, makes vehicles look more "real scale"
    const camera = new THREE.PerspectiveCamera(
      35,  // Narrower FOV = less distortion, more realistic proportions
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      100
    );
    camera.position.set(4.5, 2.8, 4.5);  // Slightly further back and higher
    camera.lookAt(0, 0.35, 0);           // Focus slightly above center
    cameraRef.current = camera;

    // Renderer with physically correct settings
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0; // More natural exposure
    renderer.outputColorSpace = THREE.SRGBColorSpace; // Correct color space for display
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create and cache environment map for realistic reflections
    if (!cachedEnvMap) {
      cachedEnvMap = createStudioEnvironment(renderer);
    }
    scene.environment = cachedEnvMap; // Apply to all PBR materials automatically

    // ============================================
    // LIGHTING - Studio-quality three-point setup
    // Reduced intensities since environment map provides ambient fill
    // ============================================

    // Ambient - reduced since environment provides ambient lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    // Key Light - main directional (reduced intensity, env map helps)
    const keyLight = new THREE.DirectionalLight(0xffffff, 0.8);
    keyLight.position.set(5, 10, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 0.1;
    keyLight.shadow.camera.far = 30;
    keyLight.shadow.camera.left = -4;
    keyLight.shadow.camera.right = 4;
    keyLight.shadow.camera.top = 4;
    keyLight.shadow.camera.bottom = -4;
    keyLight.shadow.bias = -0.0005;       // Reduce shadow acne
    keyLight.shadow.normalBias = 0.02;    // Better contact shadows
    keyLight.shadow.radius = 2;           // Softer shadow edges (PCFSoft)
    scene.add(keyLight);

    // Fill Light - cooler tone to create depth
    const fillLight = new THREE.DirectionalLight(0xc4e0ff, 0.35);
    fillLight.position.set(-6, 4, -4);
    scene.add(fillLight);

    // Rim Light - backlight for edge definition
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.4);
    rimLight.position.set(0, 6, -10);
    scene.add(rimLight);

    // Ground bounce light - subtle warm uplight simulating ground reflection
    const bounceLight = new THREE.DirectionalLight(0xfff5e6, 0.15);
    bounceLight.position.set(0, -3, 0);
    scene.add(bounceLight);

    // Ground - reflective studio floor for realism
    const groundGeometry = new THREE.CircleGeometry(6, 64);
    const groundMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xdcdcdc,
      roughness: 0.15,            // Smooth floor = subtle reflections
      metalness: 0.0,
      envMapIntensity: 0.4,       // Subtle environment reflections
      clearcoat: 0.1,             // Very subtle clear layer
      clearcoatRoughness: 0.3,
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.01;
    ground.receiveShadow = true;
    scene.add(ground);

    // Outer ground ring (darker, more matte) for depth
    const outerGroundGeom = new THREE.RingGeometry(6, 15, 64);
    const outerGroundMat = new THREE.MeshStandardMaterial({
      color: 0xb8b8b8,
      roughness: 0.8,
      metalness: 0.0,
    });
    const outerGround = new THREE.Mesh(outerGroundGeom, outerGroundMat);
    outerGround.rotation.x = -Math.PI / 2;
    outerGround.position.y = -0.02;
    outerGround.receiveShadow = true;
    scene.add(outerGround);

    // Subtle grid - less visible for cleaner look
    const gridHelper = new THREE.GridHelper(8, 40, colors.neutral[300], colors.neutral[200]);
    gridHelper.position.y = 0.001;
    if (Array.isArray(gridHelper.material)) {
      gridHelper.material.forEach(m => {
        m.opacity = 0.15;
        m.transparent = true;
      });
    } else {
      gridHelper.material.opacity = 0.15;
      gridHelper.material.transparent = true;
    }
    scene.add(gridHelper);

    // Mouse controls
    const handleMouseDown = (e: MouseEvent) => {
      mouseRef.current.isDragging = true;
      mouseRef.current.lastX = e.clientX;
      setIsRotating(false);
    };

    const handleMouseUp = () => {
      mouseRef.current.isDragging = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (mouseRef.current.isDragging && atvRef.current) {
        const deltaX = e.clientX - mouseRef.current.lastX;
        atvRef.current.rotation.y += deltaX * 0.008;
        mouseRef.current.lastX = e.clientX;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      mouseRef.current.isDragging = true;
      mouseRef.current.lastX = e.touches[0].clientX;
      setIsRotating(false);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (mouseRef.current.isDragging && atvRef.current) {
        const deltaX = e.touches[0].clientX - mouseRef.current.lastX;
        atvRef.current.rotation.y += deltaX * 0.008;
        mouseRef.current.lastX = e.touches[0].clientX;
      }
    };

    const handleTouchEnd = () => {
      mouseRef.current.isDragging = false;
    };

    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    renderer.domElement.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    // Animation
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      
      // Read from ref instead of closure to get latest value
      if (isRotatingRef.current && atvRef.current) {
        atvRef.current.rotation.y += 0.004;
      }
      
      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Mark scene as ready after everything is set up
    setSceneReady(true);

    return () => {
      setSceneReady(false);
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
      renderer.domElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      renderer.domElement.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [setIsRotating]); // Only setIsRotating, removed isRotating to prevent scene recreation

  // Dispose ATV resources properly to prevent memory leaks
  const disposeATV = (atvGroup: THREE.Group) => {
    // Track materials that should not be disposed (from cache)
    const cachedMaterials = new Set(Object.values(materialCache));
    
    atvGroup.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Always dispose geometries
        if (child.geometry) {
          child.geometry.dispose();
        }
        // Only dispose materials that are not in the cache
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach(mat => {
              if (!cachedMaterials.has(mat)) {
                mat.dispose();
              }
            });
          } else {
            if (!cachedMaterials.has(child.material)) {
              child.material.dispose();
            }
          }
        }
      }
    });
  };

  // Update ATV when config changes - load real 3D model
  useEffect(() => {
    if (!sceneRef.current || !model || !sceneReady) return;

    // Prevent concurrent loads
    if (isLoadingModelRef.current) return;
    isLoadingModelRef.current = true;
    onLoadingChange(true);

    // Store reference to current model to dispose after new one loads
    const oldModel = atvRef.current;

    // Load real 3D model asynchronously
    const colorData = vehicleColors.find(c => c.hex === color) || vehicleColors[0];
    const bodyColor = new THREE.Color(color);

    loadATVModel()
      .then((loadedModel) => {
        if (!sceneRef.current || !sceneReady) {
          isLoadingModelRef.current = false;
          onLoadingChange(false);
          return; // Component unmounted or scene not ready
        }

        // Apply materials with user-selected color
        applyATVMaterials(loadedModel, bodyColor, colorData.metalness);

        // Scale based on model type
        const scale = model.style === 'youth' ? 0.75 : 1;
        loadedModel.scale.multiplyScalar(scale);

        // Add new model BEFORE removing old one (prevents flashing)
        atvRef.current = loadedModel;
        sceneRef.current.add(loadedModel);

        // Now safely remove and dispose old model
        if (oldModel && sceneRef.current) {
          sceneRef.current.remove(oldModel);
          disposeATV(oldModel);
        }

        isLoadingModelRef.current = false;
        onLoadingChange(false);
      })
      .catch((error) => {
        console.error('Failed to load ATV model:', error);
        isLoadingModelRef.current = false;
        onLoadingChange(false);
      });
  }, [model, color, battery, sceneReady, onLoadingChange]);


  return (
    <div
      ref={containerRef}
      className="w-full h-80 rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing relative"
      style={{
        background: `linear-gradient(180deg, #f5f5f5 0%, #e8e8e8 100%)`,
        boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.1)'
      }}
    />
  );
}

// Animated Price Component Props
interface AnimatedPriceProps {
  value: number;
}

// Animated Price
function AnimatedPrice({ value }: AnimatedPriceProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const previousValue = useRef(value);

  useEffect(() => {
    const start = previousValue.current;
    const end = value;
    const duration = 400;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(start + (end - start) * ease));
      if (progress < 1) requestAnimationFrame(animate);
    };

    animate();
    previousValue.current = value;
  }, [value]);

  return <span>€{displayValue.toLocaleString()}</span>;
}

// Main Component
export default function ATVConfigurator3D() {
  const [step, setStep] = useState(1);
  const [selectedModel, setSelectedModel] = useState<ATVModel>(atvModels[0]);
  const [selectedColor, setSelectedColor] = useState<VehicleColor>(vehicleColors[0]);
  const [selectedBattery, setSelectedBattery] = useState<BatteryOption>(batteryOptions[0]);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [isRotating, setIsRotating] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);

  const calculateTotal = () => {
    let total = selectedModel?.basePrice || 0;
    total += selectedBattery?.price || 0;
    selectedAddons.forEach(id => {
      const addon = addons.find(a => a.id === id);
      if (addon) total += addon.price;
    });
    return total;
  };

  const toggleAddon = (id: string) => {
    setSelectedAddons(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleStepChange = (newStep: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setStep(newStep);
      setIsTransitioning(false);
    }, 150);
  };

  const canProceed = () => step === 1 ? selectedModel !== null : step === 2 ? selectedBattery !== null : true;

  // Components
  const StepIndicator = () => (
    <div className="flex items-center justify-center gap-2 mb-4">
      {['Model', 'Battery', 'Extras', 'Summary'].map((label, i) => {
        const s = i + 1;
        return (
          <React.Fragment key={s}>
            <div className="flex flex-col items-center gap-1">
              <div 
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300"
                style={{ 
                  backgroundColor: step >= s ? colors.primary[500] : colors.neutral[200],
                  color: step >= s ? '#fff' : colors.neutral[500],
                  transform: step === s ? 'scale(1.1)' : 'scale(1)',
                  boxShadow: step === s ? '0 0 20px rgba(0, 136, 230, 0.4)' : 'none'
                }}
              >
                {step > s ? <Check size={16} /> : s}
              </div>
              <span className="text-xs font-medium" style={{ color: step >= s ? colors.primary[600] : colors.neutral[400] }}>{label}</span>
            </div>
            {s < 4 && <div className="w-6 h-0.5 rounded-full mb-5" style={{ backgroundColor: step > s ? colors.primary[500] : colors.neutral[200] }} />}
          </React.Fragment>
        );
      })}
    </div>
  );

  const ModelSelection = () => (
    <div className="grid grid-cols-2 gap-3">
      {atvModels.map((m) => (
        <div
          key={m.id}
          onClick={() => setSelectedModel(m)}
          className="p-3 rounded-xl cursor-pointer transition-all duration-200 border-2 relative"
          style={{ 
            backgroundColor: selectedModel?.id === m.id ? colors.primary[50] : colors.neutral[50],
            borderColor: selectedModel?.id === m.id ? colors.primary[500] : 'transparent',
            transform: selectedModel?.id === m.id ? 'scale(1.02)' : 'scale(1)',
          }}
        >
          {selectedModel?.id === m.id && (
            <div className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.primary[500] }}>
              <Check size={12} color="#fff" />
            </div>
          )}
          <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: selectedModel?.id === m.id ? colors.primary[500] : colors.neutral[400] }}>{m.category}</div>
          <h3 className="text-base font-bold mb-1" style={{ color: colors.neutral[900] }}>{m.name}</h3>
          <div className="flex gap-2 text-xs mb-2" style={{ color: colors.neutral[500] }}>
            <span className="flex items-center gap-1"><Zap size={10} /> {m.power}</span>
            <span className="flex items-center gap-1"><Gauge size={10} /> {m.topSpeed}</span>
          </div>
          <div className="text-lg font-bold" style={{ color: colors.secondary[500] }}>€{m.basePrice.toLocaleString()}</div>
        </div>
      ))}
    </div>
  );

  const ColorSelection = () => (
    <div className="mt-3 p-3 rounded-xl" style={{ backgroundColor: colors.neutral[50] }}>
      <div className="text-sm font-medium mb-2" style={{ color: colors.neutral[700] }}>
        Color: <span style={{ color: colors.primary[600] }}>{selectedColor.name}</span>
      </div>
      <div className="flex gap-2">
        {vehicleColors.map((vc) => (
          <button
            key={vc.id}
            onClick={() => setSelectedColor(vc)}
            className="w-9 h-9 rounded-full transition-all duration-200 relative"
            style={{ 
              backgroundColor: vc.hex,
              transform: selectedColor.id === vc.id ? 'scale(1.15)' : 'scale(1)',
              boxShadow: selectedColor.id === vc.id ? `0 0 0 2px ${colors.neutral[0]}, 0 0 0 4px ${colors.primary[500]}` : '0 2px 6px rgba(0,0,0,0.15)',
            }}
          >
            {selectedColor.id === vc.id && <Check size={14} color={vc.id === 'white' ? colors.neutral[900] : '#fff'} className="absolute inset-0 m-auto" />}
          </button>
        ))}
      </div>
    </div>
  );

  const BatterySelection = () => (
    <div className="space-y-2">
      {batteryOptions.map((b) => (
        <div
          key={b.id}
          onClick={() => setSelectedBattery(b)}
          className="p-3 rounded-xl cursor-pointer transition-all duration-200 border-2 flex items-center gap-3"
          style={{ 
            backgroundColor: selectedBattery?.id === b.id ? colors.primary[50] : colors.neutral[50],
            borderColor: selectedBattery?.id === b.id ? colors.primary[500] : 'transparent',
          }}
        >
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200"
            style={{ backgroundColor: selectedBattery?.id === b.id ? colors.primary[500] : colors.neutral[200] }}
          >
            <Battery size={20} color={selectedBattery?.id === b.id ? '#fff' : colors.neutral[500]} />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold" style={{ color: colors.neutral[900] }}>{b.name}</h3>
            <div className="flex gap-2 text-xs" style={{ color: colors.neutral[500] }}>
              <span>{b.capacity}</span>
              <span>•</span>
              <span style={{ color: colors.success[500] }}>{b.range}</span>
            </div>
          </div>
          <div className="text-right">
            {b.price === 0 ? (
              <span className="text-xs font-bold" style={{ color: colors.success[500] }}>Included</span>
            ) : (
              <span className="text-base font-bold" style={{ color: colors.secondary[500] }}>+€{b.price.toLocaleString()}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const AddonsSelection = () => (
    <div className="grid grid-cols-2 gap-2">
      {addons.map((a) => {
        const Icon = a.icon;
        const isSelected = selectedAddons.includes(a.id);
        return (
          <div
            key={a.id}
            onClick={() => toggleAddon(a.id)}
            className="p-3 rounded-xl cursor-pointer transition-all duration-200 border-2 relative"
            style={{ 
              backgroundColor: isSelected ? colors.primary[50] : colors.neutral[50],
              borderColor: isSelected ? colors.primary[500] : 'transparent',
            }}
          >
            {isSelected && (
              <div className="absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.primary[500] }}>
                <Check size={10} color="#fff" />
              </div>
            )}
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center mb-2 transition-all duration-200"
              style={{ backgroundColor: isSelected ? colors.primary[500] : colors.neutral[200] }}
            >
              <Icon size={16} color={isSelected ? '#fff' : colors.neutral[500]} />
            </div>
            <h3 className="text-xs font-bold mb-0.5" style={{ color: colors.neutral[900] }}>{a.name}</h3>
            <p className="text-xs mb-1" style={{ color: colors.neutral[500] }}>{a.description}</p>
            <div className="text-sm font-bold" style={{ color: colors.secondary[500] }}>+€{a.price}</div>
          </div>
        );
      })}
    </div>
  );

  const Summary = () => (
    <div className="space-y-3">
      <div className="p-3 rounded-xl" style={{ backgroundColor: colors.neutral[50] }}>
        <div className="space-y-2">
          <div className="flex justify-between items-center pb-2 border-b" style={{ borderColor: colors.neutral[200] }}>
            <div>
              <div className="font-bold text-sm" style={{ color: colors.neutral[900] }}>{selectedModel?.name}</div>
              <div className="text-xs" style={{ color: colors.neutral[500] }}>{selectedColor.name}</div>
            </div>
            <div className="font-bold text-sm" style={{ color: colors.neutral[900] }}>€{selectedModel?.basePrice.toLocaleString()}</div>
          </div>
          <div className="flex justify-between items-center pb-2 border-b" style={{ borderColor: colors.neutral[200] }}>
            <div>
              <div className="font-bold text-sm" style={{ color: colors.neutral[900] }}>{selectedBattery?.name}</div>
              <div className="text-xs" style={{ color: colors.neutral[500] }}>{selectedBattery?.capacity}</div>
            </div>
            <div className="font-bold text-sm" style={{ color: colors.neutral[900] }}>{selectedBattery?.price === 0 ? 'Included' : `€${selectedBattery?.price.toLocaleString()}`}</div>
          </div>
          {selectedAddons.map(id => {
            const addon = addons.find(a => a.id === id);
            return (
              <div key={id} className="flex justify-between items-center">
                <div className="font-medium text-sm" style={{ color: colors.neutral[700] }}>{addon?.name}</div>
                <div className="font-bold text-sm" style={{ color: colors.neutral[900] }}>€{addon?.price}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="p-4 rounded-xl" style={{ background: `linear-gradient(135deg, ${colors.primary[500]} 0%, ${colors.primary[700]} 100%)` }}>
        <div className="flex justify-between items-center">
          <div>
            <div className="text-xs text-white/70 mb-0.5">Total Price</div>
            <div className="text-2xl font-bold text-white"><AnimatedPrice value={calculateTotal()} /></div>
          </div>
          <button 
            className="px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-all duration-200 hover:scale-105 active:scale-95 text-sm"
            style={{ backgroundColor: colors.secondary[500], color: '#fff' }}
          >
            Request Quote <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-3" style={{ backgroundColor: colors.neutral[100], fontFamily: 'DM Sans, system-ui, sans-serif' }}>
      {/* Full Page Loader */}
      {isPageLoading && (
        <div 
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{ 
            backgroundColor: colors.neutral[100],
            backdropFilter: 'blur(10px)'
          }}
        >
          <div className="flex flex-col items-center gap-4">
            {/* Spinner */}
            <div 
              className="w-16 h-16 border-4 rounded-full animate-spin"
              style={{ 
                borderColor: colors.neutral[300],
                borderTopColor: colors.primary[500]
              }}
            />
            {/* Loading Text */}
            <div className="flex flex-col items-center gap-2">
              <div className="text-lg font-bold" style={{ color: colors.neutral[900] }}>
                Loading 3D Model
              </div>
              <div className="text-sm" style={{ color: colors.neutral[500] }}>
                Preparing your configurator...
              </div>
            </div>
            {/* Brand Badge */}
            <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: colors.primary[500], color: '#fff' }}>
              <Sparkles size={12} /> Electric ATV Builder
            </div>
          </div>
        </div>
      )}

      <div className="max-w-lg mx-auto">
        <div className="text-center mb-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: colors.primary[500], color: '#fff' }}>
            <Sparkles size={12} /> Electric ATV Builder
          </div>
        </div>

        <StepIndicator />

        <div className="mb-3 relative">
          <ATV3DViewer 
            model={selectedModel} 
            color={selectedColor.hex}
            battery={selectedBattery}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            onLoadingChange={setIsPageLoading}
          />
          <div className="absolute bottom-2 left-2 px-2 py-1 rounded text-xs flex items-center gap-1" style={{ backgroundColor: colors.neutral[900] + 'dd', color: colors.neutral[200] }}>
            <Eye size={12} /> Drag to rotate
          </div>
        </div>

        <div 
          className="rounded-2xl p-4 mb-3 transition-all duration-200"
          style={{ 
            backgroundColor: colors.neutral[0],
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            opacity: isTransitioning ? 0.5 : 1,
            transform: isTransitioning ? 'translateY(5px)' : 'translateY(0)',
          }}
        >
          {step === 1 && (
            <>
              <h2 className="text-base font-bold mb-0.5" style={{ color: colors.neutral[900] }}>Choose Your Model</h2>
              <p className="text-xs mb-3" style={{ color: colors.neutral[500] }}>Select base model & color</p>
              <ModelSelection />
              <ColorSelection />
            </>
          )}
          {step === 2 && (
            <>
              <h2 className="text-base font-bold mb-0.5" style={{ color: colors.neutral[900] }}>Select Battery Pack</h2>
              <p className="text-xs mb-3" style={{ color: colors.neutral[500] }}>Choose your range</p>
              <BatterySelection />
            </>
          )}
          {step === 3 && (
            <>
              <h2 className="text-base font-bold mb-0.5" style={{ color: colors.neutral[900] }}>Add Extras</h2>
              <p className="text-xs mb-3" style={{ color: colors.neutral[500] }}>Enhance your experience</p>
              <AddonsSelection />
            </>
          )}
          {step === 4 && (
            <>
              <h2 className="text-base font-bold mb-0.5" style={{ color: colors.neutral[900] }}>Your Build</h2>
              <p className="text-xs mb-3" style={{ color: colors.neutral[500] }}>Review & confirm</p>
              <Summary />
            </>
          )}
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={() => handleStepChange(Math.max(1, step - 1))}
            disabled={step === 1}
            className="px-3 py-2 rounded-lg font-medium flex items-center gap-1 transition-all duration-200 text-sm"
            style={{ backgroundColor: step === 1 ? 'transparent' : colors.neutral[200], color: colors.neutral[600], opacity: step === 1 ? 0 : 1 }}
          >
            <ChevronLeft size={14} /> Back
          </button>
          
          <div className="px-3 py-1.5 rounded-full flex items-center gap-2" style={{ backgroundColor: colors.neutral[900] }}>
            <span className="text-xs" style={{ color: colors.neutral[400] }}>Total:</span>
            <span className="text-sm font-bold" style={{ color: colors.secondary[400] }}><AnimatedPrice value={calculateTotal()} /></span>
          </div>
          
          {step < 4 ? (
            <button
              onClick={() => handleStepChange(Math.min(4, step + 1))}
              disabled={!canProceed()}
              className="px-3 py-2 rounded-lg font-bold flex items-center gap-1 transition-all duration-200 hover:scale-105 active:scale-95 text-sm"
              style={{ backgroundColor: canProceed() ? colors.primary[500] : colors.neutral[300], color: '#fff' }}
            >
              Next <ChevronRight size={14} />
            </button>
          ) : <div style={{ width: 70 }} />}
        </div>
      </div>
    </div>
  );
}