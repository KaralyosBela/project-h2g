import {Route, Routes } from 'react-router-dom';
import {WeatherPage} from './pages/WeatherPage';
import {WeeklyWeatherPage} from './pages/WeeklyWeatherPage';
//import WeatherPageTS from './pages/WeatherPageTS';
import MainPage from './pages/MainPage';
import {MainNavigation} from './components/MainNavigation';

function App() {
  return (
    <div>
    <MainNavigation/>
    <Routes>
      <Route path="/" element={<MainPage/>}/>
      <Route path="/daily-weather" element={<WeatherPage/>}/>
      <Route path="/weekly-weather" element={<WeeklyWeatherPage/>}/>
    </Routes>
    </div>
  );
}

export default App;
