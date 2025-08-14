"use client"
import { Text, Center } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface BirthdayTextProps {
  screenSize: string;
}

export default function BirthdayText({ screenSize }: BirthdayTextProps) {
  const titleRef = useRef<THREE.Group>(null!);
  const wishRef = useRef<THREE.Group>(null!);
  const [time, setTime] = useState(0);

  // Responsive configurations
  const getResponsiveConfig = () => {
    switch (screenSize) {
      case 'mobile':
        return {
          titleFontSize: 8,  
          nameFontSize: 5,   
          wishFontSize: 6,   
          titlePosition: [0, 57, 25] as [number, number, number],
          namePosition: [0, -3, 0.5] as [number, number, number], 
          wishPosition: [0, -15, 2] as [number, number, number], 
          wishMaxWidth: 100, // Reduced width for mobile
          baseY: 8,
          titleAnchor: "center" as const,
          nameAnchor: "center" as const,
          wishAnchor: "center" as const
        };
      case 'tablet':
        return {
          titleFontSize: 16,
          nameFontSize: 10,
          wishFontSize: 10,
          titlePosition: [-70, 65, 25] as [number, number, number],
          namePosition: [55, -1, 0.5] as [number, number, number],
          wishPosition: [40, -16, 1] as [number, number, number],
          wishMaxWidth: 80,
          baseY: 12,
          titleAnchor: "left" as const,
          nameAnchor: "left" as const,
          wishAnchor: "left" as const
        };
      default: // desktop
        return {
          titleFontSize: 20,
          nameFontSize: 10,
          wishFontSize: 10,
          titlePosition: [0, 15, 25] as [number, number, number],
          namePosition: [60, -1, 0.5] as [number, number, number],
          wishPosition: [30, -20, 1] as [number, number, number],
          wishMaxWidth: 500,
          baseY: 15,
          titleAnchor: "left" as const,
          nameAnchor: "left" as const,
          wishAnchor: "left" as const
        };
    }
  };

  const config = getResponsiveConfig();

  useFrame((state, delta) => {
    setTime(time + delta);
    
    // Subtle floating animation for main title
    if (titleRef.current) {
      titleRef.current.position.y = Math.sin(time * 0.5) * 0.3;
      titleRef.current.rotation.z = Math.sin(time * 0.3) * 0.005;
    }
    
    // Gentle floating for wish text
    if (wishRef.current) {
      wishRef.current.position.y = config.wishPosition[1] + Math.sin(time * 0.4 + 1) * 0.2;
    }
  });

  return (
    <group position={config.titlePosition}>
      {/* Main Birthday Title - Positioned higher on screen */}
      <group ref={titleRef} position={[0, 0, 0]}>
        <Center>
          <Text
            font="/fonts/Shine Monday.otf"
            fontSize={config.titleFontSize}
            color="#FF6B35"
            anchorX={config.titleAnchor}
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
      <group position={config.namePosition}>
        <Center>
          <Text
            font="/fonts/Shine Monday.otf"
            fontSize={config.nameFontSize}
            color="#DC143C"
            anchorX={config.nameAnchor}
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
      <group ref={wishRef} position={config.wishPosition}>
        <Center>
          <Text
            font="/fonts/Simple Thursday.otf"
            fontSize={config.wishFontSize}
            color="#2F4F4F"
            anchorX={config.wishAnchor}
            anchorY="top"
            textAlign="center"
            maxWidth={config.wishMaxWidth}
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
