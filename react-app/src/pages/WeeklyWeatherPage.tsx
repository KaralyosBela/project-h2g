import Container from "../components/Container";
import WeeklyWeather from "../components/WeeklyWeather";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import "../styles/Custom.module.css";
import { IWeeklyWeather } from "../interfaces/Weather.interface";

const WeeklyWeatherPage: React.FC = () => {
  const [dailyWeather, setDailyWeather] = useState<IWeeklyWeather[]>([]);

  useEffect(() => {
    const fetchWeatherApi = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&appid=${process.env.REACT_APP_API_KEY}&units=metric`
        );

        //TODO: az apinak kellene interface, és az lenne a type az itemnek
        const weatherData = response.data.daily.map((item: any) => {
          return {
            temperature: item.temp.day,
            description: item.weather[0].description,
            icon: item.weather[0].icon
          };
        });

        setDailyWeather(weatherData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchWeatherApi();
  }, []);

  return (
    <Container>
      <div>
        {!!dailyWeather && <WeeklyWeather dailyWeather={dailyWeather} />}
      </div>
    </Container>
  );
};

export default WeeklyWeatherPage;
