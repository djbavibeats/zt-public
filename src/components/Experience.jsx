import { useLoader, useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import { Perf } from 'r3f-perf'
import { useControls } from 'leva'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

import { useHelper, OrbitControls, Environment, Backdrop, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

import Jukebox from './Jukebox'


export default function Experience({ cameraPosition, switchCameraPosition }) {
    const directionalLight = useRef()
    const backLight = useRef()
    const [ colorMap, displacementMap, normalMap, roughnessMap ] = useLoader(TextureLoader, [
        './textures/wood/colorMap.jpg',
        './textures/wood/displacementMap.jpg',
        './textures/wood/normalMap.jpg',
        './textures/wood/roughnessMap.jpg'
    ])
    colorMap.wrapS = THREE.RepeatWrapping
    displacementMap.wrapS = THREE.RepeatWrapping
    normalMap.wrapS = THREE.RepeatWrapping
    roughnessMap.wrapS = THREE.RepeatWrapping

    colorMap.wrapT = THREE.RepeatWrapping
    displacementMap.wrapT = THREE.RepeatWrapping
    normalMap.wrapT = THREE.RepeatWrapping
    roughnessMap.wrapT = THREE.RepeatWrapping

    colorMap.repeat.set(8, 8)
    displacementMap.repeat.set(8, 8)
    normalMap.repeat.set(8, 8)
    roughnessMap.repeat.set(8, 8)

    return (<>
        <Perf position="top-left" />
        {/* <OrbitControls makeDefault /> */}

        <color args={ [ 'black' ] } attach="background" />

        <Environment 
            preset="night"
        />

        <directionalLight
            position={[ 0, .312, - 2.5 ] }
            intensity={ 2 }
            scale={[ 2, 1.5, 1 ]}
            color={ '#00abff' }
            ref={ backLight }
            castShadow
            shadow-mapSize={ [ 1024, 1024 ] }
            shadow-camera-near={ 1 }
            shadow-camera-far={ 10 }
            shadow-camera-top={ 5 }
            shadow-camera-right={ 5 }
            shadow-camera-bottom={ - 5 }
            shadow-camera-left={ - 5 }
        />

        <directionalLight
            ref={ directionalLight }
            position={ [ 0, 3, 1 ] }
            intensity={ 0.5 }
            color={ "#ffffff" }
            castShadow
            shadow-mapSize={ [ 1024, 1024 ] }
            shadow-camera-near={ 1 }
            shadow-camera-far={ 10 }
            shadow-camera-top={ 5 }
            shadow-camera-right={ 5 }
            shadow-camera-bottom={ - 5 }
            shadow-camera-left={ - 5 }
        />
        <ambientLight intensity={ 0.25 } />
        <Sparkles 
            count={ 50 }
            speed={ 0.75 }
            opacity={ 1 }
            color={ '#fdde73' }
            size={ 2.5 }
            scale={[ 2.5, 4, 3 ]}
            position={[ 0, .5, 0.25 ]}
            noise={[ 0.5, 5, 0 ]}
        /> 
        <Jukebox 
            position={[ 0, .5749 - .30, 0 ]}
            scale={[ 0.02, 0.02, 0.02 ]}
        />
        <Backdrop position={[ 0, -1 - 0.30, -15 ]} scale={[ 50, 10, 10 ]}>
            <meshStandardMaterial color="#3e3131" />
            </Backdrop>
        <mesh receiveShadow rotation-x={ - Math.PI * 0.5 } position-y={ - 1 - .30 } scale={[ 35, 15, 15 ]}>
            <planeGeometry 
            />
            <meshStandardMaterial side={ THREE.DoubleSide }
                map={ colorMap }
                displacementMap={ displacementMap }
                displacementScale={ 0.01 }
                normalMap={ normalMap }
                roughnessMap={ roughnessMap }
                
            />
        </mesh>

    </>)
}