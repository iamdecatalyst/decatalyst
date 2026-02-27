import { useRef, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

let globalScrollProgress = 0;
let mouseX = 0;
let mouseY = 0;

function Stars({ count = 4000, depth = 50 }: { count?: number; depth?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 2] = (Math.random() - 0.5) * depth;
    }
    return pos;
  }, [count, depth]);

  useFrame((_state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.008;
    ref.current.rotation.y += delta * 0.004;
    ref.current.position.z = globalScrollProgress * 30;
  });

  return (
    <group rotation={[0, 0, Math.PI / 6]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#ffffff" size={0.1} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
      </Points>
    </group>
  );
}

function AccentStars({ count = 300 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 80;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 80;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    return pos;
  }, [count]);

  useFrame((_state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y -= delta * 0.006;
    ref.current.position.z = globalScrollProgress * 25;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#cd7f32" size={0.08} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} opacity={0.7} />
    </Points>
  );
}

function BlueAccents({ count = 150 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return pos;
  }, [count]);

  useFrame((_state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.005;
    ref.current.rotation.z += delta * 0.003;
    ref.current.position.z = globalScrollProgress * 20;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#002FA7" size={0.12} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} opacity={0.8} />
    </Points>
  );
}

// Constellation nodes representing projects
function ConstellationNodes() {
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const { nodePositions, linePositions } = useMemo(() => {
    const nodes: [number, number, number][] = [];
    const nodeCount = 16;
    // Create node positions in a loose 3D cloud
    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = 8 + Math.random() * 6;
      nodes.push([
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      ]);
    }

    // Create connections between nearby nodes
    const lines: number[] = [];
    const maxDist = 12;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i][0] - nodes[j][0];
        const dy = nodes[i][1] - nodes[j][1];
        const dz = nodes[i][2] - nodes[j][2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < maxDist) {
          lines.push(...nodes[i], ...nodes[j]);
        }
      }
    }

    const nodePos = new Float32Array(nodes.flat());
    const linePos = new Float32Array(lines);
    return { nodePositions: nodePos, linePositions: linePos };
  }, []);

  useFrame((_state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.03;
    groupRef.current.rotation.x = mouseY * 0.15;
    groupRef.current.position.x = mouseX * 1.5;
    groupRef.current.position.z = globalScrollProgress * -15;
  });

  const lineGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    return geom;
  }, [linePositions]);

  return (
    <group ref={groupRef}>
      {/* Nodes */}
      <Points positions={nodePositions} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#ffffff" size={0.35} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
      </Points>
      {/* Node glow */}
      <Points positions={nodePositions} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#002FA7" size={0.8} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} opacity={0.15} />
      </Points>
      {/* Connection lines */}
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial color="#002FA7" transparent opacity={0.12} blending={THREE.AdditiveBlending} />
      </lineSegments>
    </group>
  );
}

function Scene() {
  return (
    <>
      <Stars count={3500} />
      <AccentStars count={250} />
      <BlueAccents count={120} />
      <ConstellationNodes />
      <EffectComposer>
        <Bloom luminanceThreshold={0.8} luminanceSmoothing={0.3} intensity={0.4} />
        <Vignette offset={0.3} darkness={0.7} />
      </EffectComposer>
    </>
  );
}

export default function HeroScene() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      globalScrollProgress = docHeight > 0 ? scrollTop / docHeight : 0;
    };
    const handleMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouse, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 60, near: 0.1, far: 1000 }}
        gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        style={{ background: '#0d0d0d' }}
      >
        <color attach="background" args={['#0d0d0d']} />
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
