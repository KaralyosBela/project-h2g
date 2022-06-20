import Container from "../components/Container";
import WeeklyWeather from "../components/WeeklyWeather";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import "../styles/Custom.module.css";

function WeeklyWeatherPage() {

  const [dailyWeather, setDailyWeather] = useState([]);
  const [cityName, setCityName] = useState('unkown');
  const cityInputRef = useRef('');

  useEffect(() => {
    const fetchWeatherApi = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&appid=${process.env.REACT_APP_API_KEY}&unit=metric`
        );
        setDailyWeather(response.data.daily);
      } catch (error) {
        console.log(error);
      }
    };
    fetchWeatherApi();
    //Csak mount-nal akarunk fetchelni
  }, []);

  const clicked = () => {
    setCityName(cityInputRef.current.value);
  }

  return (
    <Container>
      <div>
      <input type="text" ref={cityInputRef}></input>
        <button onClick={clicked}>Search city</button>
        <h1>The weekly weather in [ {cityName} ]</h1>
        {!!dailyWeather && <WeeklyWeather dailyWeather={dailyWeather} />}
      </div>
    </Container>
  );
}

export default WeeklyWeatherPage;
