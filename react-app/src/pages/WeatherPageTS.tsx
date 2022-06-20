import axios from "axios";
import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import DailyWeather from "../components/DailyWeather";
import Weather from '../components/Weather.interface';

const WeatherPageTS: React.FC = () => {
  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    const fetchWeatherApi = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=30.44&lon=-94.04&appid=${process.env.REACT_APP_API_KEY}&unit=metric`
        );
        
        setWeather({
          temperature: response.data.main.temp,
          city: response.data.name,
          icon: response.data.weather[0].icon,
        });

        //miért nem íródik ki
        console.log(weather);
      } catch (error) {
        console.log(error);
      }
    };
    fetchWeatherApi();
    //Csak mount-nal akarunk fetchelni
  }, []);

  return (
    <div>
      <Container>
        <h1>Todays weather in [ ]</h1>
        {!!weather && <DailyWeather weatherInfo={weather} />}
      </Container>
    </div>
  );
};

export default WeatherPageTS;
