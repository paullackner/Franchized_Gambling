import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Overview from './components/Overview'
import Cards from './components/Cards';
import Filling from './components/Filling';
import Footer from './components/Footer';
import Login from './components/Login';
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Hero></Hero>
      <Overview></Overview>
      <Filling></Filling>
      <Cards></Cards>
      {/*<Routes>
        <Route path='/' element={<Hero />}/>
        <Route path='/overview' element={<Overview />}/>
        <Route path='/wheel' element={<Filling />}/>
        <Route path='/game' element={<Cards />}/>
        <Route path='/login' element={<Login />}/>
  </Routes>*/}
      <Footer></Footer>
      <Login></Login>
    </>
  );
}

export default App;
