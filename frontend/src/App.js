import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Overview from './components/Overview'
import Cards from './components/Cards';
import Filling from './components/Filling';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Hero></Hero>
      <Overview></Overview>
      <Filling></Filling>
      <Cards></Cards>
      <Footer></Footer>
    </div>
  );
}

export default App;
