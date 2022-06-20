import Container from "../components/Container";
import WeeklyWeather from "../components/WeeklyWeather";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import "../styles/Custom.module.css";
import { IWeeklyWeather } from "../interfaces/Weather.interface";

const WeeklyWeatherPage: React.FC = () => {
  const [dailyWeather, setDailyWeather] = useState<IWeeklyWeather[] | null>([]);
  //const [cityName, setCityName] = useState<string>("unknown");
  //const cityInputRef = useRef<string>("");

  useEffect(() => {
    const fetchWeatherApi = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&appid=${process.env.REACT_APP_API_KEY}&unit=metric`
        );

        //TODO: itt mit kéne
        const asd = response.data.daily.map((item: any) => {
          return {
            temperature: item.temp.day,
            main: item.weather[0].main,
            icon: item.weather[0].icon
          };
        });

        setDailyWeather(asd);
      } catch (error) {
        console.log(error);
      }
    };
    fetchWeatherApi();
    //Csak mount-nal akarunk fetchelni
  }, []);

  // const clicked = () => {
  //   setCityName(cityInputRef.current.value);
  // }

  return (
    <Container>
      <div>
        {/* <h1>The weekly weather in [ {cityName} ]</h1> */}
        {!!dailyWeather && <WeeklyWeather dailyWeather={dailyWeather} />}
      </div>
    </Container>
  );
};

export default WeeklyWeatherPage;
