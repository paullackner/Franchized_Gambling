import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Overview from './components/Overview'
import Cards from './components/Cards';
import Filling from './components/Filling';
import Footer from './components/Footer';
import Login from './components/Login';
import Game from './components/Game';
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <>
    
    <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Hero />}/>
        <Route path='/overview' element={<Overview />}/>
        <Route path='/wheel' element={<Filling />}/>
        <Route path='/game' element={<Cards />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/map' element={<Game />}/>
      </Routes>
    <Footer></Footer>
  
    </>
  );
}

export default App;
