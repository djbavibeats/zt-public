
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function EmptyButton(props) {
  const { nodes, materials } = useGLTF("./buttons/emptyButton.glb");
  return (
    <group {...props} dispose={null} scale={ .9 } position={ props.position } rotation={ props.rotation }>
    <mesh
        castShadow={ false }
        receiveShadow={ false }
        geometry={nodes.Cube009.geometry}
        material={materials.ButtonMaterial}
    />
    <mesh
        castShadow={ false }
        receiveShadow={ false }
        geometry={nodes.Cube009_1.geometry}
        material={materials.RedTrimMaterial}
    />
    </group>
  );
}

useGLTF.preload("./buttons/emptyButton.glb");
