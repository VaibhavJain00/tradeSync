import logo from './logo.svg';
import './App.css';
import {Button} from '@material-ui/core'
// import Button from '@mui/material/Button';
function App() {
  return (
    <div className="App">
      <Button variant='contained' color='primary'>hello</Button>
      <Button>Default</Button>
<Button color="primary">Primary</Button>
<Button color="secondary">Secondary</Button>
<Button disabled>Disabled</Button>
<Button href="#text-buttons" color="primary">
  Link
</Button>
      
    </div>
  );
}

export default App;
