import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { createContext } from 'react'
import { CoinList } from './config/api';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import { Input } from '@material-ui/core';
import { doc, onSnapshot } from "@firebase/firestore";

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

    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
      if(user){
        const coinRef = doc(db, "watchlist", user.uid);

        var unsubscribe = onSnapshot(coinRef, coin => {
          if(coin.exists()){
            setWatchlist(coin.data().coins);
          } else{
            console.log("No items in watchlist");
          }
        });

        return () => {
          unsubscribe()
        };
      }
    }, [user]);

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
    <Cryto.Provider value={{currency,symbol,setcurrency, coins, loading,fetchCoins,alert, setAlert,user,watchlist,}}>
        {children}
    </Cryto.Provider>
  ) 
}

export default CrytoContext

export const CrytoState=()=>{
    return useContext(Cryto)
}