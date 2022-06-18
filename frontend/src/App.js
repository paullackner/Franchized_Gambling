import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Leaderboard from './components/Leaderboard'
import Cards from './components/Cards';
import SpinWheel from './components/SpinWheel';
import Footer from './components/Footer';
import Login, { Signup } from './components/Login';
import Game from './components/Game';
import House from './components/House';
import {Routes, Route} from 'react-router-dom';
import Shop from './components/Shop';

function App() {
  return (
    <>
    
    <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Hero />}/>
        <Route path='/leaderboard' element={<Leaderboard />}/>
        <Route path='/wheel' element={<SpinWheel />}/>
        <Route path='/game' element={<Cards />}/>
        <Route path='/game/shop' element={<Shop />}/>
        <Route path='/game/house' element={<House />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/map' element={<Game />}/>
      </Routes>
    <Footer></Footer>
  
    </>
  );
}

export default App;
