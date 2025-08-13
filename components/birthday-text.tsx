"use client"
import { Text, Center } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export default function BirthdayText() {
  const titleRef = useRef<THREE.Group>(null!);
  const wishRef = useRef<THREE.Group>(null!);
  const [time, setTime] = useState(0);

  useFrame((state, delta) => {
    setTime(time + delta);
    
    // Subtle floating animation for main title
    if (titleRef.current) {
      titleRef.current.position.y = Math.sin(time * 0.5) * 0.3;
      titleRef.current.rotation.z = Math.sin(time * 0.3) * 0.005;
    }
    
    // Gentle floating for wish text
    if (wishRef.current) {
      wishRef.current.position.y = -20 + Math.sin(time * 0.4 + 1) * 0.2;
    }
  });

  return (
    <group position={[0, 15, 25]}>
      {/* Main Birthday Title - Positioned higher on screen */}
      <group ref={titleRef} position={[0, 0, 0]}>
        <Center>
          <Text
            font="/fonts/Shine Monday.otf"
            fontSize={20}
            color="#FF6B35"
            anchorX="left"
            anchorY="bottom"
            outlineWidth={0.3}
            outlineColor="#8B4513"
            letterSpacing={0.12}
            textAlign="center"
          >
            Happy Birthday
            <meshStandardMaterial
              transparent
              opacity={1}
              emissive="#FFD700"
              emissiveIntensity={0.6}
            />
          </Text>
        </Center>
      </group>

      {/* Name - Better spacing from title */}
      <group position={[60, -1, 0.5]}>
        <Center>
          <Text
            font="/fonts/Shine Monday.otf"
            fontSize={10}
            color="#DC143C"
            anchorX="left"
            anchorY="top"
            textAlign="center"
            outlineWidth={0.22}
            outlineColor="#8B0000"
            letterSpacing={0.18}
            
          >
            Rahul
            <meshStandardMaterial
              transparent
              opacity={1}
              emissive="#FF4500"
              emissiveIntensity={0.5}
            />
          </Text>
        </Center>
      </group>

      {/* Wish Text - Positioned lower with proper spacing */}
      <group ref={wishRef} position={[30, -20, 1]}>
        <Center>
          <Text
            font="/fonts/Simple Thursday.otf"
            fontSize={10}
            color="#2F4F4F"
            anchorX="left"
            anchorY="top"
            textAlign="center"
            maxWidth={500}
            outlineWidth={0.12}
            outlineColor="#FFFFFF"
            letterSpacing={0.05}
            lineHeight={1.3}
          >
            May your day be filled with sunshine{"\n"}as warm as golden flowers and{"\n"}joy as pure as endless sky
            <meshStandardMaterial
              transparent
              opacity={0.95}
              emissive="#87CEEB"
              emissiveIntensity={0.3}
            />
          </Text>
        </Center>
      </group>
    </group>
  );
}
