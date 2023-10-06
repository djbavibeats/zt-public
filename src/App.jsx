import { useState } from 'react'
import './App.css'
import { Canvas } from '@react-three/fiber'
import { Fog } from 'three'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

import Experience from './components/Experience'


function App() {
  return (
    <>
      <Canvas
        shadows
        camera={ {
            fov: 45,
            near: 0.1,
            far: 200,
            position: [ 0, 2, 8 ]
        } }
        onCreated={(state) => {
          state.scene.fog = new Fog('black', 0.25, 15)
        }}
      >   
      <EffectComposer>
        <Bloom 
          luminanceThreshold={ 0.25 }
          luminanceSmoothing={ 0.75 }
        />
      </EffectComposer>
        <Experience 
        />
      </Canvas>
    </>
  )
}

export default App
