import { Route, Routes } from "react-router-dom";
import './App.css';
import Map from './Pages/Map/Map';
import Nav from './Core/Nav/Nav';
import Management from './Pages/Management/Management';



function App() {
  return (
    <div className="App">
        <Nav/>
        
          <Routes>
            <Route path='/' element={ <Map/> }/>
            <Route path='/management' element={ <Management/> }/>
          </Routes>
        
    </div>
  );
}

export default App;
