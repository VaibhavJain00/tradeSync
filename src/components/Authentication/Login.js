import { Box, Button, TextField } from '@material-ui/core';
import React, { useState } from 'react'
import { CrytoState } from '../../CrytoContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

const Login = ({handleClose}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    // const { setAlert } = CryptoState();
    const { setAlert } = CrytoState();


    const handleSubmit = async () => {
      if (!email || !password) {
        setAlert({
          open: true,
          message: "Please fill all the Fields",
          type: "error",
        });
        return;
      }
  
      try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        setAlert({
          open: true,
          message: `Sign Up Successful. Welcome ${result.user.email}`,
          type: "success",
        });
  
        handleClose();
      } catch (error) {
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
        return;
      }
    };

  return (
        <Box
        //   p={}
        style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            padding:"20px"
        }}
        >
            <TextField
                variant="outlined"
                type="email"
                label="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
            />
            <TextField
                variant="outlined"
                label="Enter Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
            />
            <Button
                variant="contained"
                size="large"
                style={{ backgroundColor: "#EEBC1D" }}
                onClick={handleSubmit}
            >
            Login
            </Button>
        </Box>
  )
}

export default Login