import { useTexture, useAspect, Plane } from "@react-three/drei";
import bgUrl from "@/resources/bg.jpg";
import starsUrl from "@/resources/stars.png";
import groundUrl from "@/resources/ground.png";
import bearUrl from "@/resources/bear.png";
import leaves1Url from "@/resources/leaves1.png";
import leaves2Url from "@/resources/leaves2.png";
import { useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import Fireflies from "./fire-flies";
import BirthdayText from "./birthday-text";
import "@/materials/layerMaterial";

export default function Scene() {
  const scaleN = useAspect(1600, 1000, 1.05);
  const scaleW = useAspect(2200, 1000, 1.05);
  const group = useRef<THREE.Group>(null!);
  const layersRef = useRef<any[]>([]);
  const [movement] = useState(() => new THREE.Vector3());
  const [temp] = useState(() => new THREE.Vector3());
  const textures = useTexture([
    "/Texture/img5_bg.png",
    "/Texture/img4_cloud.png",
    "/Texture/img3_grass.png",
    "/Texture/img3_grass.png",
    "/Texture/img2.png",
    "/Texture/img1.png",
  ]);
  // const textures = useTexture([
  //   bgUrl.src,
  //   starsUrl.src,
  //   groundUrl.src,
  //   bearUrl.src,
  //   "@/resources/leaves1.png",
  //   leaves2Url.src,
  // ]);
  const layers = [
    { texture: textures[0], z: 0, factor: 0.005, scale: scaleW },
    { texture: textures[1], z: 10, factor: 0.005, scale: scaleW },
    { texture: textures[2], z: 20, scale: scaleW },
    { texture: textures[3], z: 30, scaleFactor: 0.83, scale: scaleN },
    {
      texture: textures[4],
      factor: 0.03,
      scaleFactor: 1.3,
      z: 40,
      wiggle: 0.6,
      scale: scaleW,
    },
    {
      texture: textures[5],
      factor: 0.04,
      scaleFactor: 1.3,
      z: 49,
      wiggle: 1,
      scale: scaleW,
    },
  ];
   useFrame((state, delta) => {
    movement.lerp(temp.set(state.mouse.x, state.mouse.y * 0.1, 0), 0.15)
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, state.mouse.x * 8, 0.15)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, state.mouse.y / 25, 0.15)
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, -state.mouse.x / 8, 0.15)
    layersRef.current[4].uniforms.time.value = layersRef.current[5].uniforms.time.value += delta
  }, 1)

  return (
    <group ref={group}>
      <Fireflies count={20} radius={80} colors={['blue']} />
      {layers.map(
        ({ scale, texture, factor = 0, scaleFactor = 1, wiggle = 0, z }, i) => (
          <Plane
            scale={scale}
            args={[1, 1, wiggle ? 10 : 1, wiggle ? 10 : 1]}
            position-z={z}
            key={i}
          >
            <layerMaterial
              ref={(el: any) => (layersRef.current[i] = el)}
              movement={movement}
              textr={texture}
              factor={factor}
              wiggle={wiggle}
              scale={scaleFactor}
            />
          </Plane>
        )
      )}

      {/* 3D Birthday Text positioned between grass layers */}
      <BirthdayText />
    </group>
  );
}
