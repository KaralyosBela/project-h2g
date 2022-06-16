import axios from "axios";
import { useState, useEffect } from "react";
import Container from "../components/Container";
import DailyWeather from "../components/DailyWeather";
import classes from './Custom.module.css';
//TODO: itt kell e a classes, ha csak sima h1-re akarok hivatkozni

function WeatherPage() {
  const [weather, setWeather] = useState("");

  // (async () => {
  //   try {
  //     //.env nem mukodik
  //     const response = await axios.get(
  //       `https://api.openweathermap.org/data/2.5/weather?lat=33.44&lon=-94.04&appid=${process.env.REACT_APP_API_KEY}`
  //     );
  //     setWeather({
  //       temp: response.data.temp,
  //       city: response.data.name,
  //   })
  // } catch (error) {
  //     console.log(error);
  //   }
  // })();

  //Async nem lehet a useEffect
  useEffect(() => {
    const fetchWeatherApi = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=33.44&lon=-94.04&appid=${process.env.REACT_APP_API_KEY}&unit=metric`
        );
        setWeather({
          temperature: response.data.main.temp,
          city: response.data.name,
          icon: response.data.weather[0].icon
        });
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
        <h1>This is the weather page.</h1>
        <DailyWeather weatherInfo={weather} />
      </Container>
    </div>
  );
}

export default WeatherPage;
