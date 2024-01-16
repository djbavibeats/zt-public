import { useEffect, useRef, useState } from 'react'
export default function SpotifyPlayer(props) {
    const [ spotifyToken, setSpotifyToken ] = useState('')
    const [ player, setPlayer ] = useState(undefined)
    const [ deviceId, setDeviceId ] = useState('')

    const client_id = 'd3ea7e5cb8f646deba93241502769362'
    const scopes = 'streaming user-read-email user-read-private user-modify-playback-state'
    const redirect_uri = 'http://localhost:5173/'
  
    function spotifyLogin() {
        let popup = window.open(
            `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&redirect_uri=${redirect_uri}&scope=${scopes}&show_dialog=true`, 
            'Login with Spotify', 
            'width=800,height=600'
        )

        window.spotifyCallback = (payload) => {
            popup.close()
            initializeSpotifyPlayer(payload)
        }
    }

    useEffect(() => {
        let windowToken = window.location.hash.substr(1).split('&')[0].split('=')[1]
        if (windowToken) {
            setSpotifyToken(window.location.hash.substr(1).split('&')[0].split('=')[1])
            window.opener.spotifyCallback(spotifyToken)
        }
    }, [ spotifyToken ])

    useEffect(() => {
        if (props.pause === true && player) {
            console.log('paused')
            console.log(player)
            fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`, {
                headers: {
                    'Authorization': `Bearer ${spotifyToken}`
                },
                method: "PUT"
            })
        }
    }, [ props.pause ])

    function initializeSpotifyPlayer(token) {
        setSpotifyToken(token)
        const script = document.createElement("script")
        script.src = "https://sdk.scdn.co/spotify-player.js"
        script.async = true

        document.body.appendChild(script)

        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new Spotify.Player({
                name: 'Zach Top Radio',
                getOAuthToken: cb => { 
                    cb(token) 
                },
                volume: 0.5
            })

            setPlayer(player)

            player.addListener('initialization_error', ({ message }) => {
                console.error(message)
            })
          
            player.addListener('authentication_error', ({ message }) => {
                console.error(message)
            })
          
            player.addListener('account_error', ({ message }) => {
                console.error(message)
            })

            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id)
                setDeviceId(device_id)
                fetch('https://api.spotify.com/v1/me/player', {
                    headers: {
                      'Authorization': `Bearer ${token}`
                    },
                    method: "PUT",
                    body: JSON.stringify({
                        "device_ids": [ device_id ]
                    })
                  }).then(response => {
                    console.log('Ready to go.')
                  })
            })
    
            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id)
            })

            player.connect().then(success => {
                if (success) {
                    console.log('Zach Top radio is connected to Spotify!')
                } else {
                    console.log('something went wrong')
                }
            })
    
        }
    }

    useEffect(() => {
        if (props.spotifyInitialized === true) {
            spotifyLogin()
        }
    }, [ props.spotifyInitialized ])

    useEffect(() => {
        let trackString = "spotify:track:" + props.currentSpotifyId
        console.log(trackString)
        if (spotifyToken) {
            fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
                headers: {
                    'Authorization': `Bearer ${spotifyToken}`
                },
                method: "PUT",
                body: JSON.stringify({
                    "uris": [ trackString ]
                })
            })
        }
    }, [ props.currentSpotifyId ])

    return (<>
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