import { Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { Points, PointMaterial } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { spaceState, initSpaceScroll } from '../../hooks/useSpaceScroll';

// Grid plane — flat wireframe grid at slight angle
function GridPlane() {
  const ref = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!ref.current) return;
    // Subtle mouse parallax tilt
    ref.current.rotation.x = -0.4 + spaceState.mouseY * 0.05;
    ref.current.rotation.y = spaceState.mouseX * 0.03;
  });

  return (
    <group ref={ref} position={[0, -8, 0]} rotation={[-0.4, 0, 0]}>
      <gridHelper
        args={[100, 40, '#002FA7', '#002FA7']}
      />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial color="#002FA7" transparent opacity={0.02} />
      </mesh>
    </group>
  );
}

// Floating code particles — 300 small glowing dots slowly drifting
function FloatingDots() {
  const whiteRef = useRef<THREE.Points>(null);
  const copperRef = useRef<THREE.Points>(null);
  const blueRef = useRef<THREE.Points>(null);

  const { whitePositions, copperPositions, bluePositions, whiteVelocities, copperVelocities, blueVelocities } = useMemo(() => {
    const spread = 40;
    const whiteCount = 200;
    const copperCount = 60;
    const blueCount = 40;

    function makeParticles(count: number) {
      const positions = new Float32Array(count * 3);
      const velocities = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * spread;
        positions[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.6;
        positions[i * 3 + 2] = (Math.random() - 0.5) * spread;
        velocities[i * 3] = (Math.random() - 0.5) * 0.003;
        velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
      }
      return { positions, velocities };
    }

    const white = makeParticles(whiteCount);
    const copper = makeParticles(copperCount);
    const blue = makeParticles(blueCount);

    return {
      whitePositions: white.positions,
      copperPositions: copper.positions,
      bluePositions: blue.positions,
      whiteVelocities: white.velocities,
      copperVelocities: copper.velocities,
      blueVelocities: blue.velocities,
    };
  }, []);

  useFrame(() => {
    function drift(ref: React.RefObject<THREE.Points | null>, positions: Float32Array, velocities: Float32Array) {
      if (!ref.current) return;
      const geo = ref.current.geometry;
      const posAttr = geo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < positions.length / 3; i++) {
        posAttr.array[i * 3] += velocities[i * 3];
        posAttr.array[i * 3 + 1] += velocities[i * 3 + 1];
        posAttr.array[i * 3 + 2] += velocities[i * 3 + 2];

        // Wrap around
        for (let j = 0; j < 3; j++) {
          if (posAttr.array[i * 3 + j] > 20) posAttr.array[i * 3 + j] = -20;
          if (posAttr.array[i * 3 + j] < -20) posAttr.array[i * 3 + j] = 20;
        }
      }
      posAttr.needsUpdate = true;
    }

    drift(whiteRef, whitePositions, whiteVelocities);
    drift(copperRef, copperPositions, copperVelocities);
    drift(blueRef, bluePositions, blueVelocities);
  });

  return (
    <>
      <Points ref={whiteRef} positions={whitePositions} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#ffffff" size={0.06} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} opacity={0.6} />
      </Points>
      <Points ref={copperRef} positions={copperPositions} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#cd7f32" size={0.08} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} opacity={0.5} />
      </Points>
      <Points ref={blueRef} positions={bluePositions} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#002FA7" size={0.1} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} opacity={0.6} />
      </Points>
    </>
  );
}

// Matrix rain — thin falling line segments
function MatrixRain() {
  const groupRef = useRef<THREE.Group>(null);
  const geoRef = useRef<THREE.BufferGeometry>(null);

  const { speeds } = useMemo(() => {
    const count = 200;
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      spd[i] = 0.01 + Math.random() * 0.03;
    }
    return { speeds: spd };
  }, []);

  const geometry = useMemo(() => {
    const count = 200;
    const positions = new Float32Array(count * 6);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 60;
      const z = (Math.random() - 0.5) * 60;
      const y = Math.random() * 30 - 15;
      const len = 0.3 + Math.random() * 0.7;
      positions[i * 6] = x;
      positions[i * 6 + 1] = y;
      positions[i * 6 + 2] = z;
      positions[i * 6 + 3] = x;
      positions[i * 6 + 4] = y - len;
      positions[i * 6 + 5] = z;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame(() => {
    const geo = geoRef.current ?? geometry;
    const posAttr = geo.attributes.position as THREE.BufferAttribute;

    for (let i = 0; i < speeds.length; i++) {
      posAttr.array[i * 6 + 1] -= speeds[i];
      posAttr.array[i * 6 + 4] -= speeds[i];

      if (posAttr.array[i * 6 + 1] < -15) {
        const y = 15 + Math.random() * 5;
        const len = posAttr.array[i * 6 + 1] - posAttr.array[i * 6 + 4];
        posAttr.array[i * 6 + 1] = y;
        posAttr.array[i * 6 + 4] = y - len;
      }
    }

    posAttr.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      <lineSegments geometry={geometry}>
        <lineBasicMaterial color="#4ADE80" transparent opacity={0.04} blending={THREE.AdditiveBlending} />
      </lineSegments>
    </group>
  );
}

// Scene group with mouse parallax
function DevScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += (spaceState.mouseX * 0.02 - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (spaceState.mouseY * 0.01 - groupRef.current.rotation.x) * 0.05;
  });

  return (
    <>
      <group ref={groupRef}>
        <GridPlane />
        <FloatingDots />
        <MatrixRain />
      </group>

      <EffectComposer>
        <Bloom luminanceThreshold={0.8} luminanceSmoothing={0.3} intensity={0.3} />
        <Vignette offset={0.3} darkness={0.7} />
      </EffectComposer>
    </>
  );
}

export default function DevCanvas() {
  useEffect(() => {
    initSpaceScroll();
  }, []);

  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 2, 20], fov: 60, near: 0.1, far: 200 }}
        gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        style={{ background: '#0d0d0d' }}
      >
        <color attach="background" args={['#0d0d0d']} />
        <Suspense fallback={null}>
          <DevScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
