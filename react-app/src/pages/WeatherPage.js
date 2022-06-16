import axios from "axios";
import { useState, useEffect } from "react";

function WeatherPage() {
  const [weather, setWeather] = useState("");

  // (async () => {
  //   try {
  //     //.env nem mukodik
  //     const API_KEY = "b203fc1026c241d3e13b9713a3665286"
  //     const response = await axios.get(
  //       `https://api.openweathermap.org/data/2.5/weather?lat=33.44&lon=-94.04&appid=${API_KEY}`
  //     );
  //     console.log(response);
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
        const API_KEY = "b203fc1026c241d3e13b9713a3665286";
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=33.44&lon=-94.04&appid=${API_KEY}`
        );
        setWeather({
          temperature: response.data.main.temp,
          city: response.data.name,
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
      <h1>This is the weather page.</h1>
      <p>{weather.temperature}</p>
      <p>{weather.city}</p>
    </div>
  );
}

export default WeatherPage;
