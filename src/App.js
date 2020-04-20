import React from 'react';
import './App.css';
import GameListContainer from './Container/GameList';
import NavBar from './Component/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <GameListContainer/>
    </div>
  );
}

export default App;
