import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import { JSX } from "react";
import * as THREE from "three";

// This material takes care of wiggling and punches a hole into
// alpha regions so that the depth-of-field effect can process the layers.
// Credit: Gianmarco Simone https://twitter.com/ggsimm

const LayerMaterialImpl = shaderMaterial(
  {
    textr: null as THREE.Texture | null,
    movement: new THREE.Vector3(0, 0, 0),
    scale: 1,
    factor: 0,
    wiggle: 0,
    time: 0,
  },
  /* vertex shader */
  `uniform float time;
    uniform vec2 resolution;
    uniform float wiggle;
    varying vec2 vUv;
    varying vec3 vNormal;

    void main() {
      vUv = uv;
      vec3 transformed = vec3(position);

      if (wiggle > 0.) {
        float theta = sin(time + position.y) / 2.0 * wiggle;
        float c = cos(theta);
        float s = sin(theta);
        mat3 m = mat3(c, 0, s, 0, 1, 0, -s, 0, c);
        transformed = transformed * m;
        vNormal = vNormal * m;
      }

      gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.);
    }`,
  /* fragment shader */
  `uniform float time;
    uniform vec2 resolution;
    uniform float factor;
    uniform float scale;
    uniform vec3 movement;
    uniform sampler2D textr;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv / scale + movement.xy * factor;
      vec4 color = texture2D(textr, uv);

      if (color.a < 0.1) discard;

      gl_FragColor = vec4(color.rgb, .1);

      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }`
);

extend({ LayerMaterial: LayerMaterialImpl });

declare module "@react-three/fiber" {
  interface ThreeElements {
    layerMaterial: JSX.IntrinsicElements["meshStandardMaterial"] & {
      textr?: THREE.Texture;
      movement?: THREE.Vector3;
      scale?: number;
      factor?: number;
      wiggle?: number;
      time?: number;
    };
  }
}

export const LayerMaterial = LayerMaterialImpl;
export default LayerMaterialImpl;
