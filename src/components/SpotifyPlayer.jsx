import { useEffect, useRef, useState } from 'react'
export default function SpotifyPlayer(props) {
    const spotifyIFrame = useRef()
    const [ object, setObject ] = useState(null)
    // useEffect(() => {
    //     if (props.spotifyInitialized) {
    //         const script = document.createElement('script')
    //         script.src = "https://open.spotify.com/embed/iframe-api/v1"
    //         script.async = true
    //         document.body.appendChild(script)
    //         window.onSpotifyIframeApiReady = (IFrameAPI) => {
    //             const element = document.getElementById('embed-iframe')
    //             const options = {
    //                 width: '100%',
    //                 height: '160',
    //                 uri: `spotify:track:5wCUOa3jSe5ZM3oXEutCdO`,
    //                 theme: 'dark'
    //                 }
    //             const callback = (EmbedController) => {
    //                 setObject(EmbedController)
    //                 EmbedController.addListener('ready', () => {
    //                     console.log('player ready')
                        
    //                 console.log(document.querySelectorAll('[aria-label="Play"'))
    //                     EmbedController.togglePlay()
    //                 })
    //             }
    //             IFrameAPI.createController(element, options, callback)
    //         }
    
    //         return () => {
    //             document.body.removeChild(script)
    //         }
    //     }

    // }, [ props.spotifyInitialized ])

    useEffect(() => {
        spotifyIFrame.current.src = `https://open.spotify.com/embed/track/${props.currentSpotifyId}?generator&theme=0`
        console.log(spotifyIFrame.current.contentDocument)
        if (object) {
            // console.log("Object", object)
            // object.loadUri(`spotify:track:${props.currentSpotifyId}`)
            // object.onPlayerReady(() => {
            //     console.log('player ready')
            // })
            // setTimeout(() => {
            // }, 500)
        }
    }, [ props ])

    function updateSpotifyLink() {
        console.log('link')
    }
    return (<>
        <div className="spotify-wrapper absolute bottom-0 left-0 right-0 min-h-[160px] w-full">
        <div id="embed-iframe"></div>
        <iframe 
            ref={ spotifyIFrame}
            // style="border-radius:12px" 
            src="https://open.spotify.com/embed/track/5wCUOa3jSe5ZM3oXEutCdO?utm_source=generator" 
            width="100%" 
            height="152" 
            frameBorder="0" 
            allowfullscreen="" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
        >

        </iframe>
        </div>
    </>)
}

/**
Sounds Like The Radio
https://open.spotify.com/track/5wCUOa3jSe5ZM3oXEutCdO?si=88df68760fbb494f

There's The Sun
https://open.spotify.com/track/6OWM81gZLDz9D7s6RmVLSJ?si=be3f90041d684540

Cold Beer & Country Music
https://open.spotify.com/track/6r8oKdUQPyW3z3I0ooWlCt?si=c7c8026145e34ca7

Bad Luck
https://open.spotify.com/track/6Y3BNXD4TwhldgAbWqDnif?si=c2f32ad645264e68

The Kinda Woman I Like
https://open.spotify.com/track/7HxLpCpwGAZmH4b5uAf7KU?si=8833b9ffba6849c1

Justa Jonesin'
https://open.spotify.com/track/4DQbYa6yBye49Yg1ui0hfO?si=f5b7c09e4280428a

*/