// import { createTheme, ThemeProvider } from "@material-ui/core";
import {
    Container,
    createTheme,
    TableCell,
    LinearProgress,
    ThemeProvider,
    Typography,
    TextField,
    TableBody,
    TableRow,
    TableHead,
    TableContainer,
    Table,
    Paper,
  } from "@material-ui/core";
import axios from "axios";
import React from "react";
import  { useEffect } from "react";
import { useState } from "react";
import { CoinList } from "../config/api";
import { CrytoState } from "../CrytoContext";
// import{ useHistory} from "react-router-dom";


const CoinsTable = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    // const history = useHistory();

    const { currency } = CrytoState();

    const fetchCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency));
        console.log(data);
    
        setCoins(data);
        setLoading(false);
      };

      console.log(coins);

      useEffect(() => {
        fetchCoins();
       
      }, [currency]);

      const darkTheme = createTheme({
        palette: {
          primary: {
            main: "#fff",
          },
          type: "dark",
        },
      });

      const handleSearch = () => {
        return coins.filter(
          (coin) =>
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        );
      };

    
  return <ThemeProvider theme={darkTheme}>
    <container style={{textAlign: "center"}}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label="Search For a Crypto Currency.."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        />
    </container>
  </ThemeProvider>;
  
};

export default CoinsTable;