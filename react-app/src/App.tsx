import React from 'react';
import {Route, Routes } from 'react-router-dom';
import WeatherPage from './pages/WeatherPage';
import MainPage from './pages/MainPage';
import MainNavigation from './components/MainNavigation';

function App() {
  return (
    <div>
    <MainNavigation/>
    <Routes>
      <Route path="/" element={<MainPage/>}/>
      <Route path="/weather" element={<WeatherPage/>}/>
    </Routes>
    </div>
  );
}

export default App;
