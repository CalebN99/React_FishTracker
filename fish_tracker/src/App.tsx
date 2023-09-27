import React from 'react';
import './App.css';
import Map from "./components/Map";

function App(): JSX.Element {
  return (
    <div className="App">
      <h1>Fish Tracker</h1>
      <Map />
    </div>
  );
}

export default App;
