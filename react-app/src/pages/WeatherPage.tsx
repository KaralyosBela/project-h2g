import axios from "axios";
import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import DailyWeather from "../components/DailyWeather";
import { Weather } from "../interfaces/Weather.interface";
import "../styles/Custom.module.css";

interface ICity {
  country: string,
  lat: number,
  lon: number,
  city: string
}

const WeatherPage: React.FC = () => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [cityData, setCityData] = useState<ICity | null>(null);

  const searchCity = async () => {
    const cityName = "Debrecen";
    const response = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${process.env.REACT_APP_API_KEY}`
    );
    const data = {
      country: response.data[0].country,
      lat: response.data[0].lat,
      lon: response.data[0].lon,
      city: response.data[0].name,
    };
    setCityData(data);
    console.log(data);
  };

  useEffect(() => {
    searchCity();
  },[])

  useEffect(() => {
    const fetchWeatherApi = async () => {
      try {
        console.log(cityData)
        if(cityData) {
        const response = await axios.get(
          //Itt miért lett autcomplete a ?
          `https://api.openweathermap.org/data/2.5/weather?lat=${cityData?.lat}&lon=${cityData?.lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
        );
        
        //use state async
        setWeather({
          temperature: response.data.main.temp,
          city: response.data.name,
          icon: response.data.weather[0].icon,
        });
      }
        //miért nem íródik ki itt még
        console.log(weather);
      } catch (error) {
        console.log(error);
      }
    };

    fetchWeatherApi();
    //Csak mount-nal akarunk fetchelni
  }, [cityData]);

  return (
    <Container>
      <div>
        <input type="text"></input>
        <button onClick={searchCity}>Search city</button>
      </div>
      <h1>Todays weather in [{cityData?.city}]</h1>
      {!!weather && <DailyWeather weatherInfo={weather} />}
    </Container>
  );
};

export default WeatherPage;
