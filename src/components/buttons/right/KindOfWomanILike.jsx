import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { gsap } from 'gsap/gsap-core'

export default function BackToYou(props) {
  const { nodes, materials } = useGLTF("./buttons/right/theKindOfWomanILike.glb");
  const button = useRef()
  const trim = useRef()
  const text = useRef()

  useEffect(() => {
    if (props.isActive) {
      gsap.to(button.current.material, { emissiveIntensity: 0.4 })
      gsap.to(trim.current.material, { emissiveIntensity: 1.5 })
      gsap.to(text.current.material, { emissiveIntensity: 1.0 })
    } else {
      gsap.to([ button.current.material, trim.current.material, text.current.material ], { emissiveIntensity: 0.0 })
    }
  }, [ props.isActive ])
  return (
    <group {...props} dispose={null} scale={ .9 } position={ props.position } rotation={ props.rotation }>
    <mesh
        castShadow={ false }
        receiveShadow={ false }
        geometry={nodes.Text012.geometry}
        material={materials.TextMaterial}
        position={[0, 0, 0.25]}
        rotation={[Math.PI / 2, 0, 0]}
        ref={ text }
        >
          <meshStandardMaterial color={ '#000000' } emissive={ '#000000'} emissiveIntensity={ 0 } />
        </mesh>
      <mesh
        castShadow={ false }
        receiveShadow={ false }
        geometry={nodes.Cube004.geometry}
        material={materials.ButtonMaterial}
        ref={ button }
        >
          <meshStandardMaterial color={ '#fff6d9' } emissive={ '#fff6d9'} emissiveIntensity={ 0 } />
        </mesh>
      <mesh
        castShadow={ false }
        receiveShadow={ false }
        geometry={nodes.Cube004_1.geometry}
        material={materials.RedTrimMaterial}
        ref={ trim }
        >
          <meshStandardMaterial color={ '#ff0000' } emissive={ '#ff0000'} emissiveIntensity={ 0 } />
        </mesh>
    </group>
  );
}

useGLTF.preload("./buttons/right/theKindOfWomanILike.glb");
