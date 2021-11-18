import React, { createContext, useState,} from 'react';


export const AuthContext = createContext()

function AuthContextProvider ({ children }) {
    const [numberOfBoxesRow, setnumberOfBoxesRow] = useState(0) // board width
    const [numberOfBoxesColumn, setnumberOfBoxesColumn] = useState(0) // board heigth
    const [state, setstate] = useState(false)

    const setRow=(e) => setnumberOfBoxesRow(e)
    const setColumn=(e) => setnumberOfBoxesColumn(e)
    const setStates =(e) => setstate(e)
    const context = {numberOfBoxesRow,numberOfBoxesColumn,state,setColumn,setStates,setRow}
    return (
      <AuthContext.Provider value={context}>
        {children}
      </AuthContext.Provider>
    )
  }
export default AuthContextProvider