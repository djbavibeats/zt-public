import React, { useState, useEffect, useRef } from "react"
import { useGLTF, Html } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import * as THREE from 'three'
import { Howl } from 'howler'
import { gsap } from "gsap/gsap-core"

import JukeboxBase from './Base.jsx'
import Caption from './Caption.jsx'

import EmptyButton from './buttons/EmptyButton.jsx'

import MeetZach from './buttons/left/MeetZach.jsx'
import PlayAll from './buttons/left/PlayAll.jsx'
import Pause from './buttons/left/Pause.jsx'
import SoundsLikeTheRadioAddDay from './buttons/left/SoundsLikeTheRadioAddDay.jsx'
import ShowDates from './buttons/left/ShowDates.jsx'

import TheresTheSun from './buttons/right/TheresTheSun.jsx'
import KindOfWomanILike from './buttons/right/KindOfWomanILike.jsx'
import BadLuck from './buttons/right/BadLuck.jsx'
import ColdBeerAndCountryMusic from './buttons/right/ColdBeerAndCountryMusic.jsx'
import JustaJonesin from './buttons/right/JustaJonesin.jsx'
import SoundsLikeTheRadio from './buttons/right/SoundsLikeTheRadio.jsx'

export default function Jukebox(props) {
  const { nodes, materials } = useGLTF('./juke-separate.glb')

  const [ hovered, setHovered ] = useState(false)
  const [ songHovered, setSongHovered ] = useState(false)
  const [ zoomed, setZoomed ] = useState(false)
  const onbutton = useRef()
  const jukeboxYellowLights = useRef()
  const jukeboxRedLights = useRef()
  const [ onButtonActive, setOnButtonActive ] = useState(false)
  const redDetails = useRef()
  const songButton1 = useRef()
  const [ songButton1Active, setSongButton1Active ] = useState(false)
  const songButton2 = useRef()
  const [ songButton2Active, setSongButton2Active ] = useState(false)
  const songButton3 = useRef()
  const [ songButton3Active, setSongButton3Active ] = useState(false)
  const songButton4 = useRef()
  const [ songButton4Active, setSongButton4Active ] = useState(false)
  const songButton5 = useRef()
  const [ songButton5Active, setSongButton5Active ] = useState(false)
  const songButton6 = useRef()
  const [ songButton6Active, setSongButton6Active ] = useState(false)
  const songButton7 = useRef()
  const [ songButton7Active, setSongButton7Active ] = useState(false)
  const songButton8 = useRef()
  const [ songButton8Active, setSongButton8Active ] = useState(false)
  const songButton9 = useRef()
  const [ songButton9Active, setSongButton9Active ] = useState(false)
  const songButton10 = useRef()
  const [ songButton10Active, setSongButton10Active ] = useState(false)
  const songButton11 = useRef()
  const [ songButton11Active, setSongButton11Active ] = useState(false)
  const songButton12 = useRef()
  const [ songButton12Active, setSongButton12Active ] = useState(false)
  const leftNavButton = useRef()
  const rightNavButton = useRef()
  const [ activePanel, setActivePanel ] = useState('left')
  const [ isMobileDevice, setMobileDevice ] = useState(false)
  const [width, setWidth] = useState(window.innerWidth)
  const [ firstClick, setFirstClick ] = useState(true)
  // const [ firstToBio, setFirstToBio ] = useState(true)

  const [ firstSongPlayed, setFirstSongPlayed ] = useState(false)
  const [ jukeboxActive, setJukeboxActive ] = useState(false)
  const [ audioPaused, setAudioPaused ] = useState(true)
  const [ activeAudio, setActiveAudio ] = useState(0)

  const flicker = useRef(null)

  const audioArray = useRef([
    new Howl({ src: './audio/spoken/intro.mp3', html5: true, preload: true, onplay: () => { setIntroPlaying(true) }, onend: () => handleSongEnd(0) }),
    new Howl({ 
      src:  './audio/songs/sounds-like-the-radio.mp3', 
      html5: true, 
      preload: true, 
      onend: () => handleSongEnd(1)
    }),
    new Howl({ src:  './audio/songs/theres-the-sun.mp3', html5: true, preload: true, onend: () => handleSongEnd(2) }),
    new Howl({ src:  './audio/songs/cold-beer-and-country-music.mp3', html5: true, preload: true, onend: () => handleSongEnd(3) }),
    new Howl({ src:  './audio/songs/bad-luck.mp3', html5: true, preload: true, onend: () => handleSongEnd(4) }),
    new Howl({ src: './audio/songs/kind-of-woman-i-like.mp3', html5: true, preload: true, onend: () => handleSongEnd(5) }),
    new Howl({ src: './audio/songs/justa-jonesin.mp3', html5: true, preload: true, onend: () => handleSongEnd(6)})
  ])

  var buttonAudio = new Howl({ src: '/audio/fx/buttonpress.mp3' })
  var lightAudio = new Howl({ src:'/audio/fx/lightson.mp3' })

  useEffect(() => {
      document.body.style.cursor = hovered ? 'pointer' : 'auto' 
  }, [hovered])

  useEffect(() => {
    console.log('updating', playingAllSongs)
  }, [ playingAllSongs ])

  useEffect(() => {
      if (width < 768) {
        setMobileDevice(true)
      } else {
        setMobileDevice(false)
      }
      window.addEventListener('resize', handleWindowSizeChange)
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange)
      }
  }, [])

  function handleWindowSizeChange() {
    setWidth(window.innerWidth)
  }

  const vec = new THREE.Vector3()

  useFrame((state) => {
    const rotMax = 2.0

    if (zoomed) {
      const step = 0.08
      
      if (!isMobileDevice) {
        state.camera.position.lerp(vec.set(0.0, 1.00, 1.1, 0.1), step)
      } else {
        if (activePanel === 'left') {
            state.camera.position.lerp(vec.set(-0.11, 0.9, 1.1, 0.1), step)
            state.camera.updateProjectionMatrix()
        } else if (activePanel === 'right') {
            state.camera.position.lerp(vec.set(0.11, 0.9, 1.1, 0.1), step)
            state.camera.updateProjectionMatrix()
        }
      }
    } else {
      state.camera.position.lerp(vec.set(0.0, 2.0, 8.0, 0.1), 0.08)
    }
  })

  function playNewSong(pos) {
    console.log("Playing Song: " + pos)
    audioArray.current[activeAudio].unload()
    switch (pos) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
        props.toggleSpotifySong(pos)
        setActiveAudio(pos)
        setAudioPaused(false)
        break
      case(0):
        console.log('play intro')
        audioArray.current.map((song, index) => { 
          if (index === 0) {
            audioArray.current[activeAudio].unload()
            song.play()
            setActiveAudio(pos)
            setAudioPaused(false)
          }
        })

        break
    }
    // audioArray.current[activeAudio].unload()
  
    // audioArray.current.map((song, index) => {
    //   if (index === pos) {
    //     // song.seek(218)
    //     song.play()
    //     setActiveAudio(pos)
    //     setAudioPaused(false)
    //   } else {
    //     song.stop()
    //   }
      
    // })
  }

  var playingAllSongs = true
  var firstToBio = true

  function playAllSongs() {
      playingAllSongs = true
      audioArray.current.map(song => {
          song.stop()
      })
      setTimeout(() => {
        handleSongButtonClick(7)
      }, 1000)
    
  }

  function handleSongEnd(num) {
    console.log(num, playingAllSongs)
      switch(num) {
        case(0):
          if (firstToBio === true) {
            gsap.to(songButton1.current.material, { emissiveIntensity: 0.0 })
            setSongButton1Active(false)
            firstToBio = false
            console.log("next time", firstToBio)
          } else if (playingAllSongs === true) {
             handleSongButtonClick(7)
          } else {
            gsap.to(songButton1.current.material, { emissiveIntensity: 0.0 })
            setSongButton1Active(false)
          }
          break
        case(1):
          if (firstToBio === true) {
            console.log("Go to bio?", firstToBio)
            handleSongButtonClick(1)
          } else if (playingAllSongs === true) {
            handleSongButtonClick(8)
         } else {
           gsap.to(songButton7.current.material, { emissiveIntensity: 0.0 })
           setSongButton7Active(false)
         }
          break
        case(2):
          if (playingAllSongs === true) {
            handleSongButtonClick(9)
          } else {
            gsap.to(songButton8.current.material, { emissiveIntensity: 0.0 })
            setSongButton8Active(false)
          }
          break
        case(3):
          if (playingAllSongs === true) {
            handleSongButtonClick(10)
          } else {
            gsap.to(songButton9.current.material, { emissiveIntensity: 0.0 })
            setSongButton9Active(false)
          }
          break
        case(4):
          if (playingAllSongs === true) {
            handleSongButtonClick(11)
          } else {
            gsap.to(songButton10.current.material, { emissiveIntensity: 0.0 })
            setSongButton10Active(false)
          }
          break
        case(5):
          if (playingAllSongs === true) {
            handleSongButtonClick(12)
          } else {
            gsap.to(songButton11.current.material, { emissiveIntensity: 0.0 })
            setSongButton11Active(false)
          }
          break
        case(6):
          console.log('thats all folks!')
          gsap.to(songButton12.current.material, { emissiveIntensity: 0.0 })
          setSongButton12Active(false)
          break
        default:
          break
    }
  }

  function pause(pos) {
    console.log(activeAudio)
    console.log(audioPaused)
    props.togglePause()
    audioArray.current.map((song, index) => {
      if (index === activeAudio) {
        console.log('this is the song!')
        if (audioPaused === false) {
          song.pause() 
          setAudioPaused(true)
        } else {
          song.play()
          setAudioPaused(false)
        }
      } else {
        song.stop()
      }
    })
  }

  function showDates() {
    window.open("https://www.zach-top.com/", "_blank" )
  }

  function soundsLikeTheRadioAddDay() {
    window.open("https://www.youtube.com/watch?v=cOKHBwNPQKo", "_blank" )
  }

  function handleSongButtonClick(num, isfirst) {
    buttonAudio.play()
    if (!firstSongPlayed) {
      setFirstSongPlayed(true)
    }
    switch (num) {
      case(1):
        gsap.to(songButton1.current.material, { emissiveIntensity: 1.5 })
        gsap.to([
          songButton2.current.material, songButton3.current.material, songButton4.current.material, songButton5.current.material,
          songButton6.current.material, songButton7.current.material, songButton8.current.material, songButton9.current.material,
          songButton10.current.material, songButton11.current.material, songButton12.current.material
        ], { emissiveIntensity: 0.0 })
        props.togglePause()
        playNewSong(0)
        setSongButton1Active(true)
        setSongButton2Active(false)
        setSongButton3Active(false)
        setSongButton4Active(false)
        setSongButton5Active(false)
        setSongButton6Active(false)
        setSongButton7Active(false)
        setSongButton8Active(false)
        setSongButton9Active(false)
        setSongButton10Active(false)
        setSongButton11Active(false)
        setSongButton12Active(false)
        break
      case(2):
        gsap.to(songButton2.current.material, { emissiveIntensity: 1.5 })
        gsap.to([
          songButton1.current.material, songButton3.current.material, songButton4.current.material, songButton5.current.material,
          songButton6.current.material, songButton7.current.material, songButton8.current.material, songButton9.current.material,
          songButton10.current.material, songButton11.current.material, songButton12.current.material
        ], { emissiveIntensity: 0.0 })
        playAllSongs()
        setSongButton1Active(false)
        setSongButton2Active(true)
        setSongButton3Active(false)
        setSongButton4Active(false)
        setSongButton5Active(false)
        setSongButton6Active(false)
        setSongButton7Active(false)
        setSongButton8Active(false)
        setSongButton9Active(false)
        setSongButton10Active(false)
        setSongButton11Active(false)
        setSongButton12Active(false)
        break
      case(3):
        if (audioPaused) {
          gsap.to(songButton3.current.material, { emissiveIntensity: 0.0 })
        } else {
          gsap.to(songButton3.current.material, { emissiveIntensity: 1.5 })
        }
        pause()
        break
      case(4):
        gsap.to(songButton2.current.material, { emissiveIntensity: 1.5 })
        gsap.to([
          songButton1.current.material, songButton4.current.material, songButton3.current.material, songButton5.current.material,
          songButton6.current.material, songButton7.current.material, songButton8.current.material, songButton9.current.material,
          songButton10.current.material, songButton11.current.material, songButton12.current.material
        ], { emissiveIntensity: 0.0 })
        soundsLikeTheRadioAddDay()
        setSongButton1Active(false)
        setSongButton2Active(false)
        setSongButton3Active(false)
        setSongButton4Active(true)
        setSongButton5Active(false)
        setSongButton6Active(false)
        setSongButton7Active(false)
        setSongButton8Active(false)
        setSongButton9Active(false)
        setSongButton10Active(false)
        setSongButton11Active(false)
        setSongButton12Active(false)
        break
      case(5):
        gsap.to(songButton3.current.material, { emissiveIntensity: 1.5 })
        gsap.to([
          songButton1.current.material, songButton2.current.material, songButton5.current.material, songButton4.current.material,
          songButton6.current.material, songButton7.current.material, songButton8.current.material, songButton9.current.material,
          songButton10.current.material, songButton11.current.material, songButton12.current.material
        ], { emissiveIntensity: 0.0 })
        showDates()
        setSongButton1Active(false)
        setSongButton2Active(false)
        setSongButton3Active(false)
        setSongButton4Active(false)
        setSongButton5Active(true)
        setSongButton6Active(false)
        setSongButton7Active(false)
        setSongButton8Active(false)
        setSongButton9Active(false)
        setSongButton10Active(false)
        setSongButton11Active(false)
        setSongButton12Active(false)
        break
      case(6):
        break
      case(7):
        gsap.to(songButton7.current.material, { emissiveIntensity: 1.5 })
        gsap.to([
          songButton1.current.material, songButton2.current.material, songButton3.current.material, songButton4.current.material,
          songButton5.current.material, songButton6.current.material, songButton8.current.material, songButton9.current.material,
          songButton10.current.material, songButton11.current.material, songButton12.current.material
        ], { emissiveIntensity: 0.0 })
        playNewSong(1)
        setSongButton1Active(false)
        setSongButton2Active(false)
        setSongButton3Active(false)
        setSongButton4Active(false)
        setSongButton5Active(false)
        setSongButton6Active(false)
        setSongButton7Active(true)
        setSongButton8Active(false)
        setSongButton9Active(false)
        setSongButton10Active(false)
        setSongButton11Active(false)
        setSongButton12Active(false)
        break
      case(8):
        gsap.to(songButton8.current.material, { emissiveIntensity: 1.5 })
        gsap.to([
          songButton1.current.material, songButton2.current.material, songButton3.current.material, songButton4.current.material,
          songButton5.current.material, songButton6.current.material, songButton7.current.material, songButton9.current.material,
          songButton10.current.material, songButton11.current.material, songButton12.current.material
        ], { emissiveIntensity: 0.0 })
        playNewSong(2)
        setSongButton1Active(false)
        setSongButton2Active(false)
        setSongButton3Active(false)
        setSongButton4Active(false)
        setSongButton5Active(false)
        setSongButton6Active(false)
        setSongButton7Active(false)
        setSongButton8Active(true)
        setSongButton9Active(false)
        setSongButton10Active(false)
        setSongButton11Active(false)
        setSongButton12Active(false)
        break
      case(9):
        gsap.to(songButton9.current.material, { emissiveIntensity: 1.5 })
        gsap.to([
          songButton1.current.material, songButton2.current.material, songButton3.current.material, songButton4.current.material,
          songButton5.current.material, songButton6.current.material, songButton7.current.material, songButton8.current.material,
          songButton10.current.material, songButton11.current.material, songButton12.current.material
        ], { emissiveIntensity: 0.0 })
        playNewSong(3)
        setSongButton1Active(false)
        setSongButton2Active(false)
        setSongButton3Active(false)
        setSongButton4Active(false)
        setSongButton5Active(false)
        setSongButton6Active(false)
        setSongButton7Active(false)
        setSongButton8Active(false)
        setSongButton9Active(true)
        setSongButton10Active(false)
        setSongButton11Active(false)
        setSongButton12Active(false)
        break
      case(10):
        gsap.to(songButton10.current.material, { emissiveIntensity: 1.5 })
        gsap.to([
          songButton1.current.material, songButton2.current.material, songButton3.current.material, songButton4.current.material,
          songButton5.current.material, songButton6.current.material, songButton7.current.material, songButton8.current.material,
          songButton9.current.material, songButton11.current.material, songButton12.current.material
        ], { emissiveIntensity: 0.0 })
        playNewSong(4)
        setSongButton1Active(false)
        setSongButton2Active(false)
        setSongButton3Active(false)
        setSongButton4Active(false)
        setSongButton5Active(false)
        setSongButton6Active(false)
        setSongButton7Active(false)
        setSongButton8Active(false)
        setSongButton9Active(false)
        setSongButton10Active(true)
        setSongButton11Active(false)
        setSongButton12Active(false)
        break
      case(11):
        gsap.to(songButton11.current.material, { emissiveIntensity: 1.5 })
        gsap.to([
          songButton1.current.material, songButton2.current.material, songButton3.current.material, songButton4.current.material,
          songButton5.current.material, songButton6.current.material, songButton7.current.material, songButton8.current.material,
          songButton9.current.material, songButton10.current.material, songButton12.current.material
        ], { emissiveIntensity: 0.0 })
        playNewSong(5)
        setSongButton1Active(false)
        setSongButton2Active(false)
        setSongButton3Active(false)
        setSongButton4Active(false)
        setSongButton5Active(false)
        setSongButton6Active(false)
        setSongButton7Active(false)
        setSongButton8Active(false)
        setSongButton9Active(false)
        setSongButton10Active(false)
        setSongButton11Active(true)
        setSongButton12Active(false)
        break   
      case(12):
        gsap.to(songButton12.current.material, { emissiveIntensity: 1.5 })
        gsap.to([
          songButton1.current.material, songButton2.current.material, songButton3.current.material, songButton4.current.material,
          songButton5.current.material, songButton6.current.material, songButton7.current.material, songButton8.current.material,
          songButton9.current.material, songButton10.current.material, songButton11.current.material
        ], { emissiveIntensity: 0.0 })
        playNewSong(6)
        setSongButton1Active(false)
        setSongButton2Active(false)
        setSongButton3Active(false)
        setSongButton4Active(false)
        setSongButton5Active(false)
        setSongButton6Active(false)
        setSongButton7Active(false)
        setSongButton8Active(false)
        setSongButton9Active(false)
        setSongButton10Active(false)
        setSongButton11Active(false)
        setSongButton12Active(true)
        break
    }
  }

  function handleOnButtonClick() { 
    lightAudio.play()
    setJukeboxActive(true)
    if (firstClick) {
      setFirstClick(false) 
      gsap.to(songButton7.current.material, { emissiveIntensity: 1.5 })
      gsap.to([
        songButton1.current.material, songButton2.current.material, songButton3.current.material, songButton4.current.material,
        songButton5.current.material, songButton6.current.material, songButton8.current.material, songButton9.current.material,
        songButton10.current.material, songButton11.current.material, songButton12.current.material
      ], { emissiveIntensity: 0.0 })
      playNewSong(1)
      setSongButton7Active(true)
    } else {
      console.log('it is not the first click :(')
    }
    setTimeout(() => {
      setOnButtonActive(true)
      setZoomed(true)
      props.toggleZoomedIn()
    }, 750)
  }


  useEffect(() => {
    flicker.current = gsap.fromTo(onbutton.current.material, 
      { emissiveIntensity: 0.5 },
      { emissiveIntensity: 2.5, yoyo: true, repeat: -1, duration: 1.25 }
    )
    setOnButtonActive(false)
    setJukeboxActive(false)
    setZoomed(false)
    props.toggleZoomedIn()
    audioArray.current.map(song => { song.stop() })
  }, [ props.reset ])

  return (<>
    <Caption audio={ audioArray.current } activePanel={ activePanel } />
    <group {...props} dispose={null} scale={ props.scale } position={ props.position }>
      <JukeboxBase 
        isActive={ jukeboxActive }
      />
      <mesh
        castShadow
        receiveShadow
        ref={ onbutton }
        geometry={nodes.on_button.geometry}
        position={[21.768, 12.311, 24.096]}
      >
        <meshStandardMaterial 
          emissive={ '#00ff00' }
          emissiveIntensity={ 1.5 }
          toneMapped={ false }
          color={ onButtonActive ? '#00ff00' : '#00ff00' }
        />
    </mesh>
    <mesh
      position={[ 21.768, 8.5, 26.096 ]}
      scale={[ 20, 16 , 1 ]} 
      visible={ false }
      onPointerOver={() => setHovered(true) }
      onPointerOut={() => setHovered(false) }
      onClick={ handleOnButtonClick }
    >
      <boxGeometry />
    </mesh>
    <MeetZach position={[ -5.286, 30.003, 24.18 ]} rotation={[ -0.4, 0, 0 ]} isActive={ songButton1Active } onClick={ () => handleSongButtonClick(1)} onPointerOver={() => setHovered(true) } onPointerOut={() => setHovered(false) } />
    <SoundsLikeTheRadioAddDay position={[ -5.286, 28.33, 24.18 ]} rotation={[ -0.4, 0, 0 ]} isActive={ songButton4Active } onClick={ () => handleSongButtonClick(4)} onPointerOver={() => setHovered(true) } onPointerOut={() => setHovered(false) } />
    <ShowDates position={[ -5.286, 26.825, 24.18 ]} rotation={[ -0.4, 0, 0 ]} isActive={ songButton5Active } onClick={ () => handleSongButtonClick(5)} onPointerOver={() => setHovered(true) } onPointerOut={() => setHovered(false) } />
    <EmptyButton position={[ -5.286, 25.204, 24.18 ]} rotation={[ -0.4, 0, 0 ]} />
    <EmptyButton position={[ -5.286, 23.557, 24.18 ]} rotation={[ -0.4, 0, 0 ]} />
    {/* <PlayAll position={[ -5.286, 28.33, 24.18 ]} rotation={[ -0.4, 0, 0 ]} isActive={ songButton2Active } onClick={ () => handleSongButtonClick(2)} onPointerOver={() => setHovered(true) } onPointerOut={() => setHovered(false) } /> */}

    {/* <Pause position={[ -5.286, 21.962, 24.18 ]} rotation={[ -0.4, 0, 0 ]} isActive={ songButton3Active } onClick={ () => handleSongButtonClick(3)} onPointerOver={() => setHovered(true) } onPointerOut={() => setHovered(false) } /> */}
    
    <EmptyButton position={[ -5.286, 21.962, 24.18 ]} rotation={[ -0.4, 0, 0 ]} onClick={ () => handleSongButtonClick(6)} onPointerOver={() => setHovered(true) } onPointerOut={() => setHovered(false) } />
   
    {/* Sounds Like The Radio */}
    <SoundsLikeTheRadio position={[ 4.643, 30.003, 24.18 ]} rotation={[ -0.4, 0, 0 ]} isActive={ songButton7Active } onClick={ () => handleSongButtonClick(7)} onPointerOver={() => setHovered(true) } onPointerOut={() => setHovered(false) } />
    {/* There's The Sun */}
    <TheresTheSun position={[ 4.643, 28.33, 24.18 ]} rotation={[ -0.4, 0, 0 ]} isActive={ songButton8Active } onClick={ () => handleSongButtonClick(8)} onPointerOver={() => setHovered(true) } onPointerOut={() => setHovered(false) } />
    {/* Cold Beer & Country Music */}
    <ColdBeerAndCountryMusic position={[ 4.643, 26.825, 24.18 ]} rotation={[ -0.4, 0, 0 ]} isActive={ songButton9Active } onClick={ () => handleSongButtonClick(9)} onPointerOver={() => setHovered(true) } onPointerOut={() => setHovered(false) } />
    {/* Bad Luck */}
    <BadLuck position={[ 4.643, 25.204, 24.18 ]} rotation={[ -0.4, 0, 0 ]} isActive={ songButton10Active } onClick={ () => handleSongButtonClick(10)} onPointerOver={() => setHovered(true) } onPointerOut={() => setHovered(false) } />
    {/* Kind Of Woman I Like */}
    <KindOfWomanILike position={[ 4.643, 23.557, 24.18 ]} rotation={[ -0.4, 0, 0 ]} isActive={ songButton11Active } onClick={ () => handleSongButtonClick(11)} onPointerOver={() => setHovered(true) } onPointerOut={() => setHovered(false) } />
    {/* Justa Jonesin' */}
    <EmptyButton position={[ 4.643, 21.962, 24.18 ]} rotation={[ -0.4, 0, 0 ]} />
    <mesh
      geometry={nodes.song_button.geometry}
      position={[-10.375, 29.976, 25.458]}
      rotation={[1.493, 0, 0]}
      onPointerOver={() => setHovered(true) }
      onPointerOut={() => setHovered(false) }
      ref={ songButton1 }
      onClick={ () => handleSongButtonClick(1)}
    >
        <meshStandardMaterial 
          emissive={ '#ff0000' }
          emissiveIntensity={ 0.0 }
          toneMapped={ false }
          color={ songButton1Active ? '#C23827' : '#ff0000' }
        />
    </mesh>
      
    <mesh
      geometry={nodes.song_button.geometry}
      position={[-10.375, 28.309, 25.572]}
      rotation={[1.499, 0, 0]}
      onPointerOver={() => setHovered(true) }
      onPointerOut={() => setHovered(false) }
      ref={ songButton2 }
      onClick={ () => handleSongButtonClick(2)}
      >
      <meshStandardMaterial 
          emissive={ '#ff0000' }
          emissiveIntensity={ 0.0 }
          toneMapped={ false }
          color={ songButton2Active ? '#C23827' : '#ff0000' }
        />
    </mesh>
    <mesh
      geometry={nodes.song_button.geometry}
      position={[-10.382, 26.854, 25.685]}
      rotation={[1.49, 0, 0]}
      onPointerOver={() => setHovered(true) }
      onPointerOut={() => setHovered(false) }
      ref={ songButton3 }
      onClick={ () => handleSongButtonClick(3)}
      >
        <meshStandardMaterial 
          emissive={ '#ff0000' }
          emissiveIntensity={ 0.0 }
          toneMapped={ false }
          color={ songButton3Active ? '#C23827' : '#ff0000' }
        />
    </mesh>
    <mesh
      geometry={nodes.song_button.geometry}
      position={[-10.408, 25.172, 25.816]}
      rotation={[1.49, 0, 0]}
      onPointerOver={() => setHovered(true) }
      onPointerOut={() => setHovered(false) }
      ref={ songButton4 }
      onClick={ () => handleSongButtonClick(4)}
      >
        <meshStandardMaterial 
            emissive={ '#ff0000' }
            emissiveIntensity={ 0.0 }
            toneMapped={ false }
            color={ songButton4Active ? '#C23827' : '#ff0000' }
        />
    </mesh>
    <mesh
      geometry={nodes.song_button.geometry}
      position={[-10.388, 23.657, 25.925]}
      rotation={[1.493, 0, 0]}
      onPointerOver={() => setHovered(true) }
      onPointerOut={() => setHovered(false) }
      ref={ songButton5 }
      onClick={ () => handleSongButtonClick(5)}
      >
      <meshStandardMaterial 
          emissive={ '#ff0000' }
          emissiveIntensity={ 0.0 }
          toneMapped={ false }
          color={ songButton5Active ? '#C23827' : '#ff0000' }
      />
    </mesh>
    <mesh
      geometry={nodes.song_button.geometry}
      position={[-10.388, 21.975, 26.055]}
      rotation={[1.483, 0, 0]}
      onPointerOver={() => setHovered(true) }
      onPointerOut={() => setHovered(false) }
      ref={ songButton6 }
      onClick={ () => handleSongButtonClick(6)}
      >
      <meshStandardMaterial 
          emissive={ '#ff0000' }
          emissiveIntensity={ 0.0 }
          toneMapped={ false }
          color={ songButton6Active ? '#C23827' : '#ff0000' }
      />
    </mesh>
    <mesh
      geometry={nodes.song_button.geometry}
      position={[10.376, 29.976, 25.458]}
      rotation={[1.493, 0, 0]}
      onPointerOver={() => setHovered(true) }
      onPointerOut={() => setHovered(false) }
      ref={ songButton7 }
      onClick={ () => handleSongButtonClick(7)}
      >
      <meshStandardMaterial 
          emissive={ '#ff0000' }
          emissiveIntensity={ 0.0 }
          toneMapped={ false }
          color={ songButton7Active ? '#C23827' : '#ff0000' }
      />
    </mesh>
    <mesh
      geometry={nodes.song_button.geometry}
      position={[10.376, 28.309, 25.572]}
      rotation={[1.499, 0, 0]}
      onPointerOver={() => setHovered(true) }
      onPointerOut={() => setHovered(false) }
      ref={ songButton8 }
      onClick={ () => handleSongButtonClick(8)}
      >
      <meshStandardMaterial 
          emissive={ '#ff0000' }
          emissiveIntensity={ 0.0 }
          toneMapped={ false }
          color={ songButton8Active ? '#C23827' : '#ff0000' }
      />
    </mesh>
    <mesh
      geometry={nodes.song_button.geometry}
      position={[10.369, 26.854, 25.685]}
      rotation={[1.49, 0, 0]}
      onPointerOver={() => setHovered(true) }
      onPointerOut={() => setHovered(false) }
      ref={ songButton9 }
      onClick={ () => handleSongButtonClick(9)}
      >
      <meshStandardMaterial 
          emissive={ '#ff0000' }
          emissiveIntensity={ 0.0 }
          toneMapped={ false }
          color={ songButton9Active ? '#C23827' : '#ff0000' }
      />
    </mesh>
    <mesh
      geometry={nodes.song_button.geometry}
      position={[10.343, 25.172, 25.816]}
      rotation={[1.49, 0, 0]}
      onPointerOver={() => setHovered(true) }
      onPointerOut={() => setHovered(false) }
      ref={ songButton10 }
      onClick={ () => handleSongButtonClick(10)}
      >
      <meshStandardMaterial 
          emissive={ '#ff0000' }
          emissiveIntensity={ 0.0 }
          toneMapped={ false }
          color={ songButton10Active ? '#C23827' : '#ff0000' }
      />
    </mesh>
    <mesh
      geometry={nodes.song_button.geometry}
      position={[10.363, 23.657, 25.925]}
      rotation={[1.493, 0, 0]}
      onPointerOver={() => setHovered(true) }
      onPointerOut={() => setHovered(false) }
      ref={ songButton11 }
      onClick={ () => handleSongButtonClick(11)}
      >
      <meshStandardMaterial 
          emissive={ '#ff0000' }
          emissiveIntensity={ 0.0 }
          toneMapped={ false }
          color={ songButton11Active ? '#C23827' : '#ff0000' }
      />
    </mesh>
    <mesh
      geometry={nodes.song_button.geometry}
      position={[10.363, 21.975, 26.055]}
      rotation={[1.483, 0, 0]}
      onPointerOver={() => setHovered(true) }
      onPointerOut={() => setHovered(false) }
      ref={ songButton12 }
      onClick={ () => handleSongButtonClick(12)}
      >
      <meshStandardMaterial 
          emissive={ '#ff0000' }
          emissiveIntensity={ 0.0 }
          toneMapped={ false }
          color={ songButton12Active ? '#C23827' : '#ff0000' }
      />
    </mesh>
      { isMobileDevice &&
        <>
          <group position={[-4.837, 19.461, 25.297]} 
            onClick={ () => {
                setActivePanel('right')
                buttonAudio.play()
            } }
            ref={ leftNavButton }
            >
            <mesh
              geometry={nodes.Cube004.geometry}
              material={materials.ArrowButtonOne}
            />
            <mesh
              geometry={nodes.Cube004_1.geometry}
              material={materials["Arrow Color"]}
            />
          </group>
          <group position={[5.605, 19.461, 25.297]}
            onClick={ () => { 
                setActivePanel('left')
                buttonAudio.play()
            }}
            // ref={ rightNavButton }
          >
            <mesh
              geometry={nodes.Cube005.geometry}
              material={materials.ArrowButtonOne}
              // ref={ leftNavButton }
            />
            <mesh
              geometry={nodes.Cube005_1.geometry}
              material={materials["Arrow Color"]}
            />
          </group>
        </>
      }
    </group>
    
        </>
  );
}

// useGLTF.preload("./jukebox-v4.glb");
useGLTF.preload('./juke-separate.glb');