import React, { useState } from 'react';
import './App.css';
import { Header } from './Components/Header/Header';
import { Main } from './Components/Main/Main';

function App() {
  const tg = window.Telegram.WebApp;
  const [categorie, SetCategorie] = useState('home')
  return (
    <>
      <Header 
        SetPath={SetCategorie}
      />
      <Main 
        categorie={categorie}
      />

    </>
  );
}

export default App;
