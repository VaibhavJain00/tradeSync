import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { createContext } from 'react'
import { CoinList } from './config/api';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

const Cryto= createContext();

const CrytoContext = ({children}) => {

    const [currency, setcurrency] = useState("INR");
    const [symbol, setsymbol] = useState("₹");
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    
    const [alert, setAlert] = useState({
      open:false,
      message:"",
      type:"success",
    });

    useEffect(()=>{
      onAuthStateChanged(auth,(user)=>{
        if(user) setUser(user);
        else setUser(null);
      })
    },[])


    useEffect(() => {
        if(currency==="INR") setsymbol("₹");
        else if(currency==="USD") setsymbol("$")
    }, [currency])
    
    const fetchCoins = async () => {
      setLoading(true);
      const { data } = await axios.get(CoinList(currency));
      console.log(data);
  
      setCoins(data);
      setLoading(false);
    };
    
  return (
    <Cryto.Provider value={{currency,symbol,setcurrency, coins, loading,fetchCoins,alert, setAlert,user,}}>
        {children}
    </Cryto.Provider>
  ) 
}

export default CrytoContext

export const CrytoState=()=>{
    return useContext(Cryto)
}