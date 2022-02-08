import './App.css';
import { Route, Routes, useParams } from "react-router";
import Form from './components/Form/Form.jsx';
import Landing from './components/LandingPage/Landing.jsx';
import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { DogDetail } from './components/DogDetail/DogDetail';
import { Home } from './components/Home/Home.jsx';
// import SearchBar from './components/SearchBar/SearchBar.jsx';
// import NavBar from './components/NavBar/Navbar.jsx';
// import { DogCard } from './components/DogCard/DogCard';
// import { Cards } from './components/Cards/Cards';


function App() {
  return (
    
    <BrowserRouter>
    <div className="App">
      <Routes>
      <Route path='/' element={<Landing/>} />
      <Route exact path='/home' element={<Home/>} />
      <Route exact path='/form' element={<Form/>} />
      <Route exact path='/api/breed/:breedId' element={<DogDetail/>} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
