import { useEffect, useRef, useState } from 'react'
export default function SpotifyPlayer(props) {
    const soundcloud = useRef()
    const [ scInit, setScInit ] = useState(false)
    const [ soundcloudPlayer, setSoundcloudPlayer ] = useState(undefined)
  
    function spotifyLogin() {
        console.log('does not matter')
    }

    useEffect(() => {
        console.log('start up')
        const script = document.createElement('script')
        script.src = "https://w.soundcloud.com/player/api.js"
        script.async = true
        document.body.appendChild(script)
        setTimeout(() => {
            if (SC) {
                setScInit(true)
                setSoundcloudPlayer(SC.Widget(soundcloud.current))
            } else {
                console.log('still waiting')
            }
        }, 500)
    }, [])

    useEffect(() => {
        if (soundcloudPlayer) {
            soundcloudPlayer.pause()
        }
    }, [ props.pause ])

    useEffect(() => {
        if (scInit  === true) {
            console.log('true')
            let options = []
            options.auto_play = true
            soundcloudPlayer.load(props.currentSpotifyId, options, () => {
                console.log('loaded up!')
            })
            soundcloudPlayer.play()
            
        }
    }, [ props.currentSpotifyId ])

    return (<>
    <div style={{
        zIndex: 999,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    }}>
    <iframe 
    ref={ soundcloud }
    width="100%" 
    height="75" 
    scrolling="no" 
    frameborder="no" 
    allow="autoplay"
    src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1696384518"
    >
    </iframe>
    {/* <iframe 
    width="100%" 
    height="300" 
    scrolling="no" 
    frameborder="no" 
    allow="autoplay" 
    src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1696384518&amp;hide_related=false&amp;show_comments=false&amp;show_user=true&amp;show_reposts=false&amp;show_teaser=true&amp;visual=true"></iframe> */}

    </div>
    </>)
}

/**
Sounds Like The Radio
https://open.spotify.com/track/5wCUOa3jSe5ZM3oXEutCdO?si=88df68760fbb494f
1696384518

There's The Sun
https://open.spotify.com/track/6OWM81gZLDz9D7s6RmVLSJ?si=be3f90041d684540
1638707877

Cold Beer & Country Music
https://open.spotify.com/track/6r8oKdUQPyW3z3I0ooWlCt?si=c7c8026145e34ca7
1639043547

Bad Luck
https://open.spotify.com/track/6Y3BNXD4TwhldgAbWqDnif?si=c2f32ad645264e68
1639307967

The Kinda Woman I Like
https://open.spotify.com/track/7HxLpCpwGAZmH4b5uAf7KU?si=8833b9ffba6849c1
1638978303

Justa Jonesin'
https://open.spotify.com/track/4DQbYa6yBye49Yg1ui0hfO?si=f5b7c09e4280428a
1639376760
*/