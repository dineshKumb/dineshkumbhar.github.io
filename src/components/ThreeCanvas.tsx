"use client";

import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Stars, Sparkles } from "@react-three/drei";
import * as THREE from "three";

function SceneController() {
  const { scroll } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const cube1Ref = useRef<THREE.Mesh>(null);
  const cube2Ref = useRef<THREE.Mesh>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const progress = Math.min(Math.max(scroll / (window.innerHeight * 3), 0), 1);

  const getLayer = () => { if (progress < 0.33) return "bronze"; if (progress < 0.66) return "silver"; return "gold"; };
  const currentLayer = getLayer();
  const layerColors = { bronze: "#CD7F32", silver: "#C0C0C0", gold: "#FFD700" };
  const layerLightColors = { bronze: "#E8A862", silver: "#E8E8E8", gold: "#FFE44D" };

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) { groupRef.current.rotation.y = time * 0.05; groupRef.current.rotation.x = Math.sin(time * 0.03) * 0.1; }
    if (cube1Ref.current) { cube1Ref.current.rotation.x = time * 0.3 + progress * Math.PI; cube1Ref.current.rotation.y = time * 0.2 + progress * Math.PI * 0.5; cube1Ref.current.position.y = Math.sin(time * 0.5) * 0.3 - progress * 2; cube1Ref.current.scale.setScalar(1 + progress * 0.5); }
    if (cube2Ref.current) { cube2Ref.current.rotation.x = time * 0.25 - progress * Math.PI * 0.5; cube2Ref.current.rotation.z = time * 0.15; cube2Ref.current.position.y = Math.cos(time * 0.4) * 0.3 + progress * 1; cube2Ref.current.scale.setScalar(0.8 + (1 - progress) * 0.4); }
    if (sphereRef.current) { sphereRef.current.rotation.y = time * 0.15; sphereRef.current.position.y = Math.sin(time * 0.3) * 0.5 + progress * 3; sphereRef.current.scale.setScalar(1.5 + Math.sin(progress * Math.PI) * 0.5); }
    if (ringRef.current) { ringRef.current.rotation.x = time * 0.1 + progress * Math.PI; ringRef.current.rotation.z = time * 0.08; ringRef.current.position.y = Math.cos(time * 0.2) * 0.4 - progress * 1.5; ringRef.current.scale.setScalar(2 + Math.sin(progress * Math.PI) * 1); }
    if (particlesRef.current) { particlesRef.current.rotation.y = time * 0.02; }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh ref={cube1Ref} position={[-3, 2, -5]}>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <MeshDistortMaterial color={layerColors[currentLayer]} distort={0.3} speed={2} roughness={0.2} metalness={0.8} transparent opacity={0.6} />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={0.8}>
        <mesh ref={cube2Ref} position={[3, -1, -3]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={layerLightColors[currentLayer]} roughness={0.1} metalness={0.9} transparent opacity={0.4} />
        </mesh>
      </Float>
      <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={sphereRef} position={[0, 0, -8]}>
          <sphereGeometry args={[2, 64, 64]} />
          <MeshDistortMaterial color="#00D4FF" distort={0.4} speed={1.5} roughness={0} metalness={1} transparent opacity={0.15} />
        </mesh>
      </Float>
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.3}>
        <mesh ref={ringRef} position={[0, -3, -6]}>
          <torusGeometry args={[3, 0.05, 16, 100]} />
          <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.5} transparent opacity={0.3} />
        </mesh>
      </Float>
      <points ref={particlesRef}>
        <bufferGeometry>
          <float32BufferAttribute attach="attributes-position" count={2000} array={useMemo(() => { const arr = new Float32Array(2000 * 3); for (let i = 0; i < 2000 * 3; i += 3) { arr[i] = (Math.random() - 0.5) * 30; arr[i + 1] = (Math.random() - 0.5) * 30; arr[i + 2] = (Math.random() - 0.5) * 20 - 5; } return arr; }, [])} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.03} color="#00D4FF" transparent opacity={0.4} sizeAttenuation blending={THREE.AdditiveBlending} />
      </points>
    </group>
  );
}

function StarsField() {
  return (
    <>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={200} scale={12} size={3} speed={0.4} opacity={0.5} color="#00D4FF" />
    </>
  );
}

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.3} color="#1a1a2e" />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#00D4FF" />
      <directionalLight position={[-5, -3, -5]} intensity={0.4} color="#FFD700" />
      <pointLight position={[0, 0, 0]} intensity={0.5} color="#00D4FF" distance={20} />
      <pointLight position={[5, 5, -5]} intensity={0.3} color="#FFD700" distance={15} />
    </>
  );
}

function CameraController() {
  const { camera, scroll } = useThree();
  const targetPosition = useRef(new THREE.Vector3(0, 0, 10));

  useFrame(() => {
    const progress = Math.min(Math.max(scroll / (window.innerHeight * 3), 0), 1);
    targetPosition.current.y = -progress * 5;
    targetPosition.current.z = 10 - progress * 3;
    camera.position.lerp(targetPosition.current, 0.05);
    camera.lookAt(0, -progress * 2, 0);
  });
  return null;
}

export default function ThreeCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 60, near: 0.1, far: 100 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }} style={{ background: "radial-gradient(ellipse at 50% 50%, #0A0E27 0%, #060818 100%)" }}>
      <fog attach="fog" args={["#0A0E27", 15, 40]} />
      <Lighting />
      <StarsField />
      <SceneController />
      <CameraController />
    </Canvas>
  );
}
