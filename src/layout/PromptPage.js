import React, { useContext, useEffect, useMemo } from 'react';
import {AuthContext} from '../Provider'


function PromptPage() {
    const {numberOfBoxesRow,numberOfBoxesColumn,marioPosition,setColumn,setRow,setStates} = useContext(AuthContext)
    const prompter =()=> {
        var row = prompt('width')
        var column = prompt('height')
        setRow(Number(row))
        setColumn(Number(column))
        setStates(true)
}
    useEffect(() => {
       prompter()
   }, [])
    return (
        <div>
            
        </div>
    )
}

export default PromptPage
