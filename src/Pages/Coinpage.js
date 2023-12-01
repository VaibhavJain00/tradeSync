import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CrytoState } from '../CrytoContext';
import axios from 'axios';
import { SingleCoin } from '../config/api';
import { Button, LinearProgress, Typography, makeStyles } from '@material-ui/core';
import CoinInfo from '../components/CoinInfo';
import { numberWithCommas } from '../components/Banner/Carousel';


const useStyles= makeStyles((theme)=>({
  container: {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  sidebar: {
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
  },
  heading: {
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Montserrat",
  },
  description: {
    width: "100%",
    fontFamily: "Montserrat",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify",
  },
  marketData: {
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "space-around",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "start",
    },
  },

}))

const Coinpage = () => {

  const classes=useStyles();
  const {id}=useParams();
  const [coin, setcoin] = useState();
  const {currency, symbol,user}= CrytoState();

  const fetchCoin=async()=>{
    const {data}= await axios.get(SingleCoin(id));
    setcoin(data);
  }

  useEffect(()=>{
    fetchCoin();
  },[]);

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <div className={classes.container}>

        <div className={classes.sidebar}>
          {/* sidebar */}
            <img
            src={coin?.image.large}
            alt={coin?.name}
            height="200"
            style={{ marginBottom: 20 }}
          />
          <Typography variant="h3" className={classes.heading}>
            {coin?.name}
          </Typography>
          <Typography variant="subtitle1" className={classes.description}>
            {(coin?.description.en.split(". ")[0])}.
            {(coin?.description.en.split(". ")[1])}.
          </Typography>
          <div className={classes.marketData}>
            <span style={{ display: "flex" }}>
              <Typography variant="h5" className={classes.heading}>
                Rank:
              </Typography>
              &nbsp; &nbsp;
              <Typography
                variant="h5"
                style={{
                  fontFamily: "Montserrat",
                }}
              >
                {numberWithCommas(coin?.market_cap_rank)}
              </Typography>
            </span>
            <span style={{ display: "flex" }}>
              <Typography variant="h5" className={classes.heading}>
                Current Price:
              </Typography>
              &nbsp; &nbsp;
              <Typography
                variant="h5"
                style={{
                  fontFamily: "Montserrat",
                }}
              >
                {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
              </Typography>
            </span>
            <span style={{ display: "flex" }}>
              <Typography variant="h5" className={classes.heading}>
                Market Cap:
              </Typography>
              &nbsp; &nbsp;
              <Typography
                variant="h5"
                style={{
                  fontFamily: "Montserrat",
                }}
              >
                {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}{" M"}
              </Typography>
            </span>
            {user &&(
              <Button
                variant='outlined'
                style={{
                  width:"100%",
                  height:40,
                  backgroundColor:"#EEBC1D",
                }}
              >
                Add to Watchlist
              </Button>
            )}
          </div>

        </div>

        {/* chart */}
        <CoinInfo coin={coin}/>

    </div>
  )
}

export default Coinpage