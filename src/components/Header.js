import { AppBar, Container, MenuItem, Select, ThemeProvider, Toolbar, Typography, createTheme, makeStyles } from '@material-ui/core'
import React from 'react'
import {useNavigate } from 'react-router-dom';
import { CrytoState } from '../CrytoContext';
import AuthModal from './Authentication/AuthModal';


const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "gold",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
  },
}));

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});
const Header = () => {

  const classes= useStyles();

  const navigate = useNavigate()
  const {currency, setcurrency}=CrytoState();

  console.log(currency);

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
          <Container>
            <Toolbar>
              <Typography onClick={()=>navigate("/")} className={classes.title} variant='h6'>
                Crypto Hunter
              </Typography>
              <Select
                variant="outlined"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={currency}
                style={{ width: 100, height: 40, marginLeft: 15 }}
                onChange={(e) => setcurrency(e.target.value)}
              >
                <MenuItem value={"USD"}>USD</MenuItem>
                <MenuItem value={"INR"}>INR</MenuItem>
              </Select>

              <AuthModal />
            </Toolbar>
          </Container>
        </AppBar>
    </ThemeProvider>
  )
}

export default Header