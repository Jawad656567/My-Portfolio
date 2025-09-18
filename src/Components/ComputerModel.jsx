// src/Components/ComputerModel.jsx
import React from "react";
import { useGLTF } from "@react-three/drei";

export default function ComputerModel({ scale = 1 }) {
  const { scene } = useGLTF("/models/pc.glb");
  return (
    <primitive
      object={scene}
      scale={scale}
      position={[0, -0.3, 0]}
      rotation={[0, Math.PI / 4, 0]}
    />
  );
}
