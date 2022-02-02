import './App.css';
import { Route, Routes } from "react-router";
import Form from './components/Form/Form.jsx';
import Landing from './components/LandingPage/Landing.jsx';
import React from 'react';
import { BrowserRouter } from "react-router-dom";
import SearchBar from './components/SearchBar/SearchBar.jsx';

function App() {
  return (
    
    <BrowserRouter>
    <div className="App">
      <Routes>
      {/* <Route path='/' element={<SearchBar/>} /> */}
      <Route exact path='/' element={<Landing/>} />
      <Route exact path='/form' element={<Form/>} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
