
import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { gsap } from 'gsap/gsap-core'

export default function EmptyButton(props) {
  const { nodes, materials } = useGLTF("./buttons/emptyButton.glb");
  const button = useRef()
  const trim = useRef()

  useEffect(() => {
    if (props.isActive) {
      gsap.to(button.current.material, { emissiveIntensity: 0.4 })
      gsap.to(trim.current.material, { emissiveIntensity: 1.5 })
      // gsap.to(text.current.material, { emissiveIntensity: 1.0 })
    } else {
      gsap.to([ button.current.material, trim.current.material, 
        // text.current.material 
      ], { emissiveIntensity: 0.0 })
    }
  }, [ props.isActive ])

  return (
    <group {...props} dispose={null} scale={ .9 } position={ props.position } rotation={ props.rotation }>
    <mesh
        castShadow={ false }
        receiveShadow={ false }
        geometry={nodes.Cube009.geometry}
        material={materials.ButtonMaterial}
        ref={ button }
    >          
      <meshStandardMaterial color={ '#fff6d9' } emissive={ '#fff6d9'} emissiveIntensity={ 0 } />
    </mesh>
    <mesh
        castShadow={ false }
        receiveShadow={ false }
        geometry={nodes.Cube009_1.geometry}
        material={materials.RedTrimMaterial}
        ref={ trim }
    >
      <meshStandardMaterial color={ '#ff0000' } emissive={ '#ff0000'} emissiveIntensity={ 0 } />
    </mesh>
    </group>
  );
}

useGLTF.preload("./buttons/emptyButton.glb");
