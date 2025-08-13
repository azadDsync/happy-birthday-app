import { DepthOfField, EffectComposer, Vignette } from "@react-three/postprocessing";
import { MaskFunction } from "postprocessing";
import React, { useLayoutEffect, useRef } from "react";

export default function Effects() {
  // Import the correct type for DepthOfField if available, otherwise use 'any'
  const ref = useRef<any>(null);
  useLayoutEffect(() => {
    if (ref.current && ref.current.maskPass && ref.current.maskPass.getFullscreenMaterial) {
      const maskMaterial = ref.current.maskPass.getFullscreenMaterial();
      maskMaterial.maskFunction = MaskFunction.MULTIPLY_RGB_SET_ALPHA;
    }
  }, []);
  return (
    <EffectComposer enableNormalPass={false} multisampling={0}>
      <DepthOfField 
        ref={ref}
        target={[0, 0, 25]}
        bokehScale={3}
        focalLength={0.12}
        width={1024}
      />
      {/* <TiltShift2 blur={0.25} samples={10} /> */}
      <Vignette />
    </EffectComposer>
  );
}
