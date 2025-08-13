"use client"
import { Canvas } from "@react-three/fiber";
import React from "react";
import Scene from "./scene";
import Effects from "./effects";
// Import the material to ensure it's extended before use
import "@/materials/layerMaterial";

export default function CanvasComp() {
  return <Canvas orthographic camera={{ zoom: 5, position: [0, 0, 200], far: 300, near: 50 }}>
    <Scene />
    <Effects />
  </Canvas>;
}
