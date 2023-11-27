import './App.css';
import Navbar from './components/navbar';
import Home from './components/home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from './components/about'
import Notestate from "./context/notes/notesState";
import Login from './components/Login';
import Signup from './components/Signup';
function App() {
  return (
    <div className="App">
      <Notestate>
      <BrowserRouter>
      <Navbar/>
      <div className="container">
      <Routes>
        <Route  exact path="/" element={<Home/>}/>
        <Route exact path="/about" element={<About/>} />
        <Route exact path='/login' element={<Login/>} />
        <Route exact path='/signup' element={<Signup/>} />

      </Routes>
      </div>
    </BrowserRouter>
    </Notestate>
    </div>
  );
}

export default App;
