import React, { useEffect, useState, useMemo, useContext } from 'react'
import {AuthContext} from '../Provider'
import Box from './Box'

function TableArea() {
    const {numberOfBoxesRow,numberOfBoxesColumn} = useContext(AuthContext)
    const [totalBox] = useState(numberOfBoxesRow*numberOfBoxesColumn) //row mutiply by columns
    const [randomBoxes] = useState([]) //display mushrooms in random tiles
    const [marioPosition, setmarioPosition] = useState(totalBox/2-numberOfBoxesRow/2-2) //intial player position during game start
    const [moves, setmoves] = useState(0) // keeps track of playing moves count
    const [target] = useState(totalBox/1.9) // number of movement permitted during each session
   
    // dynamic styling to allow boxes to fit in canvas nicely
    const tableStyles={
            height:numberOfBoxesRow*30,
            width:numberOfBoxesColumn*30,
            borderWidth:5
    }
        
    

    function randomNumber(min, max, total) { //generating random number within a range of min and max argument
        // "min" should always equal to 1 & "total" is the number of random number  to be generated
            Array.from(Array(total), (e,i) => {
                let randomNo = Math.floor(Math.random() * (max - min) + min)
                if (!randomBoxes.includes(randomNo)) {
                    return randomBoxes.push(randomNo)
                }
                  return randomBoxes.splice(0, totalBox/20);
            })
    } 
        
    

    //scattering rendering mushrooms across game tile randomly
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
            var tileSelector = document.getElementById(marioPosition.toString()) //getting mario tile position
                tileSelector.childNodes[1].style.display='none'// removing mushrooms at collition  title
            const index = randomBoxes.indexOf(marioPosition);
            //removing tile number  mushrooms at collition tile in the random  array
            if (index > -1) {
                randomBoxes.splice(index, 1);
            }
            return randomBoxes
        }
        
    }

 
    function gameStatusCheck() {
        // checking if playing exhausted no of moves allowed
        if(moves > target) {
            alert(`Game over!!! Total number of noves to save the princes is : ${Math.round(target)}`)
            window.location.reload(false);
        }
        // checking if mushrooms array is empty i.e player won the game
        if(randomBoxes.length ===0) {
            alert(`Congratulation!!!`)
            window.location.reload(false);
            
        } 
        }
    
//listening for keyboard press 
function keypressed(keytarget) {
    //nested conditional statements to prevent player from taking mario out of game layout
    if (keytarget.code==='ArrowUp') {
        if(marioPosition-numberOfBoxesColumn>=0){
            setmarioPosition(prev => prev-numberOfBoxesColumn)
            setmoves(moves+1) 
        }
    }
    if (keytarget.code==='ArrowDown') {
        if(marioPosition+numberOfBoxesColumn<totalBox){
            setmarioPosition(prev => prev+numberOfBoxesColumn)
            setmoves(moves+1) 
        }
    }
    if (keytarget.code==='ArrowRight') {
        if((1+marioPosition)%numberOfBoxesRow !== 0){
            setmarioPosition(prev => prev+1)
            setmoves(moves+1) 
        }
    }
    if (keytarget.code==='ArrowLeft'){ 
        if(marioPosition%numberOfBoxesRow !== 0){
            setmarioPosition(prev => prev-1)
            setmoves(moves+1) 
        }
    }

     
}
//keeping mushrooms array intact between re-renders
useMemo(() => {
    randomNumber(1,totalBox,totalBox)
},[totalBox])

useEffect(() => {
  window.addEventListener("keydown",keypressed);
    stagingMushrooms()//shuffling mushrooms
    collitionChecker()// checking for collition
    var centerPiece = document.getElementById(marioPosition.toString())//grabing the current tile location of mario
        centerPiece.childNodes[0].style.display='block' //rendering updated mario position
    
    return ()=>{
    //clear out event subscribtion
     window.removeEventListener("keydown",keypressed);
    // checking if game have been won or lost
     gameStatusCheck()
            
    //rending mario new position after every lifecycle
     centerPiece.childNodes[0].style.display='none'// cleaning up previous render position
    }

}, [moves])
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
