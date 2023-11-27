import React, { useState } from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { createContext } from 'react'

const Cryto= createContext();

const CrytoContext = ({children}) => {

    const [currency, setcurrency] = useState("INR");
    const [symbol, setsymbol] = useState("₹");

    useEffect(() => {
        if(currency==="INR") setsymbol("₹");
        else if(currency==="USD") setsymbol("$")
    }, [currency])
    
  return (
    <Cryto.Provider value={{currency,symbol,setcurrency}}>
        {children}
    </Cryto.Provider>
  )
}

export default CrytoContext

export const CrytoState=()=>{
    return useContext(Cryto)
}