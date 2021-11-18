import React, { useEffect, useState, useMemo, useContext,useLayoutEffect } from 'react'
import {AuthContext} from '../Provider'
import Box from './Box'

function TableArea() {
    const {numberOfBoxesRow,numberOfBoxesColumn,setColumn,setRow} = useContext(AuthContext)
//     var numberOfBoxesRow = 
//    var  numberOfBoxesColumn= prompt('height')
    const [totalBox, settotalBox] = useState(numberOfBoxesRow*numberOfBoxesColumn)
    const [randomBoxes, setrandomBoxes] = useState([]) //display mushrooms in random tiles
    const [marioPosition, setmarioPosition] = useState(totalBox/2-numberOfBoxesRow/2-2) //intial player position during game start
    const [moves, setmoves] = useState(0) // keeps track of playing moves no
    const [target, settarget] = useState(totalBox/2) // number movement restriction accross the board
    const [state, setstate] = useState(false)
    const [event, setevent] = useState(false)
   
    
    const tableStyles={
            height:numberOfBoxesRow*30,
            width:numberOfBoxesColumn*30,
            borderWidth:5
    }
    // const  render =() => setstate(!state)
        
    

    function randomNumber(min, max, total) { //generating random number within a of min and max argument
        console.log('shttled')
        
            // min should always equal to 1 & total is the max random to be generated
            Array.from(Array(total), (e,i) => {
                let randomNo = Math.floor(Math.random() * (max - min) + min)
                if (!randomBoxes.includes(randomNo)) {
                    return randomBoxes.push(randomNo)
                }
                  return randomBoxes
            })
    } 
        
    

    //scatering mushrooms across game tile randomly
    function stagingMushrooms(){
        randomBoxes.forEach((e) =>{
            var tileSelector = document.getElementById(e.toString())
            tileSelector.childNodes[1].style.display='block'
        })
    }

    //checking collition between mario and mushrooms
    function collitionChecker() {
        //checking if mario and mushroom are occupying thesame tile 
        if(randomBoxes.includes(marioPosition)) {
            console.log('collided');
            var tileSelector = document.getElementById(marioPosition.toString()) //getting mario tile position
            tileSelector.childNodes[1].style.display='none'// removing mushrooms in that title
            const index = randomBoxes.indexOf(marioPosition);
            if (index > -1) {
                randomBoxes.splice(index, 1);
            }
            return randomBoxes
        }
        
    }

 
    function gameStatusCheck() {
        if(moves > target) {
            alert(`Game over!!! Total number of noves to save the princes is : ${numberOfBoxesRow}`)
            window.location.reload(false);
        }
        if(randomBoxes.length ===0) {
            alert(`Congratulation!!!`)
            window.location.reload(false);
        } 
        }
    
//listening for keyboard press 
function keypressed(keytarget) {
    if (keytarget.code==='ArrowUp') {
        if(marioPosition-numberOfBoxesColumn>=0)setmarioPosition(prev => prev-numberOfBoxesColumn)
    }
    if (keytarget.code==='ArrowDown') {
        if(marioPosition+numberOfBoxesColumn<totalBox)setmarioPosition(prev => prev+numberOfBoxesColumn)
    }
    if (keytarget.code==='ArrowRight') {
        if((1+marioPosition)%numberOfBoxesRow !== 0)  setmarioPosition(prev => prev+1)
    }
    if (keytarget.code==='ArrowLeft'){ 
        if(marioPosition%numberOfBoxesRow !== 0)setmarioPosition(prev => prev-1)
    }

    setmoves(moves+1) //  
}

//window.addEventListener('load',)

useMemo(() => {
    randomNumber(1,totalBox,totalBox)
} , [state])

useEffect(() => {
    var up = marioPosition+numberOfBoxesColumn
    var down = marioPosition-numberOfBoxesColumn
    var right = marioPosition+1
    var left = marioPosition-1

    stagingMushrooms()
    if(down > 0 &&up < totalBox){
        console.log(up,down,totalBox);
    }
    window.addEventListener("keydown",keypressed);
    
    console.log(marioPosition);
    collitionChecker()// checking for collition
    var centerPiece = document.getElementById(marioPosition.toString())//grabing the current tile location of mario
    centerPiece.childNodes[0].style.display='block'
    
    return ()=>{
            
            //clear out event subscribtion
            window.removeEventListener("keydown",keypressed);
            window.removeEventListener('load',stagingMushrooms)
            // checking if game have been won or lost
            
            //rending mario new position after every lifecycle
            var centerPiece = document.getElementById(marioPosition.toString())
                centerPiece.childNodes[0].style.display='none'
                gameStatusCheck()
    }

}, [moves,state])
     return <>
       
            <div className='table-area' style={tableStyles} >
                {Array.from(Array(totalBox), (e, i) => {
                    return <Box
                    boxNumber={i}
                    />
                })}
            </div>
        
   </>
}

export default TableArea
