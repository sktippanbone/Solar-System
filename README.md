# 3D Solar System - Interactive Three.js Simulation

A beautiful, interactive 3D solar system simulation built with React, TypeScript, and Three.js. Features real-time orbital speed controls, smooth animations, and responsive design.

## 🌟 Features

- **Realistic 3D Solar System**: All 8 planets orbiting around the Sun with accurate relative sizes and distances
- **Real-time Speed Controls**: Individual speed sliders for each planet with instant feedback
- **Interactive Camera**: Mouse controls for orbiting, zooming, and exploring the solar system
- **Planet Hover Effects**: Tooltips and highlighting when hovering over planets
- **Play/Pause Animation**: Full control over the simulation state
- **Theme Toggle**: Switch between dark and light modes
- **Background Stars**: Dynamic star field for immersive experience
- **Orbit Visualization**: Subtle orbit lines showing planetary paths
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Smooth Performance**: Optimized Three.js rendering with 60fps animations

## 🚀 Technologies Used

- **React 18** - Modern UI framework
- **TypeScript** - Type-safe development
- **Three.js** - 3D graphics and WebGL rendering
- **Tailwind CSS** - Utility-first styling
- **Vite** - Fast build tool and development server
- **Lucide React** - Beautiful icons

## 📦 Installation & Setup

1. **Clone or extract the project**
   ```bash
   cd 3d-solar-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173`
   - The solar system will load automatically

## 🎮 How to Use

### Basic Controls
- **Play/Pause**: Use the animation control button to start/stop the simulation
- **Planet Speed**: Adjust individual planet orbital speeds using the sliders (0x to 5x speed)
- **Camera**: Click and drag to orbit around the solar system, scroll to zoom in/out
- **Reset**: Click "Reset Simulation" to restore default speeds and positions

### Interactive Features
- **Hover over planets** to see their names in tooltips
- **Switch themes** between dark space and lighter modes
- **Individual planet control** - each planet can have different speeds
- **Real-time updates** - all changes apply instantly without lag

## 🏗️ Project Structure

```
src/
├── components/
│   ├── SolarSystemViewer.tsx    # Main 3D scene component
│   ├── Header.tsx               # App header with branding
│   ├── ControlPanel.tsx         # Main control panel container
│   └── controls/
│       ├── PlanetSpeedControls.tsx  # Individual planet speed sliders
│       ├── PlayPauseControl.tsx     # Animation play/pause
│       ├── ThemeToggle.tsx          # Dark/light mode toggle
│       ├── CameraControls.tsx       # Camera control info
│       └── ResetControl.tsx         # Reset simulation button
├── context/
│   └── SolarSystemContext.tsx   # Global state management
├── types/
│   └── solarSystem.ts          # TypeScript type definitions
├── utils/
│   └── solarSystemScene.ts     # Three.js scene setup and logic
└── App.tsx                     # Main application component
```

## 🎯 Key Implementation Details

### Three.js Scene Setup
- **Realistic proportions**: Planets sized and positioned based on actual solar system ratios
- **Dynamic lighting**: Point light from the Sun with ambient lighting for visibility
- **Shadow mapping**: Realistic shadows cast by planets
- **Optimized rendering**: Efficient geometry and materials for smooth performance

### Animation System
- **Clock-based timing**: Uses THREE.Clock for consistent frame-rate independent animation
- **Individual planet control**: Each planet maintains its own orbital speed multiplier
- **Smooth interpolation**: Camera movements use easing for natural feel

### Performance Optimizations
- **Efficient geometry**: Appropriate polygon counts for each object size
- **Texture-free materials**: Uses procedural colors to reduce memory usage
- **Selective rendering**: Only updates when necessary
- **Responsive design**: Automatically adjusts to different screen sizes

## 🎨 Customization

### Adding New Planets
Edit `src/utils/solarSystemScene.ts` and modify the `planetData` array:
```typescript
const planetData = [
  ['PlanetName', '#HexColor', size, distance, orbitSpeed],
  // Add new entries here
];
```

### Changing Visual Styles
- **Colors**: Modify planet colors in the planetData array
- **Sizes**: Adjust the size values for different planet scales
- **Orbits**: Change distance values to modify orbital radii
- **Lighting**: Adjust light intensity and colors in the scene setup

### Performance Tuning
- **Star count**: Reduce `starCount` in `createStarField()` for better performance
- **Geometry detail**: Lower sphere segments for planets if needed
- **Shadow quality**: Adjust shadow map size in light setup

## 🐛 Troubleshooting

### Common Issues
1. **Black screen**: Check browser WebGL support
2. **Poor performance**: Try reducing star count or geometry detail
3. **Controls not working**: Ensure mouse events aren't blocked by other elements

### Browser Compatibility
- **Chrome/Edge**: Full support
- **Firefox**: Full support
- **Safari**: Full support (iOS 12+)
- **Mobile browsers**: Optimized for touch devices

## 📱 Mobile Experience

The application is fully responsive and optimized for mobile devices:
- **Touch controls**: Swipe to orbit camera, pinch to zoom
- **Responsive layout**: Control panel adapts to smaller screens
- **Performance optimized**: Reduced complexity on mobile devices
- **Touch-friendly**: Large buttons and sliders for easy interaction

## 🔧 Build & Deployment

### Development Build
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deployment
The built files in `dist/` can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3
- Any web server

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to submit issues, feature requests, or pull requests to improve the solar system simulation!

---

**Enjoy exploring the cosmos! 🌌**