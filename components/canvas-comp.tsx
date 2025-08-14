"use client"
import { Canvas } from "@react-three/fiber";
import React, { useState, useEffect } from "react";
import Scene from "./scene";
import Effects from "./effects";
// Import the material to ensure it's extended before use
import "@/materials/layerMaterial";

export default function CanvasComp() {
  const [zoom, setZoom] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let newZoom = 5;
      
      if (width < 768) {
        // Mobile - zoom out more to see smaller elements better
        newZoom = 2.5;
      } else if (width < 1024) {
        // Tablet
        newZoom = 4;
      } else {
        // Desktop
        newZoom = 5;
      }
      
      setZoom(newZoom);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Canvas 
      orthographic 
      camera={{ 
        zoom: zoom, 
        position: [0, 0, 200], 
        far: 300, 
        near: 50 
      }}
      className="w-full h-full"
    >
      <Scene />
      <Effects />
    </Canvas>
  );
}
