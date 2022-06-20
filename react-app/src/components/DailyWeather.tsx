import Card from "./Card";
import {Weather} from "../interfaces/Weather.interface";
import classes from "../styles/DailyWeather.module.css";

type Props = {
  weatherInfo: Weather;
};

const DailyWeather: React.FC<Props> = ({ weatherInfo }) => {
  return (
    <Card day="Monday">
      <div className={classes.outer}>
        <div>
          <img
            src={`http://openweathermap.org/img/wn/${weatherInfo.icon}.png`}
            alt="hehe"
          />
        </div>
        <div className={classes.inner}>
          <div>
            <span>{weatherInfo.temperature} C&deg;</span>
          </div>
          <div>
            <span>{weatherInfo.city}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DailyWeather;
