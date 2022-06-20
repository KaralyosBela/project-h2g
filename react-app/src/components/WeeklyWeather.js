import classes from "../styles/WeeklyWeather.module.css";
import Card from "./Card";

function WeeklyWeather(props) {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Monday",
  ];

  return (
    <div className={classes.weekly}>
      {props.dailyWeather.map((weather, id) => {
        return (
          <Card key={id} day={days[id]}>
            <div className={classes.outer}>
              <div>
                <img
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                  alt="hehe"
                />
              </div>
              <div className={classes.inner}>
                <div>
                  <span>{weather.weather[0].main}</span>
                </div>
                <div>
                  <span>{weather.weather[0].description}</span>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

export default WeeklyWeather;
