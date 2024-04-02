import './App.css'
import { Canvas } from '@react-three/fiber'
import { Fog } from 'three'
import { Suspense, useState, useEffect } from 'react'
import { useProgress, Html } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

import Header from './components/Header'
import Experience from './components/Experience'
import SpotifyPlayer from './components/SpotifyPlayer'

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
  const [ currentSpotifyId, setCurrentSpotifyId ] = useState('5wCUOa3jSe5ZM3oXEutCdO')
  const [ spotifyInitialized, setSpotifyInitialized ] = useState(false)
  const [ zoomedIn, setZoomedIn ] = useState(true)
  const [ reset, doReset ] = useState(0)
  const [ pause, setPause ] = useState(false)

  const [ songPaused, setSongPaused ] = useState(false)
  

  function beginExperience() {
    setShowInstructions(false)
    setSpotifyInitialized(true)
  }

  function handleBackButton() {
    doReset(prev => prev + 1)
    setShowInstructions(true)
  }

  function handlePauseButton() {
    setSongPaused(!songPaused)
  }

  function toggleZoomedIn() {
    setZoomedIn(!zoomedIn)
  }

  function togglePause() {
    // setPause(!pause)
  }

  function initializeSpotifyPlayer() {

  }

  function toggleSpotifySong(pos) {
    switch (pos) {
      case(1):
        setCurrentSpotifyId('https://soundcloud.com/zachtop/sounds-like-the-radio-1')
        break
      case(2):
        setCurrentSpotifyId('https://soundcloud.com/zachtop/theres-the-sun')
        break
      case(3):
        setCurrentSpotifyId('https://soundcloud.com/zachtop/cold-beer-country-music-1')
        break
      case(4):
        setCurrentSpotifyId('https://soundcloud.com/zachtop/bad-luck')
        break
      case(5):
        setCurrentSpotifyId('https://soundcloud.com/zachtop/the-kinda-woman-i-like')
        break
      case(6):
        setCurrentSpotifyId('https://soundcloud.com/zachtop/justa-jonesin')
        break
      default:
        setCurrentSpotifyId('https://soundcloud.com/zachtop/sounds-like-the-radio-1')
        break
    }
  }

  return (
    <>
      <Header />
      { showInstructions &&
        <div className="absolute z-40 text-center p-8 h-screen w-full bg-[rgba(0,0,0,0.75)] flex-col text-white flex justify-center items-center">
          <div className="max-w-[500px]">
            <p className="text-2xl font-bold mb-4">Welcome to Zach Top Radio!!</p>
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
          <button className="absolute bottom-[8.25rem] left-2 md:left-2 z-50 bg-black text-white text-xs md:text-md p-4" onClick={() => handleBackButton() }>BACK</button>
        </div>
      }
      {
        !showInstructions &&
          zoomedIn &&
          <div>
            <button className="absolute bottom-[8.25rem] right-2 md:right-2 z-50 bg-black p-2 text-white text-xl md:text-xl" onClick={() => handlePauseButton() }>
              <div className="flex items-center justify-center h-8 w-8 text-md text-white">
              { songPaused ?
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#ffffff" d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>
                : <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="#ffffff" d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/></svg>
              }
              </div>
            </button> 
          </div>
      }
      { !showInstructions &&
          !zoomedIn &&
        <div className="absolute bottom-[12.5rem] left-0 right-0 w-full flex justify-center z-0">
          <p className="bg-black text-white text-center px-2 py-4">HIT THE GREEN BUTTON TO LISTEN</p>
        </div>
      }
      { !showInstructions &&
          zoomedIn &&
        <div className="absolute bottom-2 md:bottom-[5.25rem] right-2 md:left-0 md:right-0 w-3/4 md:w-full flex justify-center z-10">
          <p className="bg-black text-white text-center text-xs md:text-md px-2 py-4">CLICK THE TITLES OR BUTTONS TO LISTEN</p>
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
      {/* <EffectComposer multisampling={ 4 }>
        <Bloom 
          mipmapBlur
          luminanceThreshold={ 0.25 }
          // luminanceSmoothing={ 0.75 }
          intensity={ 0.5 }
          />
      </EffectComposer> */}
        <Experience 
          reset={ reset }
          toggleZoomedIn={ toggleZoomedIn }
          toggleSpotifySong={ toggleSpotifySong }
          togglePause={ togglePause }
          songPaused={ songPaused }
          setSongPaused={ setSongPaused }
        />
        </Suspense>
      </Canvas>
      {/* <SpotifyPlayer 
        currentSpotifyId={ currentSpotifyId }
        toggleSpotifySong={ toggleSpotifySong }
        spotifyInitialized={ spotifyInitialized }
        pause={ pause }
      /> */}
    </>
  )
}

export default App
