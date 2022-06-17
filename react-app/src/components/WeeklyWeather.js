import classes from "./WeeklyWeather.module.css";
import Card from "./Card";

function WeeklyWeather(props) {
  //props.dailyWeather[x].weather[0].icon  .main. description
  //TODO: itt két call van, egy üres és egy data
  //console.log(props.dailyWeather[0].weather[0].icon);

  //   console.log(props.dailyWeather);
  //   props.dailyWeather.forEach((element, id) => {
  //     console.log(element);
  //   });
  const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday","Monday"];

  return (
    <div>
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
    </div>
  );
}

export default WeeklyWeather;
