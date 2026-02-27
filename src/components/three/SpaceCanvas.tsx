import { Suspense, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { Points, PointMaterial } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { spaceState, initSpaceScroll } from '../../hooks/useSpaceScroll';
import { SECTIONS, CAMERA_FOV, CAMERA_NEAR, CAMERA_FAR, CAMERA_START_Z } from '../../lib/spaceConfig';

// Camera controller — reads spaceState every frame
function CameraRig() {
  const { camera } = useThree();

  useFrame(() => {
    // Lerp camera Z to target
    camera.position.z += (spaceState.cameraZ - camera.position.z) * 0.08;
    // Subtle mouse parallax
    camera.position.x += (spaceState.mouseX * 2 - camera.position.x) * 0.03;
    camera.position.y += (spaceState.mouseY * 1.5 - camera.position.y) * 0.03;
  });

  return null;
}

// Star field spanning the full Z corridor
function StarField() {
  const ref = useRef<THREE.Points>(null);
  const accentRef = useRef<THREE.Points>(null);
  const blueRef = useRef<THREE.Points>(null);
  const mainMatRef = useRef<THREE.PointsMaterial>(null);
  const copperMatRef = useRef<THREE.PointsMaterial>(null);
  const blueMatRef = useRef<THREE.PointsMaterial>(null);

  const { mainPositions, copperPositions, bluePositions } = useMemo(() => {
    const mainCount = 5000;
    const copperCount = 500;
    const blueCount = 200;
    const zMin = -700;
    const zMax = 50;
    const spread = 120;

    const main = new Float32Array(mainCount * 3);
    for (let i = 0; i < mainCount; i++) {
      main[i * 3] = (Math.random() - 0.5) * spread;
      main[i * 3 + 1] = (Math.random() - 0.5) * spread;
      main[i * 3 + 2] = zMin + Math.random() * (zMax - zMin);
    }

    const copper = new Float32Array(copperCount * 3);
    for (let i = 0; i < copperCount; i++) {
      copper[i * 3] = (Math.random() - 0.5) * spread * 0.8;
      copper[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.8;
      copper[i * 3 + 2] = zMin + Math.random() * (zMax - zMin);
    }

    const blue = new Float32Array(blueCount * 3);
    for (let i = 0; i < blueCount; i++) {
      blue[i * 3] = (Math.random() - 0.5) * spread * 0.6;
      blue[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.6;
      blue[i * 3 + 2] = zMin + Math.random() * (zMax - zMin);
    }

    return { mainPositions: main, copperPositions: copper, bluePositions: blue };
  }, []);

  useFrame((_state, delta) => {
    const warp = spaceState.warpIntensity;

    if (ref.current) {
      ref.current.rotation.x += delta * 0.003;
      ref.current.rotation.y += delta * 0.001;
    }
    if (accentRef.current) {
      accentRef.current.rotation.y -= delta * 0.002;
    }
    if (blueRef.current) {
      blueRef.current.rotation.x += delta * 0.002;
      blueRef.current.rotation.z += delta * 0.001;
    }

    // Warp effect: grow star sizes during warp
    if (mainMatRef.current) {
      mainMatRef.current.size = 0.1 + warp * 0.35;
    }
    if (copperMatRef.current) {
      copperMatRef.current.size = 0.08 + warp * 0.25;
    }
    if (blueMatRef.current) {
      blueMatRef.current.size = 0.12 + warp * 0.4;
    }
  });

  return (
    <>
      <Points ref={ref} positions={mainPositions} stride={3} frustumCulled={false}>
        <PointMaterial
          ref={mainMatRef}
          transparent
          color="#ffffff"
          size={0.1}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      <Points ref={accentRef} positions={copperPositions} stride={3} frustumCulled={false}>
        <PointMaterial
          ref={copperMatRef}
          transparent
          color="#cd7f32"
          size={0.08}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.7}
        />
      </Points>
      <Points ref={blueRef} positions={bluePositions} stride={3} frustumCulled={false}>
        <PointMaterial
          ref={blueMatRef}
          transparent
          color="#002FA7"
          size={0.12}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.8}
        />
      </Points>
    </>
  );
}

// Warp tunnel — cylindrical line segments around camera during warp
function WarpTunnel() {
  const groupRef = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.LineBasicMaterial>(null);

  const lineGeometry = useMemo(() => {
    const segments = 200;
    const positions = new Float32Array(segments * 6); // 2 points per line, 3 coords each
    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const radius = 15 + Math.random() * 10;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const zStart = (Math.random() - 0.5) * 4;
      positions[i * 6] = x;
      positions[i * 6 + 1] = y;
      positions[i * 6 + 2] = zStart;
      positions[i * 6 + 3] = x + (Math.random() - 0.5) * 0.5;
      positions[i * 6 + 4] = y + (Math.random() - 0.5) * 0.5;
      positions[i * 6 + 5] = zStart + 1;
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geom;
  }, []);

  useFrame(() => {
    const warp = spaceState.warpIntensity;
    if (!groupRef.current || !matRef.current) return;

    groupRef.current.visible = warp > 0.05;
    groupRef.current.position.z = spaceState.cameraZ - CAMERA_START_Z;
    groupRef.current.scale.z = 1 + warp * 8;
    groupRef.current.rotation.z += 0.002;

    matRef.current.opacity = warp * 0.6;
  });

  return (
    <group ref={groupRef} visible={false}>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial
          ref={matRef}
          color="#002FA7"
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}

// Planet marker at each section's Z-depth
function PlanetMarker({ zDepth, accent }: { zDepth: number; accent: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((_state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.15;

    // Distance-based visibility
    const dist = Math.abs(spaceState.cameraZ - CAMERA_START_Z - zDepth);
    const visible = dist < 120;
    groupRef.current.visible = visible;
    if (visible && glowRef.current) {
      const proximity = 1 - dist / 120;
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = proximity * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, zDepth]}>
      {/* Torus ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3, 0.02, 8, 64]} />
        <meshBasicMaterial color={accent} transparent opacity={0.3} blending={THREE.AdditiveBlending} />
      </mesh>
      {/* Wireframe icosahedron */}
      <mesh>
        <icosahedronGeometry args={[1.2, 0]} />
        <meshBasicMaterial color={accent} wireframe transparent opacity={0.2} blending={THREE.AdditiveBlending} />
      </mesh>
      {/* Glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color={accent} transparent opacity={0.15} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

// Constellation nodes for Hero section background
function HeroConstellation({ zDepth }: { zDepth: number }) {
  const groupRef = useRef<THREE.Group>(null);

  const { nodePositions, lineGeometry } = useMemo(() => {
    const nodes: [number, number, number][] = [];
    for (let i = 0; i < 16; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = 8 + Math.random() * 6;
      nodes.push([r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi)]);
    }
    const lines: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i][0] - nodes[j][0];
        const dy = nodes[i][1] - nodes[j][1];
        const dz = nodes[i][2] - nodes[j][2];
        if (Math.sqrt(dx * dx + dy * dy + dz * dz) < 12) {
          lines.push(...nodes[i], ...nodes[j]);
        }
      }
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(new Float32Array(lines), 3));
    return { nodePositions: new Float32Array(nodes.flat()), lineGeometry: geom };
  }, []);

  useFrame((_state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.03;
    const dist = Math.abs(spaceState.cameraZ - CAMERA_START_Z - zDepth);
    groupRef.current.visible = dist < 80;
  });

  return (
    <group ref={groupRef} position={[0, 0, zDepth]}>
      <Points positions={nodePositions} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#ffffff" size={0.35} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
      </Points>
      <Points positions={nodePositions} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#002FA7" size={0.8} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} opacity={0.15} />
      </Points>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#002FA7" transparent opacity={0.12} blending={THREE.AdditiveBlending} />
      </lineSegments>
    </group>
  );
}

// Rotating wireframe sphere + orbiting dots for About section
function AboutSphere({ zDepth }: { zDepth: number }) {
  const groupRef = useRef<THREE.Group>(null);

  const orbitPositions = useMemo(() => {
    const count = 40;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const r = 6 + Math.sin(angle * 3) * 1.5;
      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = Math.sin(angle) * r;
      pos[i * 3 + 2] = Math.sin(angle * 2) * 2;
    }
    return pos;
  }, []);

  useFrame((_state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.08;
    groupRef.current.rotation.x += delta * 0.02;
    const dist = Math.abs(spaceState.cameraZ - CAMERA_START_Z - zDepth);
    groupRef.current.visible = dist < 80;
  });

  return (
    <group ref={groupRef} position={[0, 0, zDepth]}>
      <mesh>
        <sphereGeometry args={[4, 16, 16]} />
        <meshBasicMaterial color="#4ADE80" wireframe transparent opacity={0.08} blending={THREE.AdditiveBlending} />
      </mesh>
      <Points positions={orbitPositions} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#4ADE80" size={0.15} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} opacity={0.5} />
      </Points>
    </group>
  );
}

// Floating angular shards for Skills section
function ForgeShards({ zDepth }: { zDepth: number }) {
  const groupRef = useRef<THREE.Group>(null);

  const shards = useMemo(() => {
    return Array.from({ length: 12 }, () => ({
      pos: [(Math.random() - 0.5) * 16, (Math.random() - 0.5) * 16, (Math.random() - 0.5) * 8] as [number, number, number],
      rot: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
      scale: 0.3 + Math.random() * 0.5,
      speed: 0.2 + Math.random() * 0.3,
    }));
  }, []);

  useFrame((_state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.02;
    const dist = Math.abs(spaceState.cameraZ - CAMERA_START_Z - zDepth);
    groupRef.current.visible = dist < 80;

    groupRef.current.children.forEach((child, i) => {
      child.rotation.x += delta * shards[i].speed;
      child.rotation.z += delta * shards[i].speed * 0.5;
    });
  });

  return (
    <group ref={groupRef} position={[0, 0, zDepth]}>
      {shards.map((shard, i) => (
        <mesh key={i} position={shard.pos} rotation={shard.rot} scale={shard.scale}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="#cd7f32" wireframe transparent opacity={0.15} blending={THREE.AdditiveBlending} />
        </mesh>
      ))}
    </group>
  );
}

// Nebula particle disc for Experience section
function NebulaDisk({ zDepth }: { zDepth: number }) {
  const groupRef = useRef<THREE.Group>(null);

  const positions = useMemo(() => {
    const count = 800;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * 12;
      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 1.5;
      pos[i * 3 + 2] = Math.sin(angle) * r;
    }
    return pos;
  }, []);

  useFrame((_state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.05;
    const dist = Math.abs(spaceState.cameraZ - CAMERA_START_Z - zDepth);
    groupRef.current.visible = dist < 80;
  });

  return (
    <group ref={groupRef} position={[0, 0, zDepth]} rotation={[0.3, 0, 0]}>
      <Points positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#8B5CF6" size={0.08} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} opacity={0.4} />
      </Points>
    </group>
  );
}

// Expanding concentric rings for Transmissions section
function SignalRings({ zDepth }: { zDepth: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_state, delta) => {
    if (!groupRef.current) return;
    const dist = Math.abs(spaceState.cameraZ - CAMERA_START_Z - zDepth);
    groupRef.current.visible = dist < 80;
    groupRef.current.rotation.z += delta * 0.03;
  });

  return (
    <group ref={groupRef} position={[0, 0, zDepth]}>
      {[3, 5, 7, 9, 11].map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[r, 0.015, 8, 64]} />
          <meshBasicMaterial color="#F59E0B" transparent opacity={0.12 - i * 0.02} blending={THREE.AdditiveBlending} />
        </mesh>
      ))}
    </group>
  );
}

// Warm glow for Contact/Destination section
function DestinationGlow({ zDepth }: { zDepth: number }) {
  const groupRef = useRef<THREE.Group>(null);

  const orbitPositions = useMemo(() => {
    const count = 20;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = 4 + Math.random() * 3;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((_state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.06;
    const dist = Math.abs(spaceState.cameraZ - CAMERA_START_Z - zDepth);
    groupRef.current.visible = dist < 80;
  });

  return (
    <group ref={groupRef} position={[0, 0, zDepth]}>
      <mesh>
        <sphereGeometry args={[1.5, 16, 16]} />
        <meshBasicMaterial color="#e11d48" transparent opacity={0.06} blending={THREE.AdditiveBlending} />
      </mesh>
      <Points positions={orbitPositions} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#e11d48" size={0.2} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} opacity={0.5} />
      </Points>
    </group>
  );
}

function SpaceScene() {
  return (
    <>
      <CameraRig />
      <StarField />
      <WarpTunnel />

      {/* Planet markers at each section */}
      {SECTIONS.map((s) => (
        <PlanetMarker key={s.id} zDepth={s.zDepth} accent={s.accent} />
      ))}

      {/* Section-specific backgrounds */}
      <HeroConstellation zDepth={SECTIONS[0].zDepth} />
      <AboutSphere zDepth={SECTIONS[1].zDepth} />
      <ForgeShards zDepth={SECTIONS[2].zDepth} />
      {/* Projects (index 3) uses the constellation from Hero pattern — planet marker is enough */}
      <NebulaDisk zDepth={SECTIONS[4].zDepth} />
      <SignalRings zDepth={SECTIONS[5].zDepth} />
      <DestinationGlow zDepth={SECTIONS[6].zDepth} />

      <EffectComposer>
        <Bloom luminanceThreshold={0.6} luminanceSmoothing={0.3} intensity={0.5} />
        <Vignette offset={0.3} darkness={0.7} />
      </EffectComposer>
    </>
  );
}

export default function SpaceCanvas() {
  useEffect(() => {
    initSpaceScroll();
  }, []);

  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{
          position: [0, 0, CAMERA_START_Z],
          fov: CAMERA_FOV,
          near: CAMERA_NEAR,
          far: CAMERA_FAR,
        }}
        gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        style={{ background: '#0d0d0d' }}
      >
        <color attach="background" args={['#0d0d0d']} />
        <Suspense fallback={null}>
          <SpaceScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
