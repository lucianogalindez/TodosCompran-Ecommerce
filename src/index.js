import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import { TiendaProvider } from './context/TiendaContext';
import { UserProvider } from './context/UserContext';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <TiendaProvider>
        <App />
      </TiendaProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

