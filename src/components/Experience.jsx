import { useLoader } from '@react-three/fiber'
import { useRef } from 'react'
import { Perf } from 'r3f-perf'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

import { Environment, Backdrop, Sparkles, BakeShadows, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

import Jukebox from './Jukebox'
// import JukeboxV3 from './JukeboxV3'

export default function Experience(props) {
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
        {/* <Perf position="top-left" /> */}

        <color args={ [ 'black' ] } attach="background" />
        <BakeShadows />
        {/* <OrbitControls /> */}

        <Environment preset="night" />

        <directionalLight
            position={[ 0, .312, - 2.5 ] }
            intensity={ 2 }
            scale={[ 2, 1.5, 1 ]}
            color={ '#00abff' }
            ref={ backLight }
            castShadow
            shadow-mapSize={ [ 512, 512 ] }
            shadow-camera-near={ 1 }
            shadow-camera-far={ 6.5 }
            shadow-camera-top={ 2 }
            shadow-camera-right={ 1 }
            shadow-camera-bottom={ - 2 }
            shadow-camera-left={ -1 }
        />

        {/* <directionalLight
            ref={ directionalLight }
            castShadow={ false }
            position={ [ 0, 3, 1 ] }
            intensity={ 0.75 }
            color={ "#ffffff" }
        /> */}
        <ambientLight intensity={ 0.25 } />
        <Sparkles 
            count={ 50 }
            speed={ 0.75 }
            opacity={ 0.25 }
            color={ '#fdde73' }
            size={ 1.5 }
            scale={[ 2.5, 4, 3 ]}
            position={[ 0, .5, 0.25 ]}
            noise={[ 0.5, 5, 0 ]}
        /> 
        <Jukebox 
            position={[ 0, .5749 - .30, 0 ]}
            scale={[ 0.02, 0.02, 0.02 ]}
            reset={ props.reset }
            toggleZoomedIn={ props.toggleZoomedIn }
            toggleSpotifySong={ props.toggleSpotifySong }
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