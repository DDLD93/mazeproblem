import React from 'react'
import Mario from '../assets/MarioIcon.png'
import Mushrooms from '../assets/Mushroom.png'

function Box(props) {
    return (
    <div id={props.boxNumber} className="rows">
        <img width='27px' height='27px' src={Mario} alt="go way error" />
        <img width='25px' height='25px' src={Mushrooms} alt="go way error" />
      </div>
    )
}

export default Box
