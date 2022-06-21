import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {Container} from "../components/Container";
import {DailyWeather} from "../components/DailyWeather";
import { Weather, ICity } from "../interfaces/Weather.interface";
import "../styles/Custom.module.css";

export const WeatherPage: React.FC = () => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [cityData, setCityData] = useState<ICity | null>(null);
  const [error, setError] = useState<boolean>(false);
  // const [cityName, setCityName] = useState<string>("");
  const cityRef = useRef<HTMLInputElement>(null);

  const searchCity = async () => {
    //object possibly null
    const cityName = cityRef.current?.value || "Debrecen";
    try {
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
      setError(false);
    } catch (error) {
      setError(true);
    }
  };

  // useEffect(() => {
  //   console.log(cityRef.current?.value);
  //   if(cityRef.current) {
  //     setCityName(cityRef.current.value)
  //   }
  // },[cityRef])

  useEffect(() => {
    searchCity();
  }, []);

  useEffect(() => {
    const fetchWeatherApi = async () => {
      try {
        if (cityData) {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${cityData?.lat}&lon=${cityData?.lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
          );

          //UseStat is async
          setWeather({
            temperature: response.data.main.temp,
            city: response.data.name,
            icon: response.data.weather[0].icon,
          });
        }
      } catch (error) {
        setWeather(null);
      }
    };

    fetchWeatherApi();
  }, [cityData]);

  return (
    <Container>
      <div>
        <input type="text" ref={cityRef}></input>
        <button onClick={searchCity}>Search city</button>
      </div>
      <h1>Todays weather in [{cityData?.city}]</h1>
      {error ? <p>nincs ilyen varos</p> : <p>van ilyen varos</p>}
      {!!weather && <DailyWeather weatherInfo={weather} />}
    </Container>
  );
};