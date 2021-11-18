import React, { useContext } from 'react';
import {AuthContext} from '../Provider'


function PromptPage() {

    const {setColumn,setRow,setStates} = useContext(AuthContext)
    const prompter =()=> {
        var row = prompt('width')
        var column = prompt('height')
        setRow(Number(row))
        setColumn(Number(column))
        setStates(true)
       
}

    return (
        <div style={{display:'flex',justifyContent:"center",alignItems:'center',flexDirection:'column'}} >
            <h1>Maze Problem</h1>
            <button onClick={prompter} >New Game</button>
        </div>
    )
}

export default PromptPage
