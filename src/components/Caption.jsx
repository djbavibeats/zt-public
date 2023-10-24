import { Html } from "@react-three/drei"
import { useEffect, useState } from "react"
import { useFrame } from "@react-three/fiber"
export default function Caption(audio) {
    let [ line, setLine ] = useState(0)
    let introLines = [
        "With a deep-rooted love for traditional music,",
        "Zach Top is poised to invigorate the country genre",
        "with his homage to classic sounds and authentic storytelling.",
        "Zach embodies the spirit of 90’s country legends,",
        "shaped by his upbringing in Sunnyside, WA",
        "listening to timeless melodies",
        "as he tended to livestock on his family’s ranch.",
        "At the age of seven, he formed a band with his siblings",
        "which set the stage for his musical ambitions.",
        "Throughout his teenage years and early twenties,",
        "Zach honed his craft by playing in various bluegrass bands",
        "before moving to Nashville in 2021",
        "where he has been steadily making his mark as an artist to watch.",
        "Zach has already garnered impressive support from fans and critics alike,",
        "underlining his ability to connect with audiences.",
        ""
    ]
    useEffect(() => {
        // console.log(audio.audio[0].seek())

    }, [ audio ])

    useFrame(() => {
        if (audio.audio[0].seek() > 0.000 && audio.audio[0].seek() < 1.875) {
            setLine(0)
        } else if (audio.audio[0].seek() > 1.876 && audio.audio[0].seek() < 4.660) {
            setLine(1)
        } else if (audio.audio[0].seek() > 4.661 && audio.audio[0].seek() < 8.242) {
            setLine(2)
        } else if (audio.audio[0].seek() > 8.243 && audio.audio[0].seek() < 11.117) {
            setLine(3)
        } else if (audio.audio[0].seek() > 11.118 && audio.audio[0].seek() < 14.158) {
            setLine(4)
        } else if (audio.audio[0].seek() > 14.159 && audio.audio[0].seek() < 15.575) {
            setLine(5)
        } else if (audio.audio[0].seek() > 15.576 && audio.audio[0].seek() < 18.325) {
            setLine(6)
        } else if (audio.audio[0].seek() > 18.326 && audio.audio[0].seek() < 21.408) {
            setLine(7)
        } else if (audio.audio[0].seek() > 21.409 && audio.audio[0].seek() < 24.242) {
            setLine(8)
        } else if (audio.audio[0].seek() > 24.243 && audio.audio[0].seek() < 26.325) {
            setLine(9)
        } else if (audio.audio[0].seek() > 26.326 && audio.audio[0].seek() < 29.783) {
            setLine(10)
        } else if (audio.audio[0].seek() > 29.784 && audio.audio[0].seek() < 32.075) {
            setLine(11)
        } else if (audio.audio[0].seek() > 32.076 && audio.audio[0].seek() < 35.775) {
            setLine(12)
        } else if (audio.audio[0].seek() > 35.776 && audio.audio[0].seek() < 39.610) {
            setLine(13)
        } else if (audio.audio[0].seek() > 39.611 && audio.audio[0].seek() < 43.248) {
            setLine(14)
        } else {
            setLine(15)
        }

    })
    return(<>
    <Html center position={[ 0, 0.895, -1]} className="text-center text-red-500 w-[300px] md:w-[600px]">
        <p>{ introLines[line] }</p>
    </Html>
    </>)
}

{/*
> 3
With a deep-rooted love for traditional music, 02.95
Zach Top is poised to invigorate the country genre 03.42
with his homage to classic sounds and authentic storytelling.  03.15

Zach embodies the spirit of 90’s country legends, 03.10
shaped by his upbringing in Sunnyside, WA 02.80
listening to timeless melodies 01.83
as he tended to livestock on his family’s ranch. 02.88

At the age of seven, he formed a band with his siblings 02.80 
which set the stage for his musical ambitions. 02.57

Throughout his teenage years and early twenties, 02.23
Zach honed his craft by playing in various bluegrass bands 03.57 
before moving to Nashville in 2021 02.38
where he has been steadily making his mark as an artist to watch. 03.50

Zach has already garnered impressive support from fans and critics alike, 03.77
underlining his ability to connect with audiences. 02.92
*/}