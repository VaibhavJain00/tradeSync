import React from 'react'
import { CrytoState } from '../CrytoContext'
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert'

const Alert = () => {

    const {alert, setAlert}=CrytoState();

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
    
        setAlert({ open: false });
      };

  return (
    <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={handleClose}
    >
        <MuiAlert
        onClose={handleClose}
        elevation={10}
        variant="filled"
        severity={alert.type}
        >
        {alert.message}
        </MuiAlert>
    </Snackbar>
  )
}

export default Alert