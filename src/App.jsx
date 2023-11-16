import './App.css'
import { Canvas } from '@react-three/fiber'
import { Fog } from 'three'
import { Suspense, useState, useEffect } from 'react'
import { useProgress, Html } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

import Header from './components/Header'
import Experience from './components/Experience'

function Loader() {
  const { progress } = useProgress()
  return <Html fullscreen zIndexRange={[ 10, 0 ]}>
      <p className="w-screen h-[100%] items-end justify-center flex mb-16 text-center bg-black text-white">
          Loading Jukebox - ({Math.trunc(progress)}%)
      </p>
  </Html>
}

function App() {
  const [ showInstructions, setShowInstructions ] = useState(true)
  const [ zoomedIn, setZoomedIn ] = useState(true)
  const [ reset, doReset ] = useState(0)
  

  function beginExperience() {
    setShowInstructions(false)
  }

  function handleBackButton() {
    doReset(prev => prev + 1)
    setShowInstructions(true)
  }

  function toggleZoomedIn() {
    setZoomedIn(!zoomedIn)
  }

  useEffect(() => {
    console.log('something happened with the zoom')
  }, [ zoomedIn ])
  return (
    <>
      <Header />
      { showInstructions &&
        <div className="absolute z-40 text-center p-8 h-screen w-full bg-[rgba(0,0,0,0.75)] flex-col text-white flex justify-center items-center">
          <div className="max-w-[500px]">
            <p className="text-2xl font-bold mb-4">Welcome to Zach Top Radio!</p>
            <p className="mb-4">Turn on the Jukebox by pressing the big green button and tune into some of your
              (soon to be) favorite Zach Top hits!
            </p>
            <button onClick={ beginExperience } className="border-2 rounded-xl py-2 px-4 w-64">
              <p className="leading-8 font-bold">START</p>
            </button>
          </div>
        </div>
      }
      <></>
      { !showInstructions &&
          zoomedIn &&
        <div>
          <button className="absolute bottom-2 left-2 z-50 bg-black text-white p-4" onClick={() => handleBackButton() }>BACK</button>
        </div>
      }
      { !showInstructions &&
          !zoomedIn &&
        <div className="absolute bottom-[4.35rem] left-0 right-0 w-full flex justify-center z-50">
          <p className="bg-black text-white text-center px-2 py-4">HIT THE GREEN BUTTON TO LISTEN</p>
        </div>
      }
      { !showInstructions &&
          zoomedIn &&
        <div className="absolute bottom-2 right-2 w-3/4 flex justify-center z-50">
          <p className="bg-black text-white text-center px-2 py-4">CLICK THE TITLES OR BUTTONS TO LISTEN</p>
        </div>
      }
      <Canvas
        // frameloop="demand"
        // pixelRatio={ 1 }
        dpr={ 2 }
        shadows={ false }
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
      <Suspense fallback={<Loader />}>
      <EffectComposer multisampling={ 4 }>
        <Bloom 
          mipmapBlur
          luminanceThreshold={ 0.25 }
          // luminanceSmoothing={ 0.75 }
          intensity={ 0.5 }
          />
      </EffectComposer>
        <Experience 
          reset={ reset }
          toggleZoomedIn={ toggleZoomedIn }
        />
        </Suspense>
      </Canvas>
    </>
  )
}

export default App
