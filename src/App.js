import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
// import {Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Header from './components/Header';
import Homepage from './Pages/Homepage';
import Coinpage from './Pages/Coinpage';
 
function App() {

  // const useStyles= makeStyles(()=>({
    // Apps:{ 
    //     backgroundColor: "#14161a",
    //     color:"white",
    //     minHeight:"100vh"
    // },
  // }));

  // const classes= useStyles();
  return (
    <div className='Apps'>
        <BrowserRouter>
          <div>
            <Header/>
            <Routes>
              <Route path="/" Component={Homepage} exact/>
              <Route path="/coins/:id" Component={Coinpage} />
            </Routes>
          </div>
        </BrowserRouter>
    </div>
  );
}

export default App;
