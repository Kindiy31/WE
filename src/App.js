import React, { useState } from 'react';
import './App.css';
import { Header } from './Components/Header/Header';
import logo from './logo.svg';
import menuIcon from './menu.svg';

function App() {
  const tg = window.Telegram.WebApp;
  const [path, SetPath] = useState('home')
  return (
    <>
      <Header 
        SetPath={SetPath}
      />

    </>
  );
}

export default App;
