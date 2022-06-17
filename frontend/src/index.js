import React from 'react';
import './index.css';
import App from './App';
import ReactDOM from 'react-dom';
import Provider from 'react-dom';
import rootStore from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

{/*BrowserRoter does not work */}

ReactDOM.render(

      <BrowserRouter>
        <App />
      </BrowserRouter>,
 
  document.getElementById('root')
);


