import classes from "../styles/WeeklyWeather.module.css";
import Card from "./Card";
import { IWeeklyWeather } from "../interfaces/Weather.interface";

type Props = {
  dailyWeather: IWeeklyWeather[];
};

const days= [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Monday"
  ];

const WeeklyWeather: React.FC<Props> = ({ dailyWeather }) => {
  return (
    <div className={classes.weekly}>
      {dailyWeather.map((weather, id) => {
        return (
          <Card key={id} day={days[id]}>
            <div className={classes.outer}>
              <div>
                <img
                  src={`http://openweathermap.org/img/wn/${weather.icon}.png`}
                  alt="hehe"
                />
              </div>
              <div className={classes.inner}>
                <div>
                  <span>{weather.temperature} C&deg;</span>
                </div>
                <div>
                  <span>{weather.description}</span>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default WeeklyWeather;
